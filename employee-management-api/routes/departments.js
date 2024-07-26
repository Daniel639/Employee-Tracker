const express = require('express');
const router = express.Router();
const { pool } = require('../app');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM department');
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/departments:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// Add a department
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error in POST /api/departments:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

module.exports = router;