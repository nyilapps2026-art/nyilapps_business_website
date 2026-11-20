-- Additive product gallery support; preserves all existing single-image products.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_urls jsonb NOT NULL DEFAULT '[]'::jsonb;
UPDATE public.products SET image_urls=jsonb_build_array(image_url) WHERE image_url IS NOT NULL AND image_urls='[]'::jsonb;
