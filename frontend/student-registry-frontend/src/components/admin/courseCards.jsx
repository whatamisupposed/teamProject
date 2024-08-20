import React, { useState } from 'react';

const CourseCards = ({ name, startDate, endDate, price, subjectArea, courseId, onEditComplete }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newStartDate, setNewStartDate] = useState(startDate);
    const [newEndDate, setNewEndDate] = useState(endDate);
    const [newPrice, setNewPrice] = useState(price);
    const [newSubjectArea, setNewSubjectArea] = useState(subjectArea);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDeleteCourse = async () => {
        try {
            const token = localStorage.getItem('x-auth-token');
            const response = await fetch(`http://localhost:3000/api/deleteCourse`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ courseId })
            });

            if (response.ok) {
                alert('Course deleted successfully');
                onEditComplete(courseId);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete course:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditCourse = () => {
        setShowEditForm(true);
    };

    const handleSaveChanges = async () => {
        if (!newName.trim()) {
            setErrorMessage('Course name is required.');
            return;
        }
    
        if (!newPrice) {
            setErrorMessage('Price is required.');
            return;
        }
    
        try {
            const token = localStorage.getItem('x-auth-token');
    
            const response = await fetch('http://localhost:3000/api/editCourse', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    courseId, // Ensure courseId is being sent here
                    newName,
                    newStartDate,
                    newEndDate,
                    newPrice,
                    newSubjectArea
                })
            });
    
            if (response.ok) {
                setShowEditForm(false);
                setErrorMessage('');
                
                if (onEditComplete) {
                    onEditComplete();
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to edit course:', errorData.message);
                setErrorMessage('Failed to edit course.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred.');
        }
    };
    
    

    return (
        <div className="flex flex-col w-72 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl p-4">
            <h3>Course Name: {name}</h3>
            <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(endDate).toLocaleDateString()}</p>
            <p>Price: ${price}</p>
            <p>Subject Area: {subjectArea}</p>

            <div className="flex justify-between mt-5">
                <button 
                    className="bg-green-400 w-20 p-2 rounded-md"
                    onClick={handleEditCourse}
                >
                    Edit Course
                </button>
                <button className="bg-red-400 w-28 p-2 rounded-md" onClick={handleDeleteCourse}>Delete Course</button>
            </div>

            {showEditForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-xl">
                        <h2>Edit Course</h2>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div>
                            <label>Course Name</label>
                            <input 
                                type="text" 
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input 
                                type="date" 
                                value={newStartDate.split('T')[0]}
                                onChange={(e) => setNewStartDate(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input 
                                type="date" 
                                value={newEndDate.split('T')[0]}
                                onChange={(e) => setNewEndDate(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input 
                                type="number" 
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                        </div>
                        <div>
                            <label>Subject Area</label>
                            <select
                                value={newSubjectArea}
                                onChange={(e) => setNewSubjectArea(e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            >
                                <option value="">Select Subject Area</option>
                                <option value="Art & Design">Art & Design</option>
                                <option value="Theology">Theology</option>
                                <option value="Business">Business</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Education & Teaching">Education & Teaching</option>
                                <option value="Health & Medicine">Health & Medicine</option>
                                <option value="Humanities">Humanities</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Programming">Programming</option>
                                <option value="Science">Science</option>
                                <option value="Social Sciences">Social Sciences</option>
                            </select>
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

export default CourseCards;
