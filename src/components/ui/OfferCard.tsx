'use client';

import React from 'react';
import Link from 'next/link';
import { Offer, Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { Tag, Share2, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface OfferCardProps {
  offer: Offer;
  product: Product;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, product }) => {
  const { branding, language, generateWhatsAppShareText, incrementWhatsAppShares } = useApp();

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    incrementWhatsAppShares(product.id);
    const message = generateWhatsAppShareText(product, language);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isMalayalam = language === 'ml';

  return (
    <div className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-950 flex items-center justify-center">
        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge Burst */}
        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-full font-black text-xs shadow-lg flex items-center gap-1 border border-red-400 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{offer.discountPercent}% OFF</span>
        </div>

        {/* Brand Tag */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-700">
          {product.brand}
        </div>

        {/* Savings Ribbon */}
        <div className="absolute bottom-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-lg font-extrabold text-xs shadow-md">
          {isMalayalam ? `ലാഭിക്കാം ₹${offer.savings}` : `SAVE ₹${offer.savings}`}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
            {isMalayalam ? product.nameMl || product.name : product.name}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Price Display Block */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 line-through">
              MRP: ₹{offer.mrp}
            </div>
            <div className="text-xs font-semibold text-emerald-400">
              {isMalayalam ? `ലാഭം ₹${offer.savings}` : `Save ₹${offer.savings}`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Offer Price</div>
            <div className="text-xl font-black text-amber-400">
              ₹{offer.offerPrice}
            </div>
          </div>
        </div>

        {/* Validity & Actions */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {isMalayalam ? 'പരിമിതകാല ഓഫർ' : 'Limited Period Offer'}
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/offers/${offer.id}`}
              className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-colors border border-slate-700"
            >
              <span>{isMalayalam ? 'വിവരങ്ങൾ' : 'View Offer'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
