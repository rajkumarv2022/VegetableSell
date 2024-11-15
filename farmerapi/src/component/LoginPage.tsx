import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const checked = isSeller ? 1 : 0;

      const response = await fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/users/new/user_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, checked })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data != null && data !== 'not loged in') {
        setLoading(false);
        isSeller ? setUserId(data.results[0].user_id) : setUserId(data.results[0].user_id);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (userId) {
    const redirectUrl = isSeller ? `/products/${userId}` : `/product/${userId}`;
    navigate(redirectUrl);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: "url('https://rare-gallery.com/uploads/posts/4600032-countryside-harvest-agriculture-farm-nature-field.jpg')"}}>
      <div className="bg-white bg-opacity-75 rounded-lg shadow-xl p-10">
        <h1 className="text-3xl font-semibold mb-4 text-center">Login Page</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <label className="ml-2 text-gray-700">Seller Account</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}