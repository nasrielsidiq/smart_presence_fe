'use client';

import { useEffect, useState, useCallback } from 'react';
import AllAttendencePercentege from './pages/allAttendencePercentege';
import DataCount from './pages/dataCount';
import AttendanceDetailLeaderboard from './pages/attendenceDetailLeaderboard';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
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
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-4">
      <div className="text-white">
        <div className="flex gap-2">
          <i className="bi bi-house-door text-lg"></i>
          <span className="pt-[2px]">Management</span>
          <p>/</p>
        </div>
        <span className="pl-7 font-bold">Overview</span>
      </div>
      <DataCount />
      <AllAttendencePercentege />
      <AttendanceDetailLeaderboard />

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : data ? (
        <div>
          <h2 className="text-xl font-semibold">Data from API:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}