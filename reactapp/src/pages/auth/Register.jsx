import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    await createUser({ username, email, password });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl flex w-4/5 max-w-4xl overflow-hidden">

        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://www.gwsportsapp.in/media/ground-images/gallery/MC44MjE3NjUwMCAxNTg2OTMxNzgx.jpeg"
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Right Form */}
<div className="w-full md:w-1/2 p-10">
<h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>
{error && <p className="text-red-500 mb-4">{error}</p>}
<form onSubmit={handleRegister} className="space-y-5">
<div>
<label className="block text-gray-700 mb-2">Username</label>
<input
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="John Doe"
required
/>
</div>
<div>
<label className="block text-gray-700 mb-2">Email</label>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="example@email.com"
required
/>
</div>
<div>
<label className="block text-gray-700 mb-2">Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="********"
required
/>
</div>
<div>
<label className="block text-gray-700 mb-2">Confirm Password</label>
<input
type="password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="********"
required
/>
</div>
<button
type="submit"
className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
>
Register
</button>
<p className="text-sm text-gray-500 text-center mt-4">
Already have an account?{' '}
<span
onClick={() => navigate('/login')}
className="text-blue-600 cursor-pointer hover:underline"
>
Login
</span>
</p>
</form>
</div>
</div>
</div>
);
};

export default Register;

