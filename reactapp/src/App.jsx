import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddBooking from "./pages/AddBooking";

const App = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBooking />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
