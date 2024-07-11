CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    telephone VARCHAR(20),
    address TEXT
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_description TEXT
);

CREATE TABLE registrations (
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);

INSERT INTO students (username, email, firstname, lastname, telephone, address)
VALUES (%s, %s, %s, %s, %s, %s);

DELETE FROM students WHERE id = %s;

INSERT INTO registrations (student_id, course_id)
VALUES (%s, %s);

DELETE FROM registrations WHERE student_id = %s AND course_id = %s;

SELECT * FROM students WHERE username LIKE %s OR email LIKE %s OR firstname LIKE %s OR lastname LIKE %s;

SELECT * FROM courses WHERE course_name LIKE %s;

