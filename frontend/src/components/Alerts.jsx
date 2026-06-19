import React, { useState, useEffect } from 'react';

export default function Alerts() {
  // Live Active Incident State
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'CRITICAL', text: 'Machine C: Severe Vibration Level Flagged', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
    { id: 2, type: 'WARNING', text: 'Machine B: High Operating Temperature Alert', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' }
  ]);

  const alertStyle = (bgColor) => ({
    backgroundColor: bgColor, padding: '15px', borderRadius: '8px', marginBottom: '10px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.05)', color: '#ffffff'
  });

  // Pull active incidents from backend service
  useEffect(() => {
    fetch('http://localhost:8000/alerts')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Map backend items matching style conventions
          const formattedAlerts = data.map((item, index) => ({
            id: item.id || index,
            type: item.severity?.toUpperCase() || 'WARNING',
            text: item.message || 'Equipment abnormality detected.',
            color: item.severity?.toUpperCase() === 'CRITICAL' ? '#ef4444' : '#f59e0b',
            bg: item.severity?.toUpperCase() === 'CRITICAL' ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)'
          }));
          setAlerts(formattedAlerts);
        }
      })
      .catch((err) => console.log("Backend alert stream offline. Running on fallback logs."));
  }, []);

  // Handler to clear items out locally on click
  const handleDismiss = (idToRemove) => {
    setAlerts(alerts.filter(alert => alert.id !== idToRemove));
  };

  return (
    <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#1b2332', padding: '12px', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #232d3f', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Incident Monitoring Desk (GET /alerts)</span>
        <span style={{ fontSize: '11px', backgroundColor: '#1e293b', padding: '2px 8px', borderRadius: '4px', color: '#94a3b8' }}>
          {alerts.length} Active
        </span>
      </div>
      
      <div style={{ padding: '15px' }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontFamily: 'monospace', fontSize: '13px' }}>
            ✓ ALL SYSTEM CIRCUITS NOMINAL. NO FAULTS FLAGGED.
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} style={alertStyle(alert.bg)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ backgroundColor: alert.color, color: '#ffffff', padding: '2px 6px', borderRadius: '4px', marginRight: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                  {alert.type}
                </span>
                <span>{alert.text}</span>
              </div>
              <button 
                onClick={() => handleDismiss(alert.id)}
                style={{ backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', padding: '0 5px', transition: '0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#ef4444'}
                onMouseOut={(e) => e.target.style.color = '#64748b'}
                title="Dismiss Incident Alert"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}