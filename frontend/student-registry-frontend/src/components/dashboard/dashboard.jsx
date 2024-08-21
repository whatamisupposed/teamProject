import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../userContext';
import CourseCard from './courseCard';

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      console.warn('No user is logged in');
      setLoading(false);
      return;
    }

    async function fetchStudentData() {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`http://localhost:3000/api/user/${user.id}`, {
          headers: {
            'x-auth-token': token
          }
        });

        const student = response.data.user;
        const courses = student.courses;

        if (!Array.isArray(courses) || courses.length === 0) {
          console.warn('No courses found for the student');
          setCourses([]);
          setLoading(false);
          return;
        }

        setCourses(courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    }

    fetchStudentData();
  }, [user]);

  const updateCourses = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const response = await axios.get(`http://localhost:3000/api/user/${user.id}`, {
        headers: {
          'x-auth-token': token
        }
      });

      const student = response.data.user;
      setCourses(student.courses);
    } catch (error) {
      console.error('Error fetching updated student data:', error);
    }
  };

  return (
    <div className="flex w-full m-5 ml-28">
      <div className="w-3/4">
        <div className="flex justify-between my-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="h-px bg-slate-300"></div>
        <div className="flex flex-wrap justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                courseId={course._id}
                name={course.name}
                startDate={course.startDate}
                endDate={course.endDate}
                grade="A"
                color={course.color}
                refreshCourses={updateCourses}
              />
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
      <div className="w-1/4">
      </div>
    </div>
  );
}

export default Dashboard;
