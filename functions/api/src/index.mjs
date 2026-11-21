import { neon } from '@neondatabase/serverless'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3'

const ADMIN_USER_ID = '128df7a2-7990-4ed2-91a0-2adb61621b65'
const ADMIN_EMAIL = 'nyilapps2026@gmail.com'
const ALLOWED_ORIGINS = new Set(['https://nyil-admin.pages.dev', 'https://nyil-business-website.pages.dev'])
const sql = neon(process.env.DATABASE_URL)
const jwks = createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL))
const storage = new S3Client({ forcePathStyle: true })
const MEDIA_BUCKET = 'nyil-public-product-media'
const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const MAX_VIDEO_BYTES = 100 * 1024 * 1024
const MAX_DOCUMENT_BYTES = 20 * 1024 * 1024

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
    const { payload } = await jwtVerify(header.slice(7), jwks, { issuer: new URL(process.env.NEON_AUTH_BASE_URL).origin })
    const subject = typeof payload.sub === 'string' ? payload.sub : ''
    const tokenEmail = safeText(payload.email, 254).toLowerCase()
    const [member] = await sql`SELECT email, role, status FROM public.admin_members WHERE status='active' AND (auth_subject=${subject} OR lower(email)=${tokenEmail}) ORDER BY CASE WHEN auth_subject=${subject} THEN 0 ELSE 1 END LIMIT 1`
    if (!member) return null
    return { email: member.email, role: member.role, subject }
  } catch { return null }
}
function canManageContent(role) { return ['owner','admin','editor'].includes(role) }
function canManageInquiries(role) { return ['owner','admin','support'].includes(role) }
function canReadAnalytics(role) { return ['owner','admin','analyst'].includes(role) }
function jsonObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {} }
function safeHttpUrl(value) { try { const url = new URL(safeText(value, 2048)); return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '' } catch { return '' } }
function safeMediaUrls(value) { return Array.isArray(value) ? value.map(safeHttpUrl).filter(Boolean).slice(0, 20) : [] }
function safeMetadata(value) { const metadata = jsonObject(value); return { ...metadata, ...(Object.prototype.hasOwnProperty.call(metadata, 'url') ? { url: safeHttpUrl(metadata.url) } : {}) } }

