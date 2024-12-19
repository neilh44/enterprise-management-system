const express = require('express');
const router = express.Router();
const nlQueryProcessor = require('../services/nlQueryProcessor');
const { logger } = require('../middlewares/logger');

router.post('/analyze', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      });
    }

    logger.info(`Received natural language query: ${query}`);
    
    const result = await nlQueryProcessor.processQuery(query, req.app.locals.db);
    
    res.json(result);

  } catch (error) {
    logger.error('Error processing query:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
