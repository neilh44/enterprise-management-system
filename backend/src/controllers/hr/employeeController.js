// backend/src/controllers/hr/employeeController.js
const employeeService = require('../../services/hr/employeeService');

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const employee = await employeeService.createEmployee(req.body);
      res.status(201).json({
        success: true,
        data: employee
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const filters = {
        status: req.query.status,
        departmentId: req.query.departmentId
      };
      const employees = await employeeService.getAllEmployees(filters);
      res.json({
        success: true,
        data: employees
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);
      res.json({
        success: true,
        data: employee
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employee = await employeeService.updateEmployee(req.params.id, req.body);
      res.json({
        success: true,
        data: employee
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      await employeeService.deleteEmployee(req.params.id);
      res.json({
        success: true,
        message: 'Employee deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async searchEmployees(req, res) {
    try {
      const employees = await employeeService.searchEmployees(req.query.q);
      res.json({
        success: true,
        data: employees
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new EmployeeController();