import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'royal_school_secret_key'; // You can move this to env for more security

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string or Date object to a standard Arabic format.
 * @param date - The date to format (string or Date)
 * @param fmt - The format string (default: 'd MMMM yyyy')
 */
export function formatDate(date: string | Date, fmt = 'd MMMM yyyy') {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, fmt, { locale: ar });
  } catch {
    return '';
  }
}

export function encryptData(data: any): string {
  try {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(str, SECRET_KEY).toString();
  } catch {
    return '';
  }
}

export function decryptData(cipher: string): any {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}
