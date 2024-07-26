-- File: db/seeds/02_roles.sql
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 70000.00, (SELECT id FROM department WHERE name = 'Human Resources')),
('Software Engineer', 85000.00, (SELECT id FROM department WHERE name = 'Engineering')),
('Sales Representative', 60000.00, (SELECT id FROM department WHERE name = 'Sales')),
('Marketing Specialist', 65000.00, (SELECT id FROM department WHERE name = 'Marketing'));