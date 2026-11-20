import { neon } from '@neondatabase/serverless'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const ADMIN_USER_ID = '128df7a2-7990-4ed2-91a0-2adb61621b65'
const ADMIN_EMAIL = 'nyilapps2026@gmail.com'
const ALLOWED_ORIGINS = new Set(['https://nyil-admin.pages.dev', 'https://nyil-business-website.pages.dev'])
const sql = neon(process.env.DATABASE_URL)
const jwks = createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL))
const storage = new S3Client({ forcePathStyle: true })
const MEDIA_BUCKET = 'nyil-public-product-media'
const MAX_IMAGE_BYTES = 8 * 1024 * 1024

function response(data, status = 200, origin = '') {
  return new Response(status === 204 ? null : JSON.stringify(data), { status, headers: {
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://nyil-business-website.pages.dev',
    'Access-Control-Allow-Headers':'Authorization, Content-Type',
    'Access-Control-Allow-Methods':'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Vary':'Origin', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'
  }})
}
function safeText(value, max = 10000) { return typeof value === 'string' ? value.trim().slice(0, max) : '' }
function validSlug(value) { return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) }
async function admin(request) {
  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Bearer ')) return null
  try {
    const { payload } = await jwtVerify(header.slice(7), jwks, { issuer: process.env.NEON_AUTH_BASE_URL })
    const subject = typeof payload.sub === 'string' ? payload.sub : ''
    return subject === ADMIN_USER_ID ? ADMIN_EMAIL : null
  } catch { return null }
}
function jsonObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {} }

