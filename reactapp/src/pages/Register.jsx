import React from "react";
import { TextField, Button, Typography } from "@mui/material";

const Register = () => {
  return (
    <div className="container mt-4">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField fullWidth placeholder="Name" margin="normal" />
      <TextField fullWidth placeholder="Email" margin="normal" />
      <TextField fullWidth placeholder="Password" type="password" margin="normal" />
      <Button variant="contained" className="mt-3">Register</Button>
    </div>
  );
};

export default Register;
