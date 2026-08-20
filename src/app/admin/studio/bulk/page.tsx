'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Layers, Sparkles, Check, Download, RefreshCw, CheckSquare, Square } from 'lucide-react';

export default function BulkPosterStudioPage() {
  const { products, templates, savePoster } = useApp();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(products.slice(0, 4).map(p => p.id));
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0].id);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressIndex, setProgressIndex] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const toggleProductSelect = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedProductIds(products.map((p) => p.id));
  };

  const deselectAll = () => {
    setSelectedProductIds([]);
  };

  const handleStartBulkGeneration = async () => {
    if (selectedProductIds.length === 0) return;
    setIsGenerating(true);
    setProgressIndex(0);
    setCompletedCount(0);

    const selectedProds = products.filter((p) => selectedProductIds.includes(p.id));
    const targetTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

    for (let i = 0; i < selectedProds.length; i++) {
      setProgressIndex(i + 1);
      // Simulate rendering pass
      await new Promise((res) => setTimeout(res, 600));

      const prod = selectedProds[i];
      // Save entry into poster history
      savePoster({
        productId: prod.id,
        productName: prod.name,
        templateId: targetTemplate.id,
        templateName: targetTemplate.name,
        language: 'en',
        aspectRatio: '1:1',
        imageDataUrl: prod.imageUrl,
        createdBy: 'Bulk Generator'
      });
      setCompletedCount((prev) => prev + 1);
    }

    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>BATCH PROMOTIONAL GENERATOR</span>
        </div>
        <h1 className="text-3xl font-black text-white mt-1">Bulk AI Poster Generator</h1>
        <p className="text-xs text-slate-400">
          Select up to 20 products to generate promotional posters simultaneously in batch mode.
        </p>
      </div>

      {/* Control Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
        {/* Template Selector */}
        <div>
          <label className="block text-xs font-extrabold uppercase text-slate-300 tracking-wider mb-2">
            Select Template for Bulk Batch:
          </label>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} - {t.nameMl}
              </option>
            ))}
          </select>
        </div>

        {/* Product Selection Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Selected Products ({selectedProductIds.length} / {products.length})
            </span>
            <div className="flex items-center gap-3 text-xs font-bold">
              <button onClick={selectAll} className="text-amber-400 hover:underline">
                Select All
              </button>
              <button onClick={deselectAll} className="text-slate-400 hover:underline">
                Deselect All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1">
            {products.map((p) => {
              const selected = selectedProductIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => toggleProductSelect(p.id)}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    selected
                      ? 'bg-amber-500/10 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {selected ? (
                    <CheckSquare className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 shrink-0" />
                  )}
                  <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="truncate text-xs font-bold">
                    <div className="truncate text-white">{p.name}</div>
                    <div className="text-[10px] text-emerald-400">Offer: ₹{p.offerPrice}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Batch Progress Indicator */}
        {isGenerating && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating Poster {progressIndex} of {selectedProductIds.length}...
              </span>
              <span>{Math.round((progressIndex / selectedProductIds.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${(progressIndex / selectedProductIds.length) * 100}%` }}
                className="bg-amber-400 h-full transition-all duration-300"
              />
            </div>
          </div>
        )}

        {completedCount > 0 && !isGenerating && (
          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/30 text-xs text-emerald-300 font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Batch completed! {completedCount} AI Posters saved to history.
            </span>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleStartBulkGeneration}
            disabled={isGenerating || selectedProductIds.length === 0}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider shadow-xl disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>GENERATE BULK POSTERS ({selectedProductIds.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
