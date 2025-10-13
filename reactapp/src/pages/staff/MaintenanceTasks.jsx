// import React, { useEffect, useState } from "react";
// import { getMaintenance, saveMaintenance } from "../../api/maintenance";

// const MaintenanceTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const res = await getMaintenance(); // all tasks
//       setTasks(res.data || []);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const updateStatus = async (task, status) => {
//     try {
//       await saveMaintenance({ ...task, status });
//       fetchTasks(); // refresh tasks after update
//     } catch (err) {
//       console.error("Error updating task:", err);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-20 text-gray-500">Loading tasks...</div>;
//   }

//  return (
// <div className="max-w-5xl mx-auto p-6">
// <h1 className="text-3xl font-bold mb-6">Maintenance Tasks</h1>

// {tasks.length === 0 ? (
// <p className="text-gray-500 text-center py-10">No tasks assigned.</p>
// ) : (
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
// <thead className="bg-gray-200">
// <tr>
// <th className="py-3 px-6 text-left">Task ID</th>
// <th className="py-3 px-6 text-left">Turf</th>
// <th className="py-3 px-6 text-left">Description</th>
// <th className="py-3 px-6 text-left">Status</th>
// <th className="py-3 px-6 text-left">Actions</th>
// </tr>
// </thead>
// <tbody>
// {tasks.map((task) => (
// <tr key={task.id} className="border-b hover:bg-gray-50">
// <td className="py-3 px-6">{task.id}</td>
// <td className="py-3 px-6">{task.turfName}</td>
// <td className="py-3 px-6">{task.description}</td>
// <td className="py-3 px-6">{task.status}</td>
// <td className="py-3 px-6 space-x-2">
// {task.status !== "Completed" && (
// <button
// onClick={() => updateStatus(task, "Completed")}
// className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700"
// >
// Mark Completed
// </button>
// )}
// {task.status !== "Pending" && (
// <button
// onClick={() => updateStatus(task, "Pending")}
// className="bg-yellow-600 text-white py-1 px-3 rounded-lg hover:bg-yellow-700"
// >
// Reset to Pending
// </button>
// )}
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// )}
// </div>
// );
// };

// export default MaintenanceTasks;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getMaintenance, saveMaintenance } from "../../api/maintenance";

// const MaintenanceTasks = () => {
//   const { id } = useParams(); // if you want specific task view
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const res = await getMaintenance();
//       // Optional: filter by staff id
//       const staffTasks = id
//         ? res.data.filter((task) => task.id.toString() === id)
//         : res.data;
//       setTasks(staffTasks);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [id]);

//   const updateStatus = async (task, status) => {
//     try {
//       await saveMaintenance({ ...task, status });
//       setTasks((prev) =>
//         prev.map((t) => (t.id === task.id ? { ...t, status } : t))
//       );
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

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
//       <div className="text-center py-20 text-gray-500">Loading tasks...</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">
//           Maintenance Tasks
//         </h1>

//         {tasks.length === 0 ? (
//           <div className="text-center py-20">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
//               alt="No tasks"
//               className="mx-auto w-36 mb-6 opacity-70"
//             />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               No Tasks Assigned
//             </h2>
//             <p className="text-gray-500">
//               All caught up! Check back later for new assignments.
//             </p>
//           </div>
//      ) : (
// <div className="overflow-x-auto">
// <table className="min-w-full bg-white rounded-2xl shadow border border-gray-200">
// <thead className="bg-gray-100">
// <tr>
// <th className="py-3 px-6 text-left text-gray-600 font-medium">
// Task ID
// </th>
// <th className="py-3 px-6 text-left text-gray-600 font-medium">
// Title
// </th>
// <th className="py-3 px-6 text-left text-gray-600 font-medium">
// Description
// </th>
// <th className="py-3 px-6 text-left text-gray-600 font-medium">
// Status
// </th>
// <th className="py-3 px-6 text-left text-gray-600 font-medium">
// Actions
// </th>
// </tr>
// </thead>
// <tbody>
// {tasks.map((task) => (
// <tr
// key={task.id}
// className="border-b hover:bg-gray-50 transition-colors"
// >
// <td className="py-3 px-6">{task.id}</td>
// <td className="py-3 px-6 font-semibold">{task.title}</td>
// <td className="py-3 px-6 text-gray-600 line-clamp-2">
// {task.description || "No description"}
// </td>
// <td className="py-3 px-6">
// <span
// className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
// task.status
// )}`}
// >
// {task.status}
// </span>
// </td>
// <td className="py-3 px-6 space-x-2">
// {task.status !== "Completed" && (
// <button
// onClick={() => updateStatus(task, "Completed")}
// className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition-all"
// >
// Mark Completed
// </button>
// )}
// {task.status !== "Pending" && (
// <button
// onClick={() => updateStatus(task, "Pending")}
// className="bg-yellow-600 text-white py-1 px-3 rounded-lg hover:bg-yellow-700 transition-all"
// >
// Reset
// </button>
// )}
// {task.status !== "In-Progress" && (
// <button
// onClick={() => updateStatus(task, "In-Progress")}
// className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition-all"
// >
// In Progress
// </button>
// )}
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// )}
// </div>
// </div>
// );
// };

