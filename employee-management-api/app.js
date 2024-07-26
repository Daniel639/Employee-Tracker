const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

console.log('Starting application...');

const app = express();
const port = process.env.PORT || 3000;

console.log('Environment variables loaded. PORT:', port);

// Middleware
app.use(express.json());

console.log('Express middleware set up');

// Database connection
console.log('Attempting to connect to database...');
console.log('Database URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database at', res.rows[0].now);
    
    // Test query to check if the employee table exists
    pool.query('SELECT COUNT(*) FROM employee', (err, res) => {
      if (err) {
        console.error('Error querying employee table:', err);
      } else {
        console.log('Number of employees:', res.rows[0].count);
      }
    });
  }
});

// Export pool for use in other modules
module.exports = { pool };

const employeeRoutes = require('./routes/employees');

// Routes
app.get('/', (req, res) => {
  console.log('GET request to root route');
  res.json({ message: 'Welcome to the Employee Management API' });
});

console.log('Setting up employee routes...');
app.use('/api/employees', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});