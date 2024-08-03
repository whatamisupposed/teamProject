import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './courseCard';

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await axios.get('http://localhost:3000/api/students/66ad5b06c4f6f8c44fbf623e');
        const student = response.data;
        const courseIds = student.courses;
        
        console.log('Course IDs:', courseIds);

        // Fetch course details for each course ID
        const courseRequests = courseIds.map((courseId) =>
          axios.get(`http://localhost:3000/api/courses/${courseId}`)
        );
        const courseResponses = await Promise.all(courseRequests);
        const coursesData = courseResponses.map((response) => response.data);
        
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    }

    fetchStudentData();
  }, []);

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
                name={course.name}
                startDate={course.startDate}
                endDate={course.endDate}
                grade="A"
                color={course.color}
              />
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
      <div className="w-1/4">
        {/* Additional content here */}
      </div>
    </div>
  );
}

export default Dashboard;
