CREATE TABLE public.shared_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_analyses ENABLE ROW LEVEL SECURITY;

-- Anyone (even anonymous) can read a shared analysis by its UUID
CREATE POLICY "Anyone can view shared analyses"
ON public.shared_analyses
FOR SELECT
USING (true);

-- Anyone can create a shared link (no auth required to share)
CREATE POLICY "Anyone can create shared analyses"
ON public.shared_analyses
FOR INSERT
WITH CHECK (true);