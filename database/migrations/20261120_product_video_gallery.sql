-- Additive product video gallery support; keeps existing products and images intact.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS video_urls jsonb NOT NULL DEFAULT '[]'::jsonb;
