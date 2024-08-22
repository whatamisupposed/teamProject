import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../userContext';

function Form({ setActiveComponent, handleSignUpClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://capstone-mtech.onrender.com/api/auth/login', {
        email,
        password
      });

      if (response.data.message === 'Login successful') {
        const userData = response.data.user;

        if (userData) {
          localStorage.setItem('x-auth-token', response.data.token);

          setUser({
            id: userData._id,
            username: userData.username,
            email: userData.email,
            courses: userData.courses,
            tuitionFees: userData.tuitionFees,
            creditHours: userData.creditHours
          });
          setActiveComponent('Dashboard');
        } else {
          console.log('User data is missing from response');
        }
      } else {
        console.log('Invalid user or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl shadow-xl">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your details.</p>
      <form onSubmit={handleSubmit} className="mt-8">
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-base" htmlFor="remember">Remember Me</label>
          </div>
          <button className="font-medium text-base text-blue-600">Forgot Password</button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-600 text-white text-lg font-bold"
          >
            Sign in
          </button>
          <div className="flex justify-between items-center">
            <div>
              <p>Don't have an account?</p>
            </div>
            <button
              type="button"
              className="font-medium text-base text-blue-600"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
