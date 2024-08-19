// admin.js
async function fetchCourses() {
    try {
        const response = await fetch('/models/courses');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

// Function to fetch students
async function fetchStudents() {
    try {
        const response = await fetch('/models/students');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

// Dummy data for courses
let courses = [
    { id: 1, name: "Introduction to Programming", description: "Learn the basics of programming." },
    { id: 2, name: "Advanced Mathematics", description: "Deep dive into calculus and algebra." }
];

// Function to display courses
async function displayCourses() {
    const courses = await fetchCourses();
    const courseContainer = document.getElementById('course-list');
    courseContainer.innerHTML = ''; // Clear the container first

    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <p>${course.startDate} - ${course.endDate}</p>
            <button onclick="editCourse('${course._id}')">Edit</button>
            <button onclick="deleteCourse('${course._id}')">Delete</button>
        `;
        courseContainer.appendChild(courseItem);
    });
}

// Function to display students
async function displayStudents() {
    const students = await fetchStudents();
    const studentContainer = document.getElementById('student-list');
    studentContainer.innerHTML = ''; // Clear the container first

    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `
            <h3>${student.name}</h3>
            <p>Email: ${student.email}</p>
            <p>Contact: ${student.contact}</p>
            <p>Enrolled Courses: ${student.courses.join(', ')}</p>
            <button onclick="editStudent('${student._id}')">Edit</button>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
        `;
        studentContainer.appendChild(studentItem);
    });
}

function editCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const newName = prompt("Enter new course name:", course.name);
        const newDescription = prompt("Enter new course description:", course.description);

        if (newName && newDescription) {
            course.name = newName;
            course.description = newDescription;
            displayCourses();
        } else {
            alert("Course name and description cannot be empty.");
        }
    } else {
        alert("Course not found.");
    }
}

// Function to delete a course
function deleteCourse(courseId) {
    if (confirm("Are you sure you want to delete this course?")) {
        courses = courses.filter(c => c.id !== courseId);
        displayCourses();
    }
}

// Function to add a new course
function addCourse() {
    const newName = prompt("Enter course name:");
    const newDescription = prompt("Enter course description:");

    if (newName && newDescription) {
        const newCourse = {
            id: courses.length + 1,
            name: newName,
            description: newDescription
        };
        courses.push(newCourse);
        displayCourses();
    } else {
        alert("Course name and description cannot be empty.");
    }
}

// Function to edit a student
function editStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        const newName = prompt("Enter new student name:", student.name);
        const newEmail = prompt("Enter new student email:", student.email);
        const newContact = prompt("Enter new student contact:", student.contact);

        if (newName && newEmail && newContact) {
            student.name = newName;
            student.email = newEmail;
            student.contact = newContact;
            displayStudents();
        } else {
            alert("Student name, email, and contact cannot be empty.");
        }
    } else {
        alert("Student not found.");
    }
}

// Function to delete a student
function deleteStudent(studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
        students = students.filter(s => s.id !== studentId);
        displayStudents();
    }
}

// Function to add a new student
function addStudent() {
    const newName = prompt("Enter student name:");
    const newEmail = prompt("Enter student email:");
    const newContact = prompt("Enter student contact:");

    if (newName && newEmail && newContact) {
        const newStudent = {
            id: students.length + 1,
            name: newName,
            email: newEmail,
            contact: newContact,
            courses: []
        };
        students.push(newStudent);
        displayStudents();
    } else {
        alert("Student name, email, and contact cannot be empty.");
    }
}

// Function to enroll students in courses
function enrollStudent(studentId, courseId) {
    const student = students.find(s => s.id === studentId);
    const course = courses.find(c => c.id === courseId);

    if (student && course) {
        if (!student.courses.includes(course.name)) {
            student.courses.push(course.name);
            displayStudents();
        } else {
            alert("Student is already enrolled in this course.");
        }
    } else {
        alert("Student or course not found.");
    }
}

// Function to unregister students from courses
function unregisterStudent(studentId, courseId) {
    const student = students.find(s => s.id === studentId);
    const course = courses.find(c => c.id === courseId);

    if (student && course) {
        student.courses = student.courses.filter(c => c !== course.name);
        displayStudents();
    } else {
        alert("Student or course not found.");
    }
}

// Initialize the admin panel
function initAdminPanel() {
    const addCourseButton = document.getElementById('add-course');
    addCourseButton.addEventListener('click', addCourse);

    const addStudentButton = document.getElementById('add-student');
    addStudentButton.addEventListener('click', addStudent);

    displayCourses(); // Display existing courses on load
    displayStudents(); // Display existing students on load
}

// Call initAdminPanel if user is an admin
window.onload = function () {
    // Dummy check for admin, replace with actual authentication logic
    const isAdmin = true; // Assume true for now

    if (isAdmin) {
        initAdminPanel();
    } else {
        alert("You do not have access to this page.");
        window.location.href = "login.html"; // Redirect to login page
    }
};