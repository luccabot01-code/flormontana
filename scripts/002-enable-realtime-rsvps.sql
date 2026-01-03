-- Enable Realtime for rsvps table
ALTER PUBLICATION supabase_realtime ADD TABLE rsvps;

-- Ensure RLS is enabled
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow public to insert RSVPs
DROP POLICY IF EXISTS "Allow public to insert RSVPs" ON rsvps;
CREATE POLICY "Allow public to insert RSVPs"
ON rsvps FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to select RSVPs
DROP POLICY IF EXISTS "Allow authenticated to select RSVPs" ON rsvps;
CREATE POLICY "Allow authenticated to select RSVPs"
ON rsvps FOR SELECT
TO authenticated
USING (true);

-- Allow anon users to select RSVPs (for dashboard without auth)
DROP POLICY IF EXISTS "Allow anon to select RSVPs" ON rsvps;
CREATE POLICY "Allow anon to select RSVPs"
ON rsvps FOR SELECT
TO anon
USING (true);
