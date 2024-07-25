-- File: db/queries/get_employee_with_manager.sql
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title AS role,
    d.name AS department,
    COALESCE(m.first_name || ' ' || m.last_name, 'No Manager') AS manager
FROM 
    employee e
JOIN 
    role r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id
LEFT JOIN 
    employee m ON e.manager_id = m.id
ORDER BY 
    d.name, r.title, e.last_name, e.first_name;