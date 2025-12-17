export type QRType = 'url' | 'text' | 'wifi' | 'vcard' | 'email';
export type Language = 'en' | 'ru';

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  org: string;
  title: string;
  url: string;
  street: string;
  city: string;
  country: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface QRConfig {
  text: string;
  width: number;
  height: number;
  colorDark: string;
  colorLight: string;
  correctLevel: number; // 0=L, 1=M, 2=Q, 3=H
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoBackgroundColor?: string;
  logoBackgroundTransparent?: boolean;
}

// Declaration for the global EasyQRCode object loaded via script tag
declare global {
  interface Window {
    QRCode: any;
  }
}