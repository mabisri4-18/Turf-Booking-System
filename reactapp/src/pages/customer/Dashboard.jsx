// import React, { useEffect, useState } from "react";
// import { getBookings, deleteBooking } from "../../api/bookings";

// const Dashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch bookings from backend
//   const fetchBookings = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getBookings(); // Axios returns { data: [...] }
//       // Ensure we always have an array
//       if (Array.isArray(response.data)) {
//         setBookings(response.data);
//       } else if (response.data && response.data.content) {
//         // if backend returns paginated object { content: [...] }
//         setBookings(response.data.content);
//       } else {
//         console.warn("Unexpected bookings response:", response.data);
//         setBookings([]);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError("Failed to fetch bookings. Please try again later.");
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a booking
//   const handleDelete = async (id) => {
//     try {
//       await deleteBooking(id);
//       setBookings(bookings.filter((b) => b.id !== id));
//     } catch (err) {
//       console.error("Error deleting booking:", err);
//       setError("Failed to delete booking.");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) return <p>Loading bookings...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
// <div>
// <h2>All Bookings</h2>
// {bookings.length === 0 ? (
// <p>No bookings found.</p>
// ) : (
// <table>
// <thead>
// <tr>
// <th>ID</th>
// <th>Customer Name</th>
// <th>Sport Type</th>
// <th>Booking Date</th>
// <th>Time Slot</th>
// <th>Duration</th>
// <th>Actions</th>
// </tr>
// </thead>
// <tbody>
// {bookings.map((booking) => (
// <tr key={booking.id}>
// <td>{booking.id}</td>
// <td>{booking.customerName}</td>
// <td>{booking.sportType}</td>
// <td>{booking.bookingDate}</td>
// <td>{booking.timeSlot}</td>
// <td>{booking.duration}</td>
// <td>
// <button onClick={() => handleDelete(booking.id)}>Delete</button>
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// )}
// </div>
// );
// };












// import React, { useState } from "react";
// import { Trophy, Calendar, Clock, CheckCircle2 } from "lucide-react";
// import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export default function CustomerDashboard() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const stats = {
//     totalBookings: 12,
//     upcomingBookings: 3,
//     completedBookings: 9,
//     rewardsPoints: 120,
//   };

//   const recommendedTurfs = [
//     { id: 1, name: "GreenField Turf Arena", sport: "Football", rating: 4.7, image: "https://www.dlws.edu.in/blog/images/cricket.png" },
//     { id: 2, name: "Ace Tennis Court", sport: "Tennis", rating: 4.5, image: "https://tidasports.com/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-13-at-12.19.18-1.jpeg" },
//     { id: 3, name: "Hoops Arena", sport: "Basketball", rating: 4.8, image: "https://turftown.s3.ap-south-1.amazonaws.com/super_admin/tt-1732299619373.webp" },
//   ];

//   const bookingStats = [
//     { name: 'Football', value: 5 },
//     { name: 'Tennis', value: 4 },
//     { name: 'Basketball', value: 3 },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-8">
//       <h1 className="text-4xl font-extrabold text-emerald-700 mb-8 text-center animate-fade-in">
//         Welcome Back, Player!
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-500 hover:scale-105 transition-transform">
//           <div className="flex flex-col items-center p-6">
//             <Calendar className="text-green-600 w-10 h-10 mb-2" />
//             <h3 className="text-xl font-bold">Total Bookings</h3>
//             <p className="text-3xl font-extrabold text-emerald-700">{stats.totalBookings}</p>
//           </div>
//         </div>

// <div className="bg-white shadow-lg rounded-lg border-t-4 border-blue-500 hover:scale-105 transition-transform">
// <div className="flex flex-col items-center p-6">
// <Clock className="text-blue-600 w-10 h-10 mb-2" />
// <h3 className="text-xl font-bold">Upcoming</h3>
// <p className="text-3xl font-extrabold text-blue-700">{stats.upcomingBookings}</p>
// </div>
// </div>

