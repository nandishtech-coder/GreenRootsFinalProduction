-- Add 'super_admin' to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
COMMIT;

-- Ensure pgcrypto is available for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- Insert the contactnandishtech@gmail.com user into auth.users if it does not exist
DO $$
DECLARE
    new_user_id uuid := gen_random_uuid();
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'contactnandishtech@gmail.com') THEN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            confirmation_token,
            recovery_token,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            new_user_id,
            'authenticated',
            'authenticated',
            'contactnandishtech@gmail.com',
            crypt('Gsnandish', gen_salt('bf')),
            now(),
            now(),
            now(),
            '',
            '',
            '{"provider": "email", "providers": ["email"]}',
            '{}',
            false
        );

        -- Insert super_admin role
        INSERT INTO public.user_roles (user_id, role)
        VALUES (new_user_id, 'super_admin');
    END IF;
END $$;

-- Update existing 'has_role' function to treat 'super_admin' exactly like 'admin' if requested, 
-- but actually let's just create a more powerful policy check.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean AS $$
BEGIN
    IF _role = 'admin' THEN
        -- super_admin also gets admin rights
        RETURN EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = _user_id AND role IN ('admin', 'super_admin')
        );
    ELSE
        RETURN EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = _user_id AND role = _role
        );
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Create Site Settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    maintenance_mode BOOLEAN NOT NULL DEFAULT false,
    maintenance_heading TEXT NOT NULL DEFAULT 'Website Under Maintenance',
    maintenance_message TEXT NOT NULL DEFAULT 'We are currently updating our website. Please check back later.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default row
INSERT INTO public.site_settings (id, maintenance_mode) 
VALUES (1, false)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Only super_admins can update site settings" ON public.site_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'super_admin'
        )
    );

-- Create Page Views table for Analytics
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views" ON public.page_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins and Super Admins can read page views" ON public.page_views
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Grant access to service roles
GRANT ALL ON public.site_settings TO service_role;
GRANT ALL ON public.page_views TO service_role;
GRANT ALL ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.page_views TO anon, authenticated;
