'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  PosterCanvasConfig,
  CanvasElementId,
  CanvasFontFamily,
  CanvasFontWeight,
  CanvasTextTransform,
  CanvasTextShadow
} from './PosterCanvas';
import { PosterTemplate, AspectRatio, PosterLanguage } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Download,
  Share2,
  Move,
  RefreshCw,
  Copy,
  Check,
  Type,
  ImageIcon,
  Tag as TagIcon,
  DollarSign,
  Store,
  Layers,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Flame,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Compass,
  Rows
} from 'lucide-react';

interface PosterEditorControlsProps {
  config: PosterCanvasConfig;
  onChange: (updated: Partial<PosterCanvasConfig>) => void;
  onDownloadPNG: () => void;
  onDownloadJPG: () => void;
  onShareWhatsApp: () => void;
  templates: PosterTemplate[];
}

export const PosterEditorControls: React.FC<PosterEditorControlsProps> = ({
  config,
  onChange,
  onDownloadPNG,
  onDownloadJPG,
  onShareWhatsApp,
  templates,
}) => {
  const { generateAIPromotionalText } = useApp();
  const [copiedAiText, setCopiedAiText] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');

  const textEngRef = useRef<HTMLTextAreaElement | null>(null);
  const textMlRef = useRef<HTMLTextAreaElement | null>(null);

  const activeElement: CanvasElementId = config.selectedElement || 'product_name';

  const handleSelectElement = (elem: CanvasElementId) => {
    onChange({ selectedElement: elem });
  };

  // Auto expand textarea height on input
  const adjustTextareaHeight = (element: HTMLTextAreaElement | null) => {
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    adjustTextareaHeight(textEngRef.current);
    adjustTextareaHeight(textMlRef.current);
  }, [config.productName, config.productNameMl]);

  const handleGenerateAiText = () => {
    const text = generateAIPromotionalText(
      config.productName,
      config.mrp,
      config.offerPrice,
      config.language,
      config.template.name
    );
    setGeneratedCopy(text);
  };

  const handleCopyAiText = () => {
    if (!generatedCopy) return;
    navigator.clipboard.writeText(generatedCopy);
    setCopiedAiText(true);
    setTimeout(() => setCopiedAiText(false), 2000);
  };

  const nudgeElement = (deltaX: number, deltaY: number) => {
    if (activeElement === 'product_name') {
      onChange({
        nameOffsetX: (config.nameOffsetX || 0) + deltaX,
        nameOffsetY: (config.nameOffsetY || 0) + deltaY
      });
    } else if (activeElement === 'product_photo') {
      onChange({
        productOffsetX: (config.productOffsetX || 0) + deltaX,
        productOffsetY: (config.productOffsetY || 0) + deltaY
      });
    } else if (activeElement === 'badge_header') {
      onChange({
        badgeOffsetX: (config.badgeOffsetX || 0) + deltaX,
        badgeOffsetY: (config.badgeOffsetY || 0) + deltaY
      });
    } else if (activeElement === 'price_tag') {
      onChange({
        priceTagOffsetX: (config.priceTagOffsetX || 0) + deltaX,
        priceTagOffsetY: (config.priceTagOffsetY || 0) + deltaY
      });
    } else if (activeElement === 'offer_tag') {
      onChange({
        offerTagOffsetX: (config.offerTagOffsetX || 0) + deltaX,
        offerTagOffsetY: (config.offerTagOffsetY || 0) + deltaY
      });
    } else if (activeElement === 'store_header') {
      onChange({
        storeHeaderOffsetX: (config.storeHeaderOffsetX || 0) + deltaX,
        storeHeaderOffsetY: (config.storeHeaderOffsetY || 0) + deltaY
      });
    }
  };

  const colorPresets = ['#ffffff', '#fde047', '#38bdf8', '#4ade80', '#f43f5e', '#a855f7', '#000000'];
  const tagBgColors = ['#dc2626', '#0284c7', '#059669', '#ca8a04', '#7e22ce', '#0f172a'];

  const currentSuffix = config.priceSuffixText !== undefined 
    ? config.priceSuffixText 
    : (config.language === 'en' ? 'ONLY' : config.language === 'ml' ? 'മാത്രം' : 'ONLY / മാത്രം');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-white">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-extrabold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            AI Poster Studio & Auto-Expanding Text Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Multi-line text fields automatically expand downwards line by line on both form and poster canvas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDownloadPNG}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/30"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <button
            onClick={onShareWhatsApp}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-green-500/30"
          >
            <Share2 className="w-4 h-4" />
            Share WhatsApp
          </button>
        </div>
      </div>

      {/* Interactive Element Selection Bar */}
      <div>
        <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
          Select Element To Customize:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <button
            onClick={() => handleSelectElement('product_name')}
            className={`p-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeElement === 'product_name'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Title (Multi-line)</span>
          </button>

          <button
            onClick={() => handleSelectElement('offer_tag')}
            className={`p-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeElement === 'offer_tag'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Offer Tag</span>
          </button>

          <button
            onClick={() => handleSelectElement('product_photo')}
            className={`p-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeElement === 'product_photo'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo</span>
          </button>

          <button
            onClick={() => handleSelectElement('badge_header')}
            className={`p-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeElement === 'badge_header'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <TagIcon className="w-4 h-4" />
            <span>Badge</span>
          </button>

          <button
            onClick={() => handleSelectElement('price_tag')}
            className={`p-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeElement === 'price_tag'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Price Box</span>
          </button>

          <button
            onClick={() => handleSelectElement('store_header')}
            className={`p-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeElement === 'store_header'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Header</span>
          </button>
        </div>
      </div>

      {/* Directional Position Controller */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-950 to-sky-500/10 p-4 rounded-2xl border border-amber-500/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              Move Element ({activeElement.replace('_', ' ')}) Downwards & To Sides
            </h4>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            X: {
              activeElement === 'product_name' ? config.nameOffsetX || 0 :
              activeElement === 'product_photo' ? config.productOffsetX || 0 :
              activeElement === 'badge_header' ? config.badgeOffsetX || 0 :
              activeElement === 'price_tag' ? config.priceTagOffsetX || 0 :
              activeElement === 'offer_tag' ? config.offerTagOffsetX || 0 :
              config.storeHeaderOffsetX || 0
            }px | Y: {
              activeElement === 'product_name' ? config.nameOffsetY || 0 :
              activeElement === 'product_photo' ? config.productOffsetY || 0 :
              activeElement === 'badge_header' ? config.badgeOffsetY || 0 :
              activeElement === 'price_tag' ? config.priceTagOffsetY || 0 :
              activeElement === 'offer_tag' ? config.offerTagOffsetY || 0 :
              config.storeHeaderOffsetY || 0
            }px
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 flex flex-col items-center justify-center">
            <button
              onClick={() => nudgeElement(0, -10)}
              className="p-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 rounded-t-xl transition-all"
              title="Move Upwards"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => nudgeElement(-10, 0)}
                className="p-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 rounded-l-xl transition-all"
                title="Move Left (Sides)"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (activeElement === 'product_name') onChange({ nameOffsetX: 0, nameOffsetY: 0 });
                  else if (activeElement === 'product_photo') onChange({ productOffsetX: 0, productOffsetY: 0 });
                  else if (activeElement === 'badge_header') onChange({ badgeOffsetX: 0, badgeOffsetY: 0 });
                  else if (activeElement === 'price_tag') onChange({ priceTagOffsetX: 0, priceTagOffsetY: 0 });
                  else if (activeElement === 'offer_tag') onChange({ offerTagOffsetX: 0, offerTagOffsetY: 0 });
                  else onChange({ storeHeaderOffsetX: 0, storeHeaderOffsetY: 0 });
                }}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded transition-all"
                title="Reset Position"
              >
                Reset
              </button>
              <button
                onClick={() => nudgeElement(10, 0)}
                className="p-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 rounded-r-xl transition-all"
                title="Move Right (Sides)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => nudgeElement(0, 10)}
              className="p-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 rounded-b-xl transition-all"
              title="Move Downwards"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:col-span-7 space-y-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-0.5">
                Horizontal Position (Move Left / Right to Sides)
              </label>
              <input
                type="range"
                min="-300"
                max="300"
                step="5"
                value={
                  activeElement === 'product_name' ? config.nameOffsetX || 0 :
                  activeElement === 'product_photo' ? config.productOffsetX || 0 :
                  activeElement === 'badge_header' ? config.badgeOffsetX || 0 :
                  activeElement === 'price_tag' ? config.priceTagOffsetX || 0 :
                  activeElement === 'offer_tag' ? config.offerTagOffsetX || 0 :
                  config.storeHeaderOffsetX || 0
                }
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (activeElement === 'product_name') onChange({ nameOffsetX: val });
                  else if (activeElement === 'product_photo') onChange({ productOffsetX: val });
                  else if (activeElement === 'badge_header') onChange({ badgeOffsetX: val });
                  else if (activeElement === 'price_tag') onChange({ priceTagOffsetX: val });
                  else if (activeElement === 'offer_tag') onChange({ offerTagOffsetX: val });
                  else onChange({ storeHeaderOffsetX: val });
                }}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-0.5">
                Vertical Position (Move Downwards / Upwards)
              </label>
              <input
                type="range"
                min="-300"
                max="300"
                step="5"
                value={
                  activeElement === 'product_name' ? config.nameOffsetY || 0 :
                  activeElement === 'product_photo' ? config.productOffsetY || 0 :
                  activeElement === 'badge_header' ? config.badgeOffsetY || 0 :
                  activeElement === 'price_tag' ? config.priceTagOffsetY || 0 :
                  activeElement === 'offer_tag' ? config.offerTagOffsetY || 0 :
                  config.storeHeaderOffsetY || 0
                }
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (activeElement === 'product_name') onChange({ nameOffsetY: val });
                  else if (activeElement === 'product_photo') onChange({ productOffsetY: val });
                  else if (activeElement === 'badge_header') onChange({ badgeOffsetY: val });
                  else if (activeElement === 'price_tag') onChange({ priceTagOffsetX: val });
                  else if (activeElement === 'offer_tag') onChange({ offerTagOffsetY: val });
                  else onChange({ storeHeaderOffsetY: val });
                }}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Element Inspector Controls Panel */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-5">
        {/* PANEL: PRODUCT NAME & AUTO-EXPANDING MULTI-LINE TEXT */}
        {activeElement === 'product_name' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-4 h-4" />
                <span>Auto-Expanding Multi-Line Text Inspector</span>
              </h4>

              {/* Alignment Controls */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => onChange({ nameTextAlign: 'left' })}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    config.nameTextAlign === 'left' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Align Left"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onChange({ nameTextAlign: 'center' })}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    !config.nameTextAlign || config.nameTextAlign === 'center' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Align Center"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onChange({ nameTextAlign: 'right' })}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    config.nameTextAlign === 'right' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Align Right"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Auto-expanding Multi-line Textarea Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-400">
                    Product Title / Details (Multi-line supported)
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">Press Enter for new line</span>
                </div>
                <textarea
                  ref={textEngRef}
                  rows={2}
                  value={config.productName}
                  onChange={(e) => {
                    onChange({ productName: e.target.value });
                    adjustTextareaHeight(e.target);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white resize-none overflow-hidden transition-all focus:border-amber-500"
                  placeholder="Enter product title or multi-line description..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-400">
                    Malayalam Title / ഓഫർ വിവരങ്ങൾ (Multi-line)
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">മലയാളം വിവർത്തനം</span>
                </div>
                <textarea
                  ref={textMlRef}
                  rows={2}
                  value={config.productNameMl || ''}
                  onChange={(e) => {
                    onChange({ productNameMl: e.target.value });
                    adjustTextareaHeight(e.target);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white resize-none overflow-hidden transition-all focus:border-amber-500"
                  placeholder="ഉൽപന്ന വിവരങ്ങൾ ഒന്നിൽ കൂടുതൽ വരികളിൽ ഇവിടെ നൽകാം..."
                />
              </div>
            </div>

            {/* Character & Line Height Expansion Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Font Family</label>
                <select
                  value={config.fontFamily || 'sans'}
                  onChange={(e) => onChange({ fontFamily: e.target.value as CanvasFontFamily })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                >
                  <option value="sans">Sans-Serif (Modern)</option>
                  <option value="serif">Serif (Elegant)</option>
                  <option value="display">Heavy Display (Bold Impact)</option>
                  <option value="malayalam">Malayalam Noto</option>
                  <option value="mono">Monospace (Tech)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Font Weight</label>
                <select
                  value={config.fontWeight || 'black'}
                  onChange={(e) => onChange({ fontWeight: e.target.value as CanvasFontWeight })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                >
                  <option value="normal">Normal (400)</option>
                  <option value="semibold">SemiBold (600)</option>
                  <option value="bold">Bold (700)</option>
                  <option value="black">Heavy Black (900)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Multi-Line Height</label>
                <select
                  value={config.lineHeightMultiplier || 1.25}
                  onChange={(e) => onChange({ lineHeightMultiplier: parseFloat(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                >
                  <option value={1.0}>Tight (1.0x)</option>
                  <option value={1.25}>Normal (1.25x)</option>
                  <option value={1.5}>Relaxed (1.5x)</option>
                  <option value={1.8}>Spacious (1.8x)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Text Effect / Shadow</label>
                <select
                  value={config.textShadow || 'drop'}
                  onChange={(e) => onChange({ textShadow: e.target.value as CanvasTextShadow })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                >
                  <option value="none">Clean (Flat)</option>
                  <option value="drop">Drop Shadow</option>
                  <option value="glow">Golden Glow</option>
                  <option value="outline">Dark Outline</option>
                </select>
              </div>
            </div>

            {/* Font Size & Position Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Font Size Scale</label>
                <input
                  type="range"
                  min="0.6"
                  max="1.8"
                  step="0.05"
                  value={config.nameFontSizeMultiplier || 1.0}
                  onChange={(e) => onChange({ nameFontSizeMultiplier: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Text Color Accent</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {colorPresets.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => onChange({ nameTextColor: hex })}
                      style={{ backgroundColor: hex }}
                      className={`w-6 h-6 rounded-full border border-slate-700 transition-all ${
                        config.nameTextColor === hex ? 'ring-2 ring-amber-400 scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: OFFER TAG / DISCOUNT STICKER */}
        {activeElement === 'offer_tag' && (
          <div className="space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Offer Tag & Discount Sticker Customization</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Sticker Tag Label Text</label>
                <input
                  type="text"
                  placeholder="e.g. 27% OFF or SPECIAL DEAL"
                  value={config.offerTagTextOverride || `${config.discountPercent}% OFF`}
                  onChange={(e) => onChange({ offerTagTextOverride: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Sticker Shape Style</label>
                <select
                  value={config.offerTagStyle || 'burst'}
                  onChange={(e) => onChange({ offerTagStyle: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="burst">Burst Circle</option>
                  <option value="pill">Pill Ribbon</option>
                  <option value="square">Square Badge</option>
                  <option value="circle">Clean Circle</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Sticker Background Color</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {tagBgColors.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => onChange({ offerTagBgColor: hex })}
                      style={{ backgroundColor: hex }}
                      className={`w-6 h-6 rounded-full border border-slate-700 transition-all ${
                        config.offerTagBgColor === hex ? 'ring-2 ring-amber-400 scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Scale / Size</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={config.offerTagScale || 1.0}
                  onChange={(e) => onChange({ offerTagScale: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* PANEL: PRODUCT PHOTO */}
        {activeElement === 'product_photo' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                <span>Product Photo Controls</span>
              </h4>
              <button
                onClick={() => onChange({ productScale: 1.0, productOffsetX: 0, productOffsetY: 0 })}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3 h-3" /> Reset Photo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Zoom / Scale Size</label>
                <input
                  type="range"
                  min="0.4"
                  max="2.2"
                  step="0.05"
                  value={config.productScale || 1.0}
                  onChange={(e) => onChange({ productScale: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* PANEL: THEME BADGE */}
        {activeElement === 'badge_header' && (
          <div className="space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <TagIcon className="w-4 h-4" />
              <span>Theme Offer Badge Inspector</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Badge Banner Text</label>
                <input
                  type="text"
                  value={config.badgeTextOverride || config.template.badgeText}
                  onChange={(e) => onChange({ badgeTextOverride: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* PANEL: PRICE TAG & SUFFIX SELECTION */}
        {activeElement === 'price_tag' && (
          <div className="space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Price Box Inspector & Suffix Selector (ONLY / മാത്രം)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">MRP (₹)</label>
                <input
                  type="number"
                  value={config.mrp}
                  onChange={(e) => {
                    const mrp = Number(e.target.value);
                    const savings = Math.max(0, mrp - config.offerPrice);
                    const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;
                    onChange({ mrp, savings, discountPercent });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Offer Price (₹)</label>
                <input
                  type="number"
                  value={config.offerPrice}
                  onChange={(e) => {
                    const offerPrice = Number(e.target.value);
                    const savings = Math.max(0, config.mrp - offerPrice);
                    const discountPercent = config.mrp > 0 ? Math.round((savings / config.mrp) * 100) : 0;
                    onChange({ offerPrice, savings, discountPercent });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Selectable Suffix Text Options (ONLY / മാത്രം / ONLY / മാത്രം / None) */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="block text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                Price Suffix Text Label / വില സംഗ്രഹം:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  onClick={() => onChange({ priceSuffixText: 'ONLY / മാത്രം' })}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    currentSuffix === 'ONLY / മാത്രം'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  ONLY / മാത്രം
                </button>

                <button
                  onClick={() => onChange({ priceSuffixText: 'ONLY' })}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    currentSuffix === 'ONLY'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  ONLY
                </button>

                <button
                  onClick={() => onChange({ priceSuffixText: 'മാത്രം' })}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    currentSuffix === 'മാത്രം'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  മാത്രം
                </button>

                <button
                  onClick={() => onChange({ priceSuffixText: 'SPECIAL DEAL' })}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    currentSuffix === 'SPECIAL DEAL'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  SPECIAL DEAL
                </button>

                <button
                  onClick={() => onChange({ priceSuffixText: '' })}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    currentSuffix === ''
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  None (ഇല്ല)
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Custom Suffix Text</label>
                <input
                  type="text"
                  placeholder="e.g. SPECIAL OFFER or ഓഫർ വില"
                  value={config.priceSuffixText !== undefined ? config.priceSuffixText : ''}
                  onChange={(e) => onChange({ priceSuffixText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* PANEL: STORE HEADER */}
        {activeElement === 'store_header' && (
          <div className="space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-4 h-4" />
              <span>Store Header Branding Inspector</span>
            </h4>
            <p className="text-xs text-slate-400">
              Use the directional movement controller above to move the store header downwards or to the sides.
            </p>
          </div>
        )}
      </div>

      {/* Aspect Ratio & Language Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Poster Size & Aspect Ratio
          </label>
          <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['1:1', '9:16', '1.91:1', 'banner'] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => onChange({ aspectRatio: ratio })}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  config.aspectRatio === ratio
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {ratio === '1:1'
                  ? 'Square'
                  : ratio === '9:16'
                  ? 'Story'
                  : ratio === '1.91:1'
                  ? 'FB Post'
                  : 'Banner'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Language / ഭാഷ
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['en', 'ml', 'bilingual'] as PosterLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onChange({ language: lang })}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  config.language === lang
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'ml' ? 'മലയാളം' : 'Bilingual'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Select Template */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Select Poster Theme ({templates.length} Themes Available)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto pr-1">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ template: t })}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                config.template.id === t.id
                  ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.styleCategory}
              </div>
              <div className="text-xs font-extrabold text-amber-400 mt-1 truncate">
                {t.name}
              </div>
              <div className="text-[10px] font-medium text-slate-300 mt-0.5 truncate">
                {t.nameMl}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Copywriting Tool */}
      <div className="bg-gradient-to-br from-amber-500/10 via-slate-950 to-sky-500/10 p-4 rounded-xl border border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              AI Promotional Text Generator
            </h4>
          </div>
          <button
            onClick={handleGenerateAiText}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md"
          >
            Generate Copy
          </button>
        </div>

        {generatedCopy && (
          <div className="relative bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap">
            {generatedCopy}
            <button
              onClick={handleCopyAiText}
              className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-all"
              title="Copy to clipboard"
            >
              {copiedAiText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
