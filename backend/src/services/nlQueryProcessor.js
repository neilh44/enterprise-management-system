const { logger } = require('../middlewares/logger');

class NLQueryProcessor {
  constructor() {
    this.modules = {
      hr: ['employees', 'departments', 'payroll', 'attendance'],
      sales: ['orders', 'customers', 'revenue', 'targets'],
      marketing: ['campaigns', 'leads', 'analytics', 'social'],
      inventory: ['products', 'stock', 'suppliers', 'warehouses'],
      operations: ['projects', 'resources', 'schedules', 'maintenance']
    };
    
    this.actionKeywords = {
      read: ['show', 'get', 'find', 'list', 'display', 'what', 'which'],
      analyze: ['analyze', 'calculate', 'compute', 'compare'],
      aggregate: ['total', 'average', 'count', 'sum', 'maximum', 'minimum']
    };
  }

  identifyModule(query) {
    query = query.toLowerCase();
    for (const [module, keywords] of Object.entries(this.modules)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return module;
      }
    }
    return null;
  }

  identifyAction(query) {
    query = query.toLowerCase();
    for (const [action, keywords] of Object.entries(this.actionKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return action;
      }
    }
    return 'read'; // default action
  }

  extractConditions(query) {
    const conditions = {};
    const whereClause = query.toLowerCase().split('where')[1];
    
    if (whereClause) {
      // Extract conditions like "department = sales" or "salary > 50000"
      const conditionPatterns = [
        { regex: /([\w]+)\s*(=|equals?|is)\s*([\w]+)/, operator: '=' },
        { regex: /([\w]+)\s*(>|greater than)\s*([\d]+)/, operator: '>' },
        { regex: /([\w]+)\s*(<|less than)\s*([\d]+)/, operator: '<' }
      ];

      conditionPatterns.forEach(pattern => {
        const match = whereClause.match(pattern.regex);
        if (match) {
          conditions[match[1]] = {
            operator: pattern.operator,
            value: match[3]
          };
        }
      });
    }

    return conditions;
  }

  async processQuery(query, dbConnection) {
    try {
      const module = this.identifyModule(query);
      const action = this.identifyAction(query);
      const conditions = this.extractConditions(query);

      logger.info(`Processing query for module: ${module}, action: ${action}`);

      if (!module) {
        throw new Error('Could not identify which module to query');
      }

      // Build and execute database query
      const result = await this.executeQuery(module, action, conditions, dbConnection);
      
      return {
        success: true,
        module,
        action,
        conditions,
        data: result
      };

    } catch (error) {
      logger.error('Error processing natural language query:', error);
      throw error;
    }
  }

  async executeQuery(module, action, conditions, dbConnection) {
    // Example query execution logic
    const collection = dbConnection.collection(module);
    
    let query = {};
    Object.entries(conditions).forEach(([field, condition]) => {
      query[field] = condition.operator === '=' ? 
        condition.value : 
        { [`$${condition.operator}`]: condition.value };
    });

    switch (action) {
      case 'read':
        return await collection.find(query).toArray();
      case 'analyze':
        // Add analysis logic
        return await collection.aggregate([
          { $match: query },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]).toArray();
      case 'aggregate':
        // Add aggregation logic
        return await collection.aggregate([
          { $match: query },
          { $group: { _id: null, total: { $sum: 1 } } }
        ]).toArray();
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }
}

module.exports = new NLQueryProcessor();
