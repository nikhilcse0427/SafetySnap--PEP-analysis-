// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://safetysnap.vercel.app' 
    : 'http://localhost:5000');

export const config = {
  apiUrl: API_URL,
  endpoints: {
    upload: `${API_URL}/api/upload`,
    analyses: `${API_URL}/api/analyses`,
    health: `${API_URL}/api/health`
  }
};
