export interface SupermarketBranding {
  name: string;
  nameMl: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  websiteTitle: string;
  tagline: string;
  taglineMl: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  openingHours: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappGroupUrl: string;
  whatsappChannelUrl: string;
}

export interface Category {
  id: string;
  name: string;
  nameMl: string;
  iconName: string;
  slug: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  nameMl: string;
  brand: string;
  categoryId: string;
  description: string;
  mrp: number;
  offerPrice: number;
  discountPercent: number;
  savings: number;
  sku: string;
  barcode: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  imageUrl: string;
  additionalImages?: string[];
  featured: boolean;
  startDate: string;
  endDate: string;
  views: number;
  shares: number;
  createdAt: string;
}

export type OfferStatus = 'draft' | 'scheduled' | 'active' | 'expired' | 'archived';

export interface Offer {
  id: string;
  title: string;
  titleMl: string;
  productId: string;
  mrp: number;
  offerPrice: number;
  discountPercent: number;
  savings: number;
  startDate: string;
  endDate: string;
  status: OfferStatus;
  bannerImage?: string;
  posterTemplateId?: string;
  featured: boolean;
  views: number;
  shares: number;
}

export interface PosterTemplate {
  id: string;
  name: string;
  nameMl: string;
  badgeText: string;
  badgeTextMl: string;
  bgGradient: string;
  headerBg: string;
  badgeColor: string;
  textColor: string;
  priceTagBg: string;
  styleCategory: 'mega' | 'super' | 'flash' | 'weekend' | 'festival' | 'pricedrop' | 'b1g1' | 'combo' | 'new';
}

export type AspectRatio = '1:1' | '9:16' | '1.91:1' | 'banner';
export type PosterLanguage = 'en' | 'ml' | 'bilingual';

export interface GeneratedPoster {
  id: string;
  productId: string;
  productName: string;
  templateId: string;
  templateName: string;
  language: PosterLanguage;
  aspectRatio: AspectRatio;
  imageDataUrl: string;
  createdAt: string;
  createdBy: string;
  views?: number;
  shares?: number;
}

export interface Campaign {
  id: string;
  name: string;
  nameMl: string;
  description: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  productIds: string[];
  status: 'draft' | 'active' | 'ended';
  whatsappMessage?: string;
}

export type UserRole = 'super_admin' | 'manager' | 'designer' | 'staff';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface MarketingAnalytics {
  totalProducts: number;
  activeOffers: number;
  expiredOffers: number;
  postersGenerated: number;
  totalViews: number;
  whatsappClicks: number;
  whatsappShares: number;
  popularCategory: string;
  topProduct: string;
  dailyStats: { date: string; views: number; shares: number; posterGens: number }[];
}
