const express = require('express');
const router = express.Router();
const { pool } = require('../app');  // Updated import
const fs = require('fs');
const path = require('path');

console.log('Employee routes module loaded');

// Read SQL files
const employeesByDepartmentSQL = fs.readFileSync(path.join(__dirname, '../db/queries/employees_by_department.sql'), 'utf8');
const employeesWithManagerSQL = fs.readFileSync(path.join(__dirname, '../db/queries/employees_with_manager.sql'), 'utf8');

// Get all employees
router.get('/', async (req, res) => {
  console.log('GET request to /api/employees');
  try {
    console.log('Attempting to fetch all employees');
    const { rows } = await pool.query('SELECT * FROM employee');
    console.log('Fetched employees:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/employees:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: err.message,
      stack: err.stack 
    });
  }
});

// Get employees by department
router.get('/by-department/:department', async (req, res) => {
  console.log('GET request to /api/employees/by-department');
  try {
    const { department } = req.params;
    console.log('Attempting to fetch employees by department:', department);
    const { rows } = await pool.query(employeesByDepartmentSQL, [department]);
    console.log('Fetched employees by department:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/employees/by-department:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: err.message,
      stack: err.stack 
    });
  }
});

// Get employees with manager
router.get('/with-manager', async (req, res) => {
  console.log('GET request to /api/employees/with-manager');
  try {
    console.log('Attempting to fetch employees with manager');
    const { rows } = await pool.query(employeesWithManagerSQL);
    console.log('Fetched employees with manager:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/employees/with-manager:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: err.message,
      stack: err.stack 
    });
  }
});

module.exports = router;