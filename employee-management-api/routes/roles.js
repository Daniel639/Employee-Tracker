const express = require('express');
const router = express.Router();
const { pool } = require('../app');

// Get all roles
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT r.id, r.title, r.salary, d.name as department FROM role r JOIN department d ON r.department_id = d.id');
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/roles:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// Add a role
router.post('/', async (req, res) => {
  const { title, salary, department_id } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error in POST /api/roles:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

module.exports = router;