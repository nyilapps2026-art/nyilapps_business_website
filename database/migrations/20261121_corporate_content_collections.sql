CREATE TABLE IF NOT EXISTS public.site_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_key text NOT NULL CHECK (collection_key IN ('services','projects','news','team','partners','achievements','testimonials','documents','faqs','careers')),
  slug text NOT NULL,
  title jsonb NOT NULL DEFAULT '{}'::jsonb,
  summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  body jsonb NOT NULL DEFAULT '{}'::jsonb,
  category text NOT NULL DEFAULT '',
  media_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  sort_order integer NOT NULL DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (collection_key, slug)
);
CREATE INDEX IF NOT EXISTS site_entries_public_idx
  ON public.site_entries (collection_key, status, sort_order, published_at DESC);
