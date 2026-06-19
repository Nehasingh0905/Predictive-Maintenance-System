import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HealthChart() {
  // Chart Configuration Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'monospace', size: 11 } }
      },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { color: '#232d3f' },
        ticks: { color: '#94a3b8', font: { family: 'monospace' } }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: '#232d3f' },
        ticks: { color: '#94a3b8', font: { family: 'monospace' }, callback: (value) => `${value}%` }
      }
    }
  };

  // Live Core Data Map Arrays
  const data = {
    labels: ['Cycle 10', 'Cycle 20', 'Cycle 30', 'Cycle 40', 'Cycle 50', 'Cycle 60'],
    datasets: [
      {
        label: 'Machine Health Index',
        data: [95, 92, 88, 72, 55, 45],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 7
      }
    ]
  };

  return (
    <div style={{ height: '220px', width: '100%', marginTop: '15px' }}>
      <Line options={options} data={data} />
    </div>
  );
}

