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
    if (!window.confirm('Are you sure you want to delete this job?')) return;

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
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
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
                    {/* Placeholder for Edit functionality */}
                    <button 
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </button>
                    {/* Add Edit button if needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
