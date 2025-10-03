import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../api/auth'; // example API call

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authenticate = async (email, password) => {
    try {
      const res = await loginUser({ email, password }); // API returns user object
      if (res.data) {
        setUser(res.data);
        return res.data;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => useContext(AuthContext);
