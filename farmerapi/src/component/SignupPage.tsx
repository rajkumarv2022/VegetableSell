import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      setError('');
      if (!username || !email || !password) {
        throw new Error('Please fill out all fields.');
      }

      const response = await axios.post('https://farmingapi.rajkumar-v2022cse.workers.dev/users/new', {
        username,
        email,
        password,
        is_seller: isSeller ? 1 : 0
      });

      console.log(response.data);
      alert('Successfully registered');

    } catch (e) {
      console.error('Error signing up');
      setError(error);
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
    <div className="flex flex-col w-full h-full max-w-96 max-h-[600px] items-center justify-center gap-4 border-2 border-gray-400 shadow-md rounded-md ">
        <h1 className="text-3xl font-semibold mb-4">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-8">
          {error && <div className="text-red-500">{error}</div>}

          <div className='flex flex-col w-full max-w-80 gap-8'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-700 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-700 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-700 outline-none"
            />

            <div>
              <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
                className="form-checkbox h-5 w-5 border-2 border-gray-700"
              />
              <span className="ml-2 text-gray-700">Create Seller Account</span>
            </label>
            </div>
          </div>

          <div className='flex flex-col w-full max-w-80 gap-4'>
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-600"
            >
              Signup
            </button>

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600"
            >
              Signup with Google
            </button>

            <div className="felx flex-row w-full">  
              <p className='flex flex-row gap-2 w-full max-w-72 ml-6'> <span>Already have an account click</span> <Link to="/login" className='text-blue-400'>Login</Link> </p>
            </div>
          </div>         
        </form>
      </div>
    </div>
  );
}