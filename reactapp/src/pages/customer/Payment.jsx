import React from 'react';
import { makePayment } from '../../api/payments';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    await makePayment({ amount: 500 }); // dummy amount
    navigate('/customer/bookinghistory');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>
        <p className="mb-4">Amount: ₹500</p>
        <button onClick={handlePayment} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
