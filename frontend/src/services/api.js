// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to handle tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// HR Service
export const hrService = {
  // Employee endpoints
  getAllEmployees: () => api.get('/hr/employees'),
  getEmployee: (id) => api.get(`/hr/employees/${id}`),
  createEmployee: (data) => api.post('/hr/employees', data),
  updateEmployee: (id, data) => api.put(`/hr/employees/${id}`, data),
  deleteEmployee: (id) => api.delete(`/hr/employees/${id}`),
  searchEmployees: (query) => api.get(`/hr/employees/search?q=${query}`),
  
  // Natural Language Query
  queryData: (query) => api.post('/hr/query', { query })
};