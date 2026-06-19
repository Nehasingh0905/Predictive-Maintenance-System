import React, { useState, useEffect } from 'react';
import HealthChart from './charts/HealthChart';

export default function Analytics() {
  const [riskData, setRiskData] = useState({ machineB: 78, machineC: 92 });
  const cardStyle = { backgroundColor: '#161d2a', border: '1px solid #232d3f', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#ffffff' };

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/risk-analysis')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRiskData({ machineB: data.machine_b_risk || 78, machineC: data.machine_c_risk || 92 });
        }
      })
      .catch(() => console.log("Analytics stream running on default mock layer."));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      
      {/* Risk Metrics Section */}
      <div style={{ ...cardStyle, textAlign: 'left' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '15px', color: '#f1f5f9' }}>Predicted Failure Risk (XGBoost Output)</h3>
        {[['Machine B', riskData.machineB, '#f59e0b'], ['Machine C', riskData.machineC, '#ef4444']].map(([label, val, color]) => (
          <div key={label} style={{ marginBottom: '15px', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span>{label}</span><span style={{ color: color }}>{val}%</span></div>
            <div style={{ backgroundColor: '#121824', borderRadius: '4px', height: '10px', width: '100%', overflow: 'hidden', marginTop: '5px' }}><div style={{ width: `${val}%`, backgroundColor: color, height: '100%' }}></div></div>
          </div>
        ))}
      </div>

      {/* Production Chart.js Canvas Section */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#f1f5f9' }}>Machine Health Trend</h3>
        <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>Real-time Predictive Decay Curve Profile</span>
        
        {/* RENDER DYNAMIC CANVAS */}
        <HealthChart />

        <div style={{ fontSize: '11px', color: '#3b82f6', fontFamily: 'monospace', marginTop: '15px' }}>Endpoint Context: GET /dashboard/risk-analysis</div>
      </div>
    </div>
  );
}