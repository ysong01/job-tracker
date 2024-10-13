// frontend/src/pages/Dashboard.js
import React from 'react';
import JobList from '../components/Jobs/JobList';
import JobForm from '../components/Jobs/JobForm';

const Dashboard = () => (
  <div className="dashboard">
    <h2>Your Job Applications</h2>
    <JobForm />
    <JobList />
  </div>
);

export default Dashboard;
