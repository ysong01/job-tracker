// frontend/src/components/Jobs/JobForm.js
import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [form, setForm] = useState({
    company: '',
    position: '',
    application_date: '',
    status: 'Applied',
    notes: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/jobs`, form);
      setSuccess('Job added successfully');
      setForm({
        company: '',
        position: '',
        application_date: '',
        status: 'Applied',
        notes: '',
      });
    } catch (err) {
      setError('Failed to add job');
    }
  };

  return (
    <div className="job-form">
      <h3>Add New Job Application</h3>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Company:</label>
        <input type="text" name="company" value={form.company} onChange={handleChange} required />

        <label>Position:</label>
        <input type="text" name="position" value={form.position} onChange={handleChange} required />

        <label>Application Date:</label>
        <input type="date" name="application_date" value={form.application_date} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <label>Notes:</label>
        <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default JobForm;
