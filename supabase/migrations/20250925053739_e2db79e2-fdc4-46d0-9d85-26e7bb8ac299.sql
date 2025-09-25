-- Mark the admin user's email as confirmed
-- This will resolve the "Email not confirmed" error

UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'tusharchandane02@gmail.com' 
  AND email_confirmed_at IS NULL;