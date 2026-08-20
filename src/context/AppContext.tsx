'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupermarketBranding,
  Category,
  Product,
  Offer,
  PosterTemplate,
  GeneratedPoster,
  Campaign,
  StaffMember,
  AppNotification,
  MarketingAnalytics,
  PosterLanguage
} from '../types';
import {
  defaultBranding,
  defaultCategories,
  defaultProducts,
  defaultOffers,
  defaultTemplates,
  defaultCampaigns,
  defaultStaff,
  defaultNotifications,
  defaultAnalytics
} from '../data/mockData';

interface AppContextType {
  branding: SupermarketBranding;
  updateBranding: (newBranding: Partial<SupermarketBranding>) => void;
  
  categories: Category[];
  addCategory: (cat: Omit<Category, 'id'>) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'discountPercent' | 'savings' | 'views' | 'shares' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id' | 'discountPercent' | 'savings' | 'views' | 'shares'>) => Offer;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  
  templates: PosterTemplate[];
  
  generatedPosters: GeneratedPoster[];
  savePoster: (poster: Omit<GeneratedPoster, 'id' | 'createdAt'>) => GeneratedPoster;
  deletePoster: (id: string) => void;
  
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Campaign;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  
  staff: StaffMember[];
  addStaff: (staff: Omit<StaffMember, 'id' | 'lastActive'>) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  currentStaff: StaffMember;
  setCurrentStaff: (staff: StaffMember) => void;
  
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  analytics: MarketingAnalytics;
  incrementProductViews: (productId: string) => void;
  incrementWhatsAppShares: (productId: string) => void;
  
  language: 'en' | 'ml';
  setLanguage: (lang: 'en' | 'ml') => void;
  
  generateWhatsAppShareText: (product: Product, lang?: 'en' | 'ml') => string;
  generateAIPromotionalText: (productName: string, mrp: number, offerPrice: number, lang: PosterLanguage, occasion?: string) => string;
  
