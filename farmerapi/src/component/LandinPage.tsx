import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
      <p className="text-lg mb-12">Explore our platform for amazing deals and products!</p>
      <div className="flex">
        <Link to="/login" className="mr-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
