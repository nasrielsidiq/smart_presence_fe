'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Simpan pengaturan pengguna
    console.log('Settings saved:', { username, email });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mb-4">Update your settings</p>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
}