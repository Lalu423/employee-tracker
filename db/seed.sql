INSERT INTO department (dep_name)
VALUES ('Management'),
        ('Accounting'),
        ('Sales'),
        ('Customer Service'),
        ('Human Resources');


INSERT INTO roles (title, salary, department_id)
VALUES ('CEO', 200000, 1),
        ('General Manager', 150000, 1),
        ('Accountant', 95000, 2),
        ('Sales Rep', 80000, 3),
        ('Receptionist', 55000, 4),
        ('HR Officer', 75000, 5);


INSERT INTO employee (first_name, last_name, role_id, manage_id)
VALUES ('Bill', 'Lumbergh', 1, 2),
        ('Peter', 'Gibbons', 2, 1),
        ('Michael', 'Bolton', 4, 3),
        ('Milton', 'Waddams', 3, 4),
        ('Tom', 'Smykowksi', 5, 5);