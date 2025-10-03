import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { makePayment } from "../../api/payments";

const Payment = () => {
  const { id } = useParams(); // booking ID
  const navigate = useNavigate();

  const handlePayment = async () => {
  try {
    const payment = {
      booking: { id: id },           // nested Booking object
      amount: 500,
      paymentDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      paymentStatus: "paid"
    };

    await makePayment(payment);
    alert("✅ Payment successful!");
    navigate("/customer/bookings");
  } catch (error) {
    console.error("Payment error:", error.response || error.message);
    alert("❌ Payment failed");
  }
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>
        <p className="mb-4">Amount: ₹500</p>
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
