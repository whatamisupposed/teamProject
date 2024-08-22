import React, { useState } from 'react';

const CreateCourseForm = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [subjectArea, setSubjectArea] = useState('');
    const [color, setColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16)}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('x-auth-token');
            const response = await fetch('https://capstone-mtech.onrender.com/api/createCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    name,
                    startDate,
                    endDate,
                    price,
                    subjectArea,
                    color
                })
            });

            if (response.ok) {
                onCreate();
            } else {
                console.error('Failed to create course');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg mb-2">Create New Course</h2>

            <div className="mb-2">
                <label className="block mb-1">Course Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Subject Area</label>
                <select
                    value={subjectArea}
                    onChange={(e) => setSubjectArea(e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
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

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Create Course
            </button>
        </form>
    );
};

export default CreateCourseForm;
