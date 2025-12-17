import React, { useRef } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SettingsSectionProps {
  colorDark: string;
  colorLight: string;
  onColorDarkChange: (c: string) => void;
  onColorLightChange: (c: string) => void;
  onLogoUpload: (file: File | null) => void;
  logoPreview: string | null;
  onRemoveLogo: () => void;
  lang: Language;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  colorDark,
  colorLight,
  onColorDarkChange,
  onColorLightChange,
  onLogoUpload,
  logoPreview,
  onRemoveLogo,
  lang
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onLogoUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-dark-surface rounded-xl border border-dark-border p-6 shadow-xl space-y-6">
      <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
        <span>🎨</span> {t.settings.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t.settings.primaryColor}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colorDark}
                onChange={(e) => onColorDarkChange(e.target.value)}
                className="h-10 w-14 p-0 bg-transparent border-0 rounded cursor-pointer"
              />
              <span className="text-sm font-mono text-gray-400">{colorDark}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t.settings.bgColor}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colorLight}
                onChange={(e) => onColorLightChange(e.target.value)}
                className="h-10 w-14 p-0 bg-transparent border-0 rounded cursor-pointer"
              />
              <span className="text-sm font-mono text-gray-400">{colorLight}</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t.settings.centerLogo}</label>
          <div className="flex flex-col items-start gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {!logoPreview ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-colors bg-dark-bg"
              >
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{t.settings.uploadImage}</span>
              </button>
            ) : (
              <div className="relative group">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/10 border border-gray-600">
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <button
                  onClick={onRemoveLogo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;