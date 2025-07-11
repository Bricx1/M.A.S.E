import  CryptoJS  from 'crypto-js';

const secret = process.env.NEXT_PUBLIC_ENCRYPT_KEY || "default_passphrase";

export function encryptConfig(data: object): string {
  const plaintext = JSON.stringify(data);
  return CryptoJS.AES.encrypt(plaintext, secret).toString();
}

export function decryptConfig(cipherText: string): any {
  const bytes = CryptoJS.AES.decrypt(cipherText, secret);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
}
