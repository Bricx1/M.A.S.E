import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import serviceAccount from '../../../lib/serviceAccountKey.json'; // Adjust path as needed



if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const docRef = db.collection('integrations').doc('firebase');

  try {
    if (req.method === 'GET') {
      const doc = await docRef.get();
      return res.status(200).json(doc.exists ? doc.data() : {});
    }

    if (req.method === 'POST') {
      await docRef.set(req.body);
      return res.status(200).json({ message: 'Firebase config saved' });
    }

    return res.status(405).end('Method Not Allowed');
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
