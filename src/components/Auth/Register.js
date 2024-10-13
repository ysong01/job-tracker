// frontend/src/components/Auth/Register.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();

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
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, form);
      login(res.data.token, res.data.user);
      history.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
