import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-md p-10 border-2 border-gray-200 shadow-md">
        <h1 className="text-5xl font-bold mb-8">Welcome to Farmer App</h1>
        <p className="text-2xl mb-12 text-gray-700">Explore our priceless cost of food market</p>
        <div className="flex space-x-4">
          <Link to="/login">
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
    </div>
  );
}