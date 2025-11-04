-- Create a function to insert assessment results and return access token
-- This bypasses RLS for the return value while maintaining security
CREATE OR REPLACE FUNCTION public.submit_assessment_result(
  p_assessment_id UUID,
  p_answers JSONB
)
RETURNS TABLE (access_token UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_access_token UUID;
BEGIN
  -- Insert the assessment result
  INSERT INTO public.user_assessment_results (
    assessment_id,
    answers,
    user_id
  )
  VALUES (
    p_assessment_id,
    p_answers,
    NULL
  )
  RETURNING user_assessment_results.access_token INTO v_access_token;
  
  -- Return the access token
  RETURN QUERY SELECT v_access_token;
END;
$$;