-- Fix RLS policies to allow public INSERT and SELECT on RSVPs table

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert RSVPs" ON rsvps;
DROP POLICY IF EXISTS "Allow public to read RSVPs" ON rsvps;
DROP POLICY IF EXISTS "Allow event hosts to read their RSVPs" ON rsvps;
DROP POLICY IF EXISTS "Allow event hosts to update their RSVPs" ON rsvps;
DROP POLICY IF EXISTS "Allow event hosts to delete their RSVPs" ON rsvps;

-- Enable RLS on rsvps table
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT RSVPs (public RSVP form submission)
CREATE POLICY "Allow public to insert RSVPs"
ON rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to READ RSVPs (for now - can be restricted later)
CREATE POLICY "Allow public to read RSVPs"
ON rsvps
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow UPDATE and DELETE for RSVPs (optional - for dashboard)
CREATE POLICY "Allow all to update RSVPs"
ON rsvps
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all to delete RSVPs"
ON rsvps
FOR DELETE
TO anon, authenticated
USING (true);
