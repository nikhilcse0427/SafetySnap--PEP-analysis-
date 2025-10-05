const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const fs = require('fs');
const path = require('path');

// Get all analyses
router.get('/', async (req, res) => {
  try {
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
router.get('/:id', async (req, res) => {
  try {
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
router.delete('/:id', async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    // Delete image file
    if (fs.existsSync(analysis.imagePath)) {
      fs.unlinkSync(analysis.imagePath);
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
router.get('/stats/summary', async (req, res) => {
  try {
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

module.exports = router;
