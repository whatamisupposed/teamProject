import React, { useState } from 'react';
import axios from 'axios';

function Security() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:3000/api/security', { email, password }, {
                headers: {
                    'x-auth-token': localStorage.getItem('x-auth-token'),
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            } else if (error.request) {
                console.error('Error request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h1 className="text-xl mt-3">Security</h1>
                <p>Keep your Account Secure</p>
            </div>
            <div className="flex mt-4 gap-10">
                <div className="w-1/2 flex flex-col">
                    <label className="text-lg font-medium" htmlFor="Email">Email</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"
                        type="email"
                        id="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-1/2 flex flex-col">
                    <label className="text-lg font-medium" htmlFor="Password">Password</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 mt-1 bg-transparent"
                        type="password"
                        id="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
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

export default Security;
