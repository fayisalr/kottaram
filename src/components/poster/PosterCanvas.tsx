'use client';

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { PosterTemplate, AspectRatio, PosterLanguage, SupermarketBranding } from '@/types';

export type CanvasElementId = 'none' | 'product_photo' | 'product_name' | 'badge_header' | 'price_tag' | 'offer_tag' | 'store_header';

export type CanvasFontFamily = 'sans' | 'serif' | 'display' | 'malayalam' | 'mono';
export type CanvasFontWeight = 'normal' | 'semibold' | 'bold' | 'black';
export type CanvasTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type CanvasTextShadow = 'none' | 'drop' | 'glow' | 'outline';

export interface PosterCanvasConfig {
  productName: string;
  productNameMl?: string;
  brand: string;
  mrp: number;
  offerPrice: number;
  discountPercent: number;
  savings: number;
  productImageUrl: string;
  validityText?: string;
  customText?: string;
  language: PosterLanguage;
  aspectRatio: AspectRatio;
  template: PosterTemplate;
  branding: SupermarketBranding;
  
  // Interactive element selection
  selectedElement?: CanvasElementId;
  
  // Product Photo offsets
  productScale?: number;
  productOffsetX?: number;
  productOffsetY?: number;

  // Product Name & Character Typography adjustments
  nameFontSizeMultiplier?: number;
  nameOffsetY?: number;
  nameOffsetX?: number;
  nameTextColor?: string;
  nameTextAlign?: 'left' | 'center' | 'right';
  fontFamily?: CanvasFontFamily;
  fontWeight?: CanvasFontWeight;
  fontStyle?: 'normal' | 'italic';
  textTransform?: CanvasTextTransform;
  letterSpacing?: number;
  textShadow?: CanvasTextShadow;

  // Multi-line Text Expansion & Word Wrap settings
  lineHeightMultiplier?: number;

  // Badge Header adjustments
  badgeTextOverride?: string;
  badgeOffsetX?: number;
  badgeOffsetY?: number;
  badgeBgColor?: string;

  // Price Tag adjustments
  priceTagOffsetX?: number;
  priceTagOffsetY?: number;
  priceTextColor?: string;
  priceSuffixText?: string;

  // Offer Tag / Discount Sticker adjustments
  offerTagStyle?: 'burst' | 'circle' | 'pill' | 'ribbon' | 'square';
  offerTagBgColor?: string;
  offerTagTextColor?: string;
  offerTagTextOverride?: string;
  offerTagScale?: number;
  offerTagOffsetX?: number;
  offerTagOffsetY?: number;

  // Store Header adjustments
  storeHeaderOffsetX?: number;
  storeHeaderOffsetY?: number;
}

export interface PosterCanvasRef {
  exportPNG: () => string;
  exportJPG: () => string;
}

export const PosterCanvas = forwardRef<
  PosterCanvasRef,
  { config: PosterCanvasConfig; width?: number; onSelectElement?: (elem: CanvasElementId) => void }
