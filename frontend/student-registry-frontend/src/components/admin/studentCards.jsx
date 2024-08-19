import React, { useState } from 'react';

const StudentCards = ({ username, email, tuitionFees, creditHours, courses, userId ,onEditComplete  }) => {
    const [courseList, setCourseList] = useState(courses);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
    const [newFees, setNewFees] = useState(tuitionFees);
    const [errorMessage, setErrorMessage] = useState('');

    const handleKick = async (courseId) => {
        try {
            const token = localStorage.getItem('x-auth-token');
            console.log('Sending courseId:', courseId);
            console.log('Sending userId:', userId);

            const response = await fetch('http://localhost:3000/api/studentList/removeCourse', {
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

    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem('x-auth-token');
            const response = await fetch(`http://localhost:3000/api/deleteUser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                alert('User deleted successfully');
                onDelete(userId);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete user:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditUser = () => {
        setShowEditForm(true);
    };

    const handleSaveChanges = async () => {
        if (!newUsername.trim()) {
            setErrorMessage('Username is required.');
            return;
        }
    
        if (!newEmail.trim()) {
            setErrorMessage('Email is required.');
            return;
        }
    
        if (!newFees) {
            setErrorMessage('Fees are required.');
            return;
        }
        
        if (!validateEmail(newEmail)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        try {
            const token = localStorage.getItem('x-auth-token');

            const response = await fetch('http://localhost:3000/api/editUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ userId, newUsername, newEmail, newFees })
            });

            if (response.ok) {
                setShowEditForm(false);
                setErrorMessage('');
                
                if (onEditComplete) {
                    onEditComplete();
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to edit user:', errorData.message);
                setErrorMessage('Failed to edit user.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred.');
        }
        
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
                            <p>{course.name}</p> 
                            <button 
                                className="bg-blue-400 p-2 rounded-md" 
                                onClick={() => handleKick(course.id)} 
                            >
                                Kick
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-5">
                <button 
                    className="bg-green-400 w-20 p-2 rounded-md"
                    onClick={handleEditUser}
                >
                    Edit User
                </button>
                <button className="bg-red-400 w-28 p-2 rounded-md" onClick={handleDeleteUser}>Delete User</button>
            </div>

            {showEditForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-xl">
                        <h2>Edit User</h2>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div>
                            <label>Username</label>
                            <input 
                                type="text" 
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div>
                            <label>Fees</label>
                            <input 
                                type="number" 
                                value={newFees}
                                onChange={(e) => setNewFees(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button 
                                className="bg-green-400 p-2 rounded-md"
                                onClick={handleSaveChanges}
                            >
                                Save
                            </button>
                            <button 
                                className="bg-gray-400 p-2 rounded-md"
                                onClick={() => setShowEditForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCards;
