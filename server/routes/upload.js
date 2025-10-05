const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const Analysis = require('../models/Analysis');
const { detectPPE } = require('../services/ppeDetection');
const path = require('path');

// Upload and analyze image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imagePath = req.file.path;
    const imageUrl = `/uploads/${req.file.filename}`;
    const domain = req.body.domain || 'construction';

    // Perform PPE detection
    console.log(`Analyzing image for PPE in ${domain} domain...`);
    const analysisResult = await detectPPE(imagePath, domain);

    // Save analysis to database
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

module.exports = router;
