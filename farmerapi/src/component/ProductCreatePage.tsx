import axios from 'axios';
import  { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductCreatePage() {
  const { user_id } = useParams();
  const userId = Number(user_id);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [typeofPrd,setTypeofPrd] = useState('');
  const [image,setImage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://farmingapi.rajkumar-v2022cse.workers.dev/products/new', {
        seller_id: userId, // Use seller_id instead of userId
        name,
        description,
        price,
        quantity,
        typeofPrd,
        image
      });

      console.log(response.data); // Log the response from the server

      alert('Successfully registered');

      // After successful submission, navigate back to the products page
      navigate(`/products/${userId}`);
    } catch (error) {
      console.error('Error Create:', error);
      // Handle error, display error message to the user
    }
  };

  const handleBack = () => {
    // Navigate back to the products page without submitting the form
    navigate(`/products/${userId}`);
  };

  return (
<div className="flex justify-around items-center h-screen w-full">
  <div className="flex flex-col p-4 w-full max-w-4xl bg-gray-100 justify-center items-center">
    <h1 className="text-xl font-bold mb-4">Product Creation</h1>
    <form onSubmit={handleSubmit} className="space-y-4 gap-2">
      <input type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      <input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      <input type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      <input type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      <select value={typeofPrd} onChange={(e) => setTypeofPrd(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
  <option value="">Select type of product</option>
  <option value="Vegetable">Vegetable</option>
  <option value="Fruit">Fruit</option>
  <option value="Seed">Seed</option>
</select>

<input type="text" placeholder="Enter Image https url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />


      <div className='flex flex-row items-center justify-around'>

      <button type="submit" className="bg-blue-500 text-white py-3 px-9 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
      
      <button onClick={handleBack} className=" bg-gray-500 text-white py-3 px-11 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
      </div>
      
      
    </form>
    
   
  </div>
</div>


  );
}
