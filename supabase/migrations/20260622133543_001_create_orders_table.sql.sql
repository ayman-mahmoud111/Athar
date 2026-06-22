-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
CREATE POLICY "Allow insert for all" ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select for all" ON orders FOR SELECT
  USING (true);

CREATE POLICY "Allow update for all" ON orders FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete for all" ON orders FOR DELETE
  USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Allow public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Allow public upload" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public update" ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images');

CREATE POLICY "Allow public delete" ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images');