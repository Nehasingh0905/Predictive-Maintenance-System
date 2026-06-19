import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ totalMachines: 24, activeAlerts: 3, healthScore: 91, predictedFailures: 2 });
  const [selectedMachine, setSelectedMachine] = useState({ id: 'M001', temp: '65°C', vibration: '0.21 Hz', status: 'Healthy', pressure: '101 kPa', humidity: '45%' });

  const cardStyle = { backgroundColor: '#161d2a', border: '1px solid #232d3f', padding: '20px', borderRadius: '12px', textAlign: 'center' };
  const cardTitleStyle = { color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', margin: '0 0 5px 0' };
  const cardValueStyle = (color) => ({ fontSize: '28px', fontWeight: 'bold', color: color, margin: '0' });
  const tdStyle = { padding: '12px', borderBottom: '1px solid #232d3f' };

  const machineData = {
    M001: { id: 'M001', temp: '65°C', vibration: '0.21 Hz', status: 'Healthy', pressure: '101 kPa', humidity: '45%' },
    M002: { id: 'M002', temp: '89°C', vibration: '0.78 Hz', status: 'Warning', pressure: '115 kPa', humidity: '55%' },
    M003: { id: 'M003', temp: '98°C', vibration: '1.12 Hz', status: 'Critical', pressure: '130 kPa', humidity: '60%' }
  };

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/summary')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMetrics({
            totalMachines: data.total_machines || 24,
            activeAlerts: data.active_alerts || 3,
            healthScore: data.fleet_health_score || 91,
            predictedFailures: data.predicted_failures || 2
          });
        }
      })
      .catch(() => console.log("Backend offline, executing local safe-state mapping."));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div style={cardStyle}><p style={cardTitleStyle}>Total Machines</p><p style={cardValueStyle('#4ade80')}>{metrics.totalMachines}</p></div>
        <div style={cardStyle}><p style={cardTitleStyle}>Active Alerts</p><p style={cardValueStyle('#f59e0b')}>{metrics.activeAlerts}</p></div>
        <div style={cardStyle}><p style={cardTitleStyle}>Fleet Health Score</p><p style={cardValueStyle('#3b82f6')}>{metrics.healthScore}%</p></div>
        <div style={cardStyle}><p style={cardTitleStyle}>Predicted Failures</p><p style={cardValueStyle('#ef4444')}>{metrics.predictedFailures}</p></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#1b2332', padding: '12px', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #232d3f', color: '#ffffff' }}>Live Equipment Telemetry Status</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', color: '#ffffff' }}>
            <thead>
              <tr style={{ backgroundColor: '#121824' }}>
                <th style={{ padding: '12px', color: '#94a3b8', borderBottom: '1px solid #232d3f' }}>Machine</th>
                <th style={{ padding: '12px', color: '#94a3b8', borderBottom: '1px solid #232d3f' }}>Status</th>
                <th style={{ padding: '12px', color: '#94a3b8', borderBottom: '1px solid #232d3f' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {['M001', 'M002', 'M003'].map((id) => (
                <tr key={id}>
                  <td style={tdStyle}><strong>{id}</strong></td>
                  <td style={tdStyle}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', 
                      backgroundColor: id === 'M001' ? 'rgba(74,222,128,0.15)' : id === 'M002' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: id === 'M001' ? '#4ade80' : id === 'M002' ? '#f59e0b' : '#ef4444' }}>
                      {machineData[id].status}
                    </span>
                  </td>
                  <td style={tdStyle}><button onClick={() => setSelectedMachine(machineData[id])} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', padding: '20px', borderRadius: '12px', color: '#ffffff' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#3b82f6', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 'bold' }}>Telemetry Focus: {selectedMachine.id}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontFamily: 'monospace', fontSize: '13px' }}>
            {['temp', 'vibration', 'pressure', 'humidity'].map((field) => (
              <div key={field} style={{ backgroundColor: '#121824', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>{field.toUpperCase()}</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{selectedMachine[field]}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '15px', padding: '12px', borderRadius: '6px', textAlign: 'center', backgroundColor: selectedMachine.status === 'Healthy' ? 'rgba(74,222,128,0.1)' : selectedMachine.status === 'Warning' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: selectedMachine.status === 'Healthy' ? '#4ade80' : selectedMachine.status === 'Warning' ? '#f59e0b' : '#ef4444' }}>SYSTEM STATUS: {selectedMachine.status.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}