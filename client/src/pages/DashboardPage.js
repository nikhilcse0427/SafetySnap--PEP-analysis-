import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Trash2, Loader } from 'lucide-react';
import axios from 'axios';

function DashboardPage() {
  const [analyses, setAnalyses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const API_URL = process.env.REACT_APP_API_URL || '';
    try {
      const [analysesRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/api/analyses`),
        axios.get(`${API_URL}/api/analyses/stats/summary`)
      ]);

      setAnalyses(analysesRes.data.data);
      setStats(statsRes.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this analysis?')) return;

    const API_URL = process.env.REACT_APP_API_URL || '';
    try {
      await axios.delete(`${API_URL}/api/analyses/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete analysis');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      compliant: 'badge badge-success',
      partial: 'badge badge-warning',
      'non-compliant': 'badge badge-danger'
    };
    return badges[status] || 'badge';
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Loader size={48} className="spinner" style={{ margin: '0 auto', color: 'white' }} />
        <p style={{ color: 'white', marginTop: '16px', fontSize: '18px' }}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <AlertTriangle size={48} color="white" style={{ margin: '0 auto' }} />
        <p style={{ color: 'white', marginTop: '16px', fontSize: '18px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '48px', color: 'white', textAlign: 'center', letterSpacing: '-1px' }}>
        Analysis Dashboard
      </h2>

      {/* Statistics Cards */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div className="card fade-in" style={{ background: 'linear-gradient(145deg, rgba(102, 126, 234, 0.1) 0%, rgba(102, 126, 234, 0.05) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(102, 126, 234, 0.2)', padding: '12px', borderRadius: '12px' }}>
                <BarChart3 size={28} color="#667eea" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Total Analyses
              </h3>
            </div>
            <p style={{ fontSize: '40px', fontWeight: '800', color: '#ffffff' }}>{stats.total}</p>
          </div>

          <div className="card fade-in" style={{ background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
                <CheckCircle size={28} color="#10b981" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Compliant
              </h3>
            </div>
            <p style={{ fontSize: '40px', fontWeight: '800', color: '#10b981' }}>{stats.compliant}</p>
          </div>

          <div className="card fade-in" style={{ background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px' }}>
                <AlertTriangle size={28} color="#f59e0b" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Partial
              </h3>
            </div>
            <p style={{ fontSize: '40px', fontWeight: '800', color: '#f59e0b' }}>{stats.partial}</p>
          </div>

          <div className="card fade-in" style={{ background: 'linear-gradient(145deg, rgba(118, 75, 162, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(118, 75, 162, 0.2)', padding: '12px', borderRadius: '12px' }}>
                <TrendingUp size={28} color="#764ba2" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Compliance Rate
              </h3>
            </div>
            <p style={{ fontSize: '40px', fontWeight: '800', color: '#764ba2' }}>{stats.complianceRate}%</p>
          </div>
        </div>
      )}

      {/* Analysis List */}
      <div className="card fade-in">
        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', color: '#ffffff' }}>
          Recent Analyses
        </h3>

        {analyses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 40px', color: '#666' }}>
            <BarChart3 size={64} style={{ margin: '0 auto 20px', opacity: 0.3, color: '#667eea' }} />
            <p style={{ fontSize: '16px', color: '#888' }}>No analyses yet. Upload an image to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {analyses.map((analysis) => (
              <div
                key={analysis._id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr auto',
                  gap: '20px',
                  padding: '20px',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.4)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL || ''}${analysis.imageUrl}`}
                  alt="Analysis"
                  style={{
                    width: '140px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: '2px solid rgba(102, 126, 234, 0.3)'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span className={getStatusBadge(analysis.status)}>
                      {analysis.status}
                    </span>
                    <span style={{ fontSize: '15px', color: '#aaa', fontWeight: '600' }}>
                      Score: <span style={{ color: '#fff' }}>{analysis.complianceScore}%</span>
                    </span>
                    {analysis.domain && (
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(102, 126, 234, 0.2)',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '12px',
                        fontSize: '11px',
                        color: '#667eea',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}>
                        {analysis.domain.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: '#666' }}>
                    📅 {new Date(analysis.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(analysis._id)}
                  style={{ padding: '10px 20px' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
