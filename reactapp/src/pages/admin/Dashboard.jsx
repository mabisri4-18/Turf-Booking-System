import React, { useEffect, useState } from 'react';
import { getBookings } from '../../api/bookings';
import { getFacilities } from '../../api/facilities';
import { getPayments } from '../../api/payments';
import { getMaintenance } from '../../api/maintenance';

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    facilities: 0,
    payments: 0,
    maintenance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const bookings = (await getBookings()).data.length;
      const facilities = (await getFacilities()).data.length;
      const payments = (await getPayments()).data.length;
      const maintenance = (await getMaintenance()).data.length;
      setStats({ bookings, facilities, payments, maintenance });
    };
    fetchStats();
  }, []);

  const cardData = [
    { title: 'Bookings', value: stats.bookings, link: '/admin/bookingmanagement', color: 'bg-green-600' },
    { title: 'Facilities', value: stats.facilities, link: '/admin/facilitymanagement', color: 'bg-yellow-500' },
    { title: 'Payments', value: stats.payments, link: '/admin/paymentmanagement', color: 'bg-purple-600' },
    { title: 'Maintenance', value: stats.maintenance, link: '/admin/maintenancemanagement', color: 'bg-red-600' },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card) => (
          <a key={card.title} href={card.link}>
            <div className={`p-6 rounded-xl shadow text-white ${card.color} hover:scale-105 transform transition`}>
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
