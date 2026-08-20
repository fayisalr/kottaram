'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Grid, Sparkles, Plus, ArrowRight } from 'lucide-react';

export default function PosterTemplatesPage() {
  const { templates, language } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <Grid className="w-3.5 h-3.5" />
            <span>POSTER DESIGN SYSTEM</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Poster Templates ({templates.length})</h1>
          <p className="text-xs text-slate-400">
            Professional high-conversion promotional design themes optimized for supermarket marketing.
          </p>
        </div>

        <Link
          href="/admin/studio"
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>Use in Studio</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 border border-slate-800 hover:border-amber-400/50 rounded-3xl p-6 space-y-4 shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                  {t.styleCategory}
                </span>
                <span className="text-xs text-slate-400 font-bold">{t.badgeText}</span>
              </div>
              <h3 className="text-xl font-black text-white">{t.name}</h3>
              <p className="text-xs font-semibold text-amber-300">{t.nameMl}</p>
            </div>

            {/* Template Preview Pill */}
            <div
              style={{ background: t.bgGradient }}
              className="h-32 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-inner border border-white/10"
            >
              <div
                style={{ backgroundColor: t.headerBg, color: t.badgeColor }}
                className="px-3 py-1 rounded-full text-xs font-black uppercase shadow"
              >
                {t.badgeText}
              </div>
              <div className="text-xs font-extrabold text-white">PROMOTIONAL OFFER PREVIEW</div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/studio"
                className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-800 transition-colors"
              >
                <span>Generate Poster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
