'use client';

import { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://95b0-36-93-6-234.ngrok-free.app/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page</p>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}