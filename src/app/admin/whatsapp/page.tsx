'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/context/AppContext';
import { MessageCircle, QrCode, Save, Sparkles, Check } from 'lucide-react';

export default function WhatsAppSettingsPage() {
  const { branding, updateBranding } = useApp();
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState(branding.whatsappGroupUrl);
  const [whatsappChannelUrl, setWhatsappChannelUrl] = useState(branding.whatsappChannelUrl);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({
      whatsappGroupUrl,
      whatsappChannelUrl
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase">
          <MessageCircle className="w-3.5 h-3.5 fill-green-400" />
          <span>WHATSAPP PROMOTION PLATFORM</span>
        </div>
        <h1 className="text-3xl font-black text-white mt-1">WhatsApp Marketing Settings</h1>
        <p className="text-xs text-slate-400">
          Configure community group & channel deep links. Dynamic QR codes are generated automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl">
          <h3 className="text-base font-extrabold text-white">WhatsApp Community Deep Links</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Group Invite Link</label>
              <input
                type="url"
                required
                value={whatsappGroupUrl}
                onChange={(e) => setWhatsappGroupUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Channel Link</label>
              <input
                type="url"
                required
                value={whatsappChannelUrl}
                onChange={(e) => setWhatsappChannelUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            {saved && (
              <div className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>WhatsApp Settings Updated Successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-black text-xs rounded-xl shadow-lg uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </form>
        </div>

        {/* QR Preview Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center space-y-6 shadow-xl">
          <h3 className="text-base font-extrabold text-white">Live Generated Group QR Code</h3>
          <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center border-4 border-slate-950 shadow-xl">
            <QRCodeSVG value={whatsappGroupUrl} size={160} level="H" />
          </div>
          <p className="text-xs text-slate-400">
            Customers can scan this QR code on posters or in-store banners to join your WhatsApp group instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
