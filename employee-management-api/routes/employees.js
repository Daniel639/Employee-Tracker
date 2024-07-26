const express = require('express');
const router = express.Router();
const { pool } = require('../app');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        r.title, 
        d.name AS department, 
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM 
        employee e
      JOIN 
        role r ON e.role_id = r.id
      JOIN 
        department d ON r.department_id = d.id
      LEFT JOIN 
        employee m ON e.manager_id = m.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/employees:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// Add an employee
router.post('/', async (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error in POST /api/employees:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// Update an employee's role
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { role_id } = req.body;
  try {
    const { rows } = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error in PUT /api/employees/:id:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

module.exports = router;