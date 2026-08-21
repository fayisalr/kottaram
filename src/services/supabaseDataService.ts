import { createClient } from '@/utils/supabase/client';
import { Product, Category, Offer, GeneratedPoster, StaffMember, SupermarketBranding } from '@/types';

const supabase = createClient();

export const supabaseDataService = {
  // 1. Fetch Showroom Branding
  async fetchBranding(): Promise<SupermarketBranding | null> {
    try {
      const { data, error } = await supabase
        .from('branding')
        .select('*')
        .eq('id', 'branding-main')
        .single();
      if (error || !data) return null;
      return {
        name: data.name,
        nameMl: data.name_ml,
        logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&auto=format&fit=crop&q=80',
        favicon: '🔌',
        primaryColor: '#0284c7',
        secondaryColor: '#eab308',
        accentColor: '#dc2626',
        websiteTitle: `${data.name} | Home Appliances & Smart TV Deals`,
        tagline: data.tagline || 'Quality Home Appliances, Best Prices & No Cost EMI',
        taglineMl: data.tagline_ml || 'വിശ്വസ്തമായ അപ്ലയൻസുകൾ, കുറഞ്ഞ തവണ വ്യവസ്ഥയും സൗജന്യ ഡെലിവറിയും',
        phone: data.phone || '094462 35837',
        whatsappNumber: data.whatsapp_number || '09446235837',
        email: data.email || 'sales@kottaramhomeneeds.com',
        address: data.address || 'Bank Junction, Alanallur, Kerala 678601',
        googleMapsUrl: data.google_maps_url || 'https://maps.google.com/?q=Alanallur+Bank+Junction+Kerala',
        openingHours: data.opening_hours || 'Mon - Sun: 9:00 AM - 8:30 PM',
        instagramUrl: 'https://instagram.com/kottaramhomeneeds',
        facebookUrl: 'https://facebook.com/kottaramhomeneeds',
        youtubeUrl: 'https://youtube.com/kottaramhomeneeds',
        whatsappGroupUrl: 'https://chat.whatsapp.com/KottaramHomeNeedsGroup',
        whatsappChannelUrl: 'https://whatsapp.com/channel/KottaramHomeNeedsChannel'
      };
    } catch (err) {
      console.warn('Supabase fetchBranding fallback to local:', err);
      return null;
    }
  },

  // 2. Fetch Products
  async fetchProducts(): Promise<Product[] | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) return null;

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        nameMl: item.name_ml || item.name,
        brand: item.brand,
        categoryId: item.category_id || 'cat-1',
        description: item.description || '',
        mrp: Number(item.mrp),
        offerPrice: Number(item.offer_price),
        discountPercent: Number(item.discount_percent || 0),
        savings: Number(item.savings || 0),
        sku: item.sku || '',
        barcode: item.barcode || '',
        stockStatus: item.stock_status || 'in_stock',
        imageUrl: item.image_url,
        featured: Boolean(item.featured),
        startDate: item.start_date || '',
        endDate: item.end_date || '',
        views: Number(item.views || 0),
        shares: Number(item.shares || 0),
        createdAt: item.created_at
      }));
    } catch (err) {
      console.warn('Supabase fetchProducts fallback to local:', err);
      return null;
    }
  },

  // 3. Sync Product Insertion / Update to Supabase
  async syncProduct(prod: Product): Promise<boolean> {
    try {
      const { error } = await supabase.from('products').upsert({
        id: prod.id,
        name: prod.name,
        name_ml: prod.nameMl,
        brand: prod.brand,
        category_id: prod.categoryId,
        description: prod.description,
        mrp: prod.mrp,
        offer_price: prod.offerPrice,
        discount_percent: prod.discountPercent,
        savings: prod.savings,
        sku: prod.sku,
        stock_status: prod.stockStatus,
        image_url: prod.imageUrl,
        featured: prod.featured,
        start_date: prod.startDate || null,
        end_date: prod.endDate || null
      });

      return !error;
    } catch (err) {
      console.error('Supabase syncProduct error:', err);
      return false;
    }
  },

  // 4. Delete Product from Supabase
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      return !error;
    } catch (err) {
      console.error('Supabase deleteProduct error:', err);
      return false;
    }
  },

  // 5. Sync AI Poster to Supabase
  async syncPoster(poster: GeneratedPoster): Promise<boolean> {
    try {
      const { error } = await supabase.from('generated_posters').insert({
        id: poster.id,
        product_id: poster.productId,
        product_name: poster.productName,
        template_id: poster.templateId,
        template_name: poster.templateName,
        language: poster.language,
        aspect_ratio: poster.aspectRatio,
        image_data_url: poster.imageDataUrl,
        created_by: poster.createdBy
      });
      return !error;
    } catch (err) {
      console.error('Supabase syncPoster error:', err);
      return false;
    }
  }
};
