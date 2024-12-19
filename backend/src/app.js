const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/error');
const { logger } = require('./middlewares/logger');

// Import routes
const hrRoutes = require('./routes/hr');
const salesRoutes = require('./routes/sales');
const marketingRoutes = require('./routes/marketing');
const inventoryRoutes = require('./routes/inventory');
const operationsRoutes = require('./routes/operations');
const queryRoutes = require('./routes/query'); // Add this line

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/hr', hrRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/operations', operationsRoutes);
app.use('/api/query', queryRoutes); // Add this line

// Error handling
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});