import React from "react";
import { TextField, Button, Typography } from "@mui/material";

const Login = () => {
  return (
    <div className="container mt-4">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth placeholder="Email" margin="normal" />
      <TextField fullWidth placeholder="Password" type="password" margin="normal" />
      <Button variant="contained" className="mt-3">Login</Button>
    </div>
  );
};

export default Login;
