import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { TextField, Button, Card } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      // Backend ideally should return { token, role, username }.
      // If your backend only returns "Logged in", modify it to return token and role.
      const data = res.data;
      // Attempt to extract token & role:
      const token = data?.token || data?.accessToken || (typeof data === "string" ? null : null);
      const role = data?.role || data?.userRole || (email === "admin" ? "ADMIN" : "USER");

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", email);
        if (role === "ADMIN") navigate("/admin/dashboard");
        else navigate("/user/dashboard");
      } else {
        // Fallback: backend didn't return token. We'll store a fake token for dev convenience
        // (Prefer: change backend to return token)
        console.warn("No token in login response - using fallback token. Update backend to return token.");
        localStorage.setItem("token", "dev-fallback-token");
        // heuristic: treat 'admin' email as ADMIN if backend doesn't supply role
        const guessedRole = email.includes("admin") ? "ADMIN" : "USER";
        localStorage.setItem("role", guessedRole);
        localStorage.setItem("username", email);
        if (guessedRole === "ADMIN") navigate("/admin/dashboard");
        else navigate("/user/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Check console for details.");
    }
  };

return (
<Card style={{ maxWidth: 480, margin: "2rem auto", padding: "1.5rem" }}>
<h4 className="mb-3">Login</h4>
<form onSubmit={handleSubmit}>
<div className="mb-3">
<TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
</div>
<div className="mb-3">
<TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
</div>
<div className="d-flex justify-content-between">
<Button variant="contained" type="submit">Login</Button>
<Button variant="outlined" onClick={() => navigate("/register")}>Register</Button>
</div>
</form>
</Card>
);
}