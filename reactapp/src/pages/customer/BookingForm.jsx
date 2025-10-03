import React, { useState } from 'react';
import { createBooking } from '../../api/bookings';
import { useNavigate, useParams } from 'react-router-dom';

const BookingForm = () => {
  const { id } = useParams(); // turf id
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bookingDate: '',
    timeSlot: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking({ ...form, turfId: id });
    navigate('/customer/payment'); // redirect to payment
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Book Your Turf</h1>
        <label className="block mb-2">Booking Date</label>
        <input
          type="date"
          name="bookingDate"
          value={form.bookingDate}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label className="block mb-2">Time Slot</label>
        <input
          type="text"
          name="timeSlot"
          value={form.timeSlot}
          onChange={handleChange}
          placeholder="e.g. 5:00 PM - 6:00 PM"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
