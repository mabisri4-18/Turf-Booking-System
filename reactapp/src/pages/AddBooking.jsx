import React from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

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
