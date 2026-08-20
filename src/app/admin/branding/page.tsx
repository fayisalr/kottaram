'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Save, Check } from 'lucide-react';

export default function BrandingPage() {
  const { branding, updateBranding } = useApp();
  const [form, setForm] = useState(branding);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
          <Settings className="w-3.5 h-3.5" />
          <span>CENTRALIZED BRANDING SYSTEM</span>
        </div>
        <h1 className="text-3xl font-black text-white mt-1">Supermarket Branding Settings</h1>
        <p className="text-xs text-slate-400">
          Configured branding will dynamically update across your public website, poster templates, and WhatsApp messages.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Supermarket Name (English)</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Malayalam Name (മലയാളം)</label>
              <input
                type="text"
                required
                value={form.nameMl}
                onChange={(e) => setForm({ ...form, nameMl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tagline (English)</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tagline (Malayalam)</label>
              <input
                type="text"
                value={form.taglineMl}
                onChange={(e) => setForm({ ...form, taglineMl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">Supermarket Store Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Opening Hours</label>
              <input
                type="text"
                value={form.openingHours}
                onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Google Maps URL</label>
              <input
                type="url"
                value={form.googleMapsUrl}
                onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          {saved && (
            <div className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Branding settings updated dynamically!</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Update Branding</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
