import React, { useState } from 'react';
import axios from 'axios';

function Signup({ setActiveComponent, handleBackToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const data = { username, email, password, userType };
  
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Sign up successful:', result);
        setActiveComponent('Login');
      } else {
        console.error('Sign up failed:', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again.');
    }
    handleBackToLogin()
  };
  
  
  

  return (
    <div className="bg-white px-10 py-20 rounded-3xl shadow-xl">
      <h1 className="text-5xl font-semibold">Sign Up</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Don't have an Account? Feel free to sign up.</p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="username">Username:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium" htmlFor="email">Email:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium" htmlFor="password">Password:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input
              type="radio"
              id="student"
              name="userType"
              checked={userType === 'student'}
              onChange={() => setUserType('student')}
            />
            <label className="ml-2 font-medium text-base" htmlFor="student">I'm a Student</label>
          </div>
          <div>
            <input
              type="radio"
              id="admin"
              name="userType"
              checked={userType === 'admin'}
              onChange={() => setUserType('admin')}
            />
            <label className="ml-2 font-medium text-base" htmlFor="admin">I'm an Administrator</label>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-600 text-white text-lg font-bold"
            
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
