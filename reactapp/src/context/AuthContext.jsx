import React, { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authenticate = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      if (res.data) {
        setUser(res.data); // Make sure res.data contains { role, email, etc. }
        return res.data;
      }
      return null;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return null;
    }
  };

  const createUser = async (data) => {
    try {
      const res = await registerUser(data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, createUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
