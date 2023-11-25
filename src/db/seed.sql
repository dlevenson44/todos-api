DROP TABLE IF EXISTS todos;

CREATE TABLE todos(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN
);
INSERT INTO
  todos(title, description, completed)
VALUES(
    'First task',
    'This is the first task description',
    FALSE
  );
