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
      .then(res => setConfig(res.data || {}));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/integrations/firebase-config', config);
      alert('Saved!');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Firebase Configuration</h3>
      {Object.entries(config).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Config
      </button>
    </div>
  );
}
