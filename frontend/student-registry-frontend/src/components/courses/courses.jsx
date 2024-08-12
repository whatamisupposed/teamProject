import { useState, useEffect } from "react";
import CourseRegister from "./courseRegister";
import CourseCategories from "./courseCategories";
import axios from "axios";

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
        try {
          // Retrieve the token from localStorage
          const token = localStorage.getItem('x-auth-token');
      
          if (!token) {
            console.error('No token found, authorization denied');
            return;  // Exit if no token is found
          }
      
          // Make the POST request to enroll in a course
          const response = await axios.post('http://localhost:3000/api/user/enroll', 
            { courseId },  // Send the course ID in the request body
            {
              headers: {
                'x-auth-token': token  // Include the token in the request headers
              }
            }
          );
      
          console.log('Enrollment successful:', response.data);
          // Handle successful enrollment (e.g., update UI, show a message)
        } catch (error) {
          console.error('Error during enrollment:', error.response ? error.response.data : error.message);
          // Handle the error (e.g., show an error message to the user)
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
                                subjectArea={course.subjectArea}
                                color={course.color}
                                courseId={course._id} // Pass the course ID
                                onEnroll={handleEnroll} // Handle enrollment
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
