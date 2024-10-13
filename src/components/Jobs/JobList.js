// frontend/src/components/Jobs/JobList.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await api.get('/api/jobs');
      setJobs(res.data);
    } catch (err) {
      setError('Failed to fetch jobs');
      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
      toast.success('Job deleted successfully!');
    } catch (err) {
      setError('Failed to delete job');
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="job-list">
      {error && <p className="error">{error}</p>}
      {jobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>{new Date(job.application_date).toLocaleDateString()}</td>
                <td>{job.status}</td>
                <td>{job.notes}</td>
                <td>
                  {/* Implement Edit functionality as needed */}
                  <button onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;
