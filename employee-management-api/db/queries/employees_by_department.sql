SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.name = $1
ORDER BY e.last_name, e.first_name;