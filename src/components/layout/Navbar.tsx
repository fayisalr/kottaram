'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { authService, AuthUser } from '@/services/authService';
import { CustomerAuthModal } from '@/components/auth/CustomerAuthModal';
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  LayoutDashboard,
  Search,
  Grid,
  Tag,
  Store,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { branding, language, setLanguage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home', labelMl: 'ഹോം' },
    { href: '/products', label: 'Appliances', labelMl: 'ഉൽപന്നങ്ങൾ' },
    { href: '/offers', label: 'Offers & EMI', labelMl: 'ഓഫറുകൾ' },
    { href: '/categories', label: 'Categories', labelMl: 'വിഭാഗങ്ങൾ' },
    { href: '/store', label: 'Showroom', labelMl: 'ഷോറൂം' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-xl">
        {/* Top Info Ribbon */}
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-900 text-white py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{branding.address}</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{branding.phone}</span>
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

              {/* User Account Login Status / Staff Link */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-500/30 font-bold hover:bg-amber-500/30 transition-all"
                  >
                    <User className="w-3 h-3 text-amber-400" />
                    <span>{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                      <div className="px-3 py-1.5 border-b border-slate-800">
                        <div className="font-extrabold text-white text-xs truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{currentUser.email}</div>
                      </div>
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-amber-400 font-bold hover:bg-slate-800 rounded-lg"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Staff Portal</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 font-bold hover:bg-slate-800 rounded-lg text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded text-xs font-black transition-all shadow"
                >
                  <User className="w-3 h-3" />
                  <span>Sign In / ലോഗിൻ</span>
                </button>
              )}

              <Link
                href="/admin"
                className="flex items-center gap-1 bg-slate-950 hover:bg-slate-800 px-2.5 py-0.5 rounded text-amber-400 font-bold transition-all border border-amber-400/30"
              >
                <LayoutDashboard className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
              🔌
            </div>
            <div>
              <div className="font-black text-lg text-white leading-none tracking-tight flex items-center gap-1">
                <span>{branding.name}</span>
              </div>
              <div className="text-[11px] font-bold text-amber-400 tracking-wider">
                {branding.nameMl}
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {language === 'ml' ? link.labelMl : link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://api.whatsapp.com/send?phone=${branding.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Offer Hub</span>
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold ${
                    pathname === link.href ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {language === 'ml' ? link.labelMl : link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-amber-400"
              >
                <User className="w-4 h-4" />
                <span>Customer Sign In</span>
              </button>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-sky-400 flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Customer Auth Modal Popup */}
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={(user) => setCurrentUser(user)}
      />
    </>
  );
};
