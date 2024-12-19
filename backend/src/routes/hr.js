// src/routes/hr.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { NLConverter } = require('../services/nlp/converter');
const { ContextManager } = require('../services/context/manager');

// Initialize services
const nlConverter = new NLConverter(process.env.GROQ_API_KEY);
const contextManager = new ContextManager();

// Process natural language query for HR
router.post('/query', auth, async (req, res) => {
  try {
    const { query, sessionId } = req.body;
    
    // Get conversation context
    const context = contextManager.getContext(sessionId);
    
    // Convert natural language to SQL
    const sqlResult = await nlConverter.convertToSql(query, {
      context,
      module: 'hr'
    });
    
    if (!sqlResult.success) {
      return res.status(400).json({
        success: false,
        error: sqlResult.error
      });
    }
    
    // Execute query and get results
    const results = await executeQuery(sqlResult.query);
    
    // Add to context
    contextManager.addContext(sessionId, {
      query,
      sqlQuery: sqlResult.query,
      results
    });
    
    res.json({
      success: true,
      results: results.data,
      columns: results.columns,
      explanation: results.explanation,
      sqlQuery: sqlResult.query
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get employees
router.get('/employees', auth, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get departments
router.get('/departments', auth, async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;