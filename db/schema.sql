-- database/schema.sql


DROP TABLE IF EXISTS task;

-- Create the main task table
CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT 0, -- 0 for incomplete, 1 for complete
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO task (title, description) VALUES
('Set up project structure', 'Create the backend, frontend, and database folders.'),
('Configure docker-compose', 'Link all three services with Docker.'),
('Design the database schema', 'Define the columns for the task table and create schema.sql.');

INSERT INTO task (title, description, is_completed) VALUES
('Check UI Mockup', 'Review the required fields: title, description, and "Done" button.', 1);


INSERT INTO task (title, description) VALUES
('Implement Create Task API', 'A POST endpoint for /api/tasks.');