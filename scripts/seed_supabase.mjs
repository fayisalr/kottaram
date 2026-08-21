import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

function loadEnv() {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.join('=').trim();
    }
  });
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://ixxfzgrpaxpgbmqbzgtj.supabase.co';
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_-wUA7Hgc-N0sRT3cLaJMHQ_b8HP59bg';

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultBranding = {
  id: 'branding-main',
  name: "Kottaram Home Needs",
  name_ml: "കൊട്ടാരം ഹോം നീഡ്സ്",
  tagline: "Quality Home Appliances, Best Prices & No Cost EMI",
  tagline_ml: "വിശ്വസ്തമായ അപ്ലയൻസുകൾ, കുറഞ്ഞ തവണ വ്യവസ്ഥയും സൗജന്യ ഡെലിവറിയും",
  phone: "094462 35837",
  whatsapp_number: "09446235837",
  email: "sales@kottaramhomeneeds.com",
  address: "Bank Junction, Alanallur, Kerala 678601",
  google_maps_url: "https://maps.google.com/?q=Alanallur+Bank+Junction+Kerala",
  opening_hours: "Mon - Sun: 9:00 AM - 8:30 PM",
};

const defaultCategories = [
  { id: "cat-1", name: "Smart TVs & Audio", name_ml: "സ്മാർട്ട് ടിവി & സൗണ്ട് സിസ്റ്റം", icon_name: "Tv", slug: "smart-tvs" },
  { id: "cat-2", name: "Refrigerators & Freezers", name_ml: "ഫ്രിഡ്ജ് & ഡിജിറ്റൽ ഫ്രീസറുകൾ", icon_name: "Refrigerator", slug: "refrigerators" },
  { id: "cat-3", name: "Washing Machines & Dryers", name_ml: "വാഷിംഗ് മെഷീനുകൾ", icon_name: "WashingMachine", slug: "washing-machines" },
  { id: "cat-4", name: "Air Conditioners & Coolers", name_ml: "എസി & എയർ കൂളറുകൾ", icon_name: "Wind", slug: "air-conditioners" },
  { id: "cat-5", name: "Kitchen Appliances", name_ml: "കിച്ചൻ അപ്ലയൻസസ് (മിക്സി, ഗ്രൈൻഡർ)", icon_name: "ChefHat", slug: "kitchen-appliances" },
  { id: "cat-6", name: "Microwave & Ovens", name_ml: "മൈക്രോവേവ് ഒവനും എയർ ഫ്രയറും", icon_name: "Microwave", slug: "ovens" },
  { id: "cat-7", name: "Cooking & Gas Stoves", name_ml: "ഗ്യാസ് സ്റ്റൗ & ഹൊബ്ബുകൾ", icon_name: "Flame", slug: "gas-stoves" },
  { id: "cat-8", name: "Water Purifiers", name_ml: "വാട്ടർ പ്യൂരിഫയറുകൾ", icon_name: "Droplet", slug: "water-purifiers" },
  { id: "cat-9", name: "Water Heaters & Geysers", name_ml: "വാട്ടർ ഹീറ്ററുകൾ", icon_name: "Zap", slug: "water-heaters" },
  { id: "cat-10", name: "Vacuum Cleaners & Irons", name_ml: "വാക്വം ക്ലീനർ & അയൺ ബോക്സ്", icon_name: "Sparkles", slug: "vacuum-cleaners" }
];

