import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setUser({ token: data.token, role: data.role });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async ({ username, email, password, role }) => {
    try {
      await axios.post('/api/auth/register', { username, email, password, role });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
