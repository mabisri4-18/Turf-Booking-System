// import React, { useEffect, useState } from 'react';
// import { getMaintenance, deleteMaintenance } from '../../api/maintenance';

// const MaintenanceManagement = () => {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const res = await getMaintenance();
//     setTasks(res.data || []);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteMaintenance(id);
//     fetchTasks();
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Maintenance Management</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tasks.map((task) => (
//           <div key={task.id} className="bg-white p-4 rounded-xl shadow">
//             <h2 className="text-lg font-semibold">{task.title}</h2>
//             <p className="text-gray-600">{task.status}</p>
//             <button
//               onClick={() => handleDelete(task.id)}
//               className="mt-2 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MaintenanceManagement;

import React, { useEffect, useState } from "react";
import { Trash2, Edit, Calendar } from "lucide-react";
import {
  getMaintenance,
  deleteMaintenance,
} from "../../api/maintenance";

const MaintenanceManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (maintenanceId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteMaintenance(maintenanceId);
      alert("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Error deleting maintenance task:", err);
      alert("Unable to delete task. Try again later.");
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
        <p className="text-center text-gray-600">
          No maintenance tasks found. Add some tasks!
        </p>
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
<span className="font-medium">Description:</span>{" "}
{task.description || "-"}
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
{/* Edit button placeholder */}
<button
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
</div>
);
};

export default MaintenanceManagement;