-- Create RSVPs table to store all guest responses
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Foreign key to events
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  
  -- Guest information
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  
  -- RSVP response
  attendance_status TEXT NOT NULL,
  number_of_guests INTEGER DEFAULT 1 CHECK (number_of_guests > 0),
  has_plusone BOOLEAN DEFAULT false,
  plusone_name TEXT,
  
  -- Meal choices (stored as JSONB array)
  meal_choices JSONB DEFAULT '[]'::jsonb,
  
  -- Message from guest
  message TEXT,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read RSVPs
CREATE POLICY "Anyone can read rsvps"
  ON public.rsvps
  FOR SELECT
  USING (true);

-- Allow anyone to insert RSVPs
CREATE POLICY "Anyone can create rsvps"
  ON public.rsvps
  FOR INSERT
  WITH CHECK (true);

-- Allow updates (in case guest wants to change RSVP)
CREATE POLICY "Anyone can update rsvps"
  ON public.rsvps
  FOR UPDATE
  USING (true);

-- Allow deletions
CREATE POLICY "Anyone can delete rsvps"
  ON public.rsvps
  FOR DELETE
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvps_event_id ON public.rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_guest_email ON public.rsvps(guest_email);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON public.rsvps(created_at DESC);
