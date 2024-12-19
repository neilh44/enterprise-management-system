// backend/src/services/hr/employeeService.js
const Employee = require('../../models/hr/employee');
const { Op } = require('sequelize');

class EmployeeService {
  async createEmployee(employeeData) {
    try {
      return await Employee.create(employeeData);
    } catch (error) {
      throw new Error(`Error creating employee: ${error.message}`);
    }
  }

  async getAllEmployees(filters = {}) {
    try {
      const whereClause = {};
      
      if (filters.status) {
        whereClause.status = filters.status;
      }
      
      if (filters.departmentId) {
        whereClause.departmentId = filters.departmentId;
      }

      return await Employee.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw new Error(`Error fetching employees: ${error.message}`);
    }
  }

  async getEmployeeById(id) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new Error(`Error fetching employee: ${error.message}`);
    }
  }

  async updateEmployee(id, updateData) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return await employee.update(updateData);
    } catch (error) {
      throw new Error(`Error updating employee: ${error.message}`);
    }
  }

  async deleteEmployee(id) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      await employee.destroy();
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting employee: ${error.message}`);
    }
  }

  async searchEmployees(query) {
    try {
      return await Employee.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${query}%` } },
            { lastName: { [Op.iLike]: `%${query}%` } },
            { email: { [Op.iLike]: `%${query}%` } },
            { employeeId: { [Op.iLike]: `%${query}%` } }
          ]
        }
      });
    } catch (error) {
      throw new Error(`Error searching employees: ${error.message}`);
    }
  }
}

module.exports = new EmployeeService();