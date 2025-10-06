
// import React, { useEffect, useState } from 'react';
// import { getBookings } from '../../api/bookings';
// import { getFacilities } from '../../api/facilities';
// import { getPayments } from '../../api/payments';
// import { getMaintenance } from '../../api/maintenance';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar,
// } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const Dashboard = () => {
//   const [stats, setStats] = useState({});
//   const [chartsData, setChartsData] = useState({});
//   const [dateFilter, setDateFilter] = useState('week'); // week, month, year
//   const [metric, setMetric] = useState('bookings'); // bookings, payments, maintenance

//   // Calculate growth % compared to previous period
//   const calculateGrowth = (current, previous) => {
//     if (previous === 0) return 100;
//     return ((current - previous) / previous) * 100;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const bookingsData = (await getBookings()).data;
//       const facilitiesData = (await getFacilities()).data;
//       const paymentsData = (await getPayments()).data;
//       const maintenanceData = (await getMaintenance()).data;

//       // Helper: week number
//       const getWeekNumber = (d) => {
//         d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
//         const dayNum = d.getUTCDay() || 7;
//         d.setUTCDate(d.getUTCDate() + 4 - dayNum);
//         const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
//         return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
//       };

//       // Aggregate trends
//       const aggregateData = (data, key) => {
//         const grouped = {};
//         data.forEach(item => {
//           const date = new Date(item.bookingDate || item.paymentDate || item.date);
//           let label = '';
//           if (dateFilter === 'week') label = `W${getWeekNumber(date)}`;
//           else if (dateFilter === 'month') label = `${date.getMonth() + 1}/${date.getFullYear()}`;
//           else label = `${date.getFullYear()}`;
//           grouped[label] = (grouped[label] || 0) + 1;
//         });
//         return Object.entries(grouped).map(([name, value]) => ({ name, value }));
//       };

//      const bookingTrends = aggregateData(bookingsData);
// const paymentTrends = aggregateData(paymentsData);
// const maintenanceTrends = aggregateData(maintenanceData);

// // Merge for stacked bar chart
// const allLabels = Array.from(new Set([...bookingTrends, ...paymentTrends, ...maintenanceTrends]
// .map(d => d.name)));
// const stackedData = allLabels.map(label => ({
// name: label,
// bookings: bookingTrends.find(d => d.name === label)?.value || 0,
// payments: paymentTrends.find(d => d.name === label)?.value || 0,
// maintenance: maintenanceTrends.find(d => d.name === label)?.value || 0,
// }));

// setStats({
// bookings: bookingsData.length,
// facilities: facilitiesData.length,
// payments: paymentsData.length,
// maintenance: maintenanceData.length,
// paymentsTotal: paymentsData.reduce((sum, p) => sum + p.amount, 0),
// growth: {
// bookings: calculateGrowth(bookingTrends[bookingTrends.length - 1]?.value || 0,
// bookingTrends[bookingTrends.length - 2]?.value || 0),
// payments: calculateGrowth(paymentTrends[paymentTrends.length - 1]?.value || 0,
// paymentTrends[paymentTrends.length - 2]?.value || 0),
// maintenance: calculateGrowth(maintenanceTrends[maintenanceTrends.length - 1]?.value || 0,
// maintenanceTrends[maintenanceTrends.length - 2]?.value || 0),
// }
// });

// setChartsData({
// bookingTrends,
// paymentTrends,
// maintenanceTrends,
// facilityUsage: facilitiesData.map(f => ({ name: f.name, value: Math.floor(Math.random() * 100) })),
// stackedData
// });
// };

// fetchData();
// }, [dateFilter]);

// const cardData = [
// { title: 'Bookings', value: stats.bookings, link: '/admin/bookingmanagement', color: 'bg-green-600', growth: stats.growth?.bookings },
// { title: 'Facilities', value: stats.facilities, link: '/admin/facilitymanagement', color: 'bg-yellow-500' },
// { title: 'Payments', value: stats.payments, link: '/admin/paymentmanagement', color: 'bg-purple-600', growth: stats.growth?.payments },
// { title: 'Maintenance', value: stats.maintenance, link: '/admin/maintenancemanagement', color: 'bg-red-600', growth: stats.growth?.maintenance },
// ];

// const currentChartData = {
// bookings: chartsData.bookingTrends || [],
// payments: chartsData.paymentTrends || [],
// maintenance: chartsData.maintenanceTrends || [],
// };

// return (
// <div className="p-8 bg-gray-100 min-h-screen">
// <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

// {/* Summary Cards */}
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
// {cardData.map((card) => (
// <a key={card.title} href={card.link}>
// <div className={`p-6 rounded-xl shadow text-white ${card.color} hover:scale-105 transform transition`}>
// <h2 className="text-xl font-semibold">{card.title}</h2>
// <p className="text-3xl font-bold mt-2">{card.value}</p>
// {card.title === 'Payments' && <p className="text-sm mt-1">Total: ₹{stats.paymentsTotal || 0}</p>}
// {card.growth !== undefined && (
// <p className={`text-sm mt-1 ${card.growth >= 0 ? 'text-green-200' : 'text-red-200'}`}>
// {card.growth >= 0 ? '▲' : '▼'} {Math.abs(card.growth.toFixed(1))}%
// </p>
// )}
// </div>
// </a>
// ))}
// </div>

