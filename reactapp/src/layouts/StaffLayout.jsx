// // layouts/StaffLayout.jsx
// import React from "react";

// const StaffLayout = ({ children }) => {
//   return (
//     <div className="staff-layout flex">
//       <aside className="w-60 bg-blue-700 text-white p-4">
//         <h2 className="font-bold">Staff Panel</h2>
//       </aside>
//       <div className="flex-1 p-6">{children}</div>
//     </div>
//   );
// };

// export default StaffLayout;




import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Staff Pages
import Dashboard from "../pages/staff/Dashboard";
import MaintenanceTasks from "../pages/staff/MaintenanceTasks";

const StaffLayout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-[80vh] p-6 bg-gray-100">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Maintenance Tasks */}
          <Route path="tasks" element={<MaintenanceTasks />} />

          {/* Optional: If you want individual task details later */}
          {/* <Route path="tasks/:id" element={<MaintenanceTasks />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default StaffLayout;
