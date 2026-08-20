'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { useApp } from '@/context/AppContext';
import { FileSpreadsheet, Upload, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CSVImportPage() {
  const router = useRouter();
  const { addProduct } = useApp();

  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [validRows, setValidRows] = useState<any[]>([]);
  const [invalidRows, setInvalidRows] = useState<any[]>([]);
  const [importedSuccess, setImportedSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;
          setParsedRows(rows);

          const valid: any[] = [];
          const invalid: any[] = [];

          rows.forEach((row: any, idx: number) => {
            const name = row['Product Name'] || row['product_name'] || row['Name'];
            const mrp = Number(row['MRP'] || row['mrp']);
            const offerPrice = Number(row['Offer Price'] || row['offer_price'] || row['Price']);

            if (name && mrp > 0 && offerPrice > 0 && offerPrice <= mrp) {
              valid.push({
                ...row,
                _id: idx,
                name,
                mrp,
                offerPrice,
                brand: row['Brand'] || 'Supermarket Brand',
                category: row['Category'] || 'Grocery'
              });
            } else {
              invalid.push({
                ...row,
                _id: idx,
                reason: !name ? 'Missing Name' : mrp <= 0 ? 'Invalid MRP' : 'Offer Price > MRP'
              });
            }
          });

          setValidRows(valid);
          setInvalidRows(invalid);
        }
      });
    }
  };

  const handleConfirmImport = () => {
    validRows.forEach((r) => {
      addProduct({
        name: r.name,
        nameMl: r['Malayalam Name'] || r.name,
        brand: r.brand,
        categoryId: 'cat-1',
        description: `Imported product: ${r.name}`,
        mrp: r.mrp,
        offerPrice: r.offerPrice,
        sku: `SKU-IMP-${Math.floor(1000 + Math.random() * 9000)}`,
        barcode: `8901${Math.floor(10000000 + Math.random() * 90000000)}`,
        stockStatus: 'in_stock',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
        featured: false,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2026-12-31'
      });
    });

    setImportedSuccess(true);
    setTimeout(() => {
      router.push('/admin/products');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-400" />
            <span>Excel / CSV Bulk Product Importer</span>
          </h1>
          <p className="text-xs text-slate-400">
            Upload CSV file with columns: Product Name, Brand, Category, MRP, Offer Price.
          </p>
        </div>

        {/* Upload Dropzone */}
        <div className="border-2 border-dashed border-slate-700 hover:border-blue-400 rounded-2xl p-8 text-center bg-slate-950/60 transition-colors">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-file-input"
          />
          <label htmlFor="csv-file-input" className="cursor-pointer space-y-3 block">
            <Upload className="w-10 h-10 text-blue-400 mx-auto" />
            <div className="text-sm font-bold text-white">Click to Select CSV File</div>
            <div className="text-xs text-slate-400">Column Format: Product Name, Brand, Category, MRP, Offer Price</div>
          </label>
        </div>

        {/* Validation Summary */}
        {parsedRows.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-2xl font-black text-white">{parsedRows.length}</div>
                <div className="text-[11px] text-slate-400 font-bold">Total Rows</div>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/30">
                <div className="text-2xl font-black text-emerald-400">{validRows.length}</div>
                <div className="text-[11px] text-emerald-300 font-bold">Valid Rows</div>
              </div>
              <div className="bg-red-950/60 p-4 rounded-2xl border border-red-500/30">
                <div className="text-2xl font-black text-red-400">{invalidRows.length}</div>
                <div className="text-[11px] text-red-300 font-bold">Invalid / Skipped</div>
              </div>
            </div>

            {/* Valid Rows Preview Table */}
            {validRows.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-slate-300">Valid Rows Ready to Import ({validRows.length})</h3>
                <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs">
                  {validRows.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border-b border-slate-900 last:border-0">
                      <span className="font-bold text-white">{r.name} ({r.brand})</span>
                      <span className="text-emerald-400 font-extrabold">MRP ₹{r.mrp} ➔ Offer ₹{r.offerPrice}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {importedSuccess && (
              <div className="bg-emerald-600 text-white p-4 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Successfully imported {validRows.length} products to database! Redirecting...</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleConfirmImport}
                disabled={validRows.length === 0 || importedSuccess}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg uppercase tracking-wider disabled:opacity-50"
              >
                IMPORT {validRows.length} PRODUCTS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
