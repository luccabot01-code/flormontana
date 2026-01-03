-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER rsvps_updated_at
  BEFORE UPDATE ON public.rsvps
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_unique_slug(base_text TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug from text
  slug := lower(regexp_replace(base_text, '[^a-zA-Z0-9]+', '-', 'g'));
  slug := trim(both '-' from slug);
  
  -- Add random string
  slug := slug || '-' || substring(md5(random()::text) from 1 for 8);
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM public.events WHERE events.slug = slug) LOOP
    counter := counter + 1;
    slug := slug || '-' || counter;
  END LOOP;
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql;
