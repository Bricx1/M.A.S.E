import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { encryptConfig, decryptConfig } from '@/utils/crypto-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ref = doc(db, 'integrations', 'firebase');

  if (req.method === 'GET') {
    try {
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) return res.status(200).json({});
      const encrypted = snapshot.data()?.payload;
      const config = decryptConfig(encrypted);
      return res.status(200).json(config);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error loading config' });
    }
  }

  if (req.method === 'POST') {
    try {
      const config = req.body;
      const encrypted = encryptConfig(config);
      await setDoc(ref, { payload: encrypted });
      return res.status(200).json({ message: 'Config saved' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving config' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
