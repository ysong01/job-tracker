// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home">
    <h1>Welcome to Job Application Tracker</h1>
    <p>Manage your job applications efficiently.</p>
    <Link to="/register" className="btn">Get Started</Link>
  </div>
);

export default Home;
