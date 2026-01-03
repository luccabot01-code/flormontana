-- Fix attendance_status casing to match database schema
-- Convert capitalized values to lowercase with underscore

UPDATE rsvps 
SET attendance_status = 'attending' 
WHERE attendance_status = 'Attending';

UPDATE rsvps 
SET attendance_status = 'not_attending' 
WHERE attendance_status = 'Not Attending' OR attendance_status = 'not attending';

-- Update events table to use correct lowercase values
UPDATE events 
SET custom_attendance_options = ARRAY['attending', 'not_attending']
WHERE custom_attendance_options && ARRAY['Attending', 'Not Attending'];
