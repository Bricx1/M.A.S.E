import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FirebaseConfigForm() {
  const [config, setConfig] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });

  useEffect(() => {
    axios.get('/api/integrations/firebase-config')
      .then(res => setConfig(res.data))
      .catch(() => alert('Failed to load config'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/integrations/firebase-config', config);
      alert('Firebase config saved!');
    } catch {
      alert('Save failed');
    }
  };

  return (
    <div className="space-y-4 border p-6 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold">Firebase Configuration</h3>
      {Object.entries(config).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm capitalize">{key}</label>
          <input
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder={`Enter ${key}`}
          />
        </div>
      ))}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Firebase Config
      </button>
    </div>
  );
}
