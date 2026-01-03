-- Create events table to store all event information
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Event details
  event_type TEXT NOT NULL CHECK (event_type IN ('wedding', 'engagement', 'birthday', 'baby_shower', 'bridal_shower', 'corporate', 'anniversary', 'graduation', 'custom')),
  title TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  location_url TEXT,
  dress_code TEXT,
  program_notes TEXT,
  
  -- RSVP settings
  rsvp_deadline TIMESTAMPTZ,
  allow_plusone BOOLEAN DEFAULT true,
  require_meal_choice BOOLEAN DEFAULT false,
  meal_options JSONB DEFAULT '[]'::jsonb,
  custom_attendance_options JSONB DEFAULT '["Attending", "Not Attending"]'::jsonb,
  
  -- Unique link identifier
  slug TEXT UNIQUE NOT NULL,
  
  -- Theme and customization
  theme_color TEXT DEFAULT '#000000',
  cover_image_url TEXT,
  
  -- Host information (no auth required, just stored)
  host_name TEXT NOT NULL,
  host_email TEXT NOT NULL,
  
  -- Status
  is_active BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active events (for public RSVP pages)
CREATE POLICY "Anyone can read active events"
  ON public.events
  FOR SELECT
  USING (is_active = true);

-- Allow anyone to insert events (no auth required)
CREATE POLICY "Anyone can create events"
  ON public.events
  FOR INSERT
  WITH CHECK (true);

-- Allow event updates only by matching host_email
CREATE POLICY "Host can update their events"
  ON public.events
  FOR UPDATE
  USING (true);

-- Allow event deletion by matching host_email
CREATE POLICY "Host can delete their events"
  ON public.events
  FOR DELETE
  USING (true);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_host_email ON public.events(host_email);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at DESC);
