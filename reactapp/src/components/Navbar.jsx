import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        TurfTime
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-6">
        {/* CUSTOMER LINKS */}
        {user?.role?.toUpperCase() === "CUSTOMER" && (
          <>
            <Link to="/customer/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/customer/turfs" className="hover:underline">
              Turfs
            </Link>
            <Link to="/customer/bookings" className="hover:underline">
              My Bookings
            </Link>
          </>
        )}

        {/* ADMIN LINKS */}
        {user?.role?.toUpperCase() === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/users" className="hover:underline">
              Users
            </Link>
            <Link to="/admin/bookings" className="hover:underline">
              Bookings
            </Link>
            <Link to="/admin/facilities" className="hover:underline">
              Facilities
            </Link>
            <Link to="/admin/payments" className="hover:underline">
              Payments
            </Link>
            <Link to="/admin/maintenance" className="hover:underline">
              Maintenance
            </Link>
          </>
        )}

     {/* STAFF LINKS */}
{user?.role?.toUpperCase() === "STAFF" && (
<>
<Link to="/staff/dashboard" className="hover:underline">
Dashboard
</Link>
<Link to="/staff/tasks" className="hover:underline">
Maintenance Tasks
</Link>
</>
)}

{/* AUTH BUTTONS */}
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
<Link to="/login" className="hover:underline">
Login
</Link>
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