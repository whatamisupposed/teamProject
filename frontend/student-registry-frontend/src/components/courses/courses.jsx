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
                console.log("Fetched data:", data); // Debug log to verify data structure
                setCourses(data); // Set courses data
                setFilteredCourses(data); // Initialize filteredCourses with all courses
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
                                key={index} // Ensure uniqueness if _id is not available
                                name={course.name}
                                startDate={course.startDate}
                                endDate={course.endDate}
                                price={course.price}
                                subjectArea={course.subjectArea}
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
