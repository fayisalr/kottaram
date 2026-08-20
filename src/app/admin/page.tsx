'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  ShoppingBag,
  Tag,
  MessageCircle,
  Eye,
  TrendingUp,
  Clock,
  Layers,
  ArrowUpRight,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Users
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { branding, analytics, products, offers, generatedPosters, campaigns, notifications } = useApp();

  const activeOffersCount = offers.filter(o => o.status === 'active').length;
  const expiredOffersCount = offers.filter(o => o.status === 'expired').length;

  const kpiCards = [
    {
      title: 'TOTAL PRODUCTS',
      value: products.length.toLocaleString(),
      change: '+12 this week',
      icon: ShoppingBag,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'ACTIVE OFFERS',
      value: activeOffersCount.toLocaleString(),
      change: `${expiredOffersCount} expired`,
      icon: Tag,
      color: 'from-emerald-600 to-green-600',
    },
    {
      title: 'POSTERS GENERATED',
      value: (analytics.postersGenerated + generatedPosters.length).toLocaleString(),
      change: '100% AI Powered',
      icon: Sparkles,
      color: 'from-amber-500 to-yellow-600',
    },
    {
      title: 'WHATSAPP CLICKS',
      value: analytics.whatsappClicks.toLocaleString(),
      change: '+18% vs last week',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header with Hero "+ CREATE OFFER POSTER" Button */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MARKETING ENGINE DASHBOARD</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Welcome back, {branding.name} Admin!
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Manage your supermarket products, create AI offer posters in under 2 minutes, publish website deals, and broadcast through WhatsApp.
          </p>
        </div>

        {/* HERO CTA BUTTON */}
        <Link
          href="/admin/studio"
          className="flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/30 transition-all transform hover:scale-105 shrink-0"
        >
          <Sparkles className="w-5 h-5 text-slate-950 animate-bounce" />
          <span>+ CREATE OFFER POSTER</span>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  {kpi.title}
                </span>
                <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${kpi.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">{kpi.value}</div>
                <div className="text-[11px] font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visualizer & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Chart Card */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Weekly Customer Engagement & Shares</span>
              </h3>
              <p className="text-xs text-slate-400">Offer views and WhatsApp shares over the past 7 days</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Live Data
            </span>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className="space-y-4 pt-2">
            <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-800">
              {analytics.dailyStats.map((stat, i) => {
                const heightPercent = Math.min(100, Math.round((stat.views / 10000) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {stat.views}
                    </div>
                    <div
                      style={{ height: `${Math.max(15, heightPercent)}%` }}
                      className="w-full bg-gradient-to-t from-emerald-600 to-amber-400 rounded-t-lg group-hover:brightness-125 transition-all shadow-md"
                    />
                    <span className="text-[11px] font-bold text-slate-400">{stat.date}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Offer Page Views
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" /> WhatsApp Shares
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tools & Shortcuts */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Quick Marketing Shortcuts</span>
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/studio"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Poster Studio</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </Link>

              <Link
                href="/admin/products/add"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Add New Product</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </Link>

              <Link
                href="/admin/products/import"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Bulk CSV Product Import</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link
                href="/admin/whatsapp"
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span>WhatsApp Marketing Settings</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-amber-400">🔥 Top Converting Offer</div>
            <div className="text-white font-extrabold">{analytics.topProduct}</div>
            <div className="text-slate-400">Popular Category: {analytics.popularCategory}</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Recent Supermarket Activity Log</span>
        </h3>
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  ⚡
                </div>
                <div>
                  <div className="font-bold text-white">{n.title}</div>
                  <div className="text-slate-400">{n.message}</div>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">{n.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
