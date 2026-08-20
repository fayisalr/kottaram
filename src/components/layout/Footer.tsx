'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Phone, MessageCircle, MapPin, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { branding, language } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
              🔌
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {language === 'ml' ? branding.nameMl : branding.name}
              </h3>
              <p className="text-xs text-sky-400">{branding.tagline}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ml'
              ? 'നിങ്ങളുടെ വീടിനാവശ്യമായ മുൻനിര ബ്രാൻഡുകളുടെ സ്മാർട്ട് ടിവി, ഫ്രിഡ്ജ്, വാഷിംഗ് മെഷീൻ, എസി, കിച്ചൻ അപ്ലയൻസസ് എന്നിവ ഏറ്റവും കുറഞ്ഞവിലയിൽ സ്വന്തമാക്കൂ.'
              : 'Your trusted home appliances showroom offering leading global brands, genuine warranty, no-cost EMI schemes, and free local installation.'}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={branding.whatsappGroupUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg border border-green-500/30 transition-all"
              title="WhatsApp Group"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={branding.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-400 rounded-lg border border-pink-500/30 transition-all"
              title="Instagram"
            >
              📸
            </a>
            <a
              href={branding.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg border border-blue-500/30 transition-all"
              title="Facebook"
            >
              🌐
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/offers" className="hover:text-amber-400 transition-colors">
                🔥 Today's Appliance Deals
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-400 transition-colors">
                📺 Browse Smart TVs & Fridges
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-amber-400 transition-colors">
                📂 Appliance Categories & Brands
              </Link>
            </li>
            <li>
              <Link href="/whatsapp" className="hover:text-amber-400 transition-colors">
                💬 WhatsApp Offers Community
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-amber-400 transition-colors">
                📍 Showroom Location & Directions
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-amber-400 transition-colors">
                🔑 Staff Portal Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Store Information */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Showroom Details</h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{branding.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{branding.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
              <span>{branding.whatsappNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{branding.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Col 4: WhatsApp Join CTA */}
        <div className="bg-gradient-to-br from-green-950/60 to-slate-900 p-5 rounded-2xl border border-green-500/30 space-y-3">
          <h4 className="text-sm font-black text-green-400 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            WhatsApp Offer Network
          </h4>
          <p className="text-xs text-slate-300">
            Get instant discount poster updates, exchange offer schemes & EMI deal alerts directly on WhatsApp!
          </p>
          <a
            href={branding.whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg transition-all"
          >
            Join WhatsApp Group Now
          </a>
        </div>
      </div>

      <div className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {branding.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Home Appliances & Digital Marketing Engine <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};
