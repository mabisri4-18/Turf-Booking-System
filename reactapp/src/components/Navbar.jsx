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
            <Link to="/customer/feedback" className="hover:underline">
            Feedback
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
            <Link to="/staff/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/staff/tasks" className="hover:underline">Maintenance Tasks</Link>
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

// // export default Navbar;
// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   // Replace this with your image URL
//   // const logoUrl = "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b016e4f8-fd0a-4958-95c8-8a72d4f866bf.png";

//   return (
//     <nav className="bg-green-600 text-white p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//           <img
//             // src={logoUrl}
//             // alt="TurfTime Logo"
//             className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-110"
//           />
//           <span className="text-2xl font-bold hidden sm:inline-block">TurfTime</span>
//         </Link>

//         {/* Links */}
//         <div className="flex items-center space-x-4 text-sm sm:text-base">
//           {/* Customer Links */}
//           {user?.role?.toUpperCase() === "CUSTOMER" && (
//             <>
//               <Link to="/customer/dashboard" className="hover:underline">Dashboard</Link>
//               <Link to="/customer/turfs" className="hover:underline">Turfs</Link>
//               <Link to="/customer/bookings" className="hover:underline">My Bookings</Link>
//             </>
//           )}

//         {/* Admin Links */}
// {user?.role?.toUpperCase() === "ADMIN" && (
// <>
// <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
// <Link to="/admin/users" className="hover:underline">Users</Link>
// <Link to="/admin/bookings" className="hover:underline">Bookings</Link>
// <Link to="/admin/facilities" className="hover:underline">Facilities</Link>
// <Link to="/admin/payments" className="hover:underline">Payments</Link>
// <Link to="/admin/maintenance" className="hover:underline">Maintenance</Link>
// </>
// )}

// {/* Staff Links */}
// {user?.role?.toUpperCase() === "STAFF" && (
// <>
// <Link to="/staff/dashboard" className="hover:underline">Dashboard</Link>
// <Link to="/staff/tasks" className="hover:underline">Maintenance Tasks</Link>
// </>
// )}

// {/* Auth Buttons */}
// {user ? (
// <>
// <span className="font-semibold">Hi, {user.username}</span>
// <button
// onClick={logout}
// className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
// >
// Logout
// </button>
// </>
// ) : (
// <>
// <Link to="/login" className="hover:underline">Login</Link>
// <Link
// to="/register"
// className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
// >
// Register
// </Link>
// </>
// )}
// </div>
// </div>
// </nav>
// );
// };

// export default Navbar;