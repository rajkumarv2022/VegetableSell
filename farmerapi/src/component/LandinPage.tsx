import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: "url('https://rare-gallery.com/uploads/posts/4600032-countryside-harvest-agriculture-farm-nature-field.jpg')"}}>
      <div className="bg-white bg-opacity-50 rounded p-10">
        <h1 className="text-5xl font-bold mb-8 text-green-800">Welcome to Farmer App</h1>
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