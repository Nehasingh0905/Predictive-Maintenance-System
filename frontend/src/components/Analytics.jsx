import React, { useState } from 'react';
import HealthChart from './charts/HealthChart';

export default function Analytics() {
  const [selectedModel, setSelectedModel] = useState('XGBoost v2.4');
  
  const containerStyle = { display: 'flex', flexDirection: 'column', gap: '20px', color: '#ffffff' };
  const panelStyle = { backgroundColor: '#161d2a', border: '1px solid #232d3f', padding: '20px', borderRadius: '12px' };
  const tableHeader = { padding: '10px', color: '#64748b', borderBottom: '2px solid #232d3f', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'monospace' };

  return (
    <div style={containerStyle}>
      
      {/* TWO-COLUMN TOP MATRIX */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* CHART SECTION */}
        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #232d3f', paddingBottom: '10px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Multi-Sensor Correlation Timeline</h3>
              <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>Cross-referencing Thermal Spikes with Mechanical Vibration</span>
            </div>
          </div>
          <HealthChart />
        </div>

        {/* AI PREDICTION ENGINE DATA */}
        <div style={panelStyle}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>ML Training Model Architecture</h3>
          <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>Active weights optimizing failure forecasting algorithms</span>
          
          <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
            {['XGBoost v2.4', 'Random Forest', 'LSTM Neural Net'].map((model) => (
              <button 
                key={model}
                onClick={() => setSelectedModel(model)}
                style={{
                  backgroundColor: selectedModel === model ? '#2563eb' : '#121824',
                  color: selectedModel === model ? '#ffffff' : '#94a3b8',
                  border: '1px solid #232d3f', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace'
                }}
              >
                {model}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#121824', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Selected Pipeline:</span>
              <span style={{ color: '#3b82f6' }}>{selectedModel} Engine</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Receiver Operating Characteristic (ROC-AUC):</span>
              <span style={{ color: '#4ade80' }}>0.962 Higher Confidence</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Mean Absolute Percentage Error (MAPE):</span>
              <span style={{ color: '#4ade80' }}>2.41% Error Bound</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Hyperparameters:</span>
              <span style={{ color: '#f59e0b' }}>n_estimators=150, max_depth=6</span>
            </div>
          </div>
        </div>

      </div>

      {/* HISTORIC FAILURE PREDICTION LEDGER */}
      <div style={panelStyle}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#94a3b8' }}>Predictive Event History Log</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', fontFamily: 'monospace' }}>
          <thead>
            <tr style={{ backgroundColor: '#121824' }}>
              <th style={tableHeader}>Timestamp</th>
              <th style={tableHeader}>Machine ID</th>
              <th style={tableHeader}>Triggering Metric</th>
              <th style={tableHeader}>AI Risk Projection</th>
              <th style={tableHeader}>Resolution State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b' }}>2026-06-19 14:22</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b', fontWeight: 'bold' }}>MAC-2303</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b', color: '#ef4444' }}>Vibration Burst (8.45 mm/s)</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b', color: '#ef4444' }}>94.8% Imminent Rupture</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b' }}><span style={{ color: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Shut Down Dispatched</span></td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b' }}>2026-06-19 11:05</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b', fontWeight: 'bold' }}>MAC-2301</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b', color: '#f59e0b' }}>Thermal Gradient (+12°C/hr)</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b', color: '#f59e0b' }}>78.4% Bearing Overheat</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1e293b' }}><span style={{ color: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Inspection Scheduled</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
