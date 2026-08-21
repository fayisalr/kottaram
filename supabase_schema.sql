-- =========================================================
-- KOTTARAM HOME NEEDS - SUPABASE POSTGRESQL DATABASE SCHEMA
-- Execute this script in Supabase Dashboard SQL Editor
-- =========================================================

-- 1. BRANDING TABLE
CREATE TABLE IF NOT EXISTS public.branding (
    id TEXT PRIMARY KEY DEFAULT 'branding-main',
    name TEXT NOT NULL DEFAULT 'Kottaram Home Needs',
    name_ml TEXT DEFAULT 'കൊട്ടാരം ഹോം നീഡ്സ്',
    tagline TEXT DEFAULT 'Quality Home Appliances, Best Prices & No Cost EMI',
    tagline_ml TEXT DEFAULT 'വിശ്വസ്തമായ അപ്ലയൻസുകൾ, കുറഞ്ഞ തവണ വ്യവസ്ഥയും സൗജന്യ ഡെലിവറിയും',
    phone TEXT DEFAULT '094462 35837',
    whatsapp_number TEXT DEFAULT '09446235837',
    email TEXT DEFAULT 'sales@kottaramhomeneeds.com',
    address TEXT DEFAULT 'Bank Junction, Alanallur, Kerala 678601',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Alanallur+Bank+Junction+Kerala',
    opening_hours TEXT DEFAULT 'Mon - Sun: 9:00 AM - 8:30 PM',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ml TEXT,
    icon_name TEXT DEFAULT 'Tv',
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ml TEXT,
    brand TEXT NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    mrp NUMERIC(10, 2) NOT NULL,
    offer_price NUMERIC(10, 2) NOT NULL,
    discount_percent INT DEFAULT 0,
    savings NUMERIC(10, 2) DEFAULT 0,
    sku TEXT UNIQUE,
    barcode TEXT,
    stock_status TEXT DEFAULT 'in_stock',
    image_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT true,
    views INT DEFAULT 0,
    shares INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    title_ml TEXT,
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    mrp NUMERIC(10, 2) NOT NULL,
    offer_price NUMERIC(10, 2) NOT NULL,
    discount_percent INT DEFAULT 0,
    savings NUMERIC(10, 2) DEFAULT 0,
    status TEXT DEFAULT 'active',
    featured BOOLEAN DEFAULT true,
    poster_template_id TEXT DEFAULT 'tmpl-1',
    views INT DEFAULT 0,
    shares INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. AI GENERATED POSTERS TABLE
CREATE TABLE IF NOT EXISTS public.generated_posters (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    product_name TEXT NOT NULL,
    template_id TEXT NOT NULL,
    template_name TEXT,
    language TEXT DEFAULT 'en',
    aspect_ratio TEXT DEFAULT '1:1',
    image_data_url TEXT NOT NULL,
    created_by TEXT DEFAULT 'Admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. STAFF MEMBERS TABLE (RBAC)
CREATE TABLE IF NOT EXISTS public.staff_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'staff',
    avatar TEXT,
    status TEXT DEFAULT 'active',
    last_active TEXT DEFAULT 'Just now',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- DISABLE RLS TO ALLOW FULL SEEDING & APP WRITES WITHOUT BLOCKS
ALTER TABLE public.branding DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_posters DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_members DISABLE ROW LEVEL SECURITY;

-- SEED DEFAULT SHOWROOM BRANDING DATA
INSERT INTO public.branding (id, name, name_ml, phone, whatsapp_number, address)
VALUES ('branding-main', 'Kottaram Home Needs', 'കൊട്ടാരം ഹോം നീഡ്സ്', '094462 35837', '09446235837', 'Bank Junction, Alanallur, Kerala 678601')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    name_ml = EXCLUDED.name_ml,
    phone = EXCLUDED.phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    address = EXCLUDED.address;
