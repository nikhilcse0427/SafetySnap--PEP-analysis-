const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://safetysnap.vercel.app', 'https://*.vercel.app', process.env.FRONTEND_URL]
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safetysnap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/upload', require('./routes/upload'));
app.use('/api/analyses', require('./routes/analyses'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SafetySnap API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'SafetySnap Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      upload: '/api/upload',
      analyses: '/api/analyses'
    }
  });
});

const PORT = process.env.PORT || 5000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
