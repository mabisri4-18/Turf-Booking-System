// import React, { useEffect, useState } from 'react';
// import { getAllUsers, deleteUser } from '../../api/auth';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     const res = await getAllUsers();
//     setUsers(res.data || []);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteUser(id);
//     fetchUsers();
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-3 px-6 text-left">ID</th>
//               <th className="py-3 px-6 text-left">Username</th>
//               <th className="py-3 px-6 text-left">Email</th>
//               <th className="py-3 px-6 text-left">Role</th>
//               <th className="py-3 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.userId} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-6">{user.userId}</td>
//                 <td className="py-3 px-6">{user.username}</td>
//                 <td className="py-3 px-6">{user.email}</td>
//                 <td className="py-3 px-6">{user.role}</td>
//                 <td className="py-3 px-6">
//                   <button
//                     onClick={() => handleDelete(user.userId)}
//                     className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;



// import React, { useEffect, useState } from 'react';
// import { getAllUsers, deleteUser } from '../../api/auth';
// import { Users, UserCheck, UserX, Shield } from 'lucide-react';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     active: 0,
//     blocked: 0,
//     admins: 0,
//   });

//   const fetchUsers = async () => {
//     const res = await getAllUsers();
//     const data = res.data || [];
//     setUsers(data);

//     // Calculate stats
//     const total = data.length;
//     const active = data.filter(u => u.status === 'Active').length;
//     const blocked = data.filter(u => u.status === 'Blocked').length;
//     const admins = data.filter(u => u.role === 'Admin').length;

//     setStats({ total, active, blocked, admins });
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteUser(id);
//     fetchUsers();
//   };

//   const statCards = [
//     { title: 'Total Users', value: stats.total, color: 'text-green-700', bg: 'bg-green-50', icon: <Users className="w-6 h-6 text-green-500" /> },
//     { title: 'Active Users', value: stats.active, color: 'text-green-700', bg: 'bg-green-50', icon: <UserCheck className="w-6 h-6 text-green-500" /> },
//     { title: 'Blocked Users', value: stats.blocked, color: 'text-red-700', bg: 'bg-red-50', icon: <UserX className="w-6 h-6 text-red-500" /> },
//     { title: 'Admins', value: stats.admins, color: 'text-blue-700', bg: 'bg-blue-50', icon: <Shield className="w-6 h-6 text-blue-500" /> },
//   ];

//   const calcPercent = (part, total) => total > 0 ? ((part / total) * 100).toFixed(1) : 0;

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
//       <p className="text-gray-600 mb-8">Monitor and analyze user accounts</p>

// {/* Summary Cards */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
// {statCards.map((card, i) => (
// <div
// key={i}
// className={`flex items-center justify-between p-6 rounded-xl shadow-sm border ${card.bg} hover:shadow-md transition`}
// >
// <div>
// <h2 className="text-sm font-semibold text-gray-600">{card.title}</h2>
// <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
// </div>
// <div className="p-3 rounded-full bg-white shadow-inner">{card.icon}</div>
// </div>
// ))}
// </div>

// {/* Simple Analytics Section */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
// {/* Active vs Blocked */}
// <div className="bg-white p-6 rounded-xl shadow-sm border">
// <h3 className="text-lg font-semibold mb-4">User Status Overview</h3>
// <div className="space-y-3">
// <div>
// <div className="flex justify-between mb-1">
// <span className="text-green-700 font-medium">Active</span>
// <span>{calcPercent(stats.active, stats.total)}%</span>
// </div>
// <div className="w-full bg-gray-200 rounded-full h-3">
// <div
// className="bg-green-500 h-3 rounded-full"
// style={{ width: `${calcPercent(stats.active, stats.total)}%` }}
// ></div>
// </div>
// </div>

// <div>
// <div className="flex justify-between mb-1">
// <span className="text-red-700 font-medium">Blocked</span>
// <span>{calcPercent(stats.blocked, stats.total)}%</span>
// </div>
// <div className="w-full bg-gray-200 rounded-full h-3">
// <div
// className="bg-red-500 h-3 rounded-full"
// style={{ width: `${calcPercent(stats.blocked, stats.total)}%` }}
// ></div>
// </div>
// </div>
// </div>
// </div>

// {/* Role Distribution */}
// <div className="bg-white p-6 rounded-xl shadow-sm border">
// <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
// <div className="space-y-3">
// <div>
// <div className="flex justify-between mb-1">
// <span className="text-blue-700 font-medium">Admins</span>
// <span>{calcPercent(stats.admins, stats.total)}%</span>
// </div>
// <div className="w-full bg-gray-200 rounded-full h-3">
// <div
// className="bg-blue-500 h-3 rounded-full"
// style={{ width: `${calcPercent(stats.admins, stats.total)}%` }}
// ></div>
// </div>
// </div>

// <div>
// <div className="flex justify-between mb-1">
// <span className="text-gray-700 font-medium">Regular Users</span>
// <span>{calcPercent(stats.total - stats.admins, stats.total)}%</span>
// </div>
// <div className="w-full bg-gray-200 rounded-full h-3">
// <div
// className="bg-gray-500 h-3 rounded-full"
// style={{ width: `${calcPercent(stats.total - stats.admins, stats.total)}%` }}
// ></div>
// </div>
// </div>
// </div>
// </div>
// </div>

