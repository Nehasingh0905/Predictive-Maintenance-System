import React from 'react';

export default function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f141c', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#161d2a', borderRadius: '12px', border: '1px solid #232d3f', width: '320px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #1e293b', borderTopColor: '#2563eb', borderRadius: '50%', margin: '0 auto 20px auto', animation: 'spin 1s linear infinite' }}></div>
        <h2 style={{ fontSize: '16px', margin: '0 0 10px 0', letterSpacing: '1px' }}>INITIALIZING SYSTEM</h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0' }}>Loading Dashboard Panels...</p>
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}