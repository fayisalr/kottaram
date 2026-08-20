'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Tag, Clock, Plus, Sparkles, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminOffersPage() {
  const { offers, products, deleteOffer, updateOffer } = useApp();
  const [tab, setTab] = useState<'active' | 'scheduled' | 'expired'>('active');

  const filteredOffers = offers.filter((o) => {
    if (tab === 'active') return o.status === 'active';
    if (tab === 'scheduled') return o.status === 'scheduled';
    return o.status === 'expired';
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
            <Tag className="w-3.5 h-3.5" />
            <span>PROMOTIONAL OFFERS MANAGER</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Supermarket Offers</h1>
        </div>

        <Link
          href="/admin/studio"
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Create Offer Poster</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-fit">
        {(['active', 'scheduled', 'expired'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              tab === t
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t} ({offers.filter((o) => o.status === t).length})
          </button>
        ))}
      </div>

      {/* Offers List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Offer Title</th>
                <th className="p-4">Product</th>
                <th className="p-4">Pricing & Discount</th>
                <th className="p-4">Validity Range</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOffers.map((off) => {
                const prod = products.find((p) => p.id === off.productId);
                return (
                  <tr key={off.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-xs">{off.title}</div>
                      <div className="text-[11px] text-amber-300">{off.titleMl}</div>
                    </td>
                    <td className="p-4 font-semibold text-slate-200">
                      {prod ? prod.name : 'Unknown Product'}
                    </td>
                    <td className="p-4">
                      <div className="text-slate-400 line-through text-[11px]">MRP ₹{off.mrp}</div>
                      <div className="font-extrabold text-amber-400">Offer ₹{off.offerPrice}</div>
                      <span className="text-[10px] font-extrabold bg-red-600/20 text-red-400 px-2 py-0.5 rounded">
                        {off.discountPercent}% OFF (Save ₹{off.savings})
                      </span>
                    </td>
                    <td className="p-4 text-[11px] text-slate-400">
                      <div>Start: {off.startDate}</div>
                      <div>End: {off.endDate}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          off.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : off.status === 'scheduled'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {off.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteOffer(off.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