// {/* User List */}
// <div className="bg-white p-6 rounded-xl shadow-sm border">
// <h2 className="text-2xl font-semibold mb-4">
// All Users <span className="text-gray-500 text-lg">({users.length})</span>
// </h2>
// <div className="space-y-4">
// {users.map((user) => (
// <div
// key={user.userId}
// className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border rounded-lg hover:shadow transition"
// >
// <div>
// <p className="font-semibold text-lg">{user.username}</p>
// <p className="text-gray-500 text-sm">{user.email}</p>
// <div className="flex gap-2 mt-2">
// <span
// className={`text-xs font-medium px-3 py-1 rounded-full ${
// user.status === 'Blocked'
// ? 'bg-red-100 text-red-700'
// : 'bg-green-100 text-green-700'
// }`}
// >
// {user.status}
// </span>
// <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
// {user.role}
// </span>
// </div>
// </div>
// <button
// onClick={() => handleDelete(user.userId)}
// className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
// >
// Delete
// </button>
// </div>
// ))}
// </div>
// </div>
// </div>
// );
// };

// export default UserManagement;

import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/auth";
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Search,
  Loader2,
  Trash2,
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const data = res.data || [];
      setUsers(data);

      const total = data.length;
      const active = data.filter((u) => u.status === "Active").length;
      const blocked = data.filter((u) => u.status === "Blocked").length;
      const admins = data.filter((u) => u.role === "Admin").length;
      setStats({ total, active, blocked, admins });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  const calcPercent = (part, total) =>
    total > 0 ? ((part / total) * 100).toFixed(1) : 0;

  const statCards = [
    {
      title: "Total Users",
      value: stats.total,
      color: "text-blue-700",
      bg: "bg-blue-50",
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Active Users",
      value: stats.active,
      color: "text-green-700",
      bg: "bg-green-50",
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Blocked Users",
      value: stats.blocked,
      color: "text-red-700",
      bg: "bg-red-50",
      icon: <UserX className="w-6 h-6 text-red-600" />,
    },
    {
      title: "Admins",
      value: stats.admins,
      color: "text-purple-700",
      bg: "bg-purple-50",
      icon: <Shield className="w-6 h-6 text-purple-600" />,
    },
  ];

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
<div className="p-8 bg-gray-50 min-h-screen">
{/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
<div>
<h1 className="text-3xl font-bold text-gray-800 mb-1">User Management</h1>
<p className="text-gray-500">Monitor, manage, and analyze all users</p>
</div>

<div className="relative mt-4 sm:mt-0">
<Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
<input
type="text"
placeholder="Search users..."
className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
</div>
</div>

{/* Stats Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
{statCards.map((card, i) => (
<div
key={i}
className={`flex items-center justify-between p-6 rounded-2xl shadow-sm border ${card.bg} hover:shadow-md transition-all`}
>
<div>
<h2 className="text-sm font-semibold text-gray-600">{card.title}</h2>
<p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
</div>
<div className="p-3 rounded-full bg-white shadow-inner">{card.icon}</div>
</div>
))}
</div>

{/* Analytics Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
{/* User Status */}
<div className="bg-white p-6 rounded-2xl border shadow-sm">
<h3 className="text-lg font-semibold mb-4 text-gray-800">
User Status Overview
</h3>
<div className="space-y-4">
{[
{ label: "Active", color: "green", value: stats.active },
{ label: "Blocked", color: "red", value: stats.blocked },
].map((item, i) => (
<div key={i}>
<div className="flex justify-between mb-1">
<span className={`text-${item.color}-700 font-medium`}>
{item.label}
</span>
<span>{calcPercent(item.value, stats.total)}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-3">
<div
className={`bg-${item.color}-500 h-3 rounded-full transition-all`}
style={{
width: `${calcPercent(item.value, stats.total)}%`,
}}
></div>
</div>
</div>
))}
</div>
</div>

{/* Role Distribution */}
<div className="bg-white p-6 rounded-2xl border shadow-sm">
<h3 className="text-lg font-semibold mb-4 text-gray-800">
User Role Distribution
</h3>
<div className="space-y-4">
{[
{ label: "Admins", color: "purple", value: stats.admins },
{
label: "Regular Users",
color: "gray",
value: stats.total - stats.admins,
},
].map((item, i) => (
<div key={i}>
<div className="flex justify-between mb-1">
<span className={`text-${item.color}-700 font-medium`}>
{item.label}
</span>
<span>{calcPercent(item.value, stats.total)}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-3">
<div
className={`bg-${item.color}-500 h-3 rounded-full transition-all`}
style={{
width: `${calcPercent(item.value, stats.total)}%`,
}}
></div>
</div>
</div>
))}
</div>
</div>
</div>

{/* User List */}
<div className="bg-white p-6 rounded-2xl border shadow-sm">
<h2 className="text-2xl font-semibold mb-4 text-gray-800">
All Users{" "}
<span className="text-gray-500 text-lg">({filteredUsers.length})</span>
</h2>

{loading ? (
<div className="flex justify-center py-10">
<Loader2 className="animate-spin w-8 h-8 text-blue-500" />
</div>
) : filteredUsers.length === 0 ? (
<p className="text-center text-gray-500 py-10">
No users found. Try a different search.
</p>
) : (
<div className="space-y-4">
{filteredUsers.map((user) => (
<div
key={user.userId}
className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border rounded-xl hover:shadow-md transition bg-gray-50"
>
<div>
<p className="font-semibold text-lg text-gray-800">
{user.username}
</p>
<p className="text-gray-500 text-sm">{user.email}</p>
<div className="flex gap-2 mt-2">
<span
className={`text-xs font-medium px-3 py-1 rounded-full ${
user.status === "Blocked"
? "bg-red-100 text-red-700"
: "bg-green-100 text-green-700"
}`}
>
{user.status}
</span>
<span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
{user.role}
</span>
</div>
</div>
<button
onClick={() => handleDelete(user.userId)}
className="mt-4 sm:mt-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
>
<Trash2 className="w-4 h-4" />
Delete
</button>
</div>
))}
</div>
)}
</div>
</div>
);
};

export default UserManagement;