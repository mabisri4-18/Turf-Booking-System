// import React, { useEffect, useState } from 'react';
// import { getPayments, deletePayment } from '../../api/payments';

// const PaymentManagement = () => {
//   const [payments, setPayments] = useState([]);

//   const fetchPayments = async () => {
//     const res = await getPayments();
//     setPayments(res.data || []);
//   };

//   useEffect(() => { fetchPayments(); }, []);

//   const handleDelete = async (id) => {
//     await deletePayment(id);
//     fetchPayments();
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Payment Management</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {payments.map((p) => (
//           <div key={p.id} className="bg-white p-4 rounded-xl shadow">
//             <h2 className="text-lg font-semibold">{p.customerName}</h2>
//             <p className="text-gray-600">{p.status}</p>
//             <p className="text-gray-600">{p.amount}</p>
//             <button
//               onClick={() => handleDelete(p.id)}
//               className="mt-2 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PaymentManagement;

import React, { useEffect, useState } from "react";
import { Trash2, CreditCard } from "lucide-react";
import { getPayments, deletePayment } from "../../api/payments";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch payments
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getPayments();
      setPayments(res.data || []);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
      alert("Unable to fetch payments from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Delete payment
  const handleDelete = async (paymentId) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await deletePayment(paymentId);
      alert("Payment deleted successfully!");
      fetchPayments();
    } catch (err) {
      console.error("Failed to delete payment:", err.response || err.message);
      alert("Unable to delete payment. Try again later.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Payment Management
        </h1>
        <p className="text-gray-600 font-medium">
          Total Payments: <span className="font-bold">{payments.length}</span>
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading payments...</p>
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No payments found.
        </p>
     ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{payments.map((p) => (
<div
key={p.paymentId}
className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
>
{/* Card Header */}
<div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-blue-50">
<CreditCard className="text-blue-600" />
<h2 className="text-lg font-semibold text-gray-800">
{p.booking?.customerName || "Unknown Customer"}
</h2>
</div>

{/* Card Body */}
<div className="p-4 space-y-3">
<div className="flex items-center justify-between">
<span className="text-gray-500 font-medium">Booking ID:</span>
<span className="text-gray-700 font-semibold">{p.booking?.bookingId || "-"}</span>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-500 font-medium">Amount:</span>
<span className="text-gray-700 font-semibold">${p.amount ?? "-"}</span>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-500 font-medium">Status:</span>
<span
className={`px-3 py-1 rounded-full text-sm font-semibold ${
p.paymentStatus?.toLowerCase() === "paid"
? "bg-green-100 text-green-700"
: p.paymentStatus?.toLowerCase() === "pending"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-700"
}`}
>
{p.paymentStatus || "Pending"}
</span>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-500 font-medium">Date:</span>
<span className="text-gray-700">{p.paymentDate || "-"}</span>
</div>
</div>

{/* Card Footer */}
<div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
<button
onClick={() => handleDelete(p.paymentId)}
className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
>
<Trash2 size={16} /> Delete
</button>
</div>
</div>
))}
</div>
)}
</div>
);
};

export default PaymentManagement;