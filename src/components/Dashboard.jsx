

import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalPending: 0,
  });

  useEffect(() => {
    async function fetchStats() {
        let user = localStorage.getItem('user-info');
        user = JSON.parse(user);
        const {token} = user;
        console.log(token);
      try {
        const res = await axios.get('http://localhost:8080/api/v1/dashboard-summary', {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        });

        setStats(res.data);
      } catch (err) {
        
        console.error('Failed to load dashboard stats:', err);
      }
    }

    fetchStats();
  }, []);

  return (<>
    <div className="flex flex-row">
    <Sidebar/>
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Campaign Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-primary">Total Campaigns</h2>
          <p className="text-3xl">{stats.totalCampaigns}</p>
        </div>

        <div className="bg-base-100 shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-green-600">Orders</h2>
          <p className="text-3xl">{stats.totalOrders}</p>
        </div>

        <div className="bg-base-100 shadow-md rounded-xl p-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-red-500">Customers</h2>
          <p className="text-3xl">{stats.totalCustomers}</p>
        </div>

        
      </div>
    </div>
    </div>
    </>
  );
}