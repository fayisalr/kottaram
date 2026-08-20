'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { Share2, Tag, ArrowRight, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, generateWhatsAppShareText, incrementWhatsAppShares } = useApp();
  const isMalayalam = language === 'ml';

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    incrementWhatsAppShares(product.id);
    const msg = generateWhatsAppShareText(product, language);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-square bg-slate-950 flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          {product.discountPercent}% OFF
        </div>
        <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-slate-300 text-[10px] px-2 py-0.5 rounded font-semibold border border-slate-700">
          {product.brand}
        </div>
      </div>

      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-white line-clamp-2">
            {isMalayalam ? product.nameMl || product.name : product.name}
          </h4>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-[11px] text-slate-400 line-through mr-1.5">₹{product.mrp}</span>
            <span className="text-sm font-black text-amber-400">₹{product.offerPrice}</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400">
            Save ₹{product.savings}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <Link
            href={`/offers/${product.id}`}
            className="flex items-center justify-center gap-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-bold transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-[11px] font-bold transition-colors"
          >
            <Share2 className="w-3 h-3" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
