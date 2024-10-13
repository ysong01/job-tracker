// frontend/src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/api/auth/login', form);
      login(res.data.token, res.data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          value={form.username} 
          onChange={handleChange} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
