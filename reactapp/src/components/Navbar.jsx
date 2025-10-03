import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">TurfTime</Link>

      <div className="flex items-center space-x-6">
        {/* Always visible to logged-in customers */}
        {user?.role?.toUpperCase() === 'CUSTOMER' && (
          <>
            <Link to="/customer/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/customer/turfs" className="hover:underline">Turfs</Link>
            <Link to="/customer/bookings" className="hover:underline">My Bookings</Link>
          </>
        )}

        {/* Admin-specific link */}
        {user?.role?.toUpperCase() === 'ADMIN' && (
          <Link to="/admin/dashboard" className="hover:underline">Admin Dashboard</Link>
        )}

        {/* Staff-specific link */}
        {user?.role?.toUpperCase() === 'STAFF' && (
          <Link to="/staff/dashboard" className="hover:underline">Staff Dashboard</Link>
        )}

        {/* Auth Buttons */}
        {user ? (
          <>
            <span className="font-semibold">Hi, {user.username}</span>
            <button
              onClick={logout}
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link
              to="/register"
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
