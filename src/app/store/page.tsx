'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { Phone, MessageCircle, MapPin, Mail, Clock, Store, ShieldCheck } from 'lucide-react';

export default function StoreInfoPage() {
  const { branding, language } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 space-y-12 w-full">
        {/* Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
            <Store className="w-3.5 h-3.5" />
            <span>BUSINESS & LOCATION INFO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">{branding.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300">{branding.address}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Call Us</h3>
            <p className="text-xs text-slate-300">{branding.phone}</p>
            <a
              href={`tel:${branding.phone}`}
              className="inline-block px-4 py-2 bg-emerald-600 font-bold text-xs rounded-xl text-white mt-2"
            >
              CALL NOW
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-600/20 border border-green-500/40 text-green-400 mx-auto flex items-center justify-center font-bold">
              <MessageCircle className="w-6 h-6 fill-green-400" />
            </div>
            <h3 className="text-base font-bold text-white">WhatsApp Chat</h3>
            <p className="text-xs text-slate-300">{branding.whatsappNumber}</p>
            <a
              href={`https://api.whatsapp.com/send?phone=${branding.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 bg-green-600 font-bold text-xs rounded-xl text-white mt-2"
            >
              CHAT ON WHATSAPP
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Opening Hours</h3>
            <p className="text-xs text-slate-300">{branding.openingHours}</p>
            <div className="text-[11px] text-amber-400 font-bold mt-2">Open 7 Days a Week</div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Google Maps Location</span>
          </h3>
          <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
            <div className="text-center space-y-3 p-6">
              <MapPin className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <div className="text-sm font-bold text-white">{branding.name}</div>
              <div className="text-xs text-slate-400 max-w-sm">{branding.address}</div>
              <a
                href={branding.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg"
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