>(({ config, width = 500, onSelectElement }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getTargetDimensions = (ratio: AspectRatio) => {
    switch (ratio) {
      case '9:16':
        return { w: 1080, h: 1920 };
      case '1.91:1':
        return { w: 1200, h: 630 };
      case 'banner':
        return { w: 1920, h: 800 };
      case '1:1':
      default:
        return { w: 1080, h: 1080 };
    }
  };

  const target = getTargetDimensions(config.aspectRatio);
  const displayHeight = Math.round((target.h / target.w) * width);

  useImperativeHandle(ref, () => ({
    exportPNG: () => {
      if (!canvasRef.current) return '';
      return canvasRef.current.toDataURL('image/png', 1.0);
    },
    exportJPG: () => {
      if (!canvasRef.current) return '';
      return canvasRef.current.toDataURL('image/jpeg', 0.92);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = target.w;
    canvas.height = target.h;

    // 1. Draw Background Gradient
    drawBackground(ctx, target.w, target.h, config);

    // 2. Draw Supermarket Header Branding
    drawHeaderBranding(ctx, target.w, target.h, config);

    // 3. Draw Offer Template Badge Header
    drawBadgeHeader(ctx, target.w, target.h, config);

    // 4. Draw Product Image
    drawProductImage(ctx, target.w, target.h, config, () => {
      // 5. Draw Custom Offer Tag / Discount Sticker
      drawOfferTagSticker(ctx, target.w, target.h, config);

      // 6. Draw Price Tag Section
      drawPriceTagSection(ctx, target.w, target.h, config);

      // 7. Draw Product Name & Multi-line Automatic Downward Expansion
      drawProductText(ctx, target.w, target.h, config);

      // 8. Draw Footer Info & Contact / Location CTA
      drawFooterInfo(ctx, target.w, target.h, config);

      // 9. Draw Active Selection Outline if an element is selected
      drawSelectionOutlines(ctx, target.w, target.h, config);
    });
  }, [config, target.w, target.h]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSelectElement || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickXRatio = (e.clientX - rect.left) / rect.width;
    const clickYRatio = (e.clientY - rect.top) / rect.height;

    if (clickYRatio < 0.12) {
      onSelectElement('store_header');
    } else if (clickYRatio >= 0.12 && clickYRatio < 0.23) {
      onSelectElement('badge_header');
    } else if (clickYRatio >= 0.23 && clickYRatio < 0.38 && clickXRatio > 0.65) {
      onSelectElement('offer_tag');
    } else if (clickYRatio >= 0.23 && clickYRatio < 0.62) {
      onSelectElement('product_photo');
    } else if (clickYRatio >= 0.62 && clickYRatio < 0.78) {
      onSelectElement('price_tag');
    } else if (clickYRatio >= 0.78 && clickYRatio < 0.91) {
      onSelectElement('product_name');
    } else {
      onSelectElement('none');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center shadow-2xl rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ width: `${width}px`, height: `${displayHeight}px` }}
        className="max-w-full h-auto rounded-lg object-contain transition-all cursor-pointer"
        title="Click any element on the poster to select & customize multi-line text auto-expansion"
      />
      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-amber-400 border border-amber-500/30">
        {target.w} × {target.h} ({config.aspectRatio})
      </div>

      {config.selectedElement && config.selectedElement !== 'none' && (
        <div className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 px-3 py-1 rounded-lg text-xs font-black uppercase shadow-lg animate-pulse">
          Editing: {config.selectedElement.replace('_', ' ')}
        </div>
      )}
    </div>
  );
});

PosterCanvas.displayName = 'PosterCanvas';

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  const tmpl = config.template;
  const grad = ctx.createLinearGradient(0, 0, w, h);

  if (tmpl.styleCategory === 'mega') {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#0284c7');
    grad.addColorStop(1, '#0369a1');
  } else if (tmpl.styleCategory === 'flash') {
    grad.addColorStop(0, '#7f1d1d');
    grad.addColorStop(0.5, '#dc2626');
    grad.addColorStop(1, '#991b1b');
  } else if (tmpl.styleCategory === 'super') {
    grad.addColorStop(0, '#064e3b');
    grad.addColorStop(0.5, '#059669');
    grad.addColorStop(1, '#047857');
  } else if (tmpl.styleCategory === 'weekend') {
    grad.addColorStop(0, '#4c1d95');
    grad.addColorStop(0.5, '#7e22ce');
    grad.addColorStop(1, '#581c87');
  } else if (tmpl.styleCategory === 'festival') {
    grad.addColorStop(0, '#78350f');
    grad.addColorStop(0.5, '#d97706');
    grad.addColorStop(1, '#92400e');
  } else {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, w * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHeaderBranding(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  const branding = config.branding;
  const offsetX = config.storeHeaderOffsetX || 0;
  const offsetY = config.storeHeaderOffsetY || 0;

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(0, 0, w, h * 0.12);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';

  const isMalayalam = config.language === 'ml';
  const isBilingual = config.language === 'bilingual';

  const centerX = w / 2 + offsetX;

  if (isMalayalam) {
    ctx.font = `bold ${Math.round(w * 0.045)}px sans-serif`;
    ctx.fillText(branding.nameMl || branding.name, centerX, h * 0.055 + offsetY);
    ctx.font = `${Math.round(w * 0.024)}px sans-serif`;
    ctx.fillStyle = '#fde047';
    ctx.fillText(branding.taglineMl || branding.tagline, centerX, h * 0.09 + offsetY);
  } else if (isBilingual) {
    ctx.font = `bold ${Math.round(w * 0.04)}px sans-serif`;
    ctx.fillText(branding.name.toUpperCase(), centerX, h * 0.048 + offsetY);
    ctx.font = `bold ${Math.round(w * 0.03)}px sans-serif`;
    ctx.fillStyle = '#fde047';
    ctx.fillText(branding.nameMl, centerX, h * 0.088 + offsetY);
  } else {
    ctx.font = `900 ${Math.round(w * 0.045)}px sans-serif`;
    ctx.fillText(branding.name.toUpperCase(), centerX, h * 0.06 + offsetY);
    ctx.font = `600 ${Math.round(w * 0.024)}px sans-serif`;
    ctx.fillStyle = '#fde047';
    ctx.fillText(branding.tagline.toUpperCase(), centerX, h * 0.095 + offsetY);
  }

  ctx.restore();
}

function drawBadgeHeader(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  const tmpl = config.template;
  const isMalayalam = config.language === 'ml';
  const badgeTitle = config.badgeTextOverride || (isMalayalam ? tmpl.badgeTextMl : tmpl.badgeText);
  const offsetX = config.badgeOffsetX || 0;
  const offsetY = config.badgeOffsetY || 0;

  ctx.save();
  const badgeY = h * 0.15 + offsetY;
  const badgeH = h * 0.07;
  const badgeW = w * 0.78;
  const badgeX = (w - badgeW) / 2 + offsetX;

  ctx.fillStyle = config.badgeBgColor || tmpl.headerBg || '#dc2626';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, badgeH / 2);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  ctx.fillStyle = tmpl.badgeColor || '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 ${Math.round(w * 0.045)}px sans-serif`;
  ctx.fillText(badgeTitle, badgeX + badgeW / 2, badgeY + badgeH / 2);

  ctx.restore();
}

function drawProductImage(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig,
  onComplete: () => void
) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = config.productImageUrl;

  img.onload = () => {
    ctx.save();
    const scale = (config.productScale || 1.0) * 0.42;
    const pW = w * scale;
    const pH = (img.height / img.width) * pW;

    const centerX = w / 2 + (config.productOffsetX || 0);
    const centerY = h * 0.44 + (config.productOffsetY || 0);

    const x = centerX - pW / 2;
    const y = centerY - pH / 2;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 15;

    ctx.drawImage(img, x, y, pW, pH);
    ctx.restore();

    onComplete();
  };

  img.onerror = () => {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(w * 0.3, h * 0.3, w * 0.4, h * 0.3);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = `${Math.round(w * 0.03)}px sans-serif`;
    ctx.fillText('📦 Appliance Photo', w / 2, h * 0.45);
    ctx.restore();
    onComplete();
  };
}

