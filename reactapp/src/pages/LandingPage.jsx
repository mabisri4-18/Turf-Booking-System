import React from "react";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Book Your Turf Instantly!
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Find, book, and play at the best turfs near you. Hassle-free, quick, and secure bookings.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="/login"
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book Now
            </a>
            <a
              href="/register"
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-700 transition"
            >
              Join Us
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://t3.ftcdn.net/jpg/16/91/00/66/360_F_1691006628_VNcIZyPlU3AzBx40SjpBpxEDt7zKsdPt.jpg"
            alt="Turf Booking"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

   {/* Features Section */}
<section className="py-16 px-8 md:px-20 bg-gray-50 text-center">
<h2 className="text-3xl font-bold mb-10 text-green-700">
Why Choose TurfEase?
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
);
}