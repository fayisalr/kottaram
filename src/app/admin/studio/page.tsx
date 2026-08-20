'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import {
  PosterCanvas,
  PosterCanvasConfig,
  PosterCanvasRef,
  CanvasElementId,
  CanvasFontFamily,
  CanvasFontWeight,
  CanvasTextTransform,
  CanvasTextShadow
} from '@/components/poster/PosterCanvas';
import { PosterEditorControls } from '@/components/poster/PosterEditorControls';
import { removeBackground } from '@/services/aiImageService';
import { PosterTemplate, AspectRatio, PosterLanguage, Product } from '@/types';
import {
  Sparkles,
  Upload,
  Wand2,
  CheckCircle2,
  Share2,
  Download,
  ArrowRight,
  RefreshCw,
  Image as ImageIcon,
  Check,
  Eye,
  EyeOff,
  Maximize2,
  Copy,
  Layers,
  Compass,
  FileImage,
  Rows
} from 'lucide-react';

export default function AIPosterStudioPage() {
  const {
    products,
    templates,
    branding,
    savePoster,
    generateWhatsAppShareText,
    incrementWhatsAppShares,
    quickPosterProduct,
    setQuickPosterProduct
  } = useApp();

  const canvasRef = useRef<PosterCanvasRef | null>(null);

  // Workflow steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessingBg, setIsProcessingBg] = useState<boolean>(false);
  const [bgRemovedSuccess, setBgRemovedSuccess] = useState<boolean>(false);
  const [copiedImageSuccess, setCopiedImageSuccess] = useState<boolean>(false);

  // Canvas Inspector Display Settings
  const [previewWidth, setPreviewWidth] = useState<number>(480);

  // Form State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(quickPosterProduct || products[0]);
  const [uploadedImage, setUploadedImage] = useState<string>(
    selectedProduct ? selectedProduct.imageUrl : products[0].imageUrl
  );

  const [productName, setProductName] = useState<string>(selectedProduct ? selectedProduct.name : 'Samsung 43-inch 4K Smart TV\nCrystal Processor | HDR10+ Audio');
  const [productNameMl, setProductNameMl] = useState<string>(selectedProduct ? selectedProduct.nameMl : 'സാംസങ് 43 ഇഞ്ച് 4K സ്മാർട്ട് ടിവി\nപലിശയില്ലാത്ത 0% No Cost EMI ഓഫറിൽ!');
  const [brand, setBrand] = useState<string>(selectedProduct ? selectedProduct.brand : 'Samsung');
  const [mrp, setMrp] = useState<number>(selectedProduct ? selectedProduct.mrp : 44900);
  const [offerPrice, setOfferPrice] = useState<number>(selectedProduct ? selectedProduct.offerPrice : 32990);
  const [language, setLanguage] = useState<PosterLanguage>('en');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplate>(templates[0]);

  // Selected element & character adjustments
  const [selectedElement, setSelectedElement] = useState<CanvasElementId>('product_name');
  const [productScale, setProductScale] = useState<number>(1.0);
  const [productOffsetX, setProductOffsetX] = useState<number>(0);
  const [productOffsetY, setProductOffsetY] = useState<number>(0);

  const [nameFontSizeMultiplier, setNameFontSizeMultiplier] = useState<number>(1.0);
  const [nameOffsetX, setNameOffsetX] = useState<number>(0);
  const [nameOffsetY, setNameOffsetY] = useState<number>(0);
  const [nameTextColor, setNameTextColor] = useState<string>('#ffffff');
  const [nameTextAlign, setNameTextAlign] = useState<'left' | 'center' | 'right'>('center');

  // Full Character Typography & Multi-line Expansion
  const [fontFamily, setFontFamily] = useState<CanvasFontFamily>('sans');
  const [fontWeight, setFontWeight] = useState<CanvasFontWeight>('black');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [textTransform, setTextTransform] = useState<CanvasTextTransform>('none');
  const [textShadow, setTextShadow] = useState<CanvasTextShadow>('drop');
  const [lineHeightMultiplier, setLineHeightMultiplier] = useState<number>(1.25);

  const [badgeTextOverride, setBadgeTextOverride] = useState<string>('');
  const [badgeOffsetX, setBadgeOffsetX] = useState<number>(0);
  const [badgeOffsetY, setBadgeOffsetY] = useState<number>(0);
  const [badgeBgColor, setBadgeBgColor] = useState<string>('');

  const [priceTagOffsetX, setPriceTagOffsetX] = useState<number>(0);
  const [priceTagOffsetY, setPriceTagOffsetY] = useState<number>(0);
  const [priceTextColor, setPriceTextColor] = useState<string>('#facc15');
  const [priceSuffixText, setPriceSuffixText] = useState<string | undefined>(undefined);

  // Offer Tag / Discount Sticker adjustments
  const [offerTagStyle, setOfferTagStyle] = useState<'burst' | 'circle' | 'pill' | 'ribbon' | 'square'>('burst');
  const [offerTagBgColor, setOfferTagBgColor] = useState<string>('#dc2626');
  const [offerTagTextColor, setOfferTagTextColor] = useState<string>('#ffffff');
  const [offerTagTextOverride, setOfferTagTextOverride] = useState<string>('');
  const [offerTagScale, setOfferTagScale] = useState<number>(1.0);
  const [offerTagOffsetX, setOfferTagOffsetX] = useState<number>(0);
  const [offerTagOffsetY, setOfferTagOffsetY] = useState<number>(0);

  const [storeHeaderOffsetX, setStoreHeaderOffsetX] = useState<number>(0);
  const [storeHeaderOffsetY, setStoreHeaderOffsetY] = useState<number>(0);

  const savings = Math.max(0, mrp - offerPrice);
  const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;
  const lineCount = (productName.split('\n').length || 1) + (productNameMl ? productNameMl.split('\n').length : 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setBgRemovedSuccess(false);
    }
  };

  const handleSelectCatalogProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setUploadedImage(prod.imageUrl);
    setProductName(prod.name);
    setProductNameMl(prod.nameMl);
    setBrand(prod.brand);
    setMrp(prod.mrp);
    setOfferPrice(prod.offerPrice);
    setBgRemovedSuccess(false);
  };

  const handleRemoveBackground = async () => {
    setIsProcessingBg(true);
    try {
      const transparentPng = await removeBackground(uploadedImage, { threshold: 235, addShadow: false });
      setUploadedImage(transparentPng);
      setBgRemovedSuccess(true);
    } catch (err) {
      console.error('BG removal error:', err);
    } finally {
      setIsProcessingBg(false);
    }
  };

  const posterConfig: PosterCanvasConfig = {
    productName,
    productNameMl,
    brand,
    mrp,
    offerPrice,
    discountPercent,
    savings,
    productImageUrl: uploadedImage,
    language,
    aspectRatio,
    template: selectedTemplate,
    branding,
    selectedElement,
    productScale,
    productOffsetX,
    productOffsetY,
    nameFontSizeMultiplier,
    nameOffsetX,
    nameOffsetY,
    nameTextColor,
    nameTextAlign,
    fontFamily,
    fontWeight,
    fontStyle,
    textTransform,
    textShadow,
    lineHeightMultiplier,
    badgeTextOverride,
    badgeOffsetX,
    badgeOffsetY,
    badgeBgColor,
    priceTagOffsetX,
    priceTagOffsetY,
    priceTextColor,
    priceSuffixText,
    offerTagStyle,
    offerTagBgColor,
    offerTagTextColor,
    offerTagTextOverride,
    offerTagScale,
    offerTagOffsetX,
    offerTagOffsetY,
    storeHeaderOffsetX,
    storeHeaderOffsetY,
  };

  const handleUpdateConfig = (updates: Partial<PosterCanvasConfig>) => {
    if (updates.productName !== undefined) setProductName(updates.productName);
    if (updates.productNameMl !== undefined) setProductNameMl(updates.productNameMl);
    if (updates.mrp !== undefined) setMrp(updates.mrp);
    if (updates.offerPrice !== undefined) setOfferPrice(updates.offerPrice);
    if (updates.language !== undefined) setLanguage(updates.language);
    if (updates.aspectRatio !== undefined) setAspectRatio(updates.aspectRatio);
    if (updates.template !== undefined) setSelectedTemplate(updates.template);

    if (updates.selectedElement !== undefined) setSelectedElement(updates.selectedElement);
    if (updates.productScale !== undefined) setProductScale(updates.productScale);
    if (updates.productOffsetX !== undefined) setProductOffsetX(updates.productOffsetX);
    if (updates.productOffsetY !== undefined) setProductOffsetY(updates.productOffsetY);

    if (updates.nameFontSizeMultiplier !== undefined) setNameFontSizeMultiplier(updates.nameFontSizeMultiplier);
    if (updates.nameOffsetX !== undefined) setNameOffsetX(updates.nameOffsetX);
    if (updates.nameOffsetY !== undefined) setNameOffsetY(updates.nameOffsetY);
    if (updates.nameTextColor !== undefined) setNameTextColor(updates.nameTextColor);
    if (updates.nameTextAlign !== undefined) setNameTextAlign(updates.nameTextAlign);

    if (updates.fontFamily !== undefined) setFontFamily(updates.fontFamily);
    if (updates.fontWeight !== undefined) setFontWeight(updates.fontWeight);
    if (updates.fontStyle !== undefined) setFontStyle(updates.fontStyle);
    if (updates.textTransform !== undefined) setTextTransform(updates.textTransform);
    if (updates.textShadow !== undefined) setTextShadow(updates.textShadow);
    if (updates.lineHeightMultiplier !== undefined) setLineHeightMultiplier(updates.lineHeightMultiplier);

    if (updates.badgeTextOverride !== undefined) setBadgeTextOverride(updates.badgeTextOverride);
    if (updates.badgeOffsetX !== undefined) setBadgeOffsetX(updates.badgeOffsetX);
    if (updates.badgeOffsetY !== undefined) setBadgeOffsetY(updates.badgeOffsetY);
    if (updates.badgeBgColor !== undefined) setBadgeBgColor(updates.badgeBgColor);

    if (updates.priceTagOffsetX !== undefined) setPriceTagOffsetX(updates.priceTagOffsetX);
    if (updates.priceTagOffsetY !== undefined) setPriceTagOffsetY(updates.priceTagOffsetY);
    if (updates.priceTextColor !== undefined) setPriceTextColor(updates.priceTextColor);
    if (updates.priceSuffixText !== undefined) setPriceSuffixText(updates.priceSuffixText);

    if (updates.offerTagStyle !== undefined) setOfferTagStyle(updates.offerTagStyle);
    if (updates.offerTagBgColor !== undefined) setOfferTagBgColor(updates.offerTagBgColor);
    if (updates.offerTagTextColor !== undefined) setOfferTagTextColor(updates.offerTagTextColor);
    if (updates.offerTagTextOverride !== undefined) setOfferTagTextOverride(updates.offerTagTextOverride);
    if (updates.offerTagScale !== undefined) setOfferTagScale(updates.offerTagScale);
    if (updates.offerTagOffsetX !== undefined) setOfferTagOffsetX(updates.offerTagOffsetX);
    if (updates.offerTagOffsetY !== undefined) setOfferTagOffsetY(updates.offerTagOffsetY);

    if (updates.storeHeaderOffsetX !== undefined) setStoreHeaderOffsetX(updates.storeHeaderOffsetX);
    if (updates.storeHeaderOffsetY !== undefined) setStoreHeaderOffsetY(updates.storeHeaderOffsetY);
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.exportPNG();
    const link = document.createElement('a');
    link.download = `Poster-${productName.replace(/[^a-z0-9]/gi, '_')}.png`;
    link.href = dataUrl;
    link.click();

    savePoster({
      productId: selectedProduct?.id || 'prod-custom',
      productName,
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      language,
      aspectRatio,
      imageDataUrl: dataUrl,
      createdBy: 'Admin'
    });
  };

  const handleDownloadJPG = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.exportJPG();
    const link = document.createElement('a');
    link.download = `Poster-${productName.replace(/[^a-z0-9]/gi, '_')}.jpg`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyImageToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.exportPNG();
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopiedImageSuccess(true);
      setTimeout(() => setCopiedImageSuccess(false), 2500);
    } catch (err) {
      console.error('Clipboard error:', err);
    }
  };

  const handleShareWhatsApp = () => {
    const fakeProduct: Product = {
      id: selectedProduct?.id || 'prod-custom',
      name: productName,
      nameMl: productNameMl,
      brand,
      categoryId: 'cat-1',
      description: '',
      mrp,
      offerPrice,
      discountPercent,
      savings,
      sku: '',
      barcode: '',
      stockStatus: 'in_stock',
      imageUrl: uploadedImage,
      featured: true,
      startDate: '',
      endDate: '',
      views: 0,
      shares: 0,
      createdAt: ''
    };

    incrementWhatsAppShares(fakeProduct.id);
    const text = generateWhatsAppShareText(fakeProduct, language === 'ml' ? 'ml' : 'en');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const workflowSteps = [
    { num: 1, label: 'Upload Photo' },
    { num: 2, label: 'AI BG Removal' },
    { num: 3, label: 'Offer Details' },
    { num: 4, label: 'Select Template' },
    { num: 5, label: 'Studio Inspector' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>KOTTARAM HOME NEEDS AI MARKETING STUDIO</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">AI Offer Poster Generator</h1>
          <p className="text-xs text-slate-400">
            Customize Price Tag Suffix: Select "ONLY / മാത്രം", "ONLY", "മാത്രം", "SPECIAL DEAL" or Custom Text.
          </p>
        </div>

        {/* Progress Workflow Indicator */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {workflowSteps.map((step) => (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentStep === step.num
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : currentStep > step.num
                  ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-950/60 flex items-center justify-center text-[10px]">
                {step.num}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Steps Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* STEP 1: Upload / Select Product Photo */}
          {currentStep === 1 && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl animate-in fade-in-50">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-400" />
                <span>Step 1: Upload or Pick Product Photo</span>
              </h3>

              <div className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-6 text-center space-y-3 bg-slate-950/60 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="product-photo-input"
                />
                <label htmlFor="product-photo-input" className="cursor-pointer block space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-white">Click to Upload Appliance Image</div>
                  <p className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP (Max 10MB)</p>
                </label>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Or Pick From Showroom Catalog:
                </label>
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectCatalogProduct(p)}
                      className={`p-1.5 rounded-xl border text-center transition-all ${
                        selectedProduct?.id === p.id
                          ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <img src={p.imageUrl} alt={p.name} className="w-full h-16 object-cover rounded-lg mb-1" />
                      <div className="text-[10px] font-bold text-white truncate">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  <span>Next: Background AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Background Removal AI */}
          {currentStep === 2 && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl animate-in fade-in-50">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-amber-400" />
                <span>Step 2: AI Appliance Subject Isolation & BG Removal</span>
              </h3>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                <img
                  src={uploadedImage}
                  alt="Product preview"
                  className="w-24 h-24 object-contain rounded-xl border border-slate-800 bg-slate-900"
                />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">Appliance Photo Selected</div>
                  <p className="text-[11px] text-slate-400">
                    Isolate appliance photo on transparent PNG background for clean poster output.
                  </p>
                  {bgRemovedSuccess && (
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Background Successfully Removed!
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleRemoveBackground}
                disabled={isProcessingBg}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs rounded-xl shadow-lg disabled:opacity-50"
              >
                {isProcessingBg ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing AI Isolation...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Run AI Background Removal</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-slate-400 hover:text-white font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  <span>Next: Offer Pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Enter Details & Pricing */}
          {currentStep === 3 && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl animate-in fade-in-50">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Step 3: Enter Appliance & Offer Pricing</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Appliance Name (English)</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Malayalam Title (മലയാളം)</label>
                  <input
                    type="text"
                    value={productNameMl}
                    onChange={(e) => setProductNameMl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Offer Price (₹)</label>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Savings:</span>
                    <span className="font-extrabold text-emerald-400">₹{savings.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Discount:</span>
                    <span className="font-extrabold text-amber-400">{discountPercent}% OFF</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-slate-400 hover:text-white font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  <span>Next: Choose Template</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 & 5: Interactive Studio Inspector */}
          {(currentStep === 4 || currentStep === 5) && (
            <PosterEditorControls
              config={posterConfig}
              onChange={handleUpdateConfig}
              onDownloadPNG={handleDownloadPNG}
              onDownloadJPG={handleDownloadJPG}
              onShareWhatsApp={handleShareWhatsApp}
              templates={templates}
            />
          )}
        </div>

        {/* Right Column: Upgraded Interactive Canvas Inspector Output Panel */}
        <div className="lg:col-span-6 sticky top-8 space-y-4">
          {/* Inspector Header & Controls */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Interactive Canvas Inspector Output</span>
              </h3>
            </div>

            {/* Quick Canvas View Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleUpdateConfig({ selectedElement: 'none' })}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                  selectedElement === 'none'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Deselect element to hide selection outline box"
              >
                {selectedElement === 'none' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{selectedElement === 'none' ? 'Clean View' : 'Hide Outlines'}</span>
              </button>

              {/* Preview Size Toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-bold">
                <button
                  onClick={() => setPreviewWidth(400)}
                  className={`px-2 py-0.5 rounded transition-all ${
                    previewWidth === 400 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  100%
                </button>
                <button
                  onClick={() => setPreviewWidth(480)}
                  className={`px-2 py-0.5 rounded transition-all ${
                    previewWidth === 480 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  125% HD
                </button>
              </div>
            </div>
          </div>

          {/* Main Poster Canvas Render Display */}
          <div className="flex flex-col items-center justify-center">
            <PosterCanvas
              ref={canvasRef}
              config={posterConfig}
              width={previewWidth}
              onSelectElement={(elem) => handleUpdateConfig({ selectedElement: elem })}
            />
          </div>

          {/* Active Element Parameter Status Strip */}
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Compass className="w-4 h-4" />
                Target Element: <span className="text-white uppercase font-black">{selectedElement.replace('_', ' ')}</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Rows className="w-3.5 h-3.5" />
                Multi-Line: {lineCount} Lines Auto-Expanded
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Position Offset</span>
                <span className="font-mono font-bold text-amber-300">
                  X:{
                    selectedElement === 'product_name' ? nameOffsetX :
                    selectedElement === 'product_photo' ? productOffsetX :
                    selectedElement === 'badge_header' ? badgeOffsetX :
                    selectedElement === 'price_tag' ? priceTagOffsetX :
                    selectedElement === 'offer_tag' ? offerTagOffsetX :
                    storeHeaderOffsetX
                  }px | Y:{
                    selectedElement === 'product_name' ? nameOffsetY :
                    selectedElement === 'product_photo' ? productOffsetY :
                    selectedElement === 'badge_header' ? badgeOffsetY :
                    selectedElement === 'price_tag' ? priceTagOffsetY :
                    selectedElement === 'offer_tag' ? offerTagOffsetY :
                    storeHeaderOffsetY
                  }px
                </span>
              </div>

              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Font & Line Height</span>
                <span className="font-mono font-bold text-sky-300 capitalize">
                  {fontFamily} ({lineHeightMultiplier}x)
                </span>
              </div>

              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Offer Discount</span>
                <span className="font-mono font-bold text-emerald-400">
                  {discountPercent}% OFF (Save ₹{savings.toLocaleString('en-IN')})
                </span>
              </div>

              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Price Suffix Text</span>
                <span className="font-mono font-bold text-purple-300 uppercase truncate block">
                  {priceSuffixText !== undefined ? (priceSuffixText || 'None') : 'Default'}
                </span>
              </div>
            </div>
          </div>

          {/* Export & Share Toolbar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPNG}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>PNG High-Res</span>
              </button>

              <button
                onClick={handleDownloadJPG}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 transition-all"
              >
                <FileImage className="w-4 h-4" />
                <span>JPG</span>
              </button>

              <button
                onClick={handleCopyImageToClipboard}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 transition-all"
                title="Copy poster image to clipboard"
              >
                {copiedImageSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedImageSuccess ? 'Copied!' : 'Copy Image'}</span>
              </button>
            </div>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded-xl text-xs shadow-lg transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
