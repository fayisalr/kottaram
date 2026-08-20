'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OfferCard } from '@/components/ui/OfferCard';
import { useApp } from '@/context/AppContext';
import {
  Tag,
  Share2,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    offers,
    products,
    branding,
    language,
    incrementProductViews,
    incrementWhatsAppShares,
    generateWhatsAppShareText
  } = useApp();

  // Find offer or matching product
  const targetOffer = offers.find(o => o.id === id || o.productId === id);
  const targetProduct = targetOffer
    ? products.find(p => p.id === targetOffer.productId)
    : products.find(p => p.id === id);

  useEffect(() => {
    if (targetProduct) {
      incrementProductViews(targetProduct.id);
    }
  }, [targetProduct?.id]);

  if (!targetProduct) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
          <div className="text-4xl">📦</div>
          <h2 className="text-xl font-bold">Offer / Product Not Found</h2>
          <p className="text-xs text-slate-400">The requested offer may have expired or been removed.</p>
          <Link href="/offers" className="inline-block px-4 py-2 bg-emerald-600 font-bold text-xs rounded-xl">
            Browse All Offers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isMalayalam = language === 'ml';
  const mrp = targetOffer ? targetOffer.mrp : targetProduct.mrp;
  const offerPrice = targetOffer ? targetOffer.offerPrice : targetProduct.offerPrice;
  const savings = targetOffer ? targetOffer.savings : targetProduct.savings;
  const discountPercent = targetOffer ? targetOffer.discountPercent : targetProduct.discountPercent;

  const handleWhatsAppShare = () => {
    incrementWhatsAppShares(targetProduct.id);
    const message = generateWhatsAppShareText(targetProduct, language);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const relatedProducts = products.filter(p => p.id !== targetProduct.id).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-12 w-full">
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Offers</span>
        </button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Image Container */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={targetProduct.imageUrl}
                alt={targetProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Discount Sticker */}
            <div className="absolute top-8 right-8 bg-red-600 text-white font-black px-4 py-2 rounded-full shadow-xl border border-red-400 text-sm animate-bounce">
              {discountPercent}% OFF
            </div>
          </div>

          {/* Right: Info & Pricing */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {targetProduct.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {targetProduct.name}
              </h1>
              {targetProduct.nameMl && (
                <h2 className="text-lg font-bold text-amber-300">
                  {targetProduct.nameMl}
                </h2>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400 line-through">MRP: ₹{mrp}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">
                    {isMalayalam ? `ലാഭിക്കാം: ₹${savings}` : `YOU SAVE: ₹${savings} (${discountPercent}% OFF)`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-amber-400 font-extrabold uppercase">SPECIAL OFFER PRICE</div>
                  <div className="text-4xl font-black text-amber-400">₹{offerPrice}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2 border-t border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Limited period offer valid till end of month. Stock available at supermarket.</span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-900 p-4 rounded-2xl border border-slate-800 text-slate-300">
              <div>
                <span className="text-slate-500 block">Stock Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">SKU / Barcode:</span>
                <span className="font-mono text-slate-200 font-bold">{targetProduct.sku}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Product Description</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {targetProduct.description}
              </p>
            </div>

            {/* Main Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppShare}
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded-2xl text-sm shadow-xl shadow-green-900/40 transition-all transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Share This Offer on WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${branding.phone}`}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Supermarket</span>
                </a>
                <a
                  href={branding.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Store Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Offers */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h3 className="text-xl font-black text-white">More Supermarket Offers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => {
              const relOffer = offers.find(o => o.productId === p.id) || {
                id: `off-${p.id}`,
                title: p.name,
                titleMl: p.nameMl,
                productId: p.id,
                mrp: p.mrp,
                offerPrice: p.offerPrice,
                discountPercent: p.discountPercent,
                savings: p.savings,
                startDate: p.startDate,
                endDate: p.endDate,
                status: 'active' as const,
                featured: p.featured,
                views: p.views,
                shares: p.shares
              };
              return <OfferCard key={p.id} offer={relOffer} product={p} />;
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