const defaultProducts = [
  {
    id: "prod-1",
    name: "Samsung 43-inch Crystal 4K UHD Smart TV",
    name_ml: "സാംസങ് 43 ഇഞ്ച് 4K സ്മാർട്ട് ടിവി",
    brand: "Samsung",
    category_id: "cat-1",
    description: "4K Ultra HD Display with Crystal Processor 4K, HDR10+, Dolby Digital Plus Audio, AirPlay 2, and built-in Alexa & Google Assistant.",
    mrp: 44900,
    offer_price: 32990,
    discount_percent: 27,
    savings: 11910,
    sku: "SAMS-TV-43-4K",
    barcode: "8806090123456",
    stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "prod-2",
    name: "LG 260L 3-Star Smart Inverter Frost Free Refrigerator",
    name_ml: "എൽജി 260 ലിറ്റർ ഫ്രോസ്റ്റ് ഫ്രീ ഫ്രിഡ്ജ്",
    brand: "LG",
    category_id: "cat-2",
    description: "Door Cooling+ technology with Smart Inverter Compressor, Multi Air Flow cooling, Auto Smart Connect, and 10 Year Compressor Warranty.",
    mrp: 35990,
    offer_price: 27990,
    discount_percent: 22,
    savings: 8000,
    sku: "LG-REF-260L-3S",
    barcode: "8806087123991",
    stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "prod-3",
    name: "Whirlpool 7.5kg 5-Star Fully Automatic Front Load Washer",
    name_ml: "വേൾപൂൾ 7.5 കിലോ ഫുള്ളി ഓട്ടോമാറ്റിക് വാഷിംഗ് മെഷീൻ",
    brand: "Whirlpool",
    category_id: "cat-3",
    description: "Inbuilt Heater with 6th Sense SoftMove technology, 1200 RPM high spin motor, and Steam Wash sanitization.",
    mrp: 38500,
    offer_price: 29990,
    discount_percent: 22,
    savings: 8510,
    sku: "WHIRL-WM-75KG",
    barcode: "8904001239011",
    stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "prod-4",
    name: "Daikin 1.5 Ton 5 Star Inverter Split AC (Copper Condenser)",
    name_ml: "ഡൈക്കിൻ 1.5 ടൺ 5 സ്റ്റാർ ഇൻവെർട്ടർ എസി",
    brand: "Daikin",
    category_id: "cat-4",
    description: "PM 2.5 Filter with Dew Clean Technology, 100% Copper coils, Triple Display, and 10 Year Compressor Warranty.",
    mrp: 58400,
    offer_price: 44990,
    discount_percent: 23,
    savings: 13410,
    sku: "DAIK-AC-15T-5S",
    barcode: "8901030612019",
    stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "prod-5",
    name: "Preethi Zodiac MG-218 750W Mixer Grinder with Master Chef Jar",
    name_ml: "പ്രീതി സോഡിയാക് 750W മിക്സി ഗ്രൈൻഡർ",
    brand: "Preethi",
    category_id: "cat-5",
    description: "Heavy Duty 750W Turbo Motor with 5 Jars including Master Chef Plus jar for knead, chop, slice & juice.",
    mrp: 11995,
    offer_price: 8490,
    discount_percent: 29,
    savings: 3505,
    sku: "PREE-ZOD-750W",
    barcode: "8901058000010",
    stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80",
    featured: true
  }
];

const defaultStaff = [
  { id: 'stf-1', name: 'Fayis (Store Manager)', email: 'fayis@kottaramhomeneeds.com', role: 'super_admin', status: 'active', last_active: 'Just now' },
  { id: 'stf-2', name: 'Rahul S (Appliance Specialist)', email: 'rahul@kottaramhomeneeds.com', role: 'manager', status: 'active', last_active: '15 mins ago' },
  { id: 'stf-3', name: 'Anjali M (Poster Designer)', email: 'anjali@kottaramhomeneeds.com', role: 'designer', status: 'active', last_active: '1 hour ago' }
];

async function seed() {
  console.log('🚀 Seeding full database data into Supabase...');

  // 1. Branding
  const { error: bErr } = await supabase.from('branding').upsert(defaultBranding);
  if (bErr) console.warn('⚠️ Branding seed warning:', bErr.message);
  else console.log('✅ Showroom Branding seeded.');

  // 2. Categories
  const { error: cErr } = await supabase.from('categories').upsert(defaultCategories);
  if (cErr) console.warn('⚠️ Categories seed warning:', cErr.message);
  else console.log(`✅ ${defaultCategories.length} Categories seeded.`);

  // 3. Products
  const { error: pErr } = await supabase.from('products').upsert(defaultProducts);
  if (pErr) console.warn('⚠️ Products seed warning:', pErr.message);
  else console.log(`✅ ${defaultProducts.length} Products seeded.`);

  // 4. Staff Members
  const { error: sErr } = await supabase.from('staff_members').upsert(defaultStaff);
  if (sErr) console.warn('⚠️ Staff seed warning:', sErr.message);
  else console.log(`✅ ${defaultStaff.length} Staff Members seeded.`);

  console.log('🎉 Full database seeding complete!');
}

seed();
