-- Set tusharchandane02@gmail.com as admin
-- First, check if user already exists and grant admin role
DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Try to find the user by email in auth.users
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = 'tusharchandane02@gmail.com';
    
    -- If user exists, grant admin role
    IF target_user_id IS NOT NULL THEN
        -- Remove existing admin role if it exists to avoid conflicts
        DELETE FROM public.user_roles 
        WHERE user_id = target_user_id AND role = 'admin';
        
        -- Insert admin role
        INSERT INTO public.user_roles (user_id, role) 
        VALUES (target_user_id, 'admin');
        
        RAISE NOTICE 'Admin role granted to existing user: tusharchandane02@gmail.com';
    ELSE
        RAISE NOTICE 'User tusharchandane02@gmail.com not found, admin role will be granted upon signup';
    END IF;
END $$;

-- Update the handle_new_user function to automatically grant admin role to this specific email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (user_id, email, name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'name');
    
    -- Determine role based on email
    IF NEW.email = 'tusharchandane02@gmail.com' THEN
        -- Grant admin role to the specific email
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'admin');
    ELSE
        -- Grant regular user role to others
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'user');
    END IF;
    
    RETURN NEW;
END;
$$;