
-- Drop the overly-permissive INSERT policy and replace with a validated one
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can submit a validated contact message"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 100
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(subject)) BETWEEN 1 AND 200
    AND length(btrim(message)) BETWEEN 1 AND 5000
  );

-- Explicitly deny SELECT/UPDATE/DELETE for anon and authenticated roles.
-- service_role bypasses RLS, so admin/backend access still works.
CREATE POLICY "No client reads of contact messages"
  ON public.contact_messages
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "No client updates of contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "No client deletes of contact messages"
  ON public.contact_messages
  FOR DELETE
  TO anon, authenticated
  USING (false);
