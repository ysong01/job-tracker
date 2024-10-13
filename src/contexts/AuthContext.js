// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
  });

  useEffect(() => {
    if (auth.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [auth.token]);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
