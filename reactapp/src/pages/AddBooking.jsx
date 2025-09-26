import React from "react";
import BookingForm from "../components/BookingForm";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
  const navigate = useNavigate();
  const refresh = () => navigate("/");

  return (
    <div>
      <BookingForm onAdd={refresh} />
    </div>
  );
};

export default AddBooking;