// {/* Filters */}
// <div className="flex gap-4 mb-6">
// <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="p-2 rounded border">
// <option value="week">Weekly</option>
// <option value="month">Monthly</option>
// <option value="year">Yearly</option>
// </select>
// <select value={metric} onChange={(e) => setMetric(e.target.value)} className="p-2 rounded border">
// <option value="bookings">Bookings</option>
// <option value="payments">Payments</option>
// <option value="maintenance">Maintenance</option>
// </select>
// </div>

// {/* Trend Line Chart */}
// <div className="bg-white p-6 rounded-xl shadow mb-10">
// <h2 className="text-xl font-semibold mb-4">{metric.charAt(0).toUpperCase() + metric.slice(1)} Trends</h2>
// <ResponsiveContainer width="100%" height={300}>
// <LineChart data={currentChartData[metric]}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="name" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
// </LineChart>
// </ResponsiveContainer>
// </div>

// {/* Stacked Bar Chart for All Metrics */}
// <div className="bg-white p-6 rounded-xl shadow mb-10">
// <h2 className="text-xl font-semibold mb-4">Comparison: Bookings, Payments, Maintenance</h2>
// <ResponsiveContainer width="100%" height={300}>
// <BarChart data={chartsData.stackedData || []}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis dataKey="name" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Bar dataKey="bookings" stackId="a" fill="#0088FE" />
// <Bar dataKey="payments" stackId="a" fill="#00C49F" />
// <Bar dataKey="maintenance" stackId="a" fill="#FF8042" />
// </BarChart>
// </ResponsiveContainer>
// </div>

// {/* Facility Usage Pie Chart */}
// <div className="bg-white p-6 rounded-xl shadow">
// <h2 className="text-xl font-semibold mb-4">Facility Usage</h2>
// <ResponsiveContainer width="100%" height={300}>
// <PieChart>
// <Pie
// data={chartsData.facilityUsage || []}
// dataKey="value"
// nameKey="name"
// cx="50%"
// cy="50%"
// outerRadius={100}
// fill="#82ca9d"
// label
// >
// {(chartsData.facilityUsage || []).map((entry, index) => (
// <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// ))}
// </Pie>
// <Tooltip />
// </PieChart>
// </ResponsiveContainer>
// </div>
// </div>
// );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { getBookings } from "../../api/bookings";
import { getFacilities } from "../../api/facilities";
import { getPayments } from "../../api/payments";
import { getMaintenance } from "../../api/maintenance";

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    facilities: 0,
    payments: 0,
    maintenance: 0,
  });

  const [trendData, setTrendData] = useState([]);
  const [facilityUsage, setFacilityUsage] = useState({ turf: 0, pool: 0, court: 0 });
  const [maintenanceStatus, setMaintenanceStatus] = useState({ pending: 0, completed: 0 });
  const [filter, setFilter] = useState("weekly"); // weekly, monthly, yearly

  useEffect(() => {
    const fetchStats = async () => {
      const [bookingsRes, facilitiesRes, paymentsRes, maintenanceRes] = await Promise.all([
        getBookings(),
        getFacilities(),
        getPayments(),
        getMaintenance(),
      ]);

      const bookings = bookingsRes.data.length;
      const facilities = facilitiesRes.data.length;
      const payments = paymentsRes.data.length;
      const maintenance = maintenanceRes.data.length;

      // Facility breakdown
      const turf = facilitiesRes.data.filter(f => f.type === "turf").length;
      const pool = facilitiesRes.data.filter(f => f.type === "pool").length;
      const court = facilitiesRes.data.filter(f => f.type === "court").length;

      // Maintenance breakdown
      const pending = maintenanceRes.data.filter(m => m.status === "pending").length;
      const completed = maintenanceRes.data.filter(m => m.status === "completed").length;

      setStats({ bookings, facilities, payments, maintenance });
      setFacilityUsage({ turf, pool, court });
      setMaintenanceStatus({ pending, completed });

      generateTrend("weekly"); // default
    };

    fetchStats();
  }, []);

  const generateTrend = (type) => {
let data = [];
if (type === "weekly") {
data = Array.from({ length: 7 }, (_, i) => ({
label: `Day ${i + 1}`,
count: Math.floor(Math.random() * 10 + 5),
}));
} else if (type === "monthly") {
data = Array.from({ length: 4 }, (_, i) => ({
label: `Week ${i + 1}`,
count: Math.floor(Math.random() * 30 + 10),
}));
} else if (type === "yearly") {
data = Array.from({ length: 12 }, (_, i) => ({
label: `M${i + 1}`,
count: Math.floor(Math.random() * 80 + 20),
}));
}
setTrendData(data);
};

const handleFilterChange = (type) => {
setFilter(type);
generateTrend(type);
};

