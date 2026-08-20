'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PlusCircle, ArrowLeft, Sparkles, Check } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const { categories, addProduct, setQuickPosterProduct } = useApp();

  const [name, setName] = useState('');
  const [nameMl, setNameMl] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-1');
  const [mrp, setMrp] = useState<number>(0);
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
  const [barcode, setBarcode] = useState(`89010${Math.floor(1000000 + Math.random() * 9000000)}`);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80');

  const savings = Math.max(0, mrp - offerPrice);
  const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || mrp <= 0 || offerPrice <= 0) {
      alert('Please fill out product name, MRP, and offer price.');
      return;
    }

    if (offerPrice > mrp) {
      alert('Offer price cannot be greater than MRP!');
      return;
    }

    const created = addProduct({
      name,
      nameMl,
      brand: brand || 'Supermarket Brand',
      categoryId,
      description: description || `${name} fresh supermarket product item.`,
      mrp,
      offerPrice,
      sku,
      barcode,
      stockStatus: 'in_stock',
      imageUrl,
      featured: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31'
    });

    // Ask if user wants to generate AI poster immediately
    if (confirm('Product added successfully! Do you want to open AI Poster Studio now?')) {
      setQuickPosterProduct(created);
      router.push('/admin/studio');
    } else {
      router.push('/admin/products');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-emerald-400" />
            <span>Add New Supermarket Product</span>
          </h1>
          <p className="text-xs text-slate-400">
            Enter product pricing and details. Discount & savings will be calculated automatically.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Product Name (English) *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aashirvaad Atta 5kg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Malayalam Name (മലയാളം)</label>
              <input
                type="text"
                placeholder="e.g. ആശിർവാദ് ആട്ട 5 കിലോ"
                value={nameMl}
                onChange={(e) => setNameMl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Aashirvaad / Fortune / Milma"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-semibold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.nameMl})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">MRP (₹) *</label>
              <input
                type="number"
                required
                min="1"
                placeholder="280"
                value={mrp || ''}
                onChange={(e) => setMrp(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Offer Price (₹) *</label>
              <input
                type="number"
                required
                min="1"
                placeholder="239"
                value={offerPrice || ''}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Automatic Calculation Preview Banner */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Calculated Savings:</span>
              <span className="text-emerald-400 font-black text-sm">₹{savings}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block">Calculated Discount:</span>
              <span className="text-amber-400 font-black text-sm">{discountPercent}% OFF</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Product Photo URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Product details, package weight, ingredients..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg uppercase tracking-wider"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
