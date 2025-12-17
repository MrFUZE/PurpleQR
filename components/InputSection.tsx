import React, { useEffect, useState } from 'react';
import { QRType, WifiData, VCardData, EmailData, Language } from '../types';
import { generateWifiString, generateVCardString, generateEmailString } from '../utils/qrGenerators';
import { translations } from '../utils/translations';

interface InputSectionProps {
  onDataChange: (data: string) => void;
  lang: Language;
}

const InputSection: React.FC<InputSectionProps> = ({ onDataChange, lang }) => {
  const [activeTab, setActiveTab] = useState<QRType>('url');
  const t = translations[lang];
  
  // State for each type
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [wifi, setWifi] = useState<WifiData>({ ssid: '', password: '', encryption: 'WPA', hidden: false });
  const [vcard, setVcard] = useState<VCardData>({ 
    firstName: '', lastName: '', phone: '', email: '', 
    org: '', title: '', url: '', street: '', city: '', country: '' 
  });
  const [emailData, setEmailData] = useState<EmailData>({ email: '', subject: '', body: '' });

  // Update parent when any relevant state changes
  useEffect(() => {
    let result = '';
    switch (activeTab) {
      case 'url': result = url; break;
      case 'text': result = text; break;
      case 'wifi': result = generateWifiString(wifi); break;
      case 'vcard': result = generateVCardString(vcard); break;
      case 'email': result = generateEmailString(emailData); break;
    }
    onDataChange(result);
  }, [activeTab, url, text, wifi, vcard, emailData, onDataChange]);

  const tabs: { id: QRType; label: string; icon: string }[] = [
    { id: 'url', label: t.tabs.url, icon: '🔗' },
    { id: 'text', label: t.tabs.text, icon: '📝' },
    { id: 'wifi', label: t.tabs.wifi, icon: '📶' },
    { id: 'vcard', label: t.tabs.vcard, icon: '📇' },
    { id: 'email', label: t.tabs.email, icon: '📧' },
  ];

  const inputClass = "w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-600";
  const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";
  const sectionClass = "space-y-4 animate-fadeIn";

  return (
    <div className="bg-dark-surface rounded-xl border border-dark-border p-6 shadow-xl">
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                : 'bg-dark-bg text-gray-400 hover:text-gray-200 hover:bg-dark-border'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forms */}
      <div className="min-h-[300px]">
        {activeTab === 'url' && (
          <div className={sectionClass}>
            <div>
              <label className={labelClass}>{t.input.urlLabel}</label>
              <input
                type="url"
                placeholder={t.input.urlPlaceholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-gray-500">{t.input.urlHint}</p>
          </div>
        )}

        {activeTab === 'text' && (
          <div className={sectionClass}>
            <div>
              <label className={labelClass}>{t.input.contentLabel}</label>
              <textarea
                placeholder={t.input.contentPlaceholder}
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {activeTab === 'wifi' && (
          <div className={sectionClass}>
            <div>
              <label className={labelClass}>{t.input.ssidLabel}</label>
              <input
                type="text"
                placeholder={t.input.ssidPlaceholder}
                value={wifi.ssid}
                onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t.input.passwordLabel}</label>
              <input
                type="text" // Visible for convenience in generators
                placeholder={t.input.passwordPlaceholder}
                value={wifi.password}
                onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t.input.encryptionLabel}</label>
                <select
                  value={wifi.encryption}
                  onChange={(e) => setWifi({ ...wifi, encryption: e.target.value as any })}
                  className={inputClass}
                >
                  <option value="WPA">{t.input.encryptionOptions.wpa}</option>
                  <option value="WEP">{t.input.encryptionOptions.wep}</option>
                  <option value="nopass">{t.input.encryptionOptions.none}</option>
                </select>
              </div>
              <div className="flex items-center h-full pt-6">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={wifi.hidden}
                        onChange={(e) => setWifi({...wifi, hidden: e.target.checked})}
                        className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                    />
                    <span className="text-sm text-gray-300">{t.input.hiddenNetwork}</span>
                 </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vcard' && (
          <div className={`${sectionClass} grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0`}>
             <div className="md:col-span-1">
              <label className={labelClass}>{t.input.firstName}</label>
              <input
                type="text"
                value={vcard.firstName}
                onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-1">
              <label className={labelClass}>{t.input.lastName}</label>
              <input
                type="text"
                value={vcard.lastName}
                onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>{t.input.email}</label>
              <input
                type="email"
                value={vcard.email}
                onChange={(e) => setVcard({ ...vcard, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>{t.input.phone}</label>
              <input
                type="tel"
                value={vcard.phone}
                onChange={(e) => setVcard({ ...vcard, phone: e.target.value })}
                className={inputClass}
              />
            </div>
             <div className="md:col-span-1">
              <label className={labelClass}>{t.input.company}</label>
              <input
                type="text"
                value={vcard.org}
                onChange={(e) => setVcard({ ...vcard, org: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-1">
              <label className={labelClass}>{t.input.jobTitle}</label>
              <input
                type="text"
                value={vcard.title}
                onChange={(e) => setVcard({ ...vcard, title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
               <label className={labelClass}>{t.input.website}</label>
               <input
                 type="url"
                 value={vcard.url}
                 onChange={(e) => setVcard({ ...vcard, url: e.target.value })}
                 className={inputClass}
               />
             </div>
          </div>
        )}

        {activeTab === 'email' && (
            <div className={sectionClass}>
                 <div>
                  <label className={labelClass}>{t.input.emailAddress}</label>
                  <input
                    type="email"
                    value={emailData.email}
                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t.input.subject}</label>
                  <input
                    type="text"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t.input.messageBody}</label>
                  <textarea
                    rows={4}
                    value={emailData.body}
                    onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                    className={inputClass}
                  />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default InputSection;