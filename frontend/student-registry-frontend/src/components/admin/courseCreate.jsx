import React, { useEffect, useState } from 'react';
import CourseCards from './courseCards';
import CreateCourseForm from './createCourseForm';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/adminCourseRoutes');
            const data = await response.json();
            setCourses(data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleEditComplete = () => {
        
        fetchCourses();
    };

    return (
        <div>
            <button
                className="bg-blue-500 text-white w-full py-2 rounded-md my-4"
                onClick={() => setShowCreateForm(!showCreateForm)}
            >
                {showCreateForm ? 'Cancel' : 'Create Course'}
            </button>

            {showCreateForm && <CreateCourseForm onCreate={() => { fetchCourses(); setShowCreateForm(false); }} />}

            <div className="grid grid-cols-3 gap-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCards 
                            key={course._id} 
                            {...course} 
                            courseId={course._id}
                            onEditComplete={handleEditComplete}
                        />
                    ))
                ) : (
                    <div className="col-span-3 flex justify-center">
                        <p>No courses available</p>
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default AdminCourses;