// <div className="bg-white shadow-lg rounded-lg border-t-4 border-purple-500 hover:scale-105 transition-transform">
// <div className="flex flex-col items-center p-6">
// <CheckCircle2 className="text-purple-600 w-10 h-10 mb-2" />
// <h3 className="text-xl font-bold">Completed</h3>
// <p className="text-3xl font-extrabold text-purple-700">{stats.completedBookings}</p>
// </div>
// </div>

// <div className="bg-white shadow-lg rounded-lg border-t-4 border-yellow-500 hover:scale-105 transition-transform">
// <div className="flex flex-col items-center p-6">
// <Trophy className="text-yellow-600 w-10 h-10 mb-2" />
// <h3 className="text-xl font-bold">Rewards</h3>
// <p className="text-3xl font-extrabold text-yellow-700">{stats.rewardsPoints}</p>
// </div>
// </div>
// </div>

// {/* Recommended Turfs Section */}
// <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Turfs</h2>
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
// {recommendedTurfs.map((turf) => (
// <div key={turf.id} className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
// <img src={turf.image} alt={turf.name} className="w-full h-48 object-cover" />
// <div className="p-4">
// <h3 className="text-lg font-semibold text-emerald-700">{turf.name}</h3>
// <p className="text-gray-600">Sport: {turf.sport}</p>
// <p className="text-yellow-500 font-semibold">⭐ {turf.rating}</p>
// <button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
// Book Now
// </button>
// </div>
// </div>
// ))}
// </div>

// {/* Interactive Booking Stats Pie Chart */}
// <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Distribution</h2>
// <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-96">
// <ResponsiveContainer width="100%" height="100%">
// <PieChart>
// <Pie
// data={bookingStats}
// dataKey="value"
// nameKey="name"
// cx="50%"
// cy="50%"
// outerRadius={80}
// fill="#82ca9d"
// label
// activeIndex={activeIndex}
// activeShape={(props) => {
// const RADIAN = Math.PI / 180;
// const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
// const sin = Math.sin(-RADIAN * midAngle);
// const cos = Math.cos(-RADIAN * midAngle);
// const sx = cx + (outerRadius + 10) * cos;
// const sy = cy + (outerRadius + 10) * sin;
// const mx = cx + (outerRadius + 30) * cos;
// const my = cy + (outerRadius + 30) * sin;
// const ex = mx + (cos >= 0 ? 1 : -1) * 22;
// const ey = my;
// const textAnchor = cos >= 0 ? 'start' : 'end';

// return (
// <g>
// <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold">{payload.name}</text>
// <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
// <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
// <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
// <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Bookings: ${value}`}</text>
// <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 18} textAnchor={textAnchor} fill="#999">{`(${(percent * 100).toFixed(0)}%)`}</text>
// </g>
// );
// }}
// onMouseEnter={onPieEnter}
// >
// {bookingStats.map((entry, index) => (
// <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// ))}
// </Pie>
// <Tooltip />
// <Legend />
// </PieChart>
// </ResponsiveContainer>
// </div>
// </div>
// );
// }




