// import React, { useEffect, useState } from "react";
// import { getMaintenanceByStatus } from "../../api/maintenance";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await getMaintenanceByStatus("pending"); // get pending tasks
//         setTasks(res.data || []);
//       } catch (err) {
//         console.error("Error fetching tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border border-yellow-300";
//       case "in-progress":
//         return "bg-blue-100 text-blue-800 border border-blue-300";
//       case "completed":
//         return "bg-green-100 text-green-800 border border-green-300";
//       default:
//         return "bg-gray-100 text-gray-800 border border-gray-300";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-gray-500">
//         Loading tasks...
//       </div>
//     );
//   }

//  return (
// <div className="min-h-screen bg-gray-50 p-6">
// <div className="max-w-7xl mx-auto">
// <header className="mb-10 text-center">
// <h1 className="text-4xl font-bold text-gray-800 mb-2">Staff Dashboard</h1>
// <p className="text-gray-600">Update and manage your maintenance tasks.</p>
// </header>

// {tasks.length === 0 ? (
// <div className="text-center py-20">
// <img
// src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
// alt="No tasks"
// className="mx-auto w-36 mb-6 opacity-70"
// />
// <h2 className="text-xl font-semibold text-gray-700 mb-2">No Tasks Assigned</h2>
// <p className="text-gray-500">All caught up! Check back later for new assignments.</p>
// </div>
// ) : (
// <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// {tasks.map((task) => (
// <div key={task.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
// <div className="h-48 w-full overflow-hidden rounded-t-2xl">
// <img
// src={task.image || "https://turftown.s3.ap-south-1.amazonaws.com/super_admin/tt-1719570227580.webp"}
// alt={task.title}
// className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// />
// </div>
// <div className="p-5 flex flex-col justify-between h-56">
// <div>
// <div className="flex justify-between items-center mb-2">
// <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{task.title}</h3>
// <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
// {task.status}
// </span>
// </div>
// <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description || "No description available."}</p>
// </div>
// <Link to="/staff/tasks">
// <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300">
// View / Update
// </button>
// </Link>
// </div>
// </div>
// ))}
// </div>
// )}
// </div>
// </div>
// );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { getMaintenanceByStatus } from "../../api/maintenance";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getMaintenanceByStatus("pending"); // get pending tasks
        setTasks(res.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const inProgressTasks = tasks.filter(t => t.status === "In-Progress").length;

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Staff Dashboard</h1>
          <p className="text-gray-600">Update and manage your maintenance tasks.</p>
        </header>

      {/* Summary Cards */}
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
<div className="bg-white rounded-xl shadow p-5 flex flex-col items-center hover:shadow-lg transition-shadow">
<h2 className="text-gray-500 text-sm">Total Tasks</h2>
<p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
</div>
<div className="bg-yellow-50 rounded-xl shadow p-5 flex flex-col items-center hover:shadow-lg transition-shadow">
<h2 className="text-yellow-800 text-sm">Pending</h2>
<p className="text-2xl font-bold text-yellow-800">{pendingTasks}</p>
</div>
<div className="bg-blue-50 rounded-xl shadow p-5 flex flex-col items-center hover:shadow-lg transition-shadow">
<h2 className="text-blue-800 text-sm">In Progress</h2>
<p className="text-2xl font-bold text-blue-800">{inProgressTasks}</p>
</div>
<div className="bg-green-50 rounded-xl shadow p-5 flex flex-col items-center hover:shadow-lg transition-shadow">
<h2 className="text-green-800 text-sm">Completed</h2>
<p className="text-2xl font-bold text-green-800">{completedTasks}</p>
</div>
</div>

{/* Search / Filter (UI only) */}
<div className="mb-6 flex justify-end">
<input
type="text"
placeholder="Search tasks..."
className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
</div>

{/* Tasks Grid */}
{tasks.length === 0 ? (
<div className="text-center py-20">
<img
src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
alt="No tasks"
className="mx-auto w-36 mb-6 opacity-70"
/>
<h2 className="text-xl font-semibold text-gray-700 mb-2">No Tasks Assigned</h2>
<p className="text-gray-500">All caught up! Check back later for new assignments.</p>
</div>
) : (
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
{tasks.map((task) => (
<div
key={task.id}
className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
>
<div className="h-48 w-full overflow-hidden rounded-t-2xl">
<img
src={task.image || "https://turftown.s3.ap-south-1.amazonaws.com/super_admin/tt-1719570227580.webp"}
alt={task.title}
className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
/>
</div>
<div className="p-5 flex flex-col justify-between h-56">
<div>
<div className="flex justify-between items-center mb-2">
<h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{task.title}</h3>
<span
className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}
>
{task.status}
</span>
</div>
<p className="text-gray-600 text-sm mb-4 line-clamp-3">
{task.description || "No description available."}
</p>
</div>
<Link to="/staff/tasks">
<button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300">
View / Update
</button>
</Link>
</div>
</div>
))}
</div>
)}
</div>
</div>
);
};

export default Dashboard;