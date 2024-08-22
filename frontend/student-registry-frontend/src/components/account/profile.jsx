import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { useUser } from '../userContext'; 

function Profile() {
    const [username, setUsername] = useState('');
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            console.warn('No user is logged in');
            return;
        }
        async function fetchUsername() {
            try {
                const token = localStorage.getItem('x-auth-token');
                const response = await axios.get(`https://capstone-mtech.onrender.com/api/username/${user.id}`, {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setUsername(response.data.username || '');
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        }

        fetchUsername();
    }, [user]);

    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:3000/api/username', { username }, {
                headers: {
                    'x-auth-token': localStorage.getItem('x-auth-token'),
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request data:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
        }
    };
    
    
    

    const handleChange = () => {
        console.log('change');
    };

    const handleCancel = () => {
        setUsername('');
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1 className="text-xl mt-3">Profile</h1>
                <p>This information will be displayed publicly on your account</p>
            </div>
            <div className="flex mt-4 gap-10">
                <div className="w-1/2 flex flex-col">
                    <label className="text-lg font-medium">Username</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex mt-5 w-72 justify-between items-center">
                <CgProfile size={45} />
                <button
                    className="border-2 border-black rounded-md px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200"
                    onClick={handleChange}
                >
                    Change
                </button>
                <button className=" rounded-md px-4 py-2 font-bold bg-slate-100 hover:bg-slate-200">
                    Remove
                </button>
            </div>
            <div className="w-full flex mt-4 justify-end gap-4">
                <button
                    className="border-2 border-black rounded-md px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="border-2 border-blue-500 hover:border-blue-600 rounded-md px-4 py-2 font-bold bg-blue-500 hover:bg-blue-600"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default Profile;
