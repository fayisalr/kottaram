'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Product } from '@/types';
import {
  ShoppingBag,
  PlusCircle,
  FileSpreadsheet,
  Search,
  Sparkles,
  Edit,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Check
} from 'lucide-react';

export default function AdminProductsPage() {
  const router = useRouter();
  const { products, categories, updateProduct, deleteProduct, duplicateProduct, setQuickPosterProduct } = useApp();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editSuccessMsg, setEditSuccessMsg] = useState('');

  const filtered = products.filter((p) => {
    const matchCat = catFilter === 'all' || p.categoryId === catFilter;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameMl.includes(search) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleGeneratePosterForProduct = (prod: Product) => {
    setQuickPosterProduct(prod);
    router.push('/admin/studio');
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      nameMl: editingProduct.nameMl,
      brand: editingProduct.brand,
      categoryId: editingProduct.categoryId,
      mrp: editingProduct.mrp,
      offerPrice: editingProduct.offerPrice,
      sku: editingProduct.sku,
      stockStatus: editingProduct.stockStatus,
      imageUrl: editingProduct.imageUrl,
      featured: editingProduct.featured,
    });

    setEditSuccessMsg(`Successfully updated "${editingProduct.name}"!`);
    setEditingProduct(null);
    setTimeout(() => setEditSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>APPLIANCE CATALOG MANAGEMENT</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Showroom Appliances ({products.length})</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/import"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold rounded-xl text-xs border border-slate-800"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            <span>CSV Import</span>
          </Link>
          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Appliance</span>
          </Link>
        </div>
      </div>

      {/* Success Notification Alert */}
      {editSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs font-bold animate-in fade-in-50">
          <CheckCircle2 className="w-5 h-5" />
          <span>{editSuccessMsg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <input
            type="text"
            placeholder="Search appliance name, Malayalam name, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </div>
        <div className="sm:col-span-4">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Appliance</th>
                <th className="p-4">Brand</th>
                <th className="p-4">MRP / Offer Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 object-cover rounded-xl border border-slate-800" />
                      <div>
                        <div className="font-bold text-white text-xs">{prod.name}</div>
                        <div className="text-[11px] text-amber-300 font-medium">{prod.nameMl}</div>
                        <div className="text-[10px] text-slate-500 font-mono">SKU: {prod.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-300">{prod.brand}</td>
                  <td className="p-4">
                    <div className="text-slate-400 line-through text-[11px]">MRP ₹{prod.mrp.toLocaleString('en-IN')}</div>
                    <div className="font-extrabold text-amber-400 text-sm">₹{prod.offerPrice.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">Save ₹{prod.savings.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-red-600/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full font-black text-[11px]">
                      {prod.discountPercent}% OFF
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        prod.stockStatus === 'in_stock'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : prod.stockStatus === 'low_stock'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {prod.stockStatus === 'in_stock'
                        ? 'In Stock'
                        : prod.stockStatus === 'low_stock'
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingProduct({ ...prod })}
                        className="px-2.5 py-1.5 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 rounded-lg font-bold text-[11px] border border-sky-500/30 flex items-center gap-1 transition-all"
                        title="Edit Appliance Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleGeneratePosterForProduct(prod)}
                        className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg font-bold text-[11px] border border-amber-500/30 flex items-center gap-1 transition-all"
                        title="Generate Offer Poster"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Poster</span>
                      </button>
                      <button
                        onClick={() => duplicateProduct(prod.id)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${prod.name}?`)) deleteProduct(prod.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT PRODUCT MODAL POPUP */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">Edit Appliance Details</h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Appliance Name (English)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Malayalam Name (മലയാളം)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameMl}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameMl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.nameMl})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.mrp}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Offer Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.offerPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, offerPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Stock Status</label>
                  <select
                    value={editingProduct.stockStatus}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-bold"
                  >
                    <option value="in_stock">In Stock (ലഭ്യമാണ്)</option>
                    <option value="low_stock">Low Stock (കുറഞ്ഞ സ്റ്റോക്ക്)</option>
                    <option value="out_of_stock">Out of Stock (സ്റ്റോക്ക് തീർന്നു)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Appliance Photo Image URL</label>
                <input
                  type="text"
                  required
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Appliance Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
