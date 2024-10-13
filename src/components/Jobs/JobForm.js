// frontend/src/components/Jobs/JobForm.js
import React, { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

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
      await api.post('/api/jobs', form);
      setSuccess('Job added successfully');
      toast.success('Job added successfully!');
      setForm({
        company: '',
        position: '',
        application_date: '',
        status: 'Applied',
        notes: '',
      });
    } catch (err) {
      setError('Failed to add job');
      toast.error('Failed to add job');
    }
  };

  return (
    <div className="job-form">
      
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company:</label>
          <input 
            type="text" 
            name="company" 
            className="form-control" 
            value={form.company} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position:</label>
          <input 
            type="text" 
            name="position" 
            className="form-control" 
            value={form.position} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Application Date:</label>
          <input 
            type="date" 
            name="application_date" 
            className="form-control" 
            value={form.application_date} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select 
            name="status" 
            className="form-select" 
            value={form.status} 
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Notes:</label>
          <textarea 
            name="notes" 
            className="form-control" 
            value={form.notes} 
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Job</button>
      </form>
    </div>
  );
};

export default JobForm;
