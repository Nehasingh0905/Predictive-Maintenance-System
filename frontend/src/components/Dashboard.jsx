import React, { useState, useEffect } from 'react';
import MachineHealth from "./MachineHealth";

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
  const [activeFleet, setActiveFleet] = useState([
    { id: 'MAC-2301', status: 'Action Required', type: 'CNC Milling', anomalyScore: '78.4%', condition: 'Degrading' },
    { id: 'MAC-2302', status: 'Optimal', type: 'Hydraulic Press', anomalyScore: '12.1%', condition: 'Stable' },
    { id: 'MAC-2303', status: 'Critical', type: 'Robotic Arm Assembly', anomalyScore: '94.8%', condition: 'Imminent Failure' },
    { id: 'MAC-2304', status: 'Optimal', type: 'Conveyor Drive Train', anomalyScore: '05.3%', condition: 'Stable' },
    { id: 'MAC-2305', status: 'Maintenance', type: 'Pneumatic Drill Node', anomalyScore: '45.0%', condition: 'Under Calibration' }
  ]);

  // Inline Style Directives
  const metricCard = {
  backgroundColor: '#1a2332',
  border: '1px solid #334155',
  borderRadius: '12px',
  padding: '18px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
};
  const subHeading = { color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0', fontFamily: 'monospace' };
  const bigValue = (color) => ({ fontSize: '24px', fontWeight: 'bold', color: color || '#f1f5f9', margin: '0', fontFamily: 'monospace' });
  const tableHeader = { padding: '12px', color: '#94a3b8', borderBottom: '2px solid #232d3f', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'monospace' };
  const tableData = { padding: '12px', borderBottom: '1px solid #1e293b', fontSize: '13px' };

  useEffect(() => {
  const interval = setInterval(() => {
  setActiveFleet(prev =>
    prev.map(machine => {
      const newScore = Math.max(
        0,
        Math.min(
          100,
          parseFloat(machine.anomalyScore) +
          (Math.random() * 10 - 5)
        )
      );

      let newStatus = "Optimal";

      if (newScore > 70) {
        newStatus = "Critical";
      } else if (newScore > 30) {
        newStatus = "Warning";
      }

      return {
        ...machine,
        anomalyScore: newScore.toFixed(1) + "%",
        status: newStatus
      };
    })
  ); 
  }, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#ffffff' }}>
      
      {/* SECTION 1: HIGH-DENSITY COUNTER NETWORK */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
        <div style={metricCard}>
          <div><p style={{...subHeading,fontSize:"12px"}}>
📡 Fleet Operational Status
</p>

<p style={bigValue("#60A5FA")}>
05 Active Nodes
</p>

<p
style={{
marginTop:"8px",
fontSize:"12px",
color:"#94A3B8"
}}
>
Live Industrial IoT Monitoring
</p></div>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>Tracking Engine: Core IoT Stream</span>
        </div>
        <div style={metricCard}>
          <div><p style={{...subHeading,fontSize:"12px"}}>
🚨 AI Failure Forecast
</p>

<p style={bigValue("#EF4444")}>
02 Machines
</p>

<p
style={{
marginTop:"8px",
fontSize:"12px",
color:"#FCA5A5"
}}
>
Immediate Maintenance Required
</p></div>
          <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '8px' }}>🚨 MAC-2301 & MAC-2303 At Risk</span>
        </div>
        <div style={metricCard}>
          <div><p style={{...subHeading,fontSize:"12px"}}>
📈 Fleet Health Index
</p>

<p style={bigValue("#22C55E")}>
84.2%
</p>

<p
style={{
marginTop:"8px",
fontSize:"12px",
color:"#94A3B8"
}}
>
Overall Equipment Performance
</p></div>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>System Target Baseline: &gt;90.0%</span>
        </div>
        <div style={metricCard}>
          <div><p style={{...subHeading,fontSize:"12px"}}>
⏳ Mean Time To Failure
</p>

<p style={bigValue("#F59E0B")}>
168.5 Hrs
</p>

<p
style={{
marginTop:"8px",
fontSize:"12px",
color:"#94A3B8"
}}
>
Predicted Remaining Lifetime
</p></div>
          <span style={{ fontSize: '11px', color: '#f59e0b', marginTop: '8px' }}>Decay Acceleration Detected</span>
        </div>
      </div>

      {/* SECTION 2: FLEET MONITORING MATRIX & INSPECTION BAY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
        
        {/* FLEET LOGISTICS TABLE */}
        <div style={{ backgroundColor: '#1e1b4b', border: '1px solid #232d3f', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#1b2332', padding: '15px', borderBottom: '1px solid #232d3f', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
style={{
fontSize:"22px",
fontWeight:"700",
color:"#F8FAFC"
}}
>
📡 Network Fleet Registry
</span>
            <span style={{ 
fontSize:"12px",
padding:"6px 12px",
background:"#1E3A5F",
borderRadius:"20px",
color:"#60A5FA",
fontWeight:"600"
 }}>🟢 Live Monitoring</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background:"linear-gradient(90deg,#2563EB,#4338CA)" }}>
                  <th style={tableHeader}>Machine ID</th>
                  <th style={tableHeader}>Subsystem Type</th>
                  <th style={tableHeader}>Anomaly Index</th>
                  <th style={tableHeader}>Status Context</th>
                  <th style={tableHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeFleet.map((node) => (
                  <tr
  key={node.id}
  onMouseEnter={(e) => {
    if (selectedMachine.id !== node.id) {
      e.currentTarget.style.background = "#23324A";
    }
  }}
  onMouseLeave={(e) => {
    if (selectedMachine.id !== node.id) {
      e.currentTarget.style.background = "transparent";
    }
  }}
  style={{
    backgroundColor:
      selectedMachine.id === node.id
        ? "#1E3A5F"
        : "transparent",
    transition: "0.3s",
    cursor: "pointer"
  }}
>
                    <td style={{ ...tableData, fontWeight: 'bold', fontFamily: 'monospace' }}>{node.id}</td>
                    <td style={tableData}>{node.type}</td>
                    <td style={{ ...tableData, color: parseFloat(node.anomalyScore) > 70 ? '#ef4444' : '#4ade80', fontFamily: 'monospace', fontWeight: 'bold' }}>{node.anomalyScore}</td>
                    <td style={tableData}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '4px', fontSize: '28px',letterSpacing: '0.5px', fontWeight: 'bold',
                        backgroundColor: node.status === 'Optimal' ? 'rgba(74,222,128,0.1)' : node.status === 'Critical' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                        color: node.status === 'Optimal' ? '#4ade80' : node.status === 'Critical' ? '#ef4444' : '#f59e0b'
                      }}>
    <span
      style={{
       padding: "4px 10px",
       borderRadius: "6px",
       fontWeight: "bold",
       fontSize: "12px",
       color:
         node.status === "Critical"
            ? "#ef4444"
            : node.status === "Warning"
            ? "#f59e0b"
            : "#22c55e",
        backgroundColor:
          node.status === "Critical"
            ? "rgba(239,68,68,0.15)"
            : node.status === "Warning"
            ? "rgba(245,158,11,0.15)"
            : "rgba(34,197,94,0.15)"
      }}
   >
      {node.status}
   </span>
</span>
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
                        style={{
background:"#2563EB",
color:"#fff",
border:"none",
padding:"8px 18px",
borderRadius:"8px",
fontWeight:"600",
cursor:"pointer",
boxShadow:"0 4px 12px rgba(37,99,235,.35)",
transition:"0.3s"
}}
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
        <div style={{ backgroundColor: '#161d2a', border: '1px solid #4f46e5', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

      {/* LIVE ALERTS */}
      <div
        style={{
          backgroundColor: "#161d2a",
          border: "1px solid #232d3f",
          borderRadius: "12px",
          padding: "20px"
        }}
      >
        <h3 style={{ color: "#ef4444" }}>🚨 Live Alerts</h3>

        {activeFleet
          .filter(machine => parseFloat(machine.anomalyScore) > 70)
          .map(machine => (
            <div
              key={machine.id}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "rgba(239,68,68,0.1)",
                borderLeft: "4px solid #ef4444",
                borderRadius: "6px"
              }}
            >
              <strong>{machine.id}</strong> anomaly score: {machine.anomalyScore}
            </div>
          ))}
        </div>
      {/* MACHINE HEALTH MONITORING */}
      <div
        style={{
          backgroundColor: "#161d2a",
          border: "1px solid #232d3f",
          borderRadius: "12px",
          padding: "20px"
        }}
      >
        <MachineHealth />
      </div>
      

    </div>
  );
}
      