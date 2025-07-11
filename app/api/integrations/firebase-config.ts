import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '/firebase'; // Make sure this points to your firebase.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ref = doc(db, 'integrations', 'firebase');

  if (req.method === 'GET') {
    try {
      const snapshot = await getDoc(ref);
      return res.status(200).json(snapshot.exists() ? snapshot.data() : {});
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ message: 'Error fetching config' });
    }
  }

  if (req.method === 'POST') {
    try {
      const config = req.body;
      await setDoc(ref, config);
      return res.status(200).json({ message: 'Firebase config saved' });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ message: 'Error saving config' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
