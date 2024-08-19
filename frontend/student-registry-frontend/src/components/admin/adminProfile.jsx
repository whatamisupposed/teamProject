import React, { useEffect, useState } from 'react';
import StudentCards from './studentCards';

function AdminProfile() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users data from your backend API
                const usersResponse = await fetch('http://localhost:3000/api/studentList/studentList');
                const usersData = await usersResponse.json();

                // Filter out admins
                const nonAdminUsers = usersData.filter(user => !user.isAdmin);

                // Fetch courses data from your backend API
                const coursesResponse = await fetch('http://localhost:3000/api/studentList/courseList');
                const coursesData = await coursesResponse.json();
                console.log('Courses:', coursesData); // Log courses data

                // Map course IDs to course names
                const courseMap = {};
                coursesData.forEach(course => {
                    courseMap[course._id] = course.name;
                });

                // Add course names to users
                const studentsWithCourses = nonAdminUsers.map(user => ({
                    ...user,
                    courses: user.courses.map(courseId => ({
                        id: courseId,
                        name: courseMap[courseId] || 'Unknown Course'
                    }))
                }));
                console.log('Updated Students with Courses:', studentsWithCourses);

                setStudents(studentsWithCourses);
                setCourses(courseMap);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex w-full">
            <div className="">
                <div className="flex justify-between my-3">
                    <h1 className="text-2xl font-bold">Students</h1>
                </div>
                <div className="h-px bg-slate-300"></div>
                <div className="flex flex-wrap justify-center">
                    {students.length > 0 ? (
                        <div className="flex flex-wrap justify-center">
                            {students.map(student => (
                                <StudentCards
                                    key={student._id}
                                    username={student.username}
                                    email={student.email}
                                    tuitionFees={student.tuitionFees}
                                    creditHours={student.creditHours}
                                    courses={student.courses} // Pass course objects here
                                    userId={student._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Students available</p>
                    )}
                </div>
            </div>
        </div>
    );        
}

export default AdminProfile;
