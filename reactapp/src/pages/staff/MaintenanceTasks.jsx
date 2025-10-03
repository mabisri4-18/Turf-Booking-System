import React, { useState, useEffect, useCallback } from 'react';
import { getMaintenance, saveMaintenance } from '../../api/maintenance'; // updated imports
import { useParams } from 'react-router-dom';

const MaintenanceTasks = () => {
  const { id } = useParams(); // staff ID
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await getMaintenance(); // fetch all maintenance
      // Filter tasks assigned to this staff
      const staffTasks = res.data.filter(task => task.staffId === id);
      setTasks(staffTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, [id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusChange = async (task, newStatus) => {
    try {
      await saveMaintenance({ ...task, status: newStatus }); // update task using saveMaintenance
      fetchTasks(); // refresh
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

 return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-3xl font-bold mb-6">Maintenance Tasks</h1>
<div className="overflow-x-auto">
<table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
<thead className="bg-gray-200">
<tr>
<th className="py-3 px-6 text-left">Task ID</th>
<th className="py-3 px-6 text-left">Turf</th>
<th className="py-3 px-6 text-left">Description</th>
<th className="py-3 px-6 text-left">Status</th>
<th className="py-3 px-6 text-left">Actions</th>
</tr>
</thead>
<tbody>
{tasks.map(task => (
<tr key={task.id} className="border-b hover:bg-gray-50">
<td className="py-3 px-6">{task.id}</td>
<td className="py-3 px-6">{task.turfName}</td>
<td className="py-3 px-6">{task.description}</td>
<td className="py-3 px-6">{task.status}</td>
<td className="py-3 px-6 space-x-2">
{task.status !== 'Completed' && (
<button
onClick={() => handleStatusChange(task, 'Completed')}
className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700"
>
Mark Completed
</button>
)}
{task.status !== 'Pending' && (
<button
onClick={() => handleStatusChange(task, 'Pending')}
className="bg-yellow-600 text-white py-1 px-3 rounded-lg hover:bg-yellow-700"
>
Reset
</button>
)}
</td>
</tr>
))}
{tasks.length === 0 && (
<tr>
<td colSpan="5" className="py-4 text-center text-gray-500">
No tasks assigned
</td>
</tr>
)}
</tbody>
</table>
</div>
</div>
);
};

export default MaintenanceTasks;