export default {
  async fetch(request) {
    const origin = request.headers.get('origin') || ''
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') return response({}, 204, origin)
    if (origin && !ALLOWED_ORIGINS.has(origin)) return response({error:'Origin not allowed'}, 403, origin)
    try {
      const contentMatch = url.pathname.match(/^\/content\/([a-z0-9-]{1,60})$/)
      if (request.method === 'GET' && contentMatch) {
        const [row] = await sql`SELECT page_key, content, updated_at FROM public.site_content WHERE page_key=${contentMatch[1]} AND published=true`
        return response({content:row || null}, 200, origin)
      }
      if (request.method === 'GET' && url.pathname === '/products') {
        const rows = await sql`SELECT id, slug, name, category, summary, description, image_url, external_url, status, sort_order, updated_at FROM public.products WHERE status = 'published' ORDER BY sort_order ASC, updated_at DESC`
        return response({products:rows}, 200, origin)
      }
      if (request.method === 'POST' && url.pathname === '/inquiries') {
        const body = await request.json()
        if (safeText(body.website, 200)) return response({received:true}, 202, origin)
        const name = safeText(body.name, 120)
        const email = safeText(body.email, 254).toLowerCase()
        const subject = safeText(body.subject, 180)
        const message = safeText(body.message, 10000)
        if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || message.length < 10) {
          return response({error:'Please provide a valid name, email, subject, and message.'}, 400, origin)
        }
        await sql`INSERT INTO public.contact_inquiries (name, email, subject, message, status) VALUES (${name}, ${email}, ${subject}, ${message}, 'new')`
        return response({received:true}, 202, origin)
      }
      if (url.pathname.startsWith('/admin/')) {
        const email = await admin(request)
        if (!email) return response({error:'Unauthorized'}, 401, origin)
        if (request.method === 'GET' && url.pathname === '/admin/content') {
          const rows = await sql`SELECT page_key, content, published, updated_at FROM public.site_content ORDER BY page_key ASC`
          return response({pages:rows}, 200, origin)
        }
        const contentAdminMatch = url.pathname.match(/^\/admin\/content\/([a-z0-9-]{1,60})$/)
        if (contentAdminMatch && request.method === 'PUT') {
          const pageKey = contentAdminMatch[1]
          const allowedPages = new Set(['home','about','solutions','technology','payment','footer','privacy','terms'])
          if (!allowedPages.has(pageKey)) return response({error:'Unsupported page key'},400,origin)
          const body = await request.json()
          const content = jsonObject(body.content)
          if (JSON.stringify(content).length > 100000) return response({error:'Page content is too large.'},413,origin)
          const published = body.published !== false
          const [row] = await sql`INSERT INTO public.site_content (page_key, content, published, updated_at) VALUES (${pageKey}, ${JSON.stringify(content)}::jsonb, ${published}, now()) ON CONFLICT (page_key) DO UPDATE SET content=EXCLUDED.content, published=EXCLUDED.published, updated_at=now() RETURNING page_key, content, published, updated_at`
          await sql`INSERT INTO public.admin_audit_log (admin_email, action, details) VALUES (${email}, 'site_content.update', ${JSON.stringify({page_key:pageKey,published})}::jsonb)`
          return response({page:row},200,origin)
        }
        if (request.method === 'POST' && url.pathname === '/admin/uploads') {
          const contentType = (request.headers.get('content-type') || '').toLowerCase().split(';')[0].trim()
          const allowedTypes = new Set(['image/jpeg','image/png','image/webp','image/avif'])
          if (!allowedTypes.has(contentType)) return response({error:'Only JPEG, PNG, WebP, and AVIF images are allowed.'},415,origin)
          const declaredLength = Number(request.headers.get('content-length') || 0)
          if (declaredLength > MAX_IMAGE_BYTES) return response({error:'Image must be 8 MB or smaller.'},413,origin)
          const bytes = new Uint8Array(await request.arrayBuffer())
          if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return response({error:'Image must be between 1 byte and 8 MB.'},413,origin)
          const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
          const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
          const isWebp = String.fromCharCode(...bytes.slice(0,4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8,12)) === 'WEBP'
          const isAvif = String.fromCharCode(...bytes.slice(4,12)).includes('ftypavif') || String.fromCharCode(...bytes.slice(4,16)).includes('ftypavis')
          if (!(contentType === 'image/jpeg' && isJpeg) && !(contentType === 'image/png' && isPng) && !(contentType === 'image/webp' && isWebp) && !(contentType === 'image/avif' && isAvif)) {
            return response({error:'The uploaded file content does not match its image type.'},415,origin)
          }
          const extension = ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'})[contentType]
          const key = `products/${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${extension}`
          await storage.send(new PutObjectCommand({Bucket:MEDIA_BUCKET,Key:key,Body:bytes,ContentType:contentType,CacheControl:'public, max-age=31536000, immutable'}))
          const endpoint = (process.env.AWS_ENDPOINT_URL_S3 || '').replace(/\/$/,'')
          if (!endpoint) throw new Error('Object storage endpoint is not configured.')
          return response({key,url:`${endpoint}/${MEDIA_BUCKET}/${key}`},201,origin)
        }
        if (request.method === 'GET' && url.pathname === '/admin/products') {
          const rows = await sql`SELECT * FROM public.products ORDER BY sort_order ASC, updated_at DESC`
          return response({products:rows}, 200, origin)
        }
        if (request.method === 'GET' && url.pathname === '/admin/inquiries') {
          const rows = await sql`SELECT id, name, email, subject, message, status, created_at FROM public.contact_inquiries ORDER BY created_at DESC LIMIT 500`
          return response({inquiries:rows}, 200, origin)
        }
        const inquiryMatch = url.pathname.match(/^\/admin\/inquiries\/(\d+)$/)
        if (inquiryMatch && request.method === 'PATCH') {
          const body = await request.json()
          if (!['new','read','closed'].includes(body.status)) return response({error:'Invalid inquiry status'},400,origin)
          const [row] = await sql`UPDATE public.contact_inquiries SET status=${body.status} WHERE id=${inquiryMatch[1]} RETURNING id, status`
          if (!row) return response({error:'Inquiry not found'},404,origin)
          await sql`INSERT INTO public.admin_audit_log (admin_email, action, details) VALUES (${email}, 'inquiry.status', ${JSON.stringify({inquiry_id:row.id,status:row.status})}::jsonb)`
          return response({inquiry:row},200,origin)
        }
        if (request.method === 'POST' && url.pathname === '/admin/products') {
          const body = await request.json()
          const slug = safeText(body.slug, 90)
          if (!validSlug(slug)) return response({error:'Invalid product slug'}, 400, origin)
          const status = ['draft','published'].includes(body.status) ? body.status : 'draft'
          const [row] = await sql`INSERT INTO public.products (id, slug, name, category, summary, description, image_url, external_url, status, published_at) VALUES (${crypto.randomUUID()}, ${slug}, ${JSON.stringify(jsonObject(body.name))}::jsonb, ${safeText(body.category,100) || 'General'}, ${JSON.stringify(jsonObject(body.summary))}::jsonb, ${JSON.stringify(jsonObject(body.description))}::jsonb, ${safeText(body.image_url,2000) || null}, ${safeText(body.external_url,2000) || null}, ${status}, CASE WHEN ${status}='published' THEN now() ELSE NULL END) RETURNING *`
          await sql`INSERT INTO public.admin_audit_log (admin_email, action, product_id) VALUES (${email}, 'product.create', ${row.id})`
          return response({product:row}, 201, origin)
        }
        const match = url.pathname.match(/^\/admin\/products\/([a-f0-9-]{36})$/i)
        if (match) {
          const id = match[1]
          if (request.method === 'PUT') {
            const body = await request.json()
            const slug = safeText(body.slug, 90)
            if (!validSlug(slug)) return response({error:'Invalid product slug'}, 400, origin)
            const status = ['draft','published'].includes(body.status) ? body.status : 'draft'
            const [row] = await sql`UPDATE public.products SET slug=${slug}, name=${JSON.stringify(jsonObject(body.name))}::jsonb, category=${safeText(body.category,100)||'General'}, summary=${JSON.stringify(jsonObject(body.summary))}::jsonb, description=${JSON.stringify(jsonObject(body.description))}::jsonb, image_url=${safeText(body.image_url,2000)||null}, external_url=${safeText(body.external_url,2000)||null}, status=${status}, published_at=CASE WHEN ${status}='published' THEN COALESCE(published_at,now()) ELSE NULL END, updated_at=now() WHERE id=${id} RETURNING *`
            if (!row) return response({error:'Product not found'},404,origin)
            await sql`INSERT INTO public.admin_audit_log (admin_email, action, product_id) VALUES (${email}, 'product.update', ${id})`
            return response({product:row},200,origin)
          }
          if (request.method === 'PATCH') {
            const body = await request.json()
            if (!['draft','published','archived'].includes(body.status)) return response({error:'Invalid status'},400,origin)
            const [row] = await sql`UPDATE public.products SET status=${body.status}, published_at=CASE WHEN ${body.status}='published' THEN COALESCE(published_at,now()) ELSE NULL END, updated_at=now() WHERE id=${id} RETURNING *`
            if (!row) return response({error:'Product not found'},404,origin)
            await sql`INSERT INTO public.admin_audit_log (admin_email, action, product_id, details) VALUES (${email}, 'product.status', ${id}, ${JSON.stringify({status:body.status})}::jsonb)`
            return response({product:row},200,origin)
          }
          if (request.method === 'DELETE') {
            const [row] = await sql`DELETE FROM public.products WHERE id=${id} RETURNING id`
            if (!row) return response({error:'Product not found'},404,origin)
            await sql`INSERT INTO public.admin_audit_log (admin_email, action, product_id) VALUES (${email}, 'product.delete', ${id})`
            return response({deleted:true},200,origin)
          }
        }
        return response({error:'Not found'},404,origin)
      }
      return response({error:'Not found'},404,origin)
    } catch (error) {
      console.error('NYIL CMS API error', error)
      if (error?.code === '23505') return response({error:'A product with this URL slug already exists.'},409,origin)
      return response({error:'The server could not complete this request.'},500,origin)
    }
  }
}
