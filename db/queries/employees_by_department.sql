-- File: db/queries/get_employees_by_department.sql
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title AS role,
    d.name AS department
FROM 
    employee e
JOIN 
    role r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id
WHERE 
    d.name = 'Engineering'  -- Replace 'Engineering' with the department you want to query
ORDER BY 
    e.last_name, e.first_name;