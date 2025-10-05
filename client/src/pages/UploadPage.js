import React, { useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState('construction');

  const domains = [
    { value: 'construction', label: '🏗️ Construction', icon: '🏗️', desc: 'Building sites, scaffolding work' },
    { value: 'laboratory', label: '🔬 Laboratory', icon: '🔬', desc: 'Research labs, chemical handling' },
    { value: 'road-safety', label: '🚧 Road Safety', icon: '🚧', desc: 'Traffic control, road work' },
    { value: 'manufacturing', label: '🏭 Manufacturing', icon: '🏭', desc: 'Factory floors, assembly lines' },
    { value: 'healthcare', label: '🏥 Healthcare', icon: '🏥', desc: 'Medical facilities, patient care' },
    { value: 'mining', label: '⛏️ Mining', icon: '⛏️', desc: 'Underground work, excavation' }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('domain', selectedDomain);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.data);
      setUploading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="card fade-in">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>
              AI-Powered PPE Detection
            </h2>
            <p style={{ color: '#aaa', marginBottom: '16px', fontSize: '16px', lineHeight: '1.6' }}>
              Upload workplace safety images to instantly detect Personal Protective Equipment (PPE) compliance
            </p>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '12px', 
              justifyContent: 'center',
              marginTop: '20px'
            }}>
              {['🪖 Helmet', '🦺 Safety Vest', '🧤 Gloves', '😷 Face Mask', '🥽 Goggles', '👢 Safety Boots', '🎧 Ear Protection'].map((item) => (
                <span key={item} style={{
                  padding: '8px 16px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  color: '#888',
                  fontWeight: '600'
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Domain Selection */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', textAlign: 'center' }}>
              Select Industry Domain
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '12px' 
            }}>
              {domains.map((domain) => (
                <button
                  key={domain.value}
                  onClick={() => setSelectedDomain(domain.value)}
                  style={{
                    padding: '16px',
                    background: selectedDomain === domain.value 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedDomain === domain.value 
                      ? '2px solid rgba(102, 126, 234, 0.6)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedDomain !== domain.value) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDomain !== domain.value) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{domain.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                    {domain.label.replace(/[^\w\s]/g, '')}
                  </div>
                  <div style={{ fontSize: '11px', color: '#888', lineHeight: '1.4' }}>
                    {domain.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          {!preview && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: '2px dashed rgba(102, 126, 234, 0.3)',
                borderRadius: '20px',
                padding: '80px 40px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'rgba(102, 126, 234, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.6)';
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Upload size={56} color="#667eea" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: '#ffffff' }}>
                Drop your image here
              </h3>
              <p style={{ color: '#888', marginBottom: '24px', fontSize: '15px' }}>
                or click to browse from your device
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input" className="btn btn-primary">
                <ImageIcon size={20} />
                Select Image
              </label>
            </div>
          )}

          {/* Preview Area */}
          {preview && !result && (
            <div className="fade-in">
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '32px',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)'
              }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#0a0a0a' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleUpload}
                  disabled={uploading}
                  style={{ opacity: uploading ? 0.6 : 1 }}
                >
                  {uploading ? (
                    <>
                      <Loader size={18} className="spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Analyze PPE
                    </>
                  )}
                </button>
                <button className="btn btn-secondary" onClick={resetUpload} disabled={uploading}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="fade-in" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '24px'
            }}>
              <AlertCircle size={24} color="#ef4444" />
              <p style={{ color: '#ef4444', fontWeight: '600', fontSize: '15px' }}>{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="fade-in" style={{ marginTop: '32px' }}>
              <div style={{
                background: result.status === 'compliant' 
                  ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)' 
                  : result.status === 'partial' 
                  ? 'linear-gradient(145deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)' 
                  : 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
                border: `2px solid ${result.status === 'compliant' ? 'rgba(16, 185, 129, 0.3)' : result.status === 'partial' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '32px',
                boxShadow: result.status === 'compliant' 
                  ? '0 8px 32px rgba(16, 185, 129, 0.2)' 
                  : result.status === 'partial' 
                  ? '0 8px 32px rgba(245, 158, 11, 0.2)' 
                  : '0 8px 32px rgba(239, 68, 68, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  {result.status === 'compliant' ? (
                    <CheckCircle size={40} color="#10b981" strokeWidth={2.5} />
                  ) : (
                    <AlertCircle size={40} color={result.status === 'partial' ? '#f59e0b' : '#ef4444'} strokeWidth={2.5} />
                  )}
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                      {result.status === 'compliant' ? 'Compliant ✓' : result.status === 'partial' ? 'Partially Compliant' : 'Non-Compliant ✗'}
                    </h3>
                    <p style={{ color: '#aaa', fontSize: '16px' }}>
                      Compliance Score: <span style={{ fontWeight: '700', color: '#fff' }}>{result.complianceScore}%</span>
                    </p>
                    {result.domain && (
                      <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
                        Domain: <span style={{ color: '#667eea', fontWeight: '600', textTransform: 'capitalize' }}>
                          {result.domain.replace('-', ' ')}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {result.requiredItems && (
                  <div style={{ 
                    background: 'rgba(102, 126, 234, 0.1)', 
                    borderRadius: '12px', 
                    padding: '16px', 
                    marginBottom: '20px',
                    border: '1px solid rgba(102, 126, 234, 0.3)' 
                  }}>
                    <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
                      <strong style={{ color: '#fff' }}>Required for {result.domain?.replace('-', ' ').toUpperCase()}:</strong>
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {result.requiredItems.map((item) => (
                        <span key={item} style={{
                          padding: '6px 12px',
                          background: 'rgba(102, 126, 234, 0.2)',
                          border: '1px solid rgba(102, 126, 234, 0.4)',
                          borderRadius: '16px',
                          fontSize: '12px',
                          color: '#fff',
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }}>
                          {item.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '16px', color: '#ffffff', fontSize: '16px' }}>PPE Equipment Detected:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                    {Object.entries(result.ppeDetected).map(([key, value]) => (
                      key !== 'person' && (
                        <div key={key} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          background: value ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '10px',
                          border: `1px solid ${value ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                          transition: 'all 0.3s'
                        }}>
                          <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: value ? '#10b981' : '#555',
                            boxShadow: value ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none'
                          }} />
                          <span style={{ fontSize: '14px', textTransform: 'capitalize', color: '#ffffff', fontWeight: '600' }}>
                            {key}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={resetUpload}>
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
