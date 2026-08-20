'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { History, Download, Share2, Trash2, Sparkles, Plus } from 'lucide-react';

export default function PosterHistoryPage() {
  const { generatedPosters, deletePoster, generateWhatsAppShareText, products } = useApp();

  const handleShare = (poster: typeof generatedPosters[0]) => {
    const prod = products.find(p => p.id === poster.productId) || products[0];
    const text = generateWhatsAppShareText(prod, 'en');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <History className="w-3.5 h-3.5" />
            <span>POSTER ARCHIVE</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Generated Poster History</h1>
          <p className="text-xs text-slate-400">
            View, re-download, or share previously generated supermarket promotional posters.
          </p>
        </div>

        <Link
          href="/admin/studio"
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Create New Poster</span>
        </Link>
      </div>

      {generatedPosters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {generatedPosters.map((poster) => (
            <div
              key={poster.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-4 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  {poster.imageDataUrl ? (
                    <img src={poster.imageDataUrl} alt={poster.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-4xl">🎨</div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white truncate">{poster.productName}</h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Theme: {poster.templateName}</span>
                    <span>{poster.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800 text-xs font-bold">
                <a
                  href={poster.imageDataUrl}
                  download={`Poster-${poster.productName}.png`}
                  className="flex items-center justify-center gap-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PNG</span>
                </a>
                <button
                  onClick={() => handleShare(poster)}
                  className="flex items-center justify-center gap-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => deletePoster(poster.id)}
                  className="flex items-center justify-center gap-1 py-2 bg-slate-800 hover:bg-red-600/30 text-red-400 rounded-xl"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto flex items-center justify-center text-amber-400 text-2xl">
            🖼️
          </div>
          <h3 className="text-base font-bold text-white">No Saved Posters Yet</h3>
          <p className="text-xs text-slate-400">
            Posters generated in the AI Poster Studio will automatically appear here for download and sharing.
          </p>
          <Link
            href="/admin/studio"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg"
          >
            <span>Open AI Poster Studio</span>
          </Link>
        </div>
      )}
    </div>
  );
}
