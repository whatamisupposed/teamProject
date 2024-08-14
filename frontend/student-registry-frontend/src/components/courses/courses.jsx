import { useState, useEffect } from "react";
import CourseRegister from "./courseRegister";
import CourseCategories from "./courseCategories";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/courses")
            .then(response => response.json())
            .then(data => {
                setCourses(data);
                setFilteredCourses(data);
            })
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const handleFilterChange = ({ subjectAreas, priceType }) => {
        let filtered = [...courses];

        if (subjectAreas.length > 0) {
            filtered = filtered.filter(course =>
                subjectAreas.includes(course.subjectArea)
            );
        }

        if (priceType) {
            filtered = filtered.filter(course => {
                if (priceType === "Free") {
                    return course.price === 0;
                } else if (priceType === "Paid") {
                    return course.price > 0;
                }
                return true;
            });
        }

        setFilteredCourses(filtered);
    };

    const handleEnroll = async (courseId) => {
        const token = localStorage.getItem('x-auth-token');
      
        if (!token) {
          console.error('No token found');
          return;
        }
      
        try {
          const response = await fetch('http://localhost:3000/api/user/enroll', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token, // Ensure the token is included
            },
            body: JSON.stringify({ courseId }),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            console.log('Enrollment successful:', result);
          } else {
            console.error('Enrollment failed:', result);
          }
        } catch (error) {
          console.error('Error enrolling in course:', error);
        }
      };
      
    

    return (
        <div className="flex w-full m-5 ml-28">
            <div className="w-3/4 mr-4">
                <div className="flex justify-between my-3">
                    <h1 className="text-2xl font-bold">Courses</h1>
                </div>
                <div className="h-px bg-slate-300"></div>
                <div className="flex flex-wrap justify-center">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <CourseRegister
                                key={index}
                                name={course.name}
                                startDate={course.startDate}
                                endDate={course.endDate}
                                price={course.price}
                                color={course.color}
                                courseId={course._id}
                                onEnroll={handleEnroll}
                            />
                        ))
                    ) : (
                        <p>No courses available</p>
                    )}
                </div>
            </div>
            <div className="w-1/4">
                <CourseCategories onFilterChange={handleFilterChange} />
            </div>
        </div>
    );
}

export default Courses;
