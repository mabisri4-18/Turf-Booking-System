import React, { useEffect, useState } from 'react';
import { getMaintenance, deleteMaintenance } from '../../api/maintenance';

const MaintenanceManagement = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getMaintenance();
    setTasks(res.data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteMaintenance(id);
    fetchTasks();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Maintenance Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.status}</p>
            <button
              onClick={() => handleDelete(task.id)}
              className="mt-2 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceManagement;
