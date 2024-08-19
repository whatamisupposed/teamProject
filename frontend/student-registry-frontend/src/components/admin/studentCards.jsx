import React, { useState } from 'react';

const StudentCards = ({ username, email, tuitionFees, creditHours, courses, userId }) => {
    const [courseList, setCourseList] = useState(courses);

    const handleKick = async (courseId) => {
        try {
            const token = localStorage.getItem('x-auth-token');
            console.log('Sending courseId:', courseId); // This should be the actual course ID
            console.log('Sending userId:', userId);

            const response = await fetch(`http://localhost:3000/api/studentList/removeCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ courseId, userId })
            });

            if (response.ok) {
                setCourseList(prevCourses => prevCourses.filter(course => course.id !== courseId));
            } else {
                const errorData = await response.json();
                console.error('Failed to remove course:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col w-72 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl p-4">
            <h3>Username: {username}</h3>
            <p className="mb-4">Email: {email}</p>
            <div className="flex justify-between">
                <p>Fees: ${tuitionFees}</p>
                <p>Hours: {creditHours}</p>
            </div>

            <div className="flex flex-col justify-center">
                <p className="font-bold">Courses:</p>
                <div className="flex flex-col">
                    {courseList.map((course, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <p>{course.name}</p> {/* Display course name */}
                            <button 
                                className="bg-blue-400 p-2 rounded-md" 
                                onClick={() => handleKick(course.id)} // Pass course ID for action
                            >
                                Kick
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-5">
                <button className="bg-green-400 w-20 p-2 rounded-md">Edit User</button>
                <button className="bg-red-400 w-28 p-2 rounded-md">Delete User</button>
            </div>
        </div>
    );
};

export default StudentCards;
