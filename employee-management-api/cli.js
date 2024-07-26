const inquirer = require('inquirer');
const axios = require('axios');
const cTable = require('console.table');

const API_BASE_URL = 'http://localhost:3000/api';

async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        return;
    }
  }
}

async function viewAllDepartments() {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`);
    console.log('\nAll Departments:');
    console.table(response.data);
  } catch (error) {
    console.error('Error fetching departments:', error.message);
  }
}

async function viewAllRoles() {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    console.log('\nAll Roles:');
    console.table(response.data);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
  }
}

async function viewAllEmployees() {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    console.log('\nAll Employees:');
    console.table(response.data);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
  }
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]);

  try {
    await axios.post(`${API_BASE_URL}/departments`, { name });
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error.message);
  }
}

async function addRole() {
  const departments = await fetchDepartments();
  
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for this role:',
      choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
    }
  ]);

  try {
    await axios.post(`${API_BASE_URL}/roles`, { title, salary, department_id: departmentId });
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error.message);
  }
}

async function addEmployee() {
  const roles = await fetchRoles();
  const employees = await fetchEmployees();

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "Enter the employee's first name:"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Enter the employee's last name:"
    },
    {
      type: 'list',
      name: 'roleId',
      message: "Select the employee's role:",
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Select the employee's manager:",
      choices: [
        { name: 'None', value: null },
        ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      ]
    }
  ]);

  try {
    await axios.post(`${API_BASE_URL}/employees`, { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId });
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error.message);
  }
}

async function updateEmployeeRole() {
  const employees = await fetchEmployees();
  const roles = await fetchRoles();

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role:',
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    }
  ]);

  try {
    await axios.put(`${API_BASE_URL}/employees/${employeeId}`, { role_id: roleId });
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error.message);
  }
}

async function fetchDepartments() {
  const response = await axios.get(`${API_BASE_URL}/departments`);
  return response.data;
}

async function fetchRoles() {
  const response = await axios.get(`${API_BASE_URL}/roles`);
  return response.data;
}

async function fetchEmployees() {
  const response = await axios.get(`${API_BASE_URL}/employees`);
  return response.data;
}

main().catch(console.error);