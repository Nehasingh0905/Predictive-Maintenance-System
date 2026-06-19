import React, { useState } from 'react';

export default function Alerts() {
  // Live Tracked High-Risk Incidents State
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 'ALR-801', severity: 'CRITICAL', node: 'MAC-2303 (Robotic Arm Assembly)', parameter: 'Vibration Metric Override', value: '8.45 mm/s', timestamp: '14:22:15', bg: 'rgba(239,68,68,0.06)', color: '#ef4444' },
    { id: 'ALR-802', severity: 'WARNING', node: 'MAC-2301 (CNC Milling)', parameter: 'Thermal Gradient Boundary', value: '89.4 °C', timestamp: '14:18:40', bg: 'rgba(245,158,11,0.06)', color: '#f59e0b' },
    { id: 'ALR-803', severity: 'CRITICAL', node: 'MAC-2305 (Pneumatic Node)', parameter: 'Line Pressure Loss Spike', value: '45.0 kPa', timestamp: '13:55:12', bg: 'rgba(239,68,68,0.06)', color: '#ef4444' }
  ]);

  // Historic Cleared Incident Registry State
  const [clearedAlerts, setClearedAlerts] = useState([
    { id: 'ALR-798', severity: 'RESOLVED', node: 'MAC-2304 (Conveyor Belt)', message: 'Lubrication Threshold Restored', time: '11:20:05' },
    { id: 'ALR-795', severity: 'RESOLVED', node: 'MAC-2302 (Hydraulic Press)', message: 'Voltage Inversion Settled Safely', time: '09:14:32' }
  ]);

  // Command Action to clear incident item into secondary log history
  const handleDismissIncident = (incident) => {
    setActiveAlerts(activeAlerts.filter(item => item.id !== incident.id));
    setClearedAlerts([
      { id: incident.id, severity: 'RESOLVED', node: incident.node, message: `Manual Override cleared: ${incident.parameter}`, time: new Date().toLocaleTimeString() },
      ...clearedAlerts
    ]);
  };

  const codeBoxStyle = { fontFamily: 'monospace', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#ffffff' }}>
      
      {/* SECTION 1: LIVE INCIDENT STREAM SCREEN */}
      <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#1b2332', padding: '15px', borderBottom: '1px solid #232d3f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: activeAlerts.length > 0 ? '#ef4444' : '#4ade80', borderRadius: '50%', display: 'inline-block', animation: activeAlerts.length > 0 ? 'pulse 1.5s infinite' : 'none' }}></span>
            <h3 style={{ margin: 0, fontSize: '15px' }}>Live System Exceptions Registry</h3>
          </div>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: '#121824', padding: '4px 8px', borderRadius: '4px', color: '#64748b' }}>
            {activeAlerts.length} Unresolved Risks Flagged
          </span>
        </div>

        <div style={{ padding: '20px' }}>
          {activeAlerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b', fontFamily: 'monospace', fontSize: '13px' }}>
              ✓ ALL HARDWARE LOOPS SECURE. NO ACTIVE EXCEPTIONS DETECTED.
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <div key={alert.id} style={{ ...codeBoxStyle, backgroundColor: alert.bg, borderLeft: `4px solid ${alert.color}` }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ backgroundColor: alert.color, color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>{alert.severity}</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{alert.node}</span>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>[{alert.timestamp}]</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                    Trigger Condition: <span style={{ color: '#ffffff' }}>{alert.parameter}</span> | Reading: <span style={{ color: alert.color, fontWeight: 'bold' }}>{alert.value}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDismissIncident(alert)}
                  style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', transition: '0.2s' }}
                  onMouseOver={(e) => { e.target.style.backgroundColor = '#2563eb'; e.target.style.color = '#ffffff'; }}
                  onMouseOut={(e) => { e.target.style.backgroundColor = '#1e293b'; e.target.style.color = '#94a3b8'; }}
                >
                  DISMISS & ACKNOWLEDGE
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 2: ARCHIVED HISTORIC CLEARANCE ENGINE */}
      <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#121824', padding: '12px 15px', borderBottom: '1px solid #232d3f' }}>
          <h4 style={{ margin: 0, fontSize: '13px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#64748b' }}>Cleared Event History Log</h4>
        </div>
        <div style={{ padding: '15px', maxHeight: '200px', overflowY: 'auto' }}>
          {clearedAlerts.map((log) => (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #1e293b', fontSize: '12px', fontFamily: 'monospace' }}>
              <div>
                <span style={{ color: '#4ade80', marginRight: '10px', fontWeight: 'bold' }}>[✓ {log.severity}]</span>
                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{log.node}</span> — <span style={{ color: '#94a3b8' }}>{log.message}</span>
              </div>
              <span style={{ color: '#475569' }}>{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded animation keyframe rule */}
      <style>{`@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }`}</style>
    </div>
  );
}