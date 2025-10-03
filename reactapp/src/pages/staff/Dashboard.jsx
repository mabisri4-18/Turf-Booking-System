import React, { useEffect, useState } from 'react';
import { getMaintenanceByStatus } from '../../api/maintenance';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchMaintenance = async () => {
    const res = await getMaintenanceByStatus('pending'); // get pending tasks
    setTasks(res.data || []);
  };

  useEffect(() => { fetchMaintenance(); }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Pending Maintenance Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-xl shadow overflow-hidden p-4">
              <img
                src={task.image || 'https://source.unsplash.com/400x300/?maintenance,tools'}
                alt={task.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-gray-600 mt-2">Status: {task.status}</p>
              <Link to={`/staff/maintenancetasks/${task.id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  View / Update
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
