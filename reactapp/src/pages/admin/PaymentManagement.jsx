import React, { useEffect, useState } from 'react';
import { getPayments, deletePayment } from '../../api/payments';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await getPayments();
    setPayments(res.data || []);
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleDelete = async (id) => {
    await deletePayment(id);
    fetchPayments();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payment Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">{p.customerName}</h2>
            <p className="text-gray-600">{p.status}</p>
            <p className="text-gray-600">{p.amount}</p>
            <button
              onClick={() => handleDelete(p.id)}
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

export default PaymentManagement;
