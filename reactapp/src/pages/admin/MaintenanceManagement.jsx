// import React, { useEffect, useState } from "react";
// import { Trash2, Edit, Calendar } from "lucide-react";
// import {
//   getMaintenance,
//   deleteMaintenance,
// } from "../../api/maintenance";

// const MaintenanceManagement = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await getMaintenance();
//       setTasks(res.data || []);
//     } catch (err) {
//       console.error("Error fetching maintenance tasks:", err);
//       alert("Unable to fetch maintenance tasks. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (maintenanceId) => {
//     if (!window.confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await deleteMaintenance(maintenanceId);
//       alert("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       console.error("Error deleting maintenance task:", err);
//       alert("Unable to delete task. Try again later.");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
//         Maintenance Management
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading tasks...</p>
//       ) : tasks.length === 0 ? (
//         <p className="text-center text-gray-600">
//           No maintenance tasks found. Add some tasks!
//         </p>
//       ) : (
//        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// {tasks.map((task) => (
// <div
// key={task.maintenanceId}
// className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
// >
// <div className="p-5">
// <h2 className="text-2xl font-semibold text-gray-800 mb-2">
// {task.facility?.name || "Facility"}
// </h2>
// <p className="text-gray-600 mb-2">
// <span className="font-medium">Description:</span>{" "}
// {task.description || "-"}
// </p>
// <p className="flex items-center gap-2 text-gray-700 mb-3">
// <Calendar size={16} className="text-blue-600" />
// {task.scheduledDate || "-"}
// </p>
// <p
// className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
// task.status === "completed"
// ? "bg-green-100 text-green-800"
// : "bg-yellow-100 text-yellow-800"
// }`}
// >
// {task.status || "pending"}
// </p>

// <div className="flex gap-3 mt-5">
// {/* Edit button placeholder */}
// <button
// className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex-1 justify-center"
// >
// <Edit size={16} /> Edit
// </button>

// <button
// onClick={() => handleDelete(task.maintenanceId)}
// className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex-1 justify-center"
// >
// <Trash2 size={16} /> Delete
// </button>
// </div>
// </div>
// </div>
// ))}
// </div>
// )}
// </div>
// );
// };

// export default MaintenanceManagement;



import React, { useEffect, useState } from "react";
import { Trash2, Edit, Calendar, X } from "lucide-react";
import {
  getMaintenance,
  deleteMaintenance,
  updateMaintenance,
} from "../../api/maintenance";

const MaintenanceManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // currently editing
  const [formData, setFormData] = useState({
    maintenanceId: "",
    description: "",
    scheduledDate: "",
    status: "",
    facilityId: "", // ✅ facility ID
  });

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getMaintenance();
      setTasks(res.data || []);
    } catch (err) {
      console.error("Error fetching maintenance tasks:", err);
      alert("Unable to fetch maintenance tasks. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task
  const handleDelete = async (maintenanceId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteMaintenance(maintenanceId);
      alert("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Unable to delete task. Try again later.");
    }
  };

  // Open edit modal
  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      maintenanceId: task.maintenanceId,
      description: task.description || "",
      scheduledDate: task.scheduledDate || "",
      status: task.status || "pending",
      facilityId: task.facility?.facilityId || "", // ✅ store facility ID
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send facilityId as { facilityId: X }
      const payload = {
        ...formData,
        facility: { facilityId: formData.facilityId },
      };
     await updateMaintenance(payload);
alert("Maintenance updated successfully!");
setEditingTask(null);
fetchTasks();
} catch (err) {
console.error("Error updating maintenance:", err);
alert("Unable to update maintenance record. Try again later.");
}
};

return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
Maintenance Management
</h1>

{loading ? (
<p className="text-center text-gray-600">Loading tasks...</p>
) : tasks.length === 0 ? (
<p className="text-center text-gray-600">No maintenance tasks found. Add some tasks!</p>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{tasks.map((task) => (
<div
key={task.maintenanceId}
className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
>
<div className="p-5">
<h2 className="text-2xl font-semibold text-gray-800 mb-2">
{task.facility?.name || "Facility"}
</h2>
<p className="text-gray-600 mb-2">
<span className="font-medium">Description:</span> {task.description || "-"}
</p>
<p className="flex items-center gap-2 text-gray-700 mb-3">
<Calendar size={16} className="text-blue-600" />
{task.scheduledDate || "-"}
</p>
<p
className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
task.status === "completed"
? "bg-green-100 text-green-800"
: "bg-yellow-100 text-yellow-800"
}`}
>
{task.status || "pending"}
</p>

<div className="flex gap-3 mt-5">
<button
onClick={() => handleEdit(task)}
className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex-1 justify-center"
>
<Edit size={16} /> Edit
</button>

<button
onClick={() => handleDelete(task.maintenanceId)}
className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex-1 justify-center"
>
<Trash2 size={16} /> Delete
</button>
</div>
</div>
</div>
))}
</div>
)}

{/* Edit Modal */}
{editingTask && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
<div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
<button
onClick={() => setEditingTask(null)}
className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
>
<X size={20} />
</button>
<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Maintenance</h2>
<form onSubmit={handleUpdate} className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700">Description</label>
<input
type="text"
name="description"
value={formData.description}
onChange={handleChange}
className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
<input
type="date"
name="scheduledDate"
value={formData.scheduledDate}
onChange={handleChange}
className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Status</label>
<select
name="status"
value={formData.status}
onChange={handleChange}
className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
>
<option value="pending">Pending</option>
<option value="completed">Completed</option>
</select>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Facility ID</label>
<input
type="number"
name="facilityId"
value={formData.facilityId}
onChange={handleChange}
className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
/>
</div>

<button
type="submit"
className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
>
Save Changes
</button>
</form>
</div>
</div>
)}
</div>
);
};

export default MaintenanceManagement;