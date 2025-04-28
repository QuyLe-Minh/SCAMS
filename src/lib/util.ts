export function bitmapToBooleans(bitmap: number, length = 32): boolean[] {
  const result: boolean[] = [];
  for (let i = 0; i < length; i++) {
    result.push((bitmap & (1 << i)) !== 0);
  }
  return result;
}

export const getApiUrl = (path: string) => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      : "";
  return `${baseUrl}${path}`;
};

import crypto from 'crypto';

// The encryption key (store it securely, not hardcoded in production)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-encryption-key-heren-key-he'; // 32 bytes key for AES-256
const IV_LENGTH = 16; // AES block size (128 bits)

// Function to encrypt data
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Return iv + encrypted text
  return iv.toString('hex') + ':' + encrypted;
}

// Function to decrypt data
export function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
