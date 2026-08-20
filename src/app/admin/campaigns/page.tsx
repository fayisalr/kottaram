'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Megaphone, Plus, Calendar, CheckCircle2 } from 'lucide-react';

export default function CampaignsPage() {
  const { campaigns, addCampaign } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [nameMl, setNameMl] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addCampaign({
      name,
      nameMl,
      description,
      bannerUrl,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      productIds: [],
      status: 'active'
    });
    setShowAddModal(false);
    setName('');
    setNameMl('');
    setDescription('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <Megaphone className="w-3.5 h-3.5" />
            <span>FESTIVAL & SEASONAL MARKETING</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Supermarket Campaigns ({campaigns.length})</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <img src={camp.bannerUrl} alt={camp.name} className="w-full h-40 object-cover rounded-2xl border border-slate-800" />
              <div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  {camp.status}
                </span>
                <h3 className="text-xl font-black text-white mt-1">{camp.name}</h3>
                <h4 className="text-xs font-bold text-amber-400">{camp.nameMl}</h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{camp.description}</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 font-semibold pt-2 border-t border-slate-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Valid: {camp.startDate} to {camp.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Create New Marketing Campaign</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Campaign Name (e.g. Onam Sale)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Malayalam Title (ഓണം ഓഫറുകൾ)</label>
                <input
                  type="text"
                  value={nameMl}
                  onChange={(e) => setNameMl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-black text-xs rounded-xl"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
