// layouts/StaffLayout.jsx
import React from "react";

const StaffLayout = ({ children }) => {
  return (
    <div className="staff-layout flex">
      <aside className="w-60 bg-blue-700 text-white p-4">
        <h2 className="font-bold">Staff Panel</h2>
      </aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default StaffLayout;
