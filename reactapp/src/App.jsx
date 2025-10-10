// import React from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import ProtectedRoute from './components/ProtectedRoute';
// import { Routes, Route } from 'react-router-dom';

// // Auth Pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Customer Pages
// import Dashboard from './pages/customer/Dashboard';
// import TurfList from './pages/customer/TurfList';
// import BookingForm from './pages/customer/BookingForm';
// import Payment from './pages/customer/Payment';
// import BookingHistory from './pages/customer/BookingHistory';

// // Admin Pages
// import AdminDashboard from './pages/admin/Dashboard';
// import UserManagement from './pages/admin/UserManagement';
// import BookingManagement from './pages/admin/BookingManagement';
// import FacilityManagement from './pages/admin/FacilityManagement';
// import PaymentManagement from './pages/admin/PaymentManagement';
// import MaintenanceManagement from './pages/admin/MaintenanceManagement';

// // Staff Pages
// import StaffDashboard from './pages/staff/Dashboard';
// import MaintenanceTasks from './pages/staff/MaintenanceTasks';

// // Other
// import NotFound from './pages/NotFound';

// // ✅ Landing Page
// import LandingPage from './pages/LandingPage';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* ✅ Public Landing Page */}
//         <Route path="/" element={<LandingPage />} />

//         {/* Auth */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Customer */}
//         <Route
//           path="/customer/dashboard"
//           element={
//             <ProtectedRoute role="CUSTOMER">
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
// path="/customer/turfs"
// element={
// <ProtectedRoute role="CUSTOMER">
// <TurfList />
// </ProtectedRoute>
// }
// />
// <Route
// path="/customer/booking/:id"
// element={
// <ProtectedRoute role="CUSTOMER">
// <BookingForm />
// </ProtectedRoute>
// }
// />
// <Route
// path="/customer/payment/:id"
// element={
// <ProtectedRoute role="CUSTOMER">
// <Payment />
// </ProtectedRoute>
// }
// />
// <Route
// path="/customer/bookings"
// element={
// <ProtectedRoute role="CUSTOMER">
// <BookingHistory />
// </ProtectedRoute>
// }
// />

// {/* Admin */}
// <Route
// path="/admin/dashboard"
// element={
// <ProtectedRoute role="ADMIN">
// <AdminDashboard />
// </ProtectedRoute>
// }
// />
// <Route
// path="/admin/users"
// element={
// <ProtectedRoute role="ADMIN">
// <UserManagement />
// </ProtectedRoute>
// }
// />
// <Route
// path="/admin/bookings"
// element={
// <ProtectedRoute role="ADMIN">
// <BookingManagement />
// </ProtectedRoute>
// }
// />
// <Route
// path="/admin/facilities"
// element={
// <ProtectedRoute role="ADMIN">
// <FacilityManagement />
// </ProtectedRoute>
// }
// />
// <Route
// path="/admin/payments"
// element={
// <ProtectedRoute role="ADMIN">
// <PaymentManagement />
// </ProtectedRoute>
// }
// />
// <Route
// path="/admin/maintenance"
// element={
// <ProtectedRoute role="ADMIN">
// <MaintenanceManagement />
// </ProtectedRoute>
// }
// />

// {/* Staff */}
// <Route
// path="/staff/dashboard"
// element={
// <ProtectedRoute role="STAFF">
// <StaffDashboard />
// </ProtectedRoute>
// }
// />
// <Route
// path="/staff/tasks/:id"
// element={
// <ProtectedRoute role="STAFF">
// <MaintenanceTasks />
// </ProtectedRoute>
// }
// />

// {/* 404 */}
// <Route path="*" element={<NotFound />} />
// </Routes>
// <Footer />
// </>
// );
// }

// export default App;

// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Customer Pages
import Dashboard from "./pages/customer/Dashboard";
import TurfList from "./pages/customer/TurfList";
import BookingForm from "./pages/customer/BookingForm";
import Payment from "./pages/customer/Payment";
import BookingHistory from "./pages/customer/BookingHistory";

// Other
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route
        path="/"
        element={
            <LandingPage />
        }
      />

      {/* Auth Pages (Login/Register) */}
      <Route
        path="/login"
        element={
          <CustomerLayout>
            <Login />
          </CustomerLayout>
        }
      />
      <Route
        path="/register"
        element={
          <CustomerLayout>
            <Register />
          </CustomerLayout>
        }
      />

    {/* Customer Pages */}
<Route
path="/customer/dashboard"
element={
<ProtectedRoute role="CUSTOMER">
<CustomerLayout>
<Dashboard />
</CustomerLayout>
</ProtectedRoute>
}
/>
<Route
path="/customer/turfs"
element={
<ProtectedRoute role="CUSTOMER">
<CustomerLayout>
<TurfList />
</CustomerLayout>
</ProtectedRoute>
}
/>
<Route
path="/customer/booking/:id"
element={
<ProtectedRoute role="CUSTOMER">
<CustomerLayout>
<BookingForm />
</CustomerLayout>
</ProtectedRoute>
}
/>
<Route
path="/customer/payment/:id"
element={
<ProtectedRoute role="CUSTOMER">
<CustomerLayout>
<Payment />
</CustomerLayout>
</ProtectedRoute>
}
/>
<Route
path="/customer/bookings"
element={
<ProtectedRoute role="CUSTOMER">
<CustomerLayout>
<BookingHistory />
</CustomerLayout>
</ProtectedRoute>
}
/>
{/* Admin Pages */}
<Route
  path="/admin/*"
  element={
    <ProtectedRoute role="ADMIN">
      <AdminLayout />
    </ProtectedRoute>
  }
/>

 {/* Staff Routes */}
      <Route
        path="/staff/*"
        element={
          <ProtectedRoute role="STAFF">
            <StaffLayout />
          </ProtectedRoute>
        }
      />


{/* 404 */}
<Route path="*" element={<NotFound />} />
</Routes>
);
};

export default App;