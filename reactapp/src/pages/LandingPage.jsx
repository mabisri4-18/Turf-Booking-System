// import React from "react";
// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-800">

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-r from-green-600 to-emerald-500 text-white"> 
//         <div className="md:w-1/2 space-y-6">
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//             Book Your Turf Instantly!
//           </h1>
//           <p className="text-lg md:text-xl text-gray-100">
//             Find, book, and play at the best turfs near you. Hassle-free, quick, and secure bookings.
//           </p>
//           <div className="flex gap-4 mt-6">
//             <a
//               href="/login"
//               className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
//             >
//               Book Now
//             </a>
//             <a
//               href="/register"
//               className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-700 transition"
//             >
//               Join Us
//             </a>
//           </div>
//         </div>
//         <div className="md:w-1/2 mt-10 md:mt-0">
//           <img
//             src="https://t3.ftcdn.net/jpg/16/91/00/66/360_F_1691006628_VNcIZyPlU3AzBx40SjpBpxEDt7zKsdPt.jpg"
//             alt="Turf Booking"
//             className="rounded-2xl shadow-lg"
//           />
//         </div>
//       </section>

//    {/* Features Section */}
// <section className="py-16 px-8 md:px-20 bg-gray-50 text-center">
// <h2 className="text-3xl font-bold mb-10 text-green-700">
// Why Choose TurfTime?
// </h2>
// <div className="grid md:grid-cols-3 gap-10">
// <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
// <img
// src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
// alt="Easy Booking"
// className="w-16 mx-auto mb-4"
// />
// <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
// <p>Book your favorite turf in just a few clicks with our simple interface.</p>
// </div>

// <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
// <img
// src="https://img.freepik.com/free-vector/gradient-shield-with-padlock-check-mark_78370-4401.jpg?semt=ais_hybrid&w=740&q=80"
// alt="Secure Payment"
// className="w-16 mx-auto mb-4"
// />
// <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
// <p>Pay easily through our integrated and secure online payment system.</p>
// </div>

// <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
// <img
// src="https://cdn-icons-png.flaticon.com/512/711/711284.png"
// alt="24/7 Support"
// className="w-16 mx-auto mb-4"
// />
// <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
// <p>Our support team is always ready to assist you with your bookings.</p>
// </div>
// </div>
// </section>

// {/* CTA Section */}
// <section className="py-16 bg-green-600 text-center text-white">
// <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
// <p className="text-lg mb-6">Book your turf today and enjoy the best sports experience.</p>
// <a
// href="/login"
// className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
// >
// Get Started
// </a>
// </section>

// </div>
// );
// }

// pages/LandingPage.jsx
import React from "react";
import CustomerLayout from "../layouts/CustomerLayout";

export default function LandingPage() {
  return (
    <CustomerLayout>
      <div className="flex flex-col min-h-screen bg-white text-gray-800">

        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1608383/pexels-photo-1608383.jpeg?_gl=1*1da3bou*_ga*MTU1MTIwNzY4OS4xNzU5NzMxMTM4*_ga_8JE65Q40S6*czE3NTk3MzExMzckbzEkZzEkdDE3NTk3MzExOTQkajMkbDAkaDA.')",
            }}
          ></div>

          {/* Gradient + Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-600 opacity-70"></div>
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 transition-all duration-300 hover:scale-105 animate-float">
              Book Your Turf Instantly!
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-200 animate-float-slow">
              Find, book, and play at the best turfs near you — hassle-free and secure.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-transform hover:scale-110 shadow-lg hover:shadow-green-400/50"
              >
                Book Now
              </a>
              <a
                href="/register"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-transform hover:scale-110 shadow-lg hover:shadow-green-300/50"
              >
                Join Us
              </a>
            </div>
          </div>

         {/* Floating Animations */}
<style>
{`
@keyframes float {
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-8px); }
}

.animate-float {
animation: float 4s ease-in-out infinite;
}

.animate-float-slow {
animation: float 6s ease-in-out infinite;
}
`}
</style>
</section>

{/* Features Section */}
<section className="py-16 px-8 md:px-20 bg-gray-50 text-center">
<h2 className="text-3xl font-bold mb-10 text-green-700">
Why Choose TurfTime?
</h2>
<div className="grid md:grid-cols-3 gap-10">
<div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
<img
src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
alt="Easy Booking"
className="w-16 mx-auto mb-4"
/>
<h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
<p>Book your favorite turf in just a few clicks with our simple interface.</p>
</div>

<div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
<img
src="https://img.freepik.com/free-vector/gradient-shield-with-padlock-check-mark_78370-4401.jpg?semt=ais_hybrid&w=740&q=80"
alt="Secure Payment"
className="w-16 mx-auto mb-4"
/>
<h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
<p>Pay easily through our integrated and secure online payment system.</p>
</div>

<div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
<img
src="https://cdn-icons-png.flaticon.com/512/711/711284.png"
alt="24/7 Support"
className="w-16 mx-auto mb-4"
/>
<h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
<p>Our support team is always ready to assist you with your bookings.</p>
</div>
</div>
</section>

{/* CTA Section */}
<section className="py-16 bg-green-600 text-center text-white">
<h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
<p className="text-lg mb-6">Book your turf today and enjoy the best sports experience.</p>
<a
href="/login"
className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
>
Get Started
</a>
</section>

</div>
</CustomerLayout>
);
}