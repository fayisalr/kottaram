'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Tv,
  Tag,
  Grid,
  Phone,
  MessageCircle,
  Search,
  Menu,
  X,
  Store,
  Sparkles,
  LayoutDashboard,
  Clock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { branding, language, setLanguage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { href: '/', label: 'Home', labelMl: 'ഹോം', icon: Store },
    { href: '/offers', label: 'Appliance Offers', labelMl: 'ആനുകൂല്യങ്ങൾ', icon: Tag },
    { href: '/products', label: 'All Appliances', labelMl: 'ഉൽപ്പന്നങ്ങൾ', icon: Tv },
    { href: '/categories', label: 'Categories', labelMl: 'വിഭാഗങ്ങൾ', icon: Grid },
    { href: '/whatsapp', label: 'WhatsApp Hub', labelMl: 'വാട്സ്ആപ്പ് ഹബ്', icon: MessageCircle },
    { href: '/store', label: 'Showroom Info', labelMl: 'ഷോറൂം വിവരങ്ങൾ', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-sky-700 via-blue-600 to-amber-600 px-4 py-1.5 text-xs text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              {language === 'ml' ? '0% പലിശ രഹിത EMI' : 'NO COST EMI AVAILABLE'}
            </span>
            <span>
              {language === 'ml'
                ? `${branding.nameMl} - സ്മാർട്ട് ടിവി, ഫ്രിഡ്ജ്, എസി വൻ വിലക്കുറവിൽ!`
                : `${branding.name} - Upgrade Your Home with Top Brand Appliances & 0% EMI!`}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{branding.openingHours}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-white/20">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === 'en' ? 'bg-amber-400 text-slate-950' : 'text-white hover:text-amber-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === 'ml' ? 'bg-amber-400 text-slate-950' : 'text-white hover:text-amber-300'
                }`}
              >
                മലയാളം
              </button>
            </div>

            {/* Admin Switch Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1 bg-slate-950 hover:bg-slate-800 px-2.5 py-0.5 rounded text-amber-400 font-bold transition-all border border-amber-400/30"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-sky-900/50 group-hover:scale-105 transition-transform">
            🔌
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors leading-none">
              {language === 'ml' ? branding.nameMl : branding.name}
            </h1>
            <p className="text-[11px] font-medium text-sky-400">
              {language === 'ml' ? branding.taglineMl : branding.tagline}
            </p>
          </div>
        </Link>

        {/* Global Live Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder={
              language === 'ml'
                ? 'ടിവി, ഫ്രിഡ്ജ്, വാഷിംഗ് മെഷീൻ, എസി തിരയൂ...'
                : 'Search TVs, Fridges, Washers, ACs, Brands...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'ml' ? link.labelMl : link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* WhatsApp Direct Action Button */}
        <div className="flex items-center gap-2">
          <a
            href={branding.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-green-900/40 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{language === 'ml' ? 'വാട്സ്ആപ്പ് ഗ്രൂപ്പ്' : 'Join WhatsApp'}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-4 animate-in slide-in-from-top-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search appliances & deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold border ${
                    active
                      ? 'bg-sky-600 text-white border-sky-500'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ml' ? link.labelMl : link.label}</span>
                </Link>
              );
            })}
          </div>

          <a
            href={branding.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Join WhatsApp Community for Offers</span>
          </a>
        </div>
      )}
    </header>
  );
};
