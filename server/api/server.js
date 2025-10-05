const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (cached for serverless)
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = connection;
    console.log('✅ MongoDB Connected');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB Error:', error);
    throw error;
  }
}

// Analysis Schema
const AnalysisSchema = new mongoose.Schema({
  imagePath: String,
  imageUrl: String,
  domain: {
    type: String,
    enum: ['construction', 'laboratory', 'road-safety', 'manufacturing', 'healthcare', 'mining'],
    default: 'construction'
  },
  detections: [{
    class: String,
    score: Number,
    bbox: [Number]
  }],
  ppeDetected: {
    helmet: { type: Boolean, default: false },
    vest: { type: Boolean, default: false },
    gloves: { type: Boolean, default: false },
    mask: { type: Boolean, default: false },
    goggles: { type: Boolean, default: false },
    boots: { type: Boolean, default: false },
    earProtection: { type: Boolean, default: false }
  },
  complianceScore: Number,
  status: {
    type: String,
    enum: ['compliant', 'non-compliant', 'partial'],
    default: 'non-compliant'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);

// Domain-specific PPE requirements
const domainRequirements = {
  construction: ['helmet', 'vest', 'boots', 'gloves'],
  laboratory: ['gloves', 'goggles', 'mask'],
  'road-safety': ['vest', 'helmet', 'boots'],
  manufacturing: ['helmet', 'gloves', 'boots', 'earProtection', 'goggles'],
  healthcare: ['mask', 'gloves', 'goggles'],
  mining: ['helmet', 'vest', 'boots', 'gloves', 'earProtection', 'goggles']
};

// Mock PPE Detection
async function detectPPE(domain = 'construction') {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const randomDetection = () => Math.random() > 0.5;
  
  const ppeDetected = {
    helmet: randomDetection(),
    vest: randomDetection(),
    gloves: randomDetection(),
    mask: randomDetection(),
    goggles: randomDetection(),
    boots: randomDetection(),
    earProtection: randomDetection(),
    person: true
  };
  
  const detections = [
    { class: 'person', score: 0.95, bbox: [100, 100, 200, 300] }
  ];
  
  if (ppeDetected.helmet) detections.push({ class: 'helmet', score: 0.87, bbox: [120, 90, 80, 60] });
  if (ppeDetected.vest) detections.push({ class: 'safety vest', score: 0.82, bbox: [110, 180, 100, 120] });
  if (ppeDetected.gloves) detections.push({ class: 'gloves', score: 0.78, bbox: [90, 250, 40, 50] });
  if (ppeDetected.mask) detections.push({ class: 'face mask', score: 0.85, bbox: [140, 110, 50, 40] });
  if (ppeDetected.goggles) detections.push({ class: 'safety goggles', score: 0.80, bbox: [135, 105, 60, 20] });
  if (ppeDetected.boots) detections.push({ class: 'safety boots', score: 0.83, bbox: [100, 350, 60, 80] });
  if (ppeDetected.earProtection) detections.push({ class: 'ear protection', score: 0.79, bbox: [95, 115, 30, 30] });
  
  const requiredItems = domainRequirements[domain] || domainRequirements.construction;
  const detectedRequiredCount = requiredItems.filter(item => ppeDetected[item]).length;
  const complianceScore = Math.round((detectedRequiredCount / requiredItems.length) * 100);
  
  let status = 'non-compliant';
  if (complianceScore >= 80) status = 'compliant';
  else if (complianceScore >= 40) status = 'partial';
  
  return {
    detections,
    ppeDetected,
    complianceScore,
    status,
    domain,
    requiredItems
  };
}

// Configure multer for memory storage (Vercel doesn't support disk storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Routes

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'SafetySnap Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      upload: '/api/upload',
      analyses: '/api/analyses',
      stats: '/api/analyses/stats/summary'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SafetySnap API is running' });
});

// Upload and analyze
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    await connectToDatabase();
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const domain = req.body.domain || 'construction';
    const imagePath = `uploads/${Date.now()}-${req.file.originalname}`;
    const imageUrl = `/uploads/${req.file.originalname}`;

    console.log(`Analyzing image for PPE in ${domain} domain...`);
    const analysisResult = await detectPPE(domain);

    const analysis = new Analysis({
      imagePath,
      imageUrl,
      domain: analysisResult.domain,
      detections: analysisResult.detections,
      ppeDetected: analysisResult.ppeDetected,
      complianceScore: analysisResult.complianceScore,
      status: analysisResult.status
    });

    await analysis.save();

    res.status(201).json({
      success: true,
      message: 'Image analyzed successfully',
      data: {
        ...analysis.toObject(),
        requiredItems: analysisResult.requiredItems
      }
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      error: 'Failed to process image',
      details: error.message
    });
  }
});

// Get all analyses
app.get('/api/analyses', async (req, res) => {
  try {
    await connectToDatabase();
    const analyses = await Analysis.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: analyses.length,
      data: analyses
    });
  } catch (error) {
    console.error('Get Analyses Error:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

// Get single analysis
app.get('/api/analyses/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Get Analysis Error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
});

// Delete analysis
app.delete('/api/analyses/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    await Analysis.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    console.error('Delete Analysis Error:', error);
    res.status(500).json({ error: 'Failed to delete analysis' });
  }
});

// Get statistics
app.get('/api/analyses/stats/summary', async (req, res) => {
  try {
    await connectToDatabase();
    const total = await Analysis.countDocuments();
    const compliant = await Analysis.countDocuments({ status: 'compliant' });
    const nonCompliant = await Analysis.countDocuments({ status: 'non-compliant' });
    const partial = await Analysis.countDocuments({ status: 'partial' });

    res.json({
      success: true,
      data: {
        total,
        compliant,
        nonCompliant,
        partial,
        complianceRate: total > 0 ? Math.round((compliant / total) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

module.exports = app;