const generateLinePath = (data) => {
if (data.length === 0) return "";
const maxVal = Math.max(...data.map((d) => d.count));
return data
.map((d, i) => {
const x = (i / (data.length - 1)) * 300;
const y = 100 - (d.count / maxVal) * 100;
return `${i === 0 ? "M" : "L"}${x},${y}`;
})
.join(" ");
};

// Calculate pie chart segments
const totalFacilities = facilityUsage.turf + facilityUsage.pool + facilityUsage.court;
const angles = {
turf: (facilityUsage.turf / totalFacilities) * 360 || 0,
pool: (facilityUsage.pool / totalFacilities) * 360 || 0,
court: (facilityUsage.court / totalFacilities) * 360 || 0,
};

// Helper for SVG arc path
const describeArc = (cx, cy, r, startAngle, endAngle) => {
const start = polarToCartesian(cx, cy, r, endAngle);
const end = polarToCartesian(cx, cy, r, startAngle);
const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
return [
"M", start.x, start.y,
"A", r, r, 0, largeArcFlag, 0, end.x, end.y,
"L", cx, cy,
"Z",
].join(" ");
};

const polarToCartesian = (cx, cy, r, angle) => {
const rad = ((angle - 90) * Math.PI) / 180.0;
return {
x: cx + r * Math.cos(rad),
y: cy + r * Math.sin(rad),
};
};

// Build pie chart paths
let start = 0;
const turfPath = describeArc(16, 16, 16, start, start + angles.turf);
start += angles.turf;
const poolPath = describeArc(16, 16, 16, start, start + angles.pool);
start += angles.pool;
const courtPath = describeArc(16, 16, 16, start, start + angles.court);

const cardData = [
{ title: "Bookings", value: stats.bookings, link: "/admin/bookingmanagement", color: "bg-green-600" },
{ title: "Facilities", value: stats.facilities, link: "/admin/facilitymanagement", color: "bg-yellow-500" },
{ title: "Payments", value: stats.payments, link: "/admin/paymentmanagement", color: "bg-purple-600" },
{ title: "Maintenance", value: stats.maintenance, link: "/admin/maintenancemanagement", color: "bg-red-600" },
];

return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

{/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
{cardData.map((card) => (
<a key={card.title} href={card.link}>
<div className={`p-6 rounded-xl shadow text-white ${card.color} hover:scale-105 transform transition`}>
<h2 className="text-xl font-semibold">{card.title}</h2>
<p className="text-3xl font-bold mt-2">{card.value}</p>
</div>
</a>
))}
</div>

{/* Charts Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
{/* Booking Trend Chart */}
<div className="bg-white rounded-xl shadow p-6">
<div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold">📈 Booking Trends</h3>
<div className="flex gap-2">
{["weekly", "monthly", "yearly"].map((type) => (
<button
key={type}
onClick={() => handleFilterChange(type)}
className={`px-3 py-1 rounded-lg text-sm font-medium ${
filter === type ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
}`}
>
{type.charAt(0).toUpperCase() + type.slice(1)}
</button>
))}
</div>
</div>

<svg width="100%" height="120" viewBox="0 0 320 120">
<path d={generateLinePath(trendData)} stroke="#10B981" strokeWidth="3" fill="none" />
</svg>
<div className="flex justify-between text-sm mt-2 text-gray-600">
{trendData.map((d) => (
<span key={d.label}>{d.label}</span>
))}
</div>
</div>

{/* Facility Usage Chart */}
<div className="bg-white rounded-xl shadow p-6">
<h3 className="text-lg font-semibold mb-4">🏟 Facility Usage</h3>
<svg viewBox="0 0 32 32" className="w-32 h-32 mx-auto">
<path d={turfPath} fill="#10B981" />
<path d={poolPath} fill="#3B82F6" />
<path d={courtPath} fill="#F59E0B" />
</svg>
<div className="text-center text-sm mt-3 text-gray-700 space-y-1">
<div><span className="text-green-600 font-semibold">■</span> Turf: {facilityUsage.turf}</div>
<div><span className="text-blue-600 font-semibold">■</span> Pool: {facilityUsage.pool}</div>
<div><span className="text-yellow-500 font-semibold">■</span> Court: {facilityUsage.court}</div>
</div>
</div>

{/* Maintenance Status */}
<div className="bg-white rounded-xl shadow p-6 md:col-span-2">
<h3 className="text-lg font-semibold mb-4">🛠 Maintenance Status</h3>
<div className="flex items-center gap-4">
<div className="flex-1 h-6 bg-red-200 rounded-full overflow-hidden">
<div
className="h-full bg-red-500"
style={{
width: `${
(maintenanceStatus.pending /
(maintenanceStatus.pending + maintenanceStatus.completed || 1)) *
100
}%`,
}}
></div>
</div>
<span className="text-sm text-gray-700">Pending: {maintenanceStatus.pending}</span>
<span className="text-sm text-gray-700">Completed: {maintenanceStatus.completed}</span>
</div>
</div>
</div>
</div>
);
};

export default Dashboard;