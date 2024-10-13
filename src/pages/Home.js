// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home">
    <h2 style={{ marginTop: '20px' }}>Welcome to your Job Application Tracker</h2>
    <p style={{ marginLeft: '3px' }}>Manage your job applications efficiently.</p>

    <Link to="/register" className="btn" style={{ marginLeft: '-10px' }}>Get Started</Link>

  </div>
);

export default Home;