// export default MaintenanceTasks;

// // src/pages/staff/MaintenanceTasks.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import { getMaintenance, saveMaintenance } from "../../api/maintenance";

// const MaintenanceTasks = () => {
//   const { id } = useParams(); // staff ID or task ID if needed
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingTaskId, setUpdatingTaskId] = useState(null); // for UI feedback

//   // Fetch tasks
//   const fetchTasks = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getMaintenance(); // get all tasks
//       const staffTasks = id
//         ? res.data.filter((task) => task.id.toString() === id)
//         : res.data;
//       setTasks(staffTasks);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   // Update task status
//   const updateStatus = async (task, status) => {
//     setUpdatingTaskId(task.id);
//     try {
//       await saveMaintenance({ ...task, status });
//       setTasks((prev) =>
//         prev.map((t) => (t.id === task.id ? { ...t, status } : t))
//       );
//     } catch (err) {
//       console.error("Error updating task:", err);
//     } finally {
//       setUpdatingTaskId(null);
//     }
//   };

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
//       <div className="text-center py-20 text-gray-500 text-lg">
//         Loading maintenance tasks...
//       </div>
//     );
//   }

//   if (tasks.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
//           alt="No tasks"
//           className="mx-auto w-36 mb-6 opacity-70"
//         />
//         <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//           No Tasks Assigned
//         </h2>
//         <p className="text-gray-500">
//           All caught up! Check back later for new assignments.
//         </p>
//       </div>
//     );
//   }

//  return (
// <div className="min-h-screen bg-gray-50 p-6">
// <div className="max-w-7xl mx-auto">
// <header className="mb-10 text-center">
// <h1 className="text-4xl font-bold text-gray-800 mb-2">
// Maintenance Tasks
// </h1>
// <p className="text-gray-600">
// Manage your assigned tasks efficiently.
// </p>
// </header>

// <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// {tasks.map((task) => (
// <div
// key={task.id}
// className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
// >
// <div className="h-48 w-full overflow-hidden rounded-t-2xl">
// <img
// src={
// task.image ||
// "https://turftown.s3.ap-south-1.amazonaws.com/super_admin/tt-1719570227580.webp"
// }
// alt={task.title}
// className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
// />
// </div>
// <div className="p-5 flex flex-col flex-1 justify-between">
// <div>
// <div className="flex justify-between items-center mb-2">
// <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
// {task.title}
// </h3>
// <span
// className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
// task.status
// )}`}
// >
// {task.status}
// </span>
// </div>
// <p className="text-gray-600 text-sm mb-4 line-clamp-3">
// {task.description || "No description available."}
// </p>
// </div>

// <div className="flex gap-2 mt-2">
// {task.status !== "Completed" && (
// <button
// onClick={() => updateStatus(task, "Completed")}
// disabled={updatingTaskId === task.id}
// className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
// >
// {updatingTaskId === task.id
// ? "Updating..."
// : "Mark Completed"}
// </button>
// )}
// {task.status !== "Pending" && (
// <button
// onClick={() => updateStatus(task, "Pending")}
// disabled={updatingTaskId === task.id}
// className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
// >
// {updatingTaskId === task.id ? "Updating..." : "Reset"}
// </button>
// )}
// </div>
// </div>
// </div>
// ))}
// </div>
// </div>
// </div>
// );
// };

