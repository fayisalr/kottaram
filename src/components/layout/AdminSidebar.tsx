'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  Tv,
  PlusCircle,
  Tag,
  Sparkles,
  Layers,
  History,
  Megaphone,
  MessageCircle,
  BarChart3,
  Users,
  Settings,
  Bell,
  LogOut,
  FileSpreadsheet,
  Grid,
  ChevronRight,
  Store,
  Menu,
  X,
  LucideIcon
} from 'lucide-react';

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeCount?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { branding, currentStaff, notifications } = useApp();
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const menuSections: MenuSection[] = [
    {
      title: 'Main Navigation',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Catalog & Offers',
      items: [
        { href: '/admin/products', label: 'All Appliances', icon: Tv },
        { href: '/admin/products/add', label: 'Add Appliance', icon: PlusCircle },
        { href: '/admin/products/import', label: 'CSV / Excel Import', icon: FileSpreadsheet },
        { href: '/admin/offers', label: 'Offers & Expiries', icon: Tag },
      ],
    },
    {
      title: 'AI Poster Studio',
      items: [
        { href: '/admin/studio', label: 'Generate Poster', icon: Sparkles, badge: 'AI' },
        { href: '/admin/studio/bulk', label: 'Bulk Poster Studio', icon: Layers },
        { href: '/admin/studio/templates', label: 'Poster Templates', icon: Grid },
        { href: '/admin/studio/history', label: 'Poster History', icon: History },
      ],
    },
    {
      title: 'Marketing & Operations',
      items: [
        { href: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
        { href: '/admin/whatsapp', label: 'WhatsApp Marketing', icon: MessageCircle },
        { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'System & Admin',
      items: [
        { href: '/admin/staff', label: 'Staff & Roles', icon: Users },
        { href: '/admin/notifications', label: 'Notifications', icon: Bell, badgeCount: unreadNotifications },
        { href: '/admin/branding', label: 'Showroom Branding', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar for Phones (< lg breakpoint) */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-base">
            🔌
          </div>
          <div>
            <h2 className="text-xs font-black text-white truncate max-w-[140px]">
              {branding.name}
            </h2>
            <p className="text-[9px] font-bold text-amber-400 uppercase">Staff Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/studio"
            className="flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg text-xs font-black uppercase shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio</span>
          </Link>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay Backdrop */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Container (Desktop Sticky Sidebar & Mobile Slide-out Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col justify-between shrink-0 h-screen transition-transform duration-300 ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-5 overflow-y-auto">
          {/* Admin Brand Logo Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                🔌
              </div>
              <div>
                <h2 className="text-sm font-black tracking-tight text-white truncate max-w-[130px]">
                  {branding.name}
                </h2>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Appliance Portal
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Action Button: "+ CREATE OFFER POSTER" */}
          <Link
            href="/admin/studio"
            onClick={() => setMobileDrawerOpen(false)}
            className="group relative flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
            <span>+ CREATE OFFER POSTER</span>
          </Link>

          {/* Menu Navigation */}
          <nav className="space-y-4 pr-1">
            {menuSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 mb-1">
                  {section.title}
                </h3>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-sky-600 text-white shadow-md'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-amber-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                      {item.badgeCount !== undefined && item.badgeCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                          {item.badgeCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Staff Profile & Public Website Link */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-300 border border-slate-800 transition-all"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-sky-400" />
              <span>Showroom Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center font-bold text-xs">
                {currentStaff.name.charAt(0)}
              </div>
              <div className="truncate max-w-[100px]">
                <div className="text-xs font-bold text-white truncate">{currentStaff.name}</div>
                <div className="text-[10px] text-amber-400 uppercase font-semibold">
                  {currentStaff.role.replace('_', ' ')}
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/login')}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
