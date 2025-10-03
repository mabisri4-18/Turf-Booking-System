import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">TurfTime</Link>
      <div className="flex items-center space-x-4">
        <Link to="/customer/dashboard" className="hover:underline">Dashboard</Link>
        {user?.role === 'ADMIN' && <Link to="/admin/dashboard" className="hover:underline">Admin</Link>}
        {user ? (
          <>
            <span className="font-semibold">Hi, {user.username}</span>
            <button onClick={logout} className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
