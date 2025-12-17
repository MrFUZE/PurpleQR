import React, { useEffect, useRef } from 'react';
import { QRConfig, Language } from '../types';
import { translations } from '../utils/translations';

interface PreviewSectionProps {
  config: QRConfig;
  className?: string;
  lang: Language;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ config, className, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    // Debounce generation slightly to avoid UI freezing on rapid typing
    const timer = setTimeout(() => {
      if (containerRef.current && window.QRCode) {
        // Clear previous
        containerRef.current.innerHTML = '';
        
        try {
          // EasyQRCode options
          const options = {
            text: config.text || "PurpleQR",
            width: config.width,
            height: config.height,
            colorDark: config.colorDark,
            colorLight: config.colorLight,
            correctLevel: config.correctLevel, // H level
            logo: config.logo,
            logoWidth: config.logo ? config.width * 0.2 : undefined,
            logoHeight: config.logo ? config.height * 0.2 : undefined,
            logoBackgroundColor: config.colorLight,
            logoBackgroundTransparent: false,
            quietZone: 15,
            quietZoneColor: config.colorLight,
          };

          new window.QRCode(containerRef.current, options);
        } catch (e) {
          console.error("Failed to generate QR", e);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [config]);

  const download = (format: 'png' | 'jpeg') => {
    if (!containerRef.current) return;
    const canvas = containerRef.current.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `purple-qr-${Date.now()}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, 1.0);
      link.click();
    }
  };

  const downloadSVG = () => {
    if (!window.QRCode) return;

    // Create a temporary container for SVG generation
    const container = document.createElement('div');
    
    const options = {
      text: config.text || "PurpleQR",
      width: config.width,
      height: config.height,
      colorDark: config.colorDark,
      colorLight: config.colorLight,
      correctLevel: config.correctLevel,
      logo: config.logo,
      logoWidth: config.logo ? config.width * 0.2 : undefined,
      logoHeight: config.logo ? config.height * 0.2 : undefined,
      logoBackgroundColor: config.colorLight,
      logoBackgroundTransparent: false,
      quietZone: 15,
      quietZoneColor: config.colorLight,
      drawer: 'svg', // Force SVG rendering
      onRenderingEnd: () => {
         const svg = container.querySelector('svg');
         if (svg) {
            // Ensure xmlns is present
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.download = `purple-qr-${Date.now()}.svg`;
            link.href = url;
            link.click();
            
            // Cleanup
            URL.revokeObjectURL(url);
         }
      }
    };

    try {
        new window.QRCode(container, options);
    } catch (e) {
        console.error("Failed to generate SVG", e);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="bg-dark-surface rounded-xl border border-dark-border p-6 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative group">
            <div 
                ref={containerRef} 
                className="rounded-lg overflow-hidden shadow-2xl bg-white transition-all duration-300 transform hover:scale-[1.02]"
                style={{ background: config.colorLight }}
            >
                {/* QR Code Canvas is injected here */}
            </div>
            {!config.text && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-medium">{t.preview.enterData}</span>
                 </div>
            )}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">{t.preview.scanTip}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
            onClick={() => download('png')}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-purple-900/30 text-sm"
        >
            <span className="whitespace-nowrap">{t.preview.downloadPng}</span>
        </button>
        <button
            onClick={() => download('jpeg')}
            className="flex items-center justify-center gap-2 bg-dark-surface hover:bg-gray-700 border border-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-lg transition-all active:scale-95 text-sm"
        >
             <span className="whitespace-nowrap">{t.preview.downloadJpg}</span>
        </button>
        <button
            onClick={downloadSVG}
            className="flex items-center justify-center gap-2 bg-dark-surface hover:bg-gray-700 border border-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-lg transition-all active:scale-95 text-sm"
        >
             <span className="whitespace-nowrap">{t.preview.downloadSvg}</span>
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;