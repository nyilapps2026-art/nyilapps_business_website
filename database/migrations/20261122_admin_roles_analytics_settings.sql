-- NYIL Business Website: admin roles, privacy-conscious analytics and site settings.
CREATE TABLE IF NOT EXISTS public.admin_members (
  email text PRIMARY KEY,
  auth_subject text UNIQUE,
  role text NOT NULL DEFAULT 'editor' CHECK (role IN ('owner','admin','editor','support','analyst')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','disabled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.admin_members (email, auth_subject, role, status)
VALUES ('nyilapps2026@gmail.com', '128df7a2-7990-4ed2-91a0-2adb61621b65', 'owner', 'active')
ON CONFLICT (email) DO UPDATE SET auth_subject=EXCLUDED.auth_subject, role='owner', status='active', updated_at=now();

CREATE TABLE IF NOT EXISTS public.site_analytics_events (
  id bigserial PRIMARY KEY,
  event_type text NOT NULL DEFAULT 'page_view' CHECK (event_type = 'page_view'),
  page_path text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  device_type text NOT NULL DEFAULT 'desktop' CHECK (device_type IN ('desktop','mobile','tablet','unknown')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS site_analytics_events_created_idx ON public.site_analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS site_analytics_events_path_idx ON public.site_analytics_events (page_path, created_at DESC);

CREATE TABLE IF NOT EXISTS public.site_settings (
  setting_key text PRIMARY KEY,
  setting_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);
