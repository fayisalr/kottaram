'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BarChart3, TrendingUp, Eye, MessageCircle, Sparkles, ShoppingBag } from 'lucide-react';

export default function AnalyticsPage() {
  const { analytics, products, offers } = useApp();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>MARKETING ANALYTICS</span>
        </div>
        <h1 className="text-3xl font-black text-white mt-1">Supermarket Analytics & Performance</h1>
        <p className="text-xs text-slate-400">
          Track offer views, WhatsApp viral shares, popular product categories, and poster generation conversion metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-extrabold text-slate-400 uppercase">TOTAL VIEWS</div>
          <div className="text-3xl font-black text-white">{analytics.totalViews.toLocaleString()}</div>
          <div className="text-[11px] font-semibold text-emerald-400">Website & Product Views</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-extrabold text-slate-400 uppercase">WHATSAPP SHARES</div>
          <div className="text-3xl font-black text-white">{analytics.whatsappShares.toLocaleString()}</div>
          <div className="text-[11px] font-semibold text-green-400">Viral Offer Shares</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-extrabold text-slate-400 uppercase">WHATSAPP CLICKS</div>
          <div className="text-3xl font-black text-white">{analytics.whatsappClicks.toLocaleString()}</div>
          <div className="text-[11px] font-semibold text-amber-400">Deep Link Conversions</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-extrabold text-slate-400 uppercase">AI POSTERS CREATED</div>
          <div className="text-3xl font-black text-white">{analytics.postersGenerated}</div>
          <div className="text-[11px] font-semibold text-blue-400">Generated Banners</div>
        </div>
      </div>

      {/* Top Converting Offers */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Top Converting Products & Offers</span>
        </h3>
        <div className="space-y-3">
          {products.slice(0, 5).map((p, idx) => (
            <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-xs">
                  #{idx + 1}
                </span>
                <div>
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-slate-400">Brand: {p.brand}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-amber-400">{p.views} Views</div>
                <div className="text-green-400 font-semibold">{p.shares} WhatsApp Shares</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
