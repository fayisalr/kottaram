'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OfferCard } from '@/components/ui/OfferCard';
import { useApp } from '@/context/AppContext';
import {
  Tag,
  Sparkles,
  MessageCircle,
  Tv,
  ArrowRight,
  Clock,
  ShieldCheck,
  Percent,
  Flame,
  CheckCircle2,
  Phone,
  MapPin,
  ChevronRight,
  Zap,
  Truck
} from 'lucide-react';

export default function HomePage() {
  const { branding, offers, products, categories, campaigns, language } = useApp();

  const isMalayalam = language === 'ml';

  const activeOffers = offers.filter(o => o.status === 'active');
  const flashDeals = activeOffers.slice(0, 4);
  const activeCampaign = campaigns[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 space-y-12 pb-16">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-950 border-b border-slate-800 pt-8 pb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{isMalayalam ? 'അപ്ലയൻസ് ബിഗ് ഡീലുകൾ' : 'BIGGEST HOME APPLIANCE SALE'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                {isMalayalam ? (
                  <>
                    <span className="text-amber-400">{branding.nameMl}</span> <br />
                    വീടിനാവശ്യമായ എല്ലാം വൻ വിലക്കുറവിൽ സ്വന്തമാക്കൂ!
                  </>
                ) : (
                  <>
                    Upgrade Your Home with <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-sky-400 to-blue-400">
                      {branding.name}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {isMalayalam
                  ? 'സ്മാർട്ട് ടിവികൾ, ഫ്രിഡ്ജ്, വാഷിംഗ് മെഷീൻ, എസി, കിച്ചൻ അപ്ലയൻസസ് എന്നിവ 0% പലിശരഹിത തവണ വ്യവസ്ഥയിലും എക്സ്ചേഞ്ച് ബോണസോടെയും ഇപ്പോൾ വാങ്ങാം.'
                  : 'Discover mega savings on 4K Smart TVs, Double Door Fridges, Front Load Washers, Inverter ACs, and Kitchen Appliances with 0% No Cost EMI and Free Installation.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/offers"
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold rounded-2xl text-sm shadow-xl shadow-sky-900/40 transition-all transform hover:scale-105"
                >
                  <Tag className="w-4 h-4" />
                  <span>{isMalayalam ? 'ഓഫറുകൾ കാണാം' : 'View Appliance Deals'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={branding.whatsappGroupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded-2xl text-sm shadow-xl shadow-green-900/40 transition-all transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isMalayalam ? 'വാട്സ്ആപ്പിൽ ചേരാം' : 'Join WhatsApp Group'}</span>
                </a>
              </div>

              {/* Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800 text-slate-300 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>0% No Cost EMI</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Official Brand Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-400" />
                  <span>Free Home Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Featured Offer Banner */}
            <div className="lg:col-span-5">
              {activeOffers.length > 0 && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                  <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-extrabold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                        FEATURED APPLIANCE DEAL OF THE DAY
                      </span>
                      <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full">
                        {activeOffers[0].discountPercent}% OFF
                      </span>
                    </div>

                    {(() => {
                      const prod = products.find(p => p.id === activeOffers[0].productId) || products[0];
                      return (
                        <div className="space-y-3">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-56 object-cover rounded-xl border border-slate-800"
                          />
                          <h3 className="text-base font-bold text-white">
                            {isMalayalam ? prod.nameMl || prod.name : prod.name}
                          </h3>
                          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl">
                            <div>
                              <div className="text-xs text-slate-400 line-through">MRP: ₹{prod.mrp.toLocaleString('en-IN')}</div>
                              <div className="text-xs text-emerald-400 font-bold">SAVE ₹{prod.savings.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-amber-400 font-bold">OFFER PRICE</div>
                              <div className="text-2xl font-black text-amber-400">₹{prod.offerPrice.toLocaleString('en-IN')}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. FLASH DEALS SECTION */}
        <section className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                <span>HOT HOME ELECTRONICS OFFERS</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                {isMalayalam ? 'ഇന്നത്തെ ഹോട്സ്പോട്ട് ഓഫറുകൾ' : 'Today\'s Appliance Flash Deals & Disounts'}
              </h2>
            </div>
            <Link
              href="/offers"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs group"
            >
              <span>{isMalayalam ? 'എല്ലാ ഓഫറുകളും കാണാം' : 'View All Appliance Deals'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((offer) => {
              const prod = products.find(p => p.id === offer.productId);
              if (!prod) return null;
              return <OfferCard key={offer.id} offer={offer} product={prod} />;
            })}
          </div>
        </section>

        {/* 3. CATEGORIES BROWSER */}
        <section className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="text-sky-400 font-bold text-xs uppercase tracking-wider">
                APPLIANCE DEPARTMENTS
              </div>
              <h2 className="text-2xl font-black text-white">
                {isMalayalam ? 'വിഭാഗങ്ങൾ പ്രകാരം തിരയൂ' : 'Browse By Appliance Categories'}
              </h2>
            </div>
            <Link href="/categories" className="text-xs text-amber-400 font-bold hover:underline">
              {isMalayalam ? 'എല്ലാ വിഭാഗങ്ങളും' : 'All Categories'}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/offers?category=${cat.id}`}
                className="group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 p-4 rounded-2xl text-center space-y-2 transition-all transform hover:-translate-y-1 shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 text-amber-400 mx-auto flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                  🔌
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                  {isMalayalam ? cat.nameMl : cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. FESTIVAL CAMPAIGN BANNER */}
        {activeCampaign && (
          <section className="max-w-7xl mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  FESTIVAL APPLIANCE SALE
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {isMalayalam ? activeCampaign.nameMl || activeCampaign.name : activeCampaign.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed max-w-xl">
                  {activeCampaign.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href={`/campaigns/${activeCampaign.id}`}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    Explore Festival Deals
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5">
                <img
                  src={activeCampaign.bannerUrl}
                  alt={activeCampaign.name}
                  className="w-full h-48 sm:h-60 object-cover rounded-2xl border border-amber-500/30 shadow-xl"
                />
              </div>
            </div>
          </section>
        )}

        {/* 5. WHATSAPP COMMUNITY HUB CTA */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-green-950 via-slate-900 to-green-900 border border-green-500/40 rounded-3xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                <MessageCircle className="w-4 h-4 fill-green-400" />
                <span>WHATSAPP APPLIANCE DEALS COMMUNITY</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {isMalayalam
                  ? 'അപ്ലയൻസ് ഓഫർ പോസ്റ്ററുകൾ വാട്സ്ആപ്പിൽ നേരിട്ട് ലഭിക്കൂ!'
                  : 'Get Daily Home Appliance Offers & Poster Updates Directly on WhatsApp'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Join our official WhatsApp group and channel to receive exclusive promotional posters, price drop alerts, exchange scheme updates, and instant sales inquiries directly on your phone.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={branding.whatsappGroupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Join WhatsApp Group</span>
                </a>
                <a
                  href={branding.whatsappChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl border border-slate-700 transition-all"
                >
                  <span>Follow WhatsApp Channel</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-950 p-6 rounded-2xl border border-green-500/30 text-center space-y-3">
              <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center">
                <div className="w-full h-full border-2 border-dashed border-slate-900 flex flex-col items-center justify-center text-[10px] text-slate-900 font-bold">
                  <span>📱 QR CODE</span>
                  <span className="text-[8px] text-slate-600">Scan to Join</span>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-200">
                Scan QR Code to Join Group
              </div>
              <div className="text-[11px] text-slate-400">
                Kozhikode Showroom Updates
              </div>
            </div>
          </div>
        </section>

        {/* 6. STORE LOCATION & HOURS */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-400" />
              <span>Showroom Location & Contact</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <p><strong>Address:</strong> {branding.address}</p>
              <p><strong>Phone:</strong> {branding.phone}</p>
              <p><strong>WhatsApp:</strong> {branding.whatsappNumber}</p>
              <p><strong>Opening Hours:</strong> {branding.openingHours}</p>
            </div>
            <a
              href={branding.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:underline"
            >
              <span>Get Showroom Directions on Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Showroom Quality & Warranty Guarantee</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                All appliances are 100% genuine products sourced directly from authorized manufacturers with official company warranty, free home delivery, and expert technician installation across Kerala.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/store"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
