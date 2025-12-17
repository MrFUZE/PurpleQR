import React, { useState } from 'react';
import InputSection from './components/InputSection';
import SettingsSection from './components/SettingsSection';
import PreviewSection from './components/PreviewSection';
import { QRConfig, Language } from './types';
import { translations } from './utils/translations';

function App() {
  const [qrText, setQrText] = useState<string>('');
  const [colorDark, setColorDark] = useState<string>('#8A2BE2');
  const [colorLight, setColorLight] = useState<string>('#ffffff');
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const handleLogoUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogo(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setLogo(undefined);
    }
  };

  const qrConfig: QRConfig = {
    text: qrText,
    width: 300,
    height: 300,
    colorDark,
    colorLight,
    correctLevel: 2, // 0=L, 1=M, 2=Q, 3=H
    logo: logo,
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-2h-2v4h6v-4m2-4v2h-2v4h6v-6h-6zm2-6h2v4h-2V5zm-2 0h-2v4h2V5z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
              {t.app.title}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-dark-surface rounded-full p-1 border border-dark-border">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${lang === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    EN
                </button>
                <button 
                  onClick={() => setLang('ru')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${lang === 'ru' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    RU
                </button>
            </div>
            <a
                href="#"
                className="hidden sm:block text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors"
            >
                GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Controls */}
          <div className="flex-1 space-y-8 min-w-0">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                {t.app.createTitle}
              </h2>
              <InputSection onDataChange={setQrText} lang={lang} />
            </section>
            
            <section>
              <SettingsSection 
                colorDark={colorDark} 
                colorLight={colorLight}
                onColorDarkChange={setColorDark}
                onColorLightChange={setColorLight}
                onLogoUpload={handleLogoUpload}
                logoPreview={logo || null}
                onRemoveLogo={() => setLogo(undefined)}
                lang={lang}
              />
            </section>
          </div>

          {/* Right Column: Preview (Sticky) */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <PreviewSection config={qrConfig} lang={lang} />
              
              <div className="mt-8 p-4 rounded-lg bg-purple-900/20 border border-purple-500/20">
                <h3 className="text-purple-300 font-semibold mb-2">{t.app.proTipTitle}</h3>
                <p className="text-sm text-purple-200/70">
                  {t.app.proTipText}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {t.app.footer}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;