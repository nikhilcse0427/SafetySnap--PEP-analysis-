const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
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
  complianceScore: {
    type: Number,
    default: 0
  },
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

module.exports = mongoose.model('Analysis', AnalysisSchema);
