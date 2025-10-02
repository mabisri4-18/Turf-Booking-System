import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { TextField, Button, Card } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    try {
      await registerUser({ username, email, password });
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <Card style={{ maxWidth: 480, margin: "2rem auto", padding: "1.5rem" }}>
      <h4 className="mb-3">Register</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-2">
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-2">
          <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <TextField label="Confirm Password" type="password" fullWidth value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="contained" type="submit">Register</Button>
        </div>
      </form>
    </Card>
  );
}
