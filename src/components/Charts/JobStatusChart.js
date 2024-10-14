// frontend/src/components/Charts/JobStatusChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobStatusChart = () => {
  const [statusCounts, setStatusCounts] = useState({
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  });

  const fetchStatusCounts = async () => {
    try {
      const res = await api.get('/api/jobs/status-count');
      setStatusCounts(res.data);
    } catch (error) {
      console.error('Error fetching status counts:', error);
      toast.error('Failed to load job status data.');
    }
  };

  useEffect(() => {
    fetchStatusCounts();
  }, []);

  const data = {
    labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [
          statusCounts['Applied'],
          statusCounts['Interview'],
          statusCounts['Offer'],
          statusCounts['Rejected'],
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Applied - Blue
          'rgba(255, 206, 86, 0.6)', // Interview - Yellow
          'rgba(75, 192, 192, 0.6)', // Offer - Green
          'rgba(255, 99, 132, 0.6)', // Rejected - Red
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', 
          'rgba(255, 206, 86, 1)', 
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Job Application Status Overview',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision:0,
        },
      },
    },
  };

  return (
    <div className="job-status-chart my-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default JobStatusChart;
