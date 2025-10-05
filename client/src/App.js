import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Upload, BarChart3 } from 'lucide-react';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        background: '#000000',
        position: 'relative'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        {/* Header */}
        <header style={{
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="container" style={{ padding: '24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
                }}>
                  <Shield size={28} color="#ffffff" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 style={{ 
                    fontSize: '28px', 
                    fontWeight: '800', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px'
                  }}>
                    SafetySnap
                  </h1>
                  <p style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>PPE Detection System</p>
                </div>
              </div>
              <nav style={{ display: 'flex', gap: '12px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <button 
                    className={activeTab === 'upload' ? 'btn btn-primary' : 'btn btn-secondary'}
                    onClick={() => setActiveTab('upload')}
                  >
                    <Upload size={18} />
                    Upload
                  </button>
                </Link>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <button 
                    className={activeTab === 'dashboard' ? 'btn btn-primary' : 'btn btn-secondary'}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <BarChart3 size={18} />
                    Dashboard
                  </button>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analysis/:id" element={<AnalysisPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            letterSpacing: '0.5px'
          }}>
            © 2025 SafetySnap - AI-Powered PPE Detection & Analysis System
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
