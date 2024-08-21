import React, { useEffect, useState } from 'react';
import StudentCards from './studentCards';

function AdminProfile() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState({});

    const fetchData = async () => {
        try {
            const usersResponse = await fetch('http://localhost:3000/api/studentList/studentList');
            const usersData = await usersResponse.json();

            const nonAdminUsers = usersData.filter(user => !user.isAdmin);

            const coursesResponse = await fetch('http://localhost:3000/api/studentList/courseList');
            const coursesData = await coursesResponse.json();
            

            const courseMap = {};
            coursesData.forEach(course => {
                courseMap[course._id] = course.name;
            });

            const studentsWithCourses = nonAdminUsers.map(user => ({
                ...user,
                courses: user.courses.map(courseId => ({
                    id: courseId,
                    name: courseMap[courseId] || 'Unknown Course'
                }))
            }));
            

            setStudents(studentsWithCourses);
            setCourses(courseMap);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteStudent = (userId) => {
        setStudents(prevStudents => prevStudents.filter(student => student._id !== userId));
    };

    const handleEditComplete = () => {
        fetchData();
    };

    return (
        <div className="flex w-full">
            <div className="w-full">
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
                                    courses={student.courses} 
                                    userId={student._id}
                                    onDelete={handleDeleteStudent}
                                    onEditComplete={handleEditComplete}
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
