import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const buttonStyle = (active) => ({
    backgroundColor: active ? '#2563eb' : '#1e293b',
    color: active ? '#ffffff' : '#94a3b8',
    border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', transition: '0.2s'
  });

  return (
    <header style={{ backgroundColor: '#161d2a', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px', border: '1px solid #232d3f' }}>
      <h1 style={{ margin: '0 0 15px 0', fontSize: '24px', letterSpacing: '1px', fontWeight: 'bold', color: '#ffffff' }}>
        AI-DRIVEN PREDICTIVE MAINTENANCE SYSTEM
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button style={buttonStyle(activeTab === 'dashboard')} onClick={() => setActiveTab('dashboard')}>Operational Dashboard</button>
        <button style={buttonStyle(activeTab === 'analytics')} onClick={() => setActiveTab('analytics')}>Predictive Analytics</button>
        <button style={buttonStyle(activeTab === 'alerts')} onClick={() => setActiveTab('alerts')}>Fault Alerts Terminal</button>
      </div>
    </header>
  );
}