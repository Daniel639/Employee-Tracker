-- File: db/seeds/03_employees.sql
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Daniel', 'Berroa', (SELECT id FROM role WHERE title = 'HR Manager'), NULL),
('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Software Engineer'), NULL),
('Mike', 'Johnson', (SELECT id FROM role WHERE title = 'Sales Representative'), NULL),
('Emily', 'Brown', (SELECT id FROM role WHERE title = 'Marketing Specialist'), NULL),
('David', 'Wilson', (SELECT id FROM role WHERE title = 'Software Engineer'), 
    (SELECT id FROM employee WHERE first_name = 'Jane' AND last_name = 'Smith'));