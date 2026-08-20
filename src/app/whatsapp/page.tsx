'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { MessageCircle, QrCode, Sparkles, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

export default function WhatsAppHubPage() {
  const { branding, language } = useApp();
  const isMalayalam = language === 'ml';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 space-y-12 w-full">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase">
            <MessageCircle className="w-4 h-4 fill-green-400" />
            <span>OFFICIAL SUPERMARKET WHATSAPP HUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {isMalayalam
              ? 'പ്രതിദിന ഓഫറുകൾ വാട്സ്ആപ്പിൽ നേരിട്ട് ലഭിക്കൂ'
              : 'Join Our Supermarket WhatsApp Offer Community'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Get our latest promotional offers, discount poster updates, flash deals, and supermarket news delivered directly to your WhatsApp app.
          </p>
        </div>

        {/* QR Code Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: WhatsApp Group */}
          <div className="bg-slate-900 border border-green-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-green-600/20 border border-green-500/40 text-green-400 mx-auto flex items-center justify-center font-bold text-xl">
                <MessageCircle className="w-6 h-6 fill-green-400" />
              </div>
              <h2 className="text-xl font-black text-white">Supermarket Offer Group</h2>
              <p className="text-xs text-slate-300">
                Interactive customer group for daily promotional updates, flash sales & community offers.
              </p>
            </div>

            {/* Dynamic QR Code */}
            <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center shadow-xl border-4 border-slate-950">
              <QRCodeSVG value={branding.whatsappGroupUrl} size={160} level="H" />
            </div>

            <div className="space-y-2">
              <a
                href={branding.whatsappGroupUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded-xl text-xs shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Join WhatsApp Group</span>
              </a>
              <div className="text-[11px] text-slate-400">Scan QR or click button to join</div>
            </div>
          </div>

          {/* Card 2: WhatsApp Channel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center font-bold text-xl">
                📢
              </div>
              <h2 className="text-xl font-black text-white">WhatsApp Offer Channel</h2>
              <p className="text-xs text-slate-300">
                Official announcement channel for daily offer posters, festival brochures & flyer downloads.
              </p>
            </div>

            {/* Dynamic QR Code */}
            <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 flex items-center justify-center shadow-xl border-4 border-slate-950">
              <QRCodeSVG value={branding.whatsappChannelUrl} size={160} level="H" />
            </div>

            <div className="space-y-2">
              <a
                href={branding.whatsappChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-xl text-xs border border-slate-700 transition-all"
              >
                <span>Follow WhatsApp Channel</span>
              </a>
              <div className="text-[11px] text-slate-400">Scan QR or click button to follow</div>
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          <h3 className="text-base font-black text-white">Why Join Our WhatsApp Network?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Instant alerts on limited-stock flash deals before items run out.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Download high quality Malayalam & English offer posters for family sharing.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span>Direct 1-on-1 WhatsApp chat support with supermarket staff for home delivery inquiries.</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