export default {
  async fetch(request) {
    const origin = request.headers.get('origin') || ''
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') return response({}, 204, origin)
    if (origin && !ALLOWED_ORIGINS.has(origin)) return response({error:'Origin not allowed'}, 403, origin)
    try {
      if (request.method === 'GET' && url.pathname === '/public-settings') {
        const rows = await sql`SELECT setting_key,setting_value FROM public.site_settings WHERE setting_key IN ('company_profile','contact_channels','social_links','seo_defaults','appearance')`
        const settings = Object.fromEntries(rows.map(row => [row.setting_key,row.setting_value]))
        return response({settings},200,origin)
      }
      const contentMatch = url.pathname.match(/^\/content\/([a-z0-9-]{1,60})$/)
      if (request.method === 'GET' && contentMatch) {
        const [row] = await sql`SELECT page_key, content, updated_at FROM public.site_content WHERE page_key=${contentMatch[1]} AND published=true`
        return response({content:row || null}, 200, origin)
      }
      const collectionMatch = url.pathname.match(/^\/collections\/([a-z-]{2,40})$/)
      if (request.method === 'GET' && collectionMatch) {
        const allowedCollections = ['services','projects','work','plans','work-method','news','team','partners','achievements','testimonials','documents','faqs','careers']
        const key = collectionMatch[1]
        if (!allowedCollections.includes(key)) return response({error:'Unknown collection'},404,origin)
        const rows = await sql`SELECT id, collection_key, slug, title, summary, body, category, media_urls, metadata, sort_order, published_at, updated_at FROM public.site_entries WHERE collection_key=${key} AND status='published' ORDER BY sort_order ASC, published_at DESC NULLS LAST, updated_at DESC`
        return response({entries:rows},200,origin)
      }
      if (request.method === 'POST' && url.pathname === '/analytics/pageview') {
        const body = await request.json().catch(() => ({}))
        const rawPath = safeText(body.path, 180)
        const pagePath = /^\/[a-zA-Z0-9/_-]*$/.test(rawPath) && !rawPath.includes('//') ? rawPath : '/'
        const language = ['en','ps','fa','de','fr','es','it','pt','nl','sv','no','da'].includes(body.language) ? body.language : 'en'
        const deviceType = ['desktop','mobile','tablet'].includes(body.device_type) ? body.device_type : 'unknown'
        await sql`INSERT INTO public.site_analytics_events (page_path, language, device_type) VALUES (${pagePath}, ${language}, ${deviceType})`
        return response({tracked:true},202,origin)
      }
      if (request.method === 'GET' && url.pathname === '/products') {
        const rows = await sql`SELECT id, slug, name, category, summary, description, image_url, image_urls, video_urls, external_url, status, sort_order, updated_at FROM public.products WHERE status = 'published' ORDER BY sort_order ASC, updated_at DESC`
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
        const identity = await admin(request)
        if (!identity) return response({error:'Unauthorized'}, 401, origin)
        const email = identity.email
        const role = identity.role
        if (/^\/admin\/users(\/|$)/.test(url.pathname) && role !== 'owner') return response({error:'Only the owner can manage administrator accounts.'},403,origin)
        if (/^\/admin\/analytics/.test(url.pathname) && !canReadAnalytics(role)) return response({error:'Your role cannot view analytics.'},403,origin)
        if (/^\/admin\/settings/.test(url.pathname) && !['owner','admin'].includes(role)) return response({error:'Your role cannot manage site settings.'},403,origin)
        if (/^\/admin\/(content|entries|uploads|products)/.test(url.pathname) && !canManageContent(role)) return response({error:'Your role cannot manage website content.'},403,origin)
        if (/^\/admin\/inquiries/.test(url.pathname) && !canManageInquiries(role)) return response({error:'Your role cannot manage enquiries.'},403,origin)
        if (request.method === 'GET' && url.pathname === '/admin/me') return response({user:{email,role,subject:identity.subject}},200,origin)
        if (request.method === 'GET' && url.pathname === '/admin/analytics') {
          const days = Math.min(90,Math.max(1,Number(url.searchParams.get('days'))||30))
          const [summary] = await sql`SELECT COUNT(*)::int AS page_views, COUNT(DISTINCT page_path)::int AS unique_pages, COUNT(*) FILTER (WHERE created_at >= now()-interval '1 day')::int AS today_views, COUNT(*) FILTER (WHERE created_at >= now()-interval '7 days')::int AS week_views FROM public.site_analytics_events WHERE created_at >= now()-(${days}::int * interval '1 day')`
          const daily = await sql`SELECT to_char(date_trunc('day',created_at),'YYYY-MM-DD') AS day, COUNT(*)::int AS views FROM public.site_analytics_events WHERE created_at >= now()-(${days}::int * interval '1 day') GROUP BY 1 ORDER BY 1`
          const pages = await sql`SELECT page_path, COUNT(*)::int AS views FROM public.site_analytics_events WHERE created_at >= now()-(${days}::int * interval '1 day') GROUP BY page_path ORDER BY views DESC LIMIT 10`
          const languages = await sql`SELECT language, COUNT(*)::int AS views FROM public.site_analytics_events WHERE created_at >= now()-(${days}::int * interval '1 day') GROUP BY language ORDER BY views DESC`
          return response({summary:summary||{page_views:0,unique_pages:0,today_views:0,week_views:0},daily,pages,languages,days},200,origin)
        }
        if (request.method === 'GET' && url.pathname === '/admin/settings') {
          const rows = await sql`SELECT setting_key,setting_value,updated_at FROM public.site_settings ORDER BY setting_key`
          return response({settings:rows},200,origin)
        }
        if (request.method === 'PUT' && url.pathname === '/admin/settings') {
          const body = await request.json()
          const key = safeText(body.key,60)
          const allowedKeys = ['company_profile','contact_channels','social_links','seo_defaults','appearance']
          if (!allowedKeys.includes(key)) return response({error:'Unsupported setting key.'},400,origin)
          const value = jsonObject(body.value)
          if (JSON.stringify(value).length > 30000) return response({error:'Settings payload is too large.'},413,origin)
          const [row] = await sql`INSERT INTO public.site_settings (setting_key,setting_value,updated_at,updated_by) VALUES (${key},${JSON.stringify(value)}::jsonb,now(),${email}) ON CONFLICT (setting_key) DO UPDATE SET setting_value=EXCLUDED.setting_value,updated_at=now(),updated_by=EXCLUDED.updated_by RETURNING setting_key,setting_value,updated_at`
          await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'site_settings.update',${JSON.stringify({key})}::jsonb)`
          return response({setting:row},200,origin)
        }
        if (request.method === 'GET' && url.pathname === '/admin/users') {
          const rows = await sql`SELECT email,role,status,created_at,updated_at FROM public.admin_members ORDER BY CASE role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END,email`
          return response({users:rows},200,origin)
        }
        if (request.method === 'POST' && url.pathname === '/admin/users') {
          const body = await request.json()
          const userEmail = safeText(body.email,254).toLowerCase()
          const userRole = ['admin','editor','support','analyst'].includes(body.role) ? body.role : 'editor'
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail) || userEmail === ADMIN_EMAIL) return response({error:'Enter a valid team email. The owner account cannot be replaced.'},400,origin)
          const [row] = await sql`INSERT INTO public.admin_members (email,role,status) VALUES (${userEmail},${userRole},'active') ON CONFLICT (email) DO UPDATE SET role=EXCLUDED.role,status='active',updated_at=now() RETURNING email,role,status,created_at,updated_at`
          await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'admin_member.grant',${JSON.stringify({email:userEmail,role:userRole})}::jsonb)`
          return response({user:row},201,origin)
        }
        const memberMatch = url.pathname.match(/^\/admin\/users\/([^/]+)$/)
        if (memberMatch && request.method === 'PATCH') {
          const userEmail = decodeURIComponent(memberMatch[1]).toLowerCase()
          if (userEmail === ADMIN_EMAIL) return response({error:'The owner account cannot be disabled or demoted.'},400,origin)
          const body = await request.json()
          const userRole = ['admin','editor','support','analyst'].includes(body.role) ? body.role : null
          const status = ['active','disabled'].includes(body.status) ? body.status : null
          if (!userRole && !status) return response({error:'Provide a valid role or status.'},400,origin)
          const [row] = await sql`UPDATE public.admin_members SET role=COALESCE(${userRole},role),status=COALESCE(${status},status),updated_at=now() WHERE lower(email)=${userEmail} AND role<>'owner' RETURNING email,role,status,created_at,updated_at`
          if (!row) return response({error:'Team member not found.'},404,origin)
          await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'admin_member.update',${JSON.stringify({email:userEmail,role:row.role,status:row.status})}::jsonb)`
          return response({user:row},200,origin)
        }
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
        if (request.method === 'GET' && url.pathname === '/admin/media') {
          const endpoint = (process.env.AWS_ENDPOINT_URL_S3 || '').replace(/\/$/,'')
          if (!endpoint) throw new Error('Object storage endpoint is not configured.')
          const assets = []
          for (const scope of ['corporate','products']) {
            let continuationToken
            do {
              const page = await storage.send(new ListObjectsV2Command({Bucket:MEDIA_BUCKET,Prefix:scope+'/',ContinuationToken:continuationToken,MaxKeys:1000}))
              for (const object of page.Contents || []) {
                if (!object.Key || !object.Size) continue
                const extension = object.Key.split('.').pop().toLowerCase()
                const kind = ['jpg','jpeg','png','webp','avif'].includes(extension) ? 'image' : ['mp4','webm','mov'].includes(extension) ? 'video' : extension === 'pdf' ? 'pdf' : 'file'
                assets.push({key:object.Key,name:object.Key.split('/').pop(),url:endpoint+'/'+MEDIA_BUCKET+'/'+object.Key,kind,size:object.Size,sizeLabel:object.Size >= 1048576 ? (object.Size/1048576).toFixed(1)+' MB' : Math.max(1,Math.round(object.Size/1024))+' KB',updatedAt:object.LastModified?.toISOString?.() || null})
              }
              continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
            } while (continuationToken && assets.length < 5000)
          }
          assets.sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||'')))
          return response({assets},200,origin)
        }
        if (request.method === 'DELETE' && url.pathname === '/admin/media') {
          const body = await request.json().catch(()=>({}))
          const key = safeText(body.key,500)
          if (!/^(corporate|products)\/\d{4}-\d{2}-\d{2}\/[0-9a-f-]{36}\.(jpg|png|webp|avif|mp4|webm|mov|pdf)$/i.test(key)) return response({error:'Invalid media file key.'},400,origin)
          const endpoint = (process.env.AWS_ENDPOINT_URL_S3 || '').replace(/\/$/,'')
          if (!endpoint) throw new Error('Object storage endpoint is not configured.')
          const assetUrl = endpoint+'/'+MEDIA_BUCKET+'/'+key
          const [productRef] = await sql`SELECT id FROM public.products WHERE image_url=${assetUrl} OR COALESCE(image_urls,'[]'::jsonb) @> ${JSON.stringify([assetUrl])}::jsonb OR COALESCE(video_urls,'[]'::jsonb) @> ${JSON.stringify([assetUrl])}::jsonb LIMIT 1`
          const [entryRef] = await sql`SELECT id FROM public.site_entries WHERE COALESCE(media_urls,'[]'::jsonb) @> ${JSON.stringify([assetUrl])}::jsonb LIMIT 1`
          if (productRef || entryRef) return response({error:'This file is still attached to saved content. Remove it from that content first.'},409,origin)
          await storage.send(new DeleteObjectCommand({Bucket:MEDIA_BUCKET,Key:key}))
          await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'media.delete',${JSON.stringify({key})}::jsonb)`
          return response({deleted:true},200,origin)
        }
        if (request.method === 'POST' && url.pathname === '/admin/uploads') {
          const contentType = (request.headers.get('content-type') || '').toLowerCase().split(';')[0].trim()
          const imageTypes = new Set(['image/jpeg','image/png','image/webp','image/avif'])
          const videoTypes = new Set(['video/mp4','video/webm','video/quicktime'])
          const isVideo = videoTypes.has(contentType)
          const isDocument = contentType === 'application/pdf'
          if (!imageTypes.has(contentType) && !isVideo && !isDocument) return response({error:'Upload a supported image, video or PDF document.'},415,origin)
          const maxBytes = isVideo ? MAX_VIDEO_BYTES : isDocument ? MAX_DOCUMENT_BYTES : MAX_IMAGE_BYTES
          const label = isVideo ? 'Video' : isDocument ? 'PDF document' : 'Image'
          const declaredLength = Number(request.headers.get('content-length') || 0)
          if (declaredLength > maxBytes) return response({error:`${label} must be ${isVideo?'100 MB':isDocument?'20 MB':'8 MB'} or smaller.`},413,origin)
          const bytes = new Uint8Array(await request.arrayBuffer())
          if (!bytes.length || bytes.length > maxBytes) return response({error:`${label} file size is invalid or exceeds the limit.`},413,origin)
          let extension
          if (isDocument) {
            const isPdf = bytes.length > 5 && String.fromCharCode(...bytes.slice(0,5)) === '%PDF-'
            if (!isPdf) return response({error:'The uploaded file content does not match PDF format.'},415,origin)
            extension = 'pdf'
          } else if (isVideo) {
            const isMp4 = contentType === 'video/mp4' && bytes.length > 12 && String.fromCharCode(...bytes.slice(4,8)) === 'ftyp'
            const isWebm = contentType === 'video/webm' && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3
            const isMov = contentType === 'video/quicktime' && bytes.length > 12 && String.fromCharCode(...bytes.slice(4,8)) === 'ftyp'
            if (!isMp4 && !isWebm && !isMov) return response({error:'The uploaded file content does not match its video type.'},415,origin)
            extension = ({'video/mp4':'mp4','video/webm':'webm','video/quicktime':'mov'})[contentType]
          } else {
            const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
            const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
            const isWebp = String.fromCharCode(...bytes.slice(0,4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8,12)) === 'WEBP'
            const isAvif = String.fromCharCode(...bytes.slice(4,12)).includes('ftypavif') || String.fromCharCode(...bytes.slice(4,16)).includes('ftypavis')
            if (!(contentType === 'image/jpeg' && isJpeg) && !(contentType === 'image/png' && isPng) && !(contentType === 'image/webp' && isWebp) && !(contentType === 'image/avif' && isAvif)) return response({error:'The uploaded file content does not match its image type.'},415,origin)
            extension = ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'})[contentType]
          }
          const scope = url.searchParams.get('scope') === 'corporate' ? 'corporate' : 'products'
          const key = `${scope}/${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${extension}`
          await storage.send(new PutObjectCommand({Bucket:MEDIA_BUCKET,Key:key,Body:bytes,ContentType:contentType,CacheControl:'public, max-age=31536000, immutable'}))
          const endpoint = (process.env.AWS_ENDPOINT_URL_S3 || '').replace(/\/$/,'')
          if (!endpoint) throw new Error('Object storage endpoint is not configured.')
          return response({key,url:`${endpoint}/${MEDIA_BUCKET}/${key}`},201,origin)
        }
        const allowedCollections = ['services','projects','work','plans','work-method','news','team','partners','achievements','testimonials','documents','faqs','careers']
        if (request.method === 'GET' && url.pathname === '/admin/entries') {
          const key = safeText(url.searchParams.get('collection'),40)
          if (!allowedCollections.includes(key)) return response({error:'Unknown collection'},400,origin)
          const rows = await sql`SELECT * FROM public.site_entries WHERE collection_key=${key} ORDER BY sort_order ASC, updated_at DESC`
          return response({entries:rows},200,origin)
        }
        if (request.method === 'POST' && url.pathname === '/admin/entries') {
          const body = await request.json()
          const key = safeText(body.collection_key,40)
          const slug = safeText(body.slug,90)
          if (!allowedCollections.includes(key) || !validSlug(slug)) return response({error:'Choose a valid content section and URL slug.'},400,origin)
          const status = ['draft','published'].includes(body.status) ? body.status : 'draft'
          const [row] = await sql`INSERT INTO public.site_entries (collection_key,slug,title,summary,body,category,media_urls,metadata,status,sort_order,published_at) VALUES (${key},${slug},${JSON.stringify(jsonObject(body.title))}::jsonb,${JSON.stringify(jsonObject(body.summary))}::jsonb,${JSON.stringify(jsonObject(body.body))}::jsonb,${safeText(body.category,100)},${JSON.stringify(safeMediaUrls(body.media_urls))}::jsonb,${JSON.stringify(safeMetadata(body.metadata))}::jsonb,${status},${Number.isFinite(Number(body.sort_order))?Math.trunc(Number(body.sort_order)):0},CASE WHEN ${status}='published' THEN now() ELSE NULL END) RETURNING *`
          await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'site_entry.create',${JSON.stringify({collection:key,slug})}::jsonb)`
          return response({entry:row},201,origin)
        }
        const entryMatch = url.pathname.match(/^\/admin\/entries\/([0-9a-f-]{36})$/i)
        if (entryMatch) {
          const id = entryMatch[1]
          if (request.method === 'PUT') {
            const body = await request.json()
            const key = safeText(body.collection_key,40), slug = safeText(body.slug,90)
            if (!allowedCollections.includes(key) || !validSlug(slug)) return response({error:'Choose a valid content section and URL slug.'},400,origin)
            const status = ['draft','published'].includes(body.status) ? body.status : 'draft'
            const media = safeMediaUrls(body.media_urls)
            const [row] = await sql`UPDATE public.site_entries SET collection_key=${key},slug=${slug},title=${JSON.stringify(jsonObject(body.title))}::jsonb,summary=${JSON.stringify(jsonObject(body.summary))}::jsonb,body=${JSON.stringify(jsonObject(body.body))}::jsonb,category=${safeText(body.category,100)},media_urls=${JSON.stringify(media)}::jsonb,metadata=${JSON.stringify(safeMetadata(body.metadata))}::jsonb,status=${status},sort_order=${Number.isFinite(Number(body.sort_order))?Math.trunc(Number(body.sort_order)):0},published_at=CASE WHEN ${status}='published' THEN COALESCE(published_at,now()) ELSE NULL END,updated_at=now() WHERE id=${id} RETURNING *`
            if (!row) return response({error:'Content entry not found'},404,origin)
            await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'site_entry.update',${JSON.stringify({id,collection:key,slug})}::jsonb)`
            return response({entry:row},200,origin)
          }
          if (request.method === 'PATCH') {
            const body = await request.json()
            if (!['draft','published'].includes(body.status)) return response({error:'Invalid status'},400,origin)
            const [row] = await sql`UPDATE public.site_entries SET status=${body.status},published_at=CASE WHEN ${body.status}='published' THEN COALESCE(published_at,now()) ELSE NULL END,updated_at=now() WHERE id=${id} RETURNING *`
            if (!row) return response({error:'Content entry not found'},404,origin)
            await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'site_entry.status',${JSON.stringify({id,status:body.status})}::jsonb)`
            return response({entry:row},200,origin)
          }
          if (request.method === 'DELETE') {
            const [row] = await sql`DELETE FROM public.site_entries WHERE id=${id} RETURNING id`
            if (!row) return response({error:'Content entry not found'},404,origin)
            await sql`INSERT INTO public.admin_audit_log (admin_email,action,details) VALUES (${email},'site_entry.delete',${JSON.stringify({id})}::jsonb)`
            return response({deleted:true},200,origin)
          }
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
          const videoUrls = Array.isArray(body.video_urls) ? body.video_urls.filter(value => typeof value === 'string' && (value.startsWith('https://') || value.startsWith('http://'))).slice(0,8) : []
          const imageUrls = Array.isArray(body.image_urls) ? body.image_urls.filter(value => typeof value === 'string' && (value.startsWith('https://') || value.startsWith('http://'))).slice(0,12) : []
          const [row] = await sql`INSERT INTO public.products (id, slug, name, category, summary, description, image_url, image_urls, video_urls, external_url, status, published_at) VALUES (${crypto.randomUUID()}, ${slug}, ${JSON.stringify(jsonObject(body.name))}::jsonb, ${safeText(body.category,100) || 'General'}, ${JSON.stringify(jsonObject(body.summary))}::jsonb, ${JSON.stringify(jsonObject(body.description))}::jsonb, ${safeText(body.image_url,2000) || null}, ${JSON.stringify(imageUrls)}::jsonb, ${JSON.stringify(videoUrls)}::jsonb, ${safeText(body.external_url,2000) || null}, ${status}, CASE WHEN ${status}='published' THEN now() ELSE NULL END) RETURNING *`
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
            const videoUrls = Array.isArray(body.video_urls) ? body.video_urls.filter(value => typeof value === 'string' && (value.startsWith('https://') || value.startsWith('http://'))).slice(0,8) : []
          const imageUrls = Array.isArray(body.image_urls) ? body.image_urls.filter(value => typeof value === 'string' && (value.startsWith('https://') || value.startsWith('http://'))).slice(0,12) : []
            const [row] = await sql`UPDATE public.products SET slug=${slug}, name=${JSON.stringify(jsonObject(body.name))}::jsonb, category=${safeText(body.category,100)||'General'}, summary=${JSON.stringify(jsonObject(body.summary))}::jsonb, description=${JSON.stringify(jsonObject(body.description))}::jsonb, image_url=${safeText(body.image_url,2000)||null}, image_urls=${JSON.stringify(imageUrls)}::jsonb, video_urls=${JSON.stringify(videoUrls)}::jsonb, external_url=${safeText(body.external_url,2000)||null}, status=${status}, published_at=CASE WHEN ${status}='published' THEN COALESCE(published_at,now()) ELSE NULL END, updated_at=now() WHERE id=${id} RETURNING *`
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
