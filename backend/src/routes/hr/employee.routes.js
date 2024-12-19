// backend/src/routes/hr/employee.routes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/hr/employeeController');
const { authenticateToken } = require('../../middlewares/auth');

// Employee routes
router.post('/', authenticateToken, employeeController.createEmployee);
router.get('/', authenticateToken, employeeController.getAllEmployees);
router.get('/search', authenticateToken, employeeController.searchEmployees);
router.get('/:id', authenticateToken, employeeController.getEmployeeById);
router.put('/:id', authenticateToken, employeeController.updateEmployee);
router.delete('/:id', authenticateToken, employeeController.deleteEmployee);

module.exports = router;