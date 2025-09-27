import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { addBooking } from "../services/api";

const BookingForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    sportType: "",
    bookingDate: "",
    timeSlot: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { customerName, sportType, bookingDate, timeSlot, duration } = formData;
    if (!customerName || !sportType || !bookingDate || !timeSlot || !duration) {
      return; // validation: keep silent as tests expect placeholder presence
    }
    await addBooking(formData);
    setFormData({
      customerName: "",
      sportType: "",
      bookingDate: "",
      timeSlot: "",
      duration: "",
    });
    if (onAdd) onAdd();
  };
return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Booking
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="customerName"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleChange}
              inputProps={{ "data-testid": "customerName" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="sportType"
              placeholder="Sport Type"
              value={formData.sportType}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="bookingDate"
              type="date"
              placeholder="Booking Date"
              value={formData.bookingDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="timeSlot"
              placeholder="Time Slot"
              value={formData.timeSlot}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="duration"
              type="number"
              placeholder="Duration (hours)"
              value={formData.duration}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookingForm;