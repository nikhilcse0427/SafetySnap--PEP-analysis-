import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

function AnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`/api/analyses/${id}`);
        setAnalysis(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load analysis');
        setLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Loader size={48} className="spinner" style={{ margin: '0 auto', color: 'white' }} />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <AlertCircle size={48} color="white" style={{ margin: '0 auto' }} />
        <p style={{ color: 'white', marginTop: '16px' }}>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '16px' }}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="card fade-in">
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
          Analysis Details
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <img
              src={`http://localhost:5000${analysis.imageUrl}`}
              alt="Analysis"
              style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </div>

          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
                Compliance Status
              </h3>
              <span className={`badge ${analysis.status === 'compliant' ? 'badge-success' : analysis.status === 'partial' ? 'badge-warning' : 'badge-danger'}`}>
                {analysis.status}
              </span>
              <p style={{ marginTop: '8px', color: '#6b7280' }}>
                Score: {analysis.complianceScore}%
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
                PPE Equipment Detected
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(analysis.ppeDetected).map(([key, value]) => (
                  key !== 'person' && (
                    <div key={key} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      background: '#f9fafb',
                      borderRadius: '6px'
                    }}>
                      <span style={{ textTransform: 'capitalize', color: '#374151' }}>{key}</span>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: value ? '#d1fae5' : '#fee2e2',
                        color: value ? '#065f46' : '#991b1b'
                      }}>
                        {value ? 'Detected' : 'Not Detected'}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