function drawOfferTagSticker(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  ctx.save();

  const scale = config.offerTagScale || 1.0;
  const offsetX = config.offerTagOffsetX || 0;
  const offsetY = config.offerTagOffsetY || 0;
  const tagStyle = config.offerTagStyle || 'burst';
  const tagBgColor = config.offerTagBgColor || '#dc2626';
  const tagTextColor = config.offerTagTextColor || '#ffffff';
  const tagLabel = config.offerTagTextOverride || `${config.discountPercent}% OFF`;

  const stickerX = w * 0.82 + offsetX;
  const stickerY = h * 0.28 + offsetY;
  const radius = w * 0.11 * scale;

  if (tagStyle === 'burst' || tagStyle === 'circle') {
    ctx.fillStyle = tagBgColor;
    ctx.beginPath();
    ctx.arc(stickerX, stickerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 4 * scale;
    ctx.strokeStyle = '#facc15';
    ctx.stroke();

    ctx.fillStyle = tagTextColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (tagLabel.includes('%')) {
      const parts = tagLabel.split(' ');
      ctx.font = `900 ${Math.round(radius * 0.7)}px sans-serif`;
      ctx.fillText(parts[0], stickerX, stickerY - radius * 0.2);
      ctx.font = `bold ${Math.round(radius * 0.45)}px sans-serif`;
      ctx.fillStyle = '#facc15';
      ctx.fillText(parts.slice(1).join(' ') || 'OFF', stickerX, stickerY + radius * 0.4);
    } else {
      ctx.font = `900 ${Math.round(radius * 0.45)}px sans-serif`;
      ctx.fillText(tagLabel, stickerX, stickerY);
    }
  } else if (tagStyle === 'pill' || tagStyle === 'ribbon') {
    const pillW = radius * 2.4;
    const pillH = radius * 1.1;
    ctx.fillStyle = tagBgColor;
    ctx.beginPath();
    ctx.roundRect(stickerX - pillW / 2, stickerY - pillH / 2, pillW, pillH, pillH / 2);
    ctx.fill();
    ctx.lineWidth = 3 * scale;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.fillStyle = tagTextColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(radius * 0.45)}px sans-serif`;
    ctx.fillText(tagLabel, stickerX, stickerY);
  } else {
    const side = radius * 2;
    ctx.fillStyle = tagBgColor;
    ctx.fillRect(stickerX - side / 2, stickerY - side / 2, side, side);
    ctx.lineWidth = 3 * scale;
    ctx.strokeStyle = '#facc15';
    ctx.strokeRect(stickerX - side / 2, stickerY - side / 2, side, side);

    ctx.fillStyle = tagTextColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(radius * 0.5)}px sans-serif`;
    ctx.fillText(tagLabel, stickerX, stickerY);
  }

  ctx.restore();
}

