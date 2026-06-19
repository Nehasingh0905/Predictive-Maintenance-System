import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Alerts from './components/Alerts';
import LoadingScreen from './components/LoadingScreen';

function WelcomeScreen({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f141c', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ textAlign: 'center', padding: '40px 30px', backgroundColor: '#161d2a', borderRadius: '16px', border: '1px solid #232d3f', maxWidth: '500px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Academic Evaluation Prototype</span>
        <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '15px 0 5px 0', lineHeight: '1.3', color: '#f1f5f9' }}>AI-DRIVEN PREDICTIVE MAINTENANCE SYSTEM</h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 40px 0' }}>Industrial Equipment Monitoring using IoT Sensor Data & ML</p>
        <button 
          onClick={onStart} 
          style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}
        >
          START MONITORING SYSTEM →
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleStartSystem = () => {
    setHasStarted(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!hasStarted) return <WelcomeScreen onStart={handleStartSystem} />;
  if (isLoading) return <LoadingScreen />;

  return (
    <div style={{ backgroundColor: '#0f141c', minHeight: '100vh', padding: '20px' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'alerts' && <Alerts />}
      </main>
    </div>
  );
}