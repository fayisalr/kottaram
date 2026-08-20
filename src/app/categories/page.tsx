'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { Grid, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const { categories, products, language } = useApp();
  const isMalayalam = language === 'ml';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <Grid className="w-3.5 h-3.5" />
            <span>SUPERMARKET DEPARTMENTS</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            {isMalayalam ? 'ഉൽപ്പന്ന വിഭാഗങ്ങൾ' : 'All Product Categories'}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/offers?category=${cat.id}`}
                className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl space-y-4 transition-all hover:-translate-y-1 shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-amber-400 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  🛒
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {isMalayalam ? cat.nameMl : cat.name}
                  </h3>
                  {cat.nameMl && !isMalayalam && (
                    <p className="text-xs text-amber-300 font-medium">{cat.nameMl}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">{count} Products Available</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 pt-2 border-t border-slate-800">
                  <span>Browse Offers</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
