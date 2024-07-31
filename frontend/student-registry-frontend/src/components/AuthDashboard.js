import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentKeyword, setStudentKeyword] = useState('');
  const [courseKeyword, setCourseKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get('/api/students');
        const coursesRes = await axios.get('/api/courses');
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleStudentSearch = async () => {
    try {
      const res = await axios.get(`/api/students?keyword=${studentKeyword}`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCourseSearch = async () => {
    try {
      const res = await axios.get(`/api/courses?keyword=${courseKeyword}`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Students</h3>
        <input
          type="text"
          value={studentKeyword}
          onChange={(e) => setStudentKeyword(e.target.value)}
          placeholder="Search Students"
        />
        <button onClick={handleStudentSearch}>Search</button>
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Courses</h3>
        <input
          type="text"
          value={courseKeyword}
          onChange={(e) => setCourseKeyword(e.target.value)}
          placeholder="Search Courses"
        />
        <button onClick={handleCourseSearch}>Search</button>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.course_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