// import React, { useEffect, useState } from "react";
// import { Trophy, Calendar, Clock, CheckCircle2 } from "lucide-react";
// import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { getBookings, deleteBooking } from "../../api/bookings"; // Adjust API paths
// import { getFacilities } from "../../api/facilities";

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [recommendedTurfs, setRecommendedTurfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [error, setError] = useState(null);

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const bookingRes = await getBookings();
//         const turfsRes = await getFacilities();

//         const bookingData = Array.isArray(bookingRes.data) ? bookingRes.data : bookingRes.data.content || [];
//         setBookings(bookingData);

//         const turfsData = Array.isArray(turfsRes.data) ? turfsRes.data : turfsRes.data.content || [];
//         setRecommendedTurfs(turfsData);

//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p className="text-center mt-12">Loading dashboard...</p>;
//   if (error) return <p className="text-center mt-12 text-red-600">{}</p>;

//   // Compute stats
//   const totalBookings = bookings.length;
//   const upcomingBookings = bookings.filter(b => new Date(b.bookingDate) > new Date()).length;
//   const completedBookings = bookings.filter(b => new Date(b.bookingDate) <= new Date()).length;
//   const rewardsPoints = totalBookings * 10; // Example calculation

//   // Pie chart data
//   const sportCount = bookings.reduce((acc, b) => {
//     acc[b.sportType] = (acc[b.sportType] || 0) + 1;
//     return acc;
//   }, {});
//   const bookingStats = Object.entries(sportCount).map(([name, value]) => ({ name, value }));

//   const onPieEnter = (_, index) => setActiveIndex(index);

//   // Delete booking
//   const handleDelete = async (id) => {
//     try {
//       await deleteBooking(id);
//       setBookings(bookings.filter(b => b.id !== id));
//     } catch (err) {
//       console.error("Error deleting booking:", err);
//       setError("Failed to delete booking.");
//     }
//   };

//   return (
// <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-8">
// <h1 className="text-4xl font-extrabold text-emerald-700 mb-8 text-center animate-fade-in">
// Welcome Back, Player!
// </h1>

// {/* Stats Cards */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// <StatCard icon={<Calendar className="text-green-600 w-10 h-10 mb-2" />} title="Total Bookings" value={totalBookings} color="green" />
// <StatCard icon={<Clock className="text-blue-600 w-10 h-10 mb-2" />} title="Upcoming" value={upcomingBookings} color="blue" />
// <StatCard icon={<CheckCircle2 className="text-purple-600 w-10 h-10 mb-2" />} title="Completed" value={completedBookings} color="purple" />
// <StatCard icon={<Trophy className="text-yellow-600 w-10 h-10 mb-2" />} title="Rewards" value={rewardsPoints} color="yellow" />
// </div>

// {/* Recommended Turfs */}
// <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Turfs</h2>
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
// {recommendedTurfs.map(turf => (
// <div key={turf.id} className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
// <img src={turf.image} alt={turf.name} className="w-full h-48 object-cover" />
// <div className="p-4">
// <h3 className="text-lg font-semibold text-emerald-700">{turf.name}</h3>
// <p className="text-gray-600">Sport: {turf.sport}</p>
// <p className="text-yellow-500 font-semibold">⭐ {turf.rating}</p>
// <button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
// Book Now
// </button>
// </div>
// </div>
// ))}
// </div>

// {/* Booking Distribution Pie Chart */}
// <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Distribution</h2>
// <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-96 mb-12">
// <ResponsiveContainer width="100%" height="100%">
// <PieChart>
// <Pie
// data={bookingStats}
// dataKey="value"
// nameKey="name"
// cx="50%"
// cy="50%"
// outerRadius={80}
// fill="#82ca9d"
// label
// activeIndex={activeIndex}
// activeShape={renderActiveShape}
// onMouseEnter={onPieEnter}
// >
// {bookingStats.map((entry, index) => (
// <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// ))}
// </Pie>
// <Tooltip />
// <Legend />
// </PieChart>
// </ResponsiveContainer>
// </div>

// {/* Bookings Table */}
// <h2 className="text-2xl font-bold text-gray-800 mb-4">All Bookings</h2>
// {bookings.length === 0 ? (
// <p>No bookings found.</p>
// ) : (
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
// <thead className="bg-emerald-500 text-white">
// <tr>
// <th className="py-2 px-4">ID</th>
// <th className="py-2 px-4">Customer Name</th>
// <th className="py-2 px-4">Sport Type</th>
// <th className="py-2 px-4">Booking Date</th>
// <th className="py-2 px-4">Time Slot</th>
// <th className="py-2 px-4">Duration</th>
// <th className="py-2 px-4">Actions</th>
// </tr>
// </thead>
// <tbody>
// {bookings.map(booking => (
// <tr key={booking.id} className="text-center border-b">
// <td className="py-2 px-4">{booking.id}</td>
// <td className="py-2 px-4">{booking.customerName}</td>
// <td className="py-2 px-4">{booking.sportType}</td>
// <td className="py-2 px-4">{booking.bookingDate}</td>
// <td className="py-2 px-4">{booking.timeSlot}</td>
// <td className="py-2 px-4">{booking.duration} hrs</td>
// <td className="py-2 px-4">
// <button
// onClick={() => handleDelete(booking.id)}
// className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
// >
// Delete
// </button>
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// )}
// </div>
// );
// }

// // StatCard Component
// const StatCard = ({ icon, title, value, color }) => (
// <div className={`bg-white shadow-lg rounded-lg border-t-4 border-${color}-500 hover:scale-105 transition-transform`}>
// <div className="flex flex-col items-center p-6">
// {icon}
// <h3 className="text-xl font-bold">{title}</h3>
// <p className={`text-3xl font-extrabold text-${color}-700`}>{value}</p>
// </div>
// </div>
// );

// // Custom active shape for pie chart
// const renderActiveShape = (props) => {
// const RADIAN = Math.PI / 180;
// const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
// const sin = Math.sin(-RADIAN * midAngle);
// const cos = Math.cos(-RADIAN * midAngle);
// const sx = cx + (outerRadius + 10) * cos;
// const sy = cy + (outerRadius + 10) * sin;
// const mx = cx + (outerRadius + 30) * cos;
// const my = cy + (outerRadius + 30) * sin;
// const ex = mx + (cos >= 0 ? 1 : -1) * 22;
// const ey = my;
// const textAnchor = cos >= 0 ? 'start' : 'end';

// return (
// <g>
// <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold">{payload.name}</text>
// <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
// <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
// <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
// <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Bookings: ${value}`}</text>
// <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 18} textAnchor={textAnchor} fill="#999">{`(${(percent * 100).toFixed(0)}%)`}</text>
// </g>
// );
// };

import React, { useEffect, useState } from "react";
import { Trophy, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getBookings, deleteBooking } from "../../api/bookings"; // Adjust API paths
import { getFacilities } from "../../api/facilities";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [recommendedTurfs, setRecommendedTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await getBookings();
        const turfsRes = await getFacilities();

        const bookingData = Array.isArray(bookingRes.data)
          ? bookingRes.data
          : bookingRes.data.content || [];
        setBookings(bookingData);

        const turfsData = (Array.isArray(turfsRes.data) ? turfsRes.data : turfsRes.data.content || []).map((turf) => ({
          ...turf,
          image:
            turf.image || // if backend already provides image
            (turf.type === "pool"
              ? "https://astroturf.com/static/5b92caf1d507d71041cd617986af8c0d/99e4b/pittsoccer.jpg" // pool image
              : turf.type === "court"
              ? "https://5.imimg.com/data5/SELLER/Default/2023/10/350327019/NU/WB/TZ/38215148/7-a-side-football-turf.jpg" // court image
              : "https://www.dlws.edu.in/blog/images/cricket.png"), // default turf
        }));

        setRecommendedTurfs(turfsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-12">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-12 text-red-600">{error}</p>;

  // Compute stats
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(b => new Date(b.bookingDate) > new Date()).length;
  const completedBookings = bookings.filter(b => new Date(b.bookingDate) <= new Date()).length;
  const rewardsPoints = totalBookings * 10; // Example calculation

// Pie chart data
const sportCount = bookings.reduce((acc, b) => {
acc[b.sportType] = (acc[b.sportType] || 0) + 1;
return acc;
}, {});
const bookingStats = Object.entries(sportCount).map(([name, value]) => ({ name, value }));

const onPieEnter = (_, index) => setActiveIndex(index);

// Delete booking
const handleDelete = async (id) => {
try {
await deleteBooking(id);
setBookings(bookings.filter(b => b.id !== id));
} catch (err) {
console.error("Error deleting booking:", err);
setError("Failed to delete booking.");
}
};

return (
<div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-8">
<h1 className="text-4xl font-extrabold text-emerald-700 mb-8 text-center animate-fade-in">
Welcome Back, Player!
</h1>

{/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
<StatCard icon={<Calendar className="text-green-600 w-10 h-10 mb-2" />} title="Total Bookings" value={totalBookings} color="green" />
<StatCard icon={<Clock className="text-blue-600 w-10 h-10 mb-2" />} title="Upcoming" value={upcomingBookings} color="blue" />
<StatCard icon={<CheckCircle2 className="text-purple-600 w-10 h-10 mb-2" />} title="Completed" value={completedBookings} color="purple" />
<StatCard icon={<Trophy className="text-yellow-600 w-10 h-10 mb-2" />} title="Rewards" value={rewardsPoints} color="yellow" />
</div>

{/* Recommended Turfs */}
<h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Turfs</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
{recommendedTurfs.map(turf => (
<div key={turf.id} className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
<img src={turf.image} alt={turf.name} className="w-full h-48 object-cover" />
<div className="p-4">
<h3 className="text-lg font-semibold text-emerald-700">{turf.name}</h3>
<p className="text-gray-600">Sport: {turf.sport}</p>
<p className="text-yellow-500 font-semibold">⭐⭐⭐⭐ {turf.rating || "4.5"}</p>
<button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
Book Now
</button>
</div>
</div>
))}
</div>

{/* Booking Distribution Pie Chart */}
<h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Distribution</h2>
<div className="bg-white rounded-2xl shadow-lg p-6 w-full h-96 mb-12">
<ResponsiveContainer width="100%" height="100%">
<PieChart>
<Pie
data={bookingStats}
dataKey="value"
nameKey="name"
cx="50%"
cy="50%"
outerRadius={80}
fill="#82ca9d"
label
activeIndex={activeIndex}
activeShape={renderActiveShape}
onMouseEnter={onPieEnter}
>
{bookingStats.map((entry, index) => (
<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}
</Pie>
<Tooltip />
<Legend />
</PieChart>
</ResponsiveContainer>
</div>

{/* Bookings Table */}
<h2 className="text-2xl font-bold text-gray-800 mb-4">All Bookings</h2>
{bookings.length === 0 ? (
<p>No bookings found.</p>
) : (
<div className="overflow-x-auto">
<table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
<thead className="bg-emerald-500 text-white">
<tr>
<th className="py-2 px-4">ID</th>
<th className="py-2 px-4">Customer Name</th>
<th className="py-2 px-4">Sport Type</th>
<th className="py-2 px-4">Booking Date</th>
<th className="py-2 px-4">Time Slot</th>
<th className="py-2 px-4">Duration</th>
<th className="py-2 px-4">Actions</th>
</tr>
</thead>
<tbody>
{bookings.map(booking => (
<tr key={booking.id} className="text-center border-b">
<td className="py-2 px-4">{booking.id}</td>
<td className="py-2 px-4">{booking.customerName}</td>
<td className="py-2 px-4">{booking.sportType}</td>
<td className="py-2 px-4">{booking.bookingDate}</td>
<td className="py-2 px-4">{booking.timeSlot}</td>
<td className="py-2 px-4">{booking.duration} hrs</td>
<td className="py-2 px-4">
<button
onClick={() => handleDelete(booking.id)}
className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
>
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
)}
</div>
);
}

// StatCard Component
const StatCard = ({ icon, title, value, color }) => (
<div className={`bg-white shadow-lg rounded-lg border-t-4 border-${color}-500 hover:scale-105 transition-transform`}>
<div className="flex flex-col items-center p-6">
{icon}
<h3 className="text-xl font-bold">{title}</h3>
<p className={`text-3xl font-extrabold text-${color}-700`}>{value}</p>
</div>
</div>
);

// Custom active shape for pie chart
const renderActiveShape = (props) => {
const RADIAN = Math.PI / 180;
const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
const sin = Math.sin(-RADIAN * midAngle);
const cos = Math.cos(-RADIAN * midAngle);
const sx = cx + (outerRadius + 10) * cos;
const sy = cy + (outerRadius + 10) * sin;
const mx = cx + (outerRadius + 30) * cos;
const my = cy + (outerRadius + 30) * sin;
const ex = mx + (cos >= 0 ? 1 : -1) * 22;
const ey = my;
const textAnchor = cos >= 0 ? 'start' : 'end';

return (
<g>
<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold">{payload.name}</text>
<Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
<circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Bookings: ${value}`}</text>
<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 18} textAnchor={textAnchor} fill="#999">{`(${(percent * 100).toFixed(0)}%)`}</text>
</g>
);
};