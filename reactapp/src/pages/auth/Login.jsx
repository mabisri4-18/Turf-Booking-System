import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await authenticate(email, password);

      if (user && user.role) {
        // Navigate based on role
        if (user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (user.role === 'CUSTOMER') {
          navigate('/');
        } else if (user.role === 'STAFF') {
          navigate('/staff/dashboard');
        } else {
          setError('User role not recognized');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl flex w-4/5 max-w-4xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://t3.ftcdn.net/jpg/14/73/24/10/360_F_1473241031_E3UnPjfcWfB7BE5zZKAtb93cVyYKdGXo.jpg"
            onError={(e) => (e.target.src = '/assets/login.jpg')}
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

       {/* Right Form */}
<div className="w-full md:w-1/2 p-10">
<h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
{error && <p className="text-red-500 mb-4">{error}</p>}
<form onSubmit={handleLogin} className="space-y-5">
<div>
<label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
<input
id="email"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="example@email.com"
required
/>
</div>
<div>
<label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
<input
id="password"
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="********"
required
/>
</div>
<button
type="submit"
aria-label="Login"
className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
>
Login
</button>
<p className="text-sm text-gray-500 text-center mt-4">
Don't have an account?{' '}
<span
onClick={() => navigate('/register')}
className="text-blue-600 cursor-pointer hover:underline"
>
Sign Up
</span>
</p>
</form>
</div>
</div>
</div>
);
};

export default Login;