function drawPriceTagSection(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  ctx.save();

  const offsetX = config.priceTagOffsetX || 0;
  const offsetY = config.priceTagOffsetY || 0;

  // MAIN PRICE DISPLAY BOX
  const boxY = h * 0.65 + offsetY;
  const boxH = h * 0.14;
  const boxW = w * 0.86;
  const boxX = (w - boxW) / 2 + offsetX;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 20);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#facc15';
  ctx.stroke();

  // MRP
  ctx.textAlign = 'left';
  ctx.fillStyle = '#cbd5e1';
  ctx.font = `600 ${Math.round(w * 0.038)}px sans-serif`;
  ctx.fillText(`MRP: ₹${config.mrp.toLocaleString('en-IN')}`, boxX + boxW * 0.06, boxY + boxH * 0.38);

  const mrpWidth = ctx.measureText(`MRP: ₹${config.mrp.toLocaleString('en-IN')}`).width;
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(boxX + boxW * 0.05, boxY + boxH * 0.38 - 6);
  ctx.lineTo(boxX + boxW * 0.06 + mrpWidth + 5, boxY + boxH * 0.38 - 6);
  ctx.stroke();

  // SAVINGS
  ctx.fillStyle = '#22c55e';
  ctx.font = `bold ${Math.round(w * 0.035)}px sans-serif`;
  ctx.fillText(`SAVE ₹${config.savings.toLocaleString('en-IN')}`, boxX + boxW * 0.06, boxY + boxH * 0.75);

  // OFFER PRICE LARGE
  ctx.textAlign = 'right';
  ctx.fillStyle = config.priceTextColor || '#facc15';
  ctx.font = `900 ${Math.round(w * 0.075)}px sans-serif`;
  ctx.fillText(`₹${config.offerPrice.toLocaleString('en-IN')}`, boxX + boxW * 0.92, boxY + boxH * 0.58);

  // PRICE SUFFIX TEXT (Selectable: "ONLY / മാത്രം", "ONLY", "മാത്രം", "SPECIAL DEAL", etc.)
  const suffixText = config.priceSuffixText !== undefined 
    ? config.priceSuffixText 
    : (config.language === 'en' ? 'ONLY' : config.language === 'ml' ? 'മാത്രം' : 'ONLY / മാത്രം');

  if (suffixText && suffixText.trim() !== '') {
    ctx.font = `bold ${Math.round(w * 0.024)}px sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(suffixText, boxX + boxW * 0.92, boxY + boxH * 0.82);
  }

  ctx.restore();
}

function getFontFamilyString(family?: CanvasFontFamily): string {
  switch (family) {
    case 'serif':
      return 'Georgia, "Times New Roman", serif';
    case 'display':
      return 'Impact, "Bebas Neue", "Arial Black", sans-serif';
    case 'malayalam':
      return '"Noto Sans Malayalam", Manjari, Gayathri, sans-serif';
    case 'mono':
      return 'Consolas, "Courier New", monospace';
    case 'sans':
    default:
      return 'system-ui, -apple-system, sans-serif';
  }
}

function getFontWeightString(weight?: CanvasFontWeight): string {
  switch (weight) {
    case 'normal':
      return '400';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    case 'black':
    default:
      return '900';
  }
}

function transformText(text: string, transform?: CanvasTextTransform): string {
  if (!text) return '';
  if (transform === 'uppercase') return text.toUpperCase();
  if (transform === 'lowercase') return text.toLowerCase();
  if (transform === 'capitalize') {
    return text.replace(/\b\w/g, (l) => l.toUpperCase());
  }
  return text;
}

// Multi-line canvas renderer with automatic word-wrapping & downward expansion
function drawMultiLineTextWithWrap(
  ctx: CanvasRenderingContext2D,
  rawText: string,
  x: number,
  startY: number,
  fontSize: number,
  maxWidth: number,
  lineHeightMultiplier: number = 1.25,
  isStroke: boolean = false
): number {
  if (!rawText) return startY;

  const paragraphLines = rawText.split('\n');
  const lineHeight = fontSize * lineHeightMultiplier;
  let currentY = startY;

  paragraphLines.forEach((paragraph) => {
    const words = paragraph.split(' ');
    let currentLine = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine ? currentLine + ' ' + words[n] : words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        if (isStroke) {
          ctx.strokeText(currentLine, x, currentY);
        } else {
          ctx.fillText(currentLine, x, currentY);
        }
        currentLine = words[n];
        currentY += lineHeight;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      if (isStroke) {
        ctx.strokeText(currentLine, x, currentY);
      } else {
        ctx.fillText(currentLine, x, currentY);
      }
      currentY += lineHeight;
    }
  });

  return currentY;
}

function drawProductText(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  ctx.save();

  const sizeMult = config.nameFontSizeMultiplier || 1.0;
  const offsetX = config.nameOffsetX || 0;
  const offsetY = config.nameOffsetY || 0;
  const textY = h * 0.81 + offsetY;
  const align = config.nameTextAlign || 'center';
  const lineHeightMult = config.lineHeightMultiplier || 1.25;
  const maxWidth = w * 0.84;

  const fontFam = getFontFamilyString(config.fontFamily);
  const fontWt = getFontWeightString(config.fontWeight);
  const fontSt = config.fontStyle === 'italic' ? 'italic' : 'normal';
  const fontSize = Math.round(w * 0.048 * sizeMult);

  let posX = w / 2 + offsetX;
  if (align === 'left') {
    posX = w * 0.08 + offsetX;
    ctx.textAlign = 'left';
  } else if (align === 'right') {
    posX = w * 0.92 + offsetX;
    ctx.textAlign = 'right';
  } else {
    ctx.textAlign = 'center';
  }

  if (config.textShadow === 'drop') {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
  } else if (config.textShadow === 'glow') {
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 20;
  } else if (config.textShadow === 'outline') {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
  }

  const primaryText = transformText(config.productName, config.textTransform);
  const isMalayalam = config.language === 'ml' || config.language === 'bilingual';

  ctx.fillStyle = config.nameTextColor || '#ffffff';
  ctx.font = `${fontSt} ${fontWt} ${fontSize}px ${fontFam}`;

  if (config.textShadow === 'outline') {
    drawMultiLineTextWithWrap(ctx, primaryText, posX, textY, fontSize, maxWidth, lineHeightMult, true);
  }
  const nextY = drawMultiLineTextWithWrap(ctx, primaryText, posX, textY, fontSize, maxWidth, lineHeightMult, false);

  if (config.productNameMl && isMalayalam) {
    const mlFontSize = Math.round(w * 0.038 * sizeMult);
    ctx.fillStyle = '#fde047';
    ctx.font = `bold ${mlFontSize}px ${getFontFamilyString('malayalam')}`;
    
    if (config.textShadow === 'outline') {
      drawMultiLineTextWithWrap(ctx, config.productNameMl, posX, nextY + 6, mlFontSize, maxWidth, lineHeightMult, true);
    }
    drawMultiLineTextWithWrap(ctx, config.productNameMl, posX, nextY + 6, mlFontSize, maxWidth, lineHeightMult, false);
  }

  ctx.restore();
}

function drawFooterInfo(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  const branding = config.branding;

  ctx.save();
  const footerY = h * 0.91;
  const footerH = h * 0.09;

  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, footerY, w, footerH);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';

  ctx.font = `600 ${Math.round(w * 0.026)}px sans-serif`;
  ctx.fillText(`📍 Bank Junction, Alanallur | 📞 ${branding.phone}`, w / 2, footerY + footerH * 0.4);

  ctx.font = `bold ${Math.round(w * 0.024)}px sans-serif`;
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`⏰ Limited Stock Offer! Visit Showroom | WhatsApp: ${branding.whatsappNumber}`, w / 2, footerY + footerH * 0.75);

  ctx.restore();
}

function drawSelectionOutlines(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  config: PosterCanvasConfig
) {
  const selected = config.selectedElement;
  if (!selected || selected === 'none') return;

  ctx.save();
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 6;
  ctx.setLineDash([12, 6]);

  if (selected === 'store_header') {
    const offsetX = config.storeHeaderOffsetX || 0;
    const offsetY = config.storeHeaderOffsetY || 0;
    ctx.strokeRect(20 + offsetX, 10 + offsetY, w - 40, h * 0.11);
  } else if (selected === 'badge_header') {
    const offsetX = config.badgeOffsetX || 0;
    const offsetY = config.badgeOffsetY || 0;
    ctx.strokeRect(w * 0.1 + offsetX, h * 0.14 + offsetY, w * 0.8, h * 0.09);
  } else if (selected === 'product_photo') {
    const scale = (config.productScale || 1.0) * 0.42;
    const pW = w * scale;
    const pH = pW;
    const centerX = w / 2 + (config.productOffsetX || 0);
    const centerY = h * 0.44 + (config.productOffsetY || 0);
    ctx.strokeRect(centerX - pW / 2 - 10, centerY - pH / 2 - 10, pW + 20, pH + 20);
  } else if (selected === 'offer_tag') {
    const scale = config.offerTagScale || 1.0;
    const offsetX = config.offerTagOffsetX || 0;
    const offsetY = config.offerTagOffsetY || 0;
    const stickerX = w * 0.82 + offsetX;
    const stickerY = h * 0.28 + offsetY;
    const radius = w * 0.11 * scale;
    ctx.strokeRect(stickerX - radius - 8, stickerY - radius - 8, radius * 2 + 16, radius * 2 + 16);
  } else if (selected === 'price_tag') {
    const offsetX = config.priceTagOffsetX || 0;
    const offsetY = config.priceTagOffsetY || 0;
    ctx.strokeRect(w * 0.05 + offsetX, h * 0.63 + offsetY, w * 0.9, h * 0.17);
  } else if (selected === 'product_name') {
    const offsetX = config.nameOffsetX || 0;
    const offsetY = config.nameOffsetY || 0;
    const lines = (config.productName.split('\n').length || 1) + (config.productNameMl?.split('\n').length || 0);
    const boxHeight = Math.max(h * 0.12, h * 0.05 * lines);
    ctx.strokeRect(w * 0.05 + offsetX, h * 0.78 + offsetY, w * 0.9, boxHeight);
  }

  ctx.restore();
}
