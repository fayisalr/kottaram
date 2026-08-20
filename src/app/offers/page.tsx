'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OfferCard } from '@/components/ui/OfferCard';
import { useApp } from '@/context/AppContext';
import { Search, Tag } from 'lucide-react';

function OffersContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || 'all';

  const { offers, products, categories, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'discount' | 'price_low' | 'price_high' | 'latest'>('discount');

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const prod = products.find((p) => p.id === offer.productId);
      if (!prod) return false;

      const matchesCategory = selectedCategory === 'all' || prod.categoryId === selectedCategory;

      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        prod.name.toLowerCase().includes(term) ||
        prod.nameMl.includes(term) ||
        prod.brand.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'price_low') return a.offerPrice - b.offerPrice;
      if (sortBy === 'price_high') return b.offerPrice - a.offerPrice;
      return b.id.localeCompare(a.id);
    });
  }, [offers, products, selectedCategory, searchTerm, sortBy]);

  const isMalayalam = language === 'ml';

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
          <Tag className="w-3.5 h-3.5" />
          <span>SUPERMARKET PROMOTIONAL DEALS</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          {isMalayalam ? 'ഇന്നത്തെ എല്ലാ ഓഫറുകളും' : 'All Supermarket Offers & Discounts'}
        </h1>
        <p className="text-xs text-slate-400">
          Showing {filteredOffers.length} active promotional deals with high discounts.
        </p>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Search offer by product name, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {isMalayalam ? c.nameMl : c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
            >
              <option value="discount">Highest Discount %</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="latest">Latest Offers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      {filteredOffers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => {
            const prod = products.find((p) => p.id === offer.productId);
            if (!prod) return null;
            return <OfferCard key={offer.id} offer={offer} product={prod} />;
          })}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto flex items-center justify-center text-amber-400 text-2xl">
            🔍
          </div>
          <h3 className="text-base font-bold text-white">No Offers Found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search keywords or selected category.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
}

export default function AllOffersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Offers...</div>}>
        <OffersContent />
      </Suspense>
      <Footer />
    </div>
  );
}