// export default MaintenanceTasks;




// src/pages/staff/MaintenanceTasks.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getMaintenance, updateMaintenance } from "../../api/maintenance";
import { Edit, Calendar } from "lucide-react";

const MaintenanceTasks = () => {
  const { id } = useParams(); // Optional: staff ID or task ID filter
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    status: "",
    scheduledDate: "",
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMaintenance();
      const filteredTasks = id
        ? res.data.filter((task) => task.maintenanceId.toString() === id)
        : res.data;
      setTasks(filteredTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Start editing a task
  const startEdit = (task) => {
    setEditingTaskId(task.maintenanceId);
    setEditForm({
      description: task.description || "",
      status: task.status || "pending",
      scheduledDate: task.scheduledDate || "",
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edit
  const handleUpdate = async () => {
    const taskToUpdate = tasks.find((t) => t.maintenanceId === editingTaskId);
    if (!taskToUpdate) return;

    setUpdatingTaskId(editingTaskId);
    try {
      await updateMaintenance({
        maintenanceId: taskToUpdate.maintenanceId,
        description: editForm.description,
        status: editForm.status,
        scheduledDate: editForm.scheduledDate,
        facility: taskToUpdate.facility, // Include required facility
      });
      fetchTasks();
      setEditingTaskId(null);
    } catch (err) {
      console.error("Error updating maintenance:", err);
      alert("Unable to update maintenance record. Try again later.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

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

if (loading) {
return (
<div className="text-center py-20 text-gray-500 text-lg">
Loading maintenance tasks...
</div>
);
}

if (tasks.length === 0) {
return (
<div className="text-center py-20">
<img
src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
alt="No tasks"
className="mx-auto w-36 mb-6 opacity-70"
/>
<h2 className="text-2xl font-semibold text-gray-700 mb-2">
No Tasks Assigned
</h2>
<p className="text-gray-500">
All caught up! Check back later for new assignments.
</p>
</div>
);
}

return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="max-w-7xl mx-auto">
<header className="mb-10 text-center">
<h1 className="text-4xl font-bold text-gray-800 mb-2">
Maintenance Tasks
</h1>
<p className="text-gray-600">Manage your assigned tasks efficiently.</p>
</header>

<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
{tasks.map((task) => (
<div
key={task.maintenanceId}
className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
>
<div className="p-5 flex flex-col flex-1 justify-between">
<div>
<div className="flex justify-between items-center mb-2">
<h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
{task.facility?.name || "Facility"}
</h3>
<span
className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
task.status
)}`}
>
{task.status}
</span>
</div>

{editingTaskId === task.maintenanceId ? (
<div className="space-y-2">
<textarea
name="description"
value={editForm.description}
onChange={handleChange}
className="w-full border rounded px-2 py-1"
rows={3}
/>
<input
type="date"
name="scheduledDate"
value={editForm.scheduledDate}
onChange={handleChange}
className="w-full border rounded px-2 py-1"
/>
<select
name="status"
value={editForm.status}
onChange={handleChange}
className="w-full border rounded px-2 py-1"
>
<option value="pending">Pending</option>
<option value="in-progress">In-Progress</option>
<option value="completed">Completed</option>
</select>
<button
onClick={handleUpdate}
disabled={updatingTaskId === task.maintenanceId}
className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold mt-2 disabled:opacity-50"
>
{updatingTaskId === task.maintenanceId
? "Updating..."
: "Save Changes"}
</button>
</div>
) : (
<>
<p className="text-gray-600 text-sm mb-4 line-clamp-3">
{task.description || "No description available."}
</p>
<p className="flex items-center gap-2 text-gray-700 mb-3">
<Calendar size={16} className="text-blue-600" />
{task.scheduledDate || "-"}
</p>
</>
)}
</div>

{editingTaskId !== task.maintenanceId && (
<button
onClick={() => startEdit(task)}
className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
>
<Edit size={16} className="inline-block mr-1" />
Edit Task
</button>
)}
</div>
</div>
))}
</div>
</div>
</div>
);
};

export default MaintenanceTasks;