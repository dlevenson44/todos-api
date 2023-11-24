DROP TABLE IF EXISTS todos;

CREATE TABLE todos(
  id SERIAL PRIMARY KEY,
  title VARCHAR(225) NOT NULL,
  description TEXT NOT NULL
);
INSERT INTO
  todos(title, description)
VALUES(
    'First task',
    'This is the first task description'
  );
