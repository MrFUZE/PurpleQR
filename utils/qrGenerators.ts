import { WifiData, VCardData, EmailData } from '../types';

export const generateWifiString = (data: WifiData): string => {
  const { ssid, password, encryption, hidden } = data;
  // Format: WIFI:T:WPA;S:mynetwork;P:mypass;H:true;;
  let s = `WIFI:T:${encryption};S:${escapeWifiString(ssid)};`;
  if (encryption !== 'nopass') {
    s += `P:${escapeWifiString(password)};`;
  }
  if (hidden) {
    s += `H:true;`;
  }
  s += ';';
  return s;
};

const escapeWifiString = (str: string): string => {
  return str.replace(/([\\;,:])/g, '\\$1');
};

export const generateVCardString = (data: VCardData): string => {
  return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName};;;
FN:${data.firstName} ${data.lastName}
ORG:${data.org}
TITLE:${data.title}
TEL;TYPE=CELL:${data.phone}
EMAIL:${data.email}
URL:${data.url}
ADR;TYPE=HOME:;;${data.street};${data.city};;${data.country}
END:VCARD`;
};

export const generateEmailString = (data: EmailData): string => {
  const { email, subject, body } = data;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
