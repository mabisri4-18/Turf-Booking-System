
// import React, { useState } from 'react';
// import { FaGoogle, FaApple } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const navigate = useNavigate();
//   const { authenticate } = useAuth();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const user = await authenticate(email, password);
//       if (user && user.role) {
//         if (user.role === 'ADMIN') navigate('/admin/dashboard');
//         else if (user.role === 'CUSTOMER') navigate('/');
//         else if (user.role === 'STAFF') navigate('/staff/dashboard');
//         else setError('User role not recognized');
//       } else setError('Invalid email or password');
//     } catch {
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
//       <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl bg-white">
//         {/* Left Side: Form */}
//         <div className="w-full md:w-1/2 p-10 bg-gradient-to-br from-green-100 to-green-200 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold mb-6 text-green-900">Login to Turf Booking</h2>
//           {error && <p className="text-red-500 mb-4">[Error - You need to specify the message]</p>}

//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
//               required
//             />
//          <input
// type="password"
// value={password}
// onChange={(e) => setPassword(e.target.value)}
// placeholder="Password"
// className="w-full px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
// required
// />
// <button
// type="submit"
// className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
// >
// Login
// </button>
// </form>

// <div className="mt-6 flex justify-center gap-4">
// <button className="flex items-center gap-2 px-4 py-2 border border-green-400 rounded-xl hover:bg-green-100 transition">
// <FaApple /> Apple
// </button>
// <button className="flex items-center gap-2 px-4 py-2 border border-green-400 rounded-xl hover:bg-green-100 transition">
// <FaGoogle /> Google
// </button>
// </div>

// <p className="text-center text-green-800 mt-6 text-sm">
// Don't have an account?{' '}
// <span onClick={() => navigate('/register')} className="text-green-600 cursor-pointer hover:underline">
// Sign Up
// </span>
// </p>
// </div>

// {/* Right Side: Image */}
// <div className="hidden md:block md:w-1/2 relative">
// <img
// src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/18155348/sky-turf.jpg"
// alt="Turf"
// className="w-full h-full object-cover"
// />
// </div>
// </div>
// </div>
// );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const navigate = useNavigate();
//   const { authenticate } = useAuth();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('CUSTOMER'); // default selected role
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const user = await authenticate(email, password);

//       if (!user) {
//         setError('Invalid email or password');
//         return;
//       }

//       // Enforce selected role
//       if (user.role !== role) {
//         setError(`This account is not a ${role}`);
//         return;
//       }

//       // Navigate based on role
//       if (user.role === 'ADMIN') navigate('/admin/dashboard');
//       else if (user.role === 'CUSTOMER') navigate('/customer/dashboard');
//       else if (user.role === 'STAFF') navigate('/staff/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//       <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
//         {/* Left side: Form */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Login to Turf Booking</h2>
//           {error && <p className="text-red-500 mb-4">{error}</p>}

//         {/* Role Selector */}
// <div className="flex gap-4 mb-6">
// {['CUSTOMER', 'ADMIN', 'STAFF'].map((r) => (
// <button
// key={r}
// type="button"
// onClick={() => setRole(r)}
// className={`px-4 py-2 rounded-lg font-medium transition ${
// role === r ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
// }`}
// >
// {r}
// </button>
// ))}
// </div>

// <form onSubmit={handleLogin} className="space-y-4">
// <input
// type="email"
// value={email}
// onChange={(e) => setEmail(e.target.value)}
// placeholder="Email"
// className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
// required
// />
// <input
// type="password"
// value={password}
// onChange={(e) => setPassword(e.target.value)}
// placeholder="Password"
// className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
// required
// />
// <button
// type="submit"
// className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
// >
// Login
// </button>
// </form>

// <p className="text-center text-gray-500 mt-6 text-sm">
// Don't have an account?{' '}
// <span
// onClick={() => navigate('/register')}
// className="text-blue-600 cursor-pointer hover:underline"
// >
// Sign Up
// </span>
// </p>
// </div>

// {/* Right side: Image */}
// <div className="hidden md:block md:w-1/2">
// <img
// src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/18155348/sky-turf.jpg"
// alt="Turf"
// className="w-full h-full object-cover"
// />
// </div>
// </div>
// </div>
// );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER'); // default role
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await authenticate(email, password);

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      if (user.role !== role) {
        setError(`This account is not a ${role}`);
        return;
      }

      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'CUSTOMER') navigate('/customer/dashboard');
      else if (user.role === 'STAFF') navigate('/staff/dashboard');
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Left side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Login to Turf Booking</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Role Selector */}
<div className="flex gap-4 mb-6">
{['CUSTOMER', 'ADMIN', 'STAFF'].map((r) => (
<button
key={r}
type="button"
onClick={() => setRole(r)}
className={`px-4 py-2 rounded-lg font-medium transition ${
role === r ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'
}`}
>
{r}
</button>
))}
</div>

<form onSubmit={handleLogin} className="space-y-4">
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Email"
className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
required
/>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Password"
className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
required
/>
<button
type="submit"
className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
>
Login
</button>
</form>

<p className="text-center text-green-800 mt-6 text-sm">
Don't have an account?{' '}
<span
onClick={() => navigate('/register')}
className="text-green-600 cursor-pointer hover:underline"
>
Sign Up
</span>
</p>
</div>

{/* Right side: Image */}
<div className="hidden md:block md:w-1/2">
<img
src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/18155348/sky-turf.jpg"
alt="Turf"
className="w-full h-full object-cover"
/>
</div>
</div>
</div>
);
};

export default Login;