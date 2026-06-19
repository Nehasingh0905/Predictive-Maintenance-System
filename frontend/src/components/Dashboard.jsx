import React, { useState } from 'react';

export default function Dashboard() {
  // Advanced AI Operational Focus State
  const [selectedMachine, setSelectedMachine] = useState({
    id: 'MAC-2301',
    status: 'Action Required',
    temp: '89.4 °C',
    vibration: '4.82 mm/s',
    pressure: '210.5 kPa',
    humidity: '62.1%',
    rul: '14 Operating Days',
    anomalyScore: '78.4%',
    aiModelConfidence: '94.2%',
    nextScheduledMaintenance: '2026-06-25'
  });

  // Comprehensive Fleet Database Array
  const activeFleet = [
    { id: 'MAC-2301', status: 'Action Required', type: 'CNC Milling', anomalyScore: '78.4%', condition: 'Degrading' },
    { id: 'MAC-2302', status: 'Optimal', type: 'Hydraulic Press', anomalyScore: '12.1%', condition: 'Stable' },
    { id: 'MAC-2303', status: 'Critical', type: 'Robotic Arm Assembly', anomalyScore: '94.8%', condition: 'Imminent Failure' },
    { id: 'MAC-2304', status: 'Optimal', type: 'Conveyor Drive Train', anomalyScore: '05.3%', condition: 'Stable' },
    { id: 'MAC-2305', status: 'Maintenance', type: 'Pneumatic Drill Node', anomalyScore: '45.0%', condition: 'Under Calibration' }
  ];

  // Inline Style Directives
  const metricCard = { backgroundColor: '#161d2a', border: '1px solid #232d3f', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
  const subHeading = { color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0', fontFamily: 'monospace' };
  const bigValue = (color) => ({ fontSize: '24px', fontWeight: 'bold', color: color || '#f1f5f9', margin: '0', fontFamily: 'monospace' });
  const tableHeader = { padding: '12px', color: '#94a3b8', borderBottom: '2px solid #232d3f', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'monospace' };
  const tableData = { padding: '12px', borderBottom: '1px solid #1e293b', fontSize: '13px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#ffffff' }}>
      
      {/* SECTION 1: HIGH-DENSITY COUNTER NETWORK */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
        <div style={metricCard}>
          <div><p style={subHeading}>Fleet Operational Status</p><p style={bigValue('#3b82f6')}>05 Active Nodes</p></div>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>Tracking Engine: Core IoT Stream</span>
        </div>
        <div style={metricCard}>
          <div><p style={subHeading}>AI Failure Forecasts</p><p style={bigValue('#ef4444')}>02 Nodes Flagged</p></div>
          <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '8px' }}>🚨 MAC-2301 & MAC-2303 At Risk</span>
        </div>
        <div style={metricCard}>
          <div><p style={subHeading}>Fleet Health Efficiency</p><p style={bigValue('#4ade80')}>84.2% Index</p></div>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>System Target Baseline: &gt;90.0%</span>
        </div>
        <div style={metricCard}>
          <div><p style={subHeading}>Mean Time To Failure (MTTF)</p><p style={bigValue('#f59e0b')}>168.5 Hrs Avg</p></div>
          <span style={{ fontSize: '11px', color: '#f59e0b', marginTop: '8px' }}>Decay Acceleration Detected</span>
        </div>
      </div>

      {/* SECTION 2: FLEET MONITORING MATRIX & INSPECTION BAY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
        
        {/* FLEET LOGISTICS TABLE */}
        <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#1b2332', padding: '15px', borderBottom: '1px solid #232d3f', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Network Fleet Registry</span>
            <span style={{ fontSize: '11px', color: '#3b82f6', fontFamily: 'monospace' }}>Realtime Update Active</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#121824' }}>
                  <th style={tableHeader}>Machine ID</th>
                  <th style={tableHeader}>Subsystem Type</th>
                  <th style={tableHeader}>Anomaly Index</th>
                  <th style={tableHeader}>Status Context</th>
                  <th style={tableHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeFleet.map((node) => (
                  <tr key={node.id} style={{ backgroundColor: selectedMachine.id === node.id ? '#1e293b' : 'transparent', transition: '0.2s' }}>
                    <td style={{ ...tableData, fontWeight: 'bold', fontFamily: 'monospace' }}>{node.id}</td>
                    <td style={tableData}>{node.type}</td>
                    <td style={{ ...tableData, color: parseFloat(node.anomalyScore) > 70 ? '#ef4444' : '#4ade80', fontFamily: 'monospace', fontWeight: 'bold' }}>{node.anomalyScore}</td>
                    <td style={tableData}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                        backgroundColor: node.status === 'Optimal' ? 'rgba(74,222,128,0.1)' : node.status === 'Critical' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                        color: node.status === 'Optimal' ? '#4ade80' : node.status === 'Critical' ? '#ef4444' : '#f59e0b'
                      }}>{node.condition}</span>
                    </td>
                    <td style={tableData}>
                      <button 
                        onClick={() => setSelectedMachine({
                          id: node.id, status: node.status, type: node.type, anomalyScore: node.anomalyScore,
                          temp: node.status === 'Optimal' ? '54.2 °C' : node.status === 'Critical' ? '98.1 °C' : '89.4 °C',
                          vibration: node.status === 'Optimal' ? '1.12 mm/s' : node.status === 'Critical' ? '8.45 mm/s' : '4.82 mm/s',
                          pressure: node.status === 'Optimal' ? '101.3 kPa' : node.status === 'Critical' ? '294.2 kPa' : '210.5 kPa',
                          humidity: '52.4%', rul: node.status === 'Optimal' ? '120 Days' : node.status === 'Critical' ? '24 Hours' : '14 Days',
                          aiModelConfidence: node.status === 'Optimal' ? '98.7%' : '94.2%', nextScheduledMaintenance: 'Immediate Action Required'
                        })}
                        style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PROXIMATE AI DIAGNOSTICS CONTROL BOX */}
        <div style={{ backgroundColor: '#161d2a', border: '1px solid #232d3f', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ borderBottom: '1px solid #232d3f', paddingBottom: '10px' }}>
            <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 'bold', fontFamily: 'monospace' }}>AI Diagnostic Node Isolation</span>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '18px' }}>Telemetry Focus: {selectedMachine.id}</h3>
          </div>

          {/* SENSOR DATA POINTS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontFamily: 'monospace' }}>
            <div style={{ backgroundColor: '#121824', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
              <span style={subHeading}>Core Temperature</span>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 'bold' }}>{selectedMachine.temp}</span>
            </div>
            <div style={{ backgroundColor: '#121824', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
              <span style={subHeading}>Vibration Amplitude</span>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 'bold' }}>{selectedMachine.vibration}</span>
            </div>
            <div style={{ backgroundColor: '#121824', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
              <span style={subHeading}>Line Pressure</span>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 'bold' }}>{selectedMachine.pressure}</span>
            </div>
            <div style={{ backgroundColor: '#121824', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
              <span style={subHeading}>Atmospheric Humidity</span>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 'bold' }}>{selectedMachine.humidity}</span>
            </div>
          </div>

          {/* ADVANCED AI PREDICTIVE QUANTIFIERS */}
          <div style={{ backgroundColor: '#121824', padding: '15px', borderRadius: '8px', border: '1px solid #232d3f', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '1px' }}>🤖 XGBOOST & RANDOM FOREST PREDICTIVE MATRICES</span>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#94a3b8' }}>Residual Useful Life (RUL):</span>
              <span style={{ fontWeight: 'bold', color: '#f59e0b', fontFamily: 'monospace' }}>{selectedMachine.rul}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#94a3b8' }}>ML Anomaly Weight:</span>
              <span style={{ fontWeight: 'bold', color: '#ef4444', fontFamily: 'monospace' }}>{selectedMachine.anomalyScore}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#94a3b8' }}>Algorithm Model Confidence:</span>
              <span style={{ fontWeight: 'bold', color: '#4ade80', fontFamily: 'monospace' }}>{selectedMachine.aiModelConfidence}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}