  // Quick Poster workflow state
  quickPosterProduct: Product | null;
  setQuickPosterProduct: (p: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<SupermarketBranding>(defaultBranding);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [offers, setOffers] = useState<Offer[]>(defaultOffers);
  const [templates] = useState<PosterTemplate[]>(defaultTemplates);
  const [generatedPosters, setGeneratedPosters] = useState<GeneratedPoster[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>(defaultCampaigns);
  const [staff, setStaff] = useState<StaffMember[]>(defaultStaff);
  const [currentStaff, setCurrentStaff] = useState<StaffMember>(defaultStaff[0]);
  const [notifications, setNotifications] = useState<AppNotification[]>(defaultNotifications);
  const [analytics, setAnalytics] = useState<MarketingAnalytics>(defaultAnalytics);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [quickPosterProduct, setQuickPosterProduct] = useState<Product | null>(null);

  // Sync / Reset to official store details
  useEffect(() => {
    try {
      const savedBranding = localStorage.getItem('sm_branding');
      if (savedBranding) {
        const parsed = JSON.parse(savedBranding);
        setBranding({ ...defaultBranding, ...parsed });
      } else {
        setBranding(defaultBranding);
      }

      const savedProds = localStorage.getItem('sm_products');
      if (savedProds) setProducts(JSON.parse(savedProds));

      const savedOffers = localStorage.getItem('sm_offers');
      if (savedOffers) setOffers(JSON.parse(savedOffers));

      const savedPosters = localStorage.getItem('sm_posters');
      if (savedPosters) setGeneratedPosters(JSON.parse(savedPosters));

      const savedStaff = localStorage.getItem('sm_staff');
      if (savedStaff) setStaff(JSON.parse(savedStaff));
    } catch (e) {
      console.error('Error loading stored state:', e);
    }
  }, []);

  const updateBranding = (newBranding: Partial<SupermarketBranding>) => {
    setBranding(prev => {
      const updated = { ...prev, ...newBranding };
      localStorage.setItem('sm_branding', JSON.stringify(updated));
      return updated;
    });
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'discountPercent' | 'savings' | 'views' | 'shares' | 'createdAt'>): Product => {
    const savings = Math.max(0, prodData.mrp - prodData.offerPrice);
    const discountPercent = prodData.mrp > 0 ? Math.round((savings / prodData.mrp) * 100) : 0;
    
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      savings,
      discountPercent,
      views: 0,
      shares: 0,
      createdAt: new Date().toISOString()
    };

    setProducts(prev => {
      const updated = [newProd, ...prev];
      localStorage.setItem('sm_products', JSON.stringify(updated));
      return updated;
    });

    const newOffer: Offer = {
      id: `off-${Date.now()}`,
      title: `${newProd.name} Special Offer`,
      titleMl: `${newProd.nameMl} ഓഫർ`,
      productId: newProd.id,
      mrp: newProd.mrp,
      offerPrice: newProd.offerPrice,
      discountPercent,
      savings,
      startDate: newProd.startDate,
      endDate: newProd.endDate,
      status: 'active',
      featured: newProd.featured,
      posterTemplateId: 'tmpl-1',
      views: 0,
      shares: 0
    };

    setOffers(prev => {
      const updatedOffers = [newOffer, ...prev];
      localStorage.setItem('sm_offers', JSON.stringify(updatedOffers));
      return updatedOffers;
    });

    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          const mrp = updates.mrp !== undefined ? updates.mrp : p.mrp;
          const offerPrice = updates.offerPrice !== undefined ? updates.offerPrice : p.offerPrice;
          const savings = Math.max(0, mrp - offerPrice);
          const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;
          return { ...p, ...updates, savings, discountPercent };
        }
        return p;
      });
      localStorage.setItem('sm_products', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('sm_products', JSON.stringify(updated));
      return updated;
    });
  };

  const duplicateProduct = (id: string) => {
    const existing = products.find(p => p.id === id);
    if (!existing) return;
    addProduct({
      ...existing,
      name: `${existing.name} (Copy)`,
      nameMl: `${existing.nameMl} (കോപ്പി)`,
      sku: `${existing.sku}-COPY`
    });
  };

  const addOffer = (offerData: Omit<Offer, 'id' | 'discountPercent' | 'savings' | 'views' | 'shares'>): Offer => {
    const savings = Math.max(0, offerData.mrp - offerData.offerPrice);
    const discountPercent = offerData.mrp > 0 ? Math.round((savings / offerData.mrp) * 100) : 0;

    const newOffer: Offer = {
      ...offerData,
      id: `off-${Date.now()}`,
      savings,
      discountPercent,
      views: 0,
      shares: 0
    };

    setOffers(prev => {
      const updated = [newOffer, ...prev];
      localStorage.setItem('sm_offers', JSON.stringify(updated));
      return updated;
    });

    return newOffer;
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev => {
      const updated = prev.map(o => {
        if (o.id === id) {
          const mrp = updates.mrp !== undefined ? updates.mrp : o.mrp;
          const offerPrice = updates.offerPrice !== undefined ? updates.offerPrice : o.offerPrice;
          const savings = Math.max(0, mrp - offerPrice);
          const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;
          return { ...o, ...updates, savings, discountPercent };
        }
        return o;
      });
      localStorage.setItem('sm_offers', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const savePoster = (posterData: Omit<GeneratedPoster, 'id' | 'createdAt'>): GeneratedPoster => {
    const newPoster: GeneratedPoster = {
      ...posterData,
      id: `poster-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setGeneratedPosters(prev => {
      const updated = [newPoster, ...prev];
      localStorage.setItem('sm_posters', JSON.stringify(updated));
      return updated;
    });

    setAnalytics(prev => ({
      ...prev,
      postersGenerated: prev.postersGenerated + 1
    }));

    return newPoster;
  };

  const deletePoster = (id: string) => {
    setGeneratedPosters(prev => prev.filter(p => p.id !== id));
  };

  const addCampaign = (campaignData: Omit<Campaign, 'id'>): Campaign => {
    const newCamp: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}`
    };
    setCampaigns(prev => [newCamp, ...prev]);
    return newCamp;
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const addStaff = (staffData: Omit<StaffMember, 'id' | 'lastActive'>) => {
    const newStaffMember: StaffMember = {
      ...staffData,
      id: `stf-${Date.now()}`,
      lastActive: 'Just added'
    };
    setStaff(prev => {
      const updated = [...prev, newStaffMember];
      localStorage.setItem('sm_staff', JSON.stringify(updated));
      return updated;
    });
  };

  const updateStaff = (id: string, updates: Partial<StaffMember>) => {
    setStaff(prev => {
      const updated = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      localStorage.setItem('sm_staff', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => {
      const updated = prev.filter(s => s.id !== id);
      localStorage.setItem('sm_staff', JSON.stringify(updated));
      return updated;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const incrementProductViews = (productId: string) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, views: p.views + 1 } : p)));
    setAnalytics(prev => ({ ...prev, totalViews: prev.totalViews + 1 }));
  };

  const incrementWhatsAppShares = (productId: string) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, shares: p.shares + 1 } : p)));
    setAnalytics(prev => ({
      ...prev,
      whatsappShares: prev.whatsappShares + 1
    }));
  };

  const generateWhatsAppShareText = (product: Product, lang: 'en' | 'ml' = 'en'): string => {
    const isMl = lang === 'ml';
    if (isMl) {
      return `⚡ *${branding.nameMl} ഓഫർ ധമാക്ക!* ⚡

📺 *${product.nameMl || product.name}*
🏷️ ബ്രാൻഡ്: ${product.brand}
💰 എം.ആർ.പി: ₹${product.mrp.toLocaleString('en-IN')}
🔥 *ഓഫർ വില: ₹${product.offerPrice.toLocaleString('en-IN')} മാത്രം!*
🎉 ലാഭിക്കാം: ₹${product.savings.toLocaleString('en-IN')} (${product.discountPercent}% OFF)

📍 *ലൊക്കേഷൻ:* Bank Junction, Alanallur
📞 *ബന്ധപ്പെടുക:* ${branding.phone}
💬 *WhatsApp:* https://api.whatsapp.com/send?phone=${branding.whatsappNumber.replace(/[^0-9]/g, '')}

ഓഫർ സ്റ്റോക്ക് അവസാനിക്കുന്നത് വരെ മാത്രം! ഇന്നുതന്നെ സന്ദർശിക്കൂ!`;
    }

    return `⚡ *MEGA APPLIANCE OFFER - ${branding.name.toUpperCase()}* ⚡

📺 *${product.name}*
🏷️ Brand: ${product.brand}
💰 MRP: ₹${product.mrp.toLocaleString('en-IN')}
🔥 *OFFER PRICE: ₹${product.offerPrice.toLocaleString('en-IN')} ONLY!*
🎉 YOU SAVE: ₹${product.savings.toLocaleString('en-IN')} (${product.discountPercent}% OFF)

📍 *Location:* Bank Junction, Alanallur
📞 *Call/WhatsApp:* ${branding.phone}
💬 *Enquire:* https://api.whatsapp.com/send?phone=${branding.whatsappNumber.replace(/[^0-9]/g, '')}

Limited Stock Available! Visit Showroom Today!`;
  };

  const generateAIPromotionalText = (
    productNameInput: string,
    mrpVal: number,
    offerPriceVal: number,
    lang: PosterLanguage,
    occasion: string = 'Special Appliance Offer'
  ): string => {
    const savingsVal = Math.max(0, mrpVal - offerPriceVal);
    const discPct = mrpVal > 0 ? Math.round((savingsVal / mrpVal) * 100) : 0;
    const isMl = lang === 'ml';

    if (isMl) {
      return `🎉 ${branding.nameMl} - ${occasion}!
👉 ${productNameInput}
🔥 വൻ വിലക്കുറവിൽ ₹${offerPriceVal.toLocaleString('en-IN')} രൂപയ്ക്ക് വാങ്ങൂ! (MRP ₹${mrpVal.toLocaleString('en-IN')})
✨ ലാഭിക്കൂ ₹${savingsVal.toLocaleString('en-IN')} (${discPct}% OFF)
📍 Bank Junction, Alanallur | 📞 ${branding.phone}`;
    }

    return `🎉 ${branding.name} - ${occasion}!
👉 ${productNameInput}
🔥 Get it at Unbeatable Price of ₹${offerPriceVal.toLocaleString('en-IN')}! (MRP ₹${mrpVal.toLocaleString('en-IN')})
✨ Save ₹${savingsVal.toLocaleString('en-IN')} (${discPct}% OFF)
📍 Bank Junction, Alanallur | 📞 ${branding.phone}`;
  };

  return (
    <AppContext.Provider
      value={{
        branding,
        updateBranding,
        categories,
        addCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        templates,
        generatedPosters,
        savePoster,
        deletePoster,
        campaigns,
        addCampaign,
        updateCampaign,
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
        currentStaff,
        setCurrentStaff,
        notifications,
        markNotificationRead,
        clearNotifications,
        analytics,
        incrementProductViews,
        incrementWhatsAppShares,
        language,
        setLanguage,
        generateWhatsAppShareText,
        generateAIPromotionalText,
        quickPosterProduct,
        setQuickPosterProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
