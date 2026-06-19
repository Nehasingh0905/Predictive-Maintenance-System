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
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'monospace', size: 11 } }
      }
    },
    scales: {
      x: {
        grid: { color: '#1e293b' },
        ticks: { color: '#94a3b8', font: { family: 'monospace' } }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: '#232d3f' },
        ticks: { color: '#3b82f6', font: { family: 'monospace' } },
        title: { display: true, text: 'Temperature (°C)', color: '#3b82f6', font: { family: 'monospace' } }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#ef4444', font: { family: 'monospace' } },
        title: { display: true, text: 'Vibration (mm/s)', color: '#ef4444', font: { family: 'monospace' } }
      }
    }
  };

  const data = {
    labels: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'],
    datasets: [
      {
        label: 'Sensor Node Temp (°C)',
        data: [62, 65, 78, 89, 94, 98],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        yAxisID: 'y',
        tension: 0.3
      },
      {
        label: 'Vibration Amplitude (mm/s)',
        data: [1.2, 1.5, 3.1, 4.8, 6.2, 8.45],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        yAxisID: 'y1',
        tension: 0.3
      }
    ]
  };

  return (
    <div style={{ height: '280px', width: '100%', marginTop: '15px' }}>
      <Line options={options} data={data} />
    </div>
  );
}
