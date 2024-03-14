import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditorDeleteProducts() {

    const productId = useParams();
    const product_id = Number(productId.product_id);
    const userId = Number(productId.sellerId);
    // console.log(product_id);  
    // console.log(productId.sellerId);




    useEffect(() => {
      // Fetch product details based on productId from the database
      const fetchProductDetails = async () => {
          try {
              const response = await axios.get(`/api/products/${product_id}`);
              const product = response.data.results[0]; // Assuming the response contains product details in the results array
              // Set state variables with product details
              setName(product.name);
              setDescription(product.description);
              setPrice(product.price);
              setQuantity(product.quantity);
              setTypeofPrd(product.typeofPrd);
              setImage(product.image);
          } catch (error) {
              console.error('Error fetching product details:', error);
          }
      };
  
      fetchProductDetails(); // Call the fetchProductDetails function
  }, [product_id]);









      
   const navigate = useNavigate();


    const [name,setName] = useState<string>('');
    const [description,setDescription]=useState<string>('')
    const [price,setPrice] = useState<number>();
    const [quantity,setQuantity] = useState<number>();
    const [typeofPrd,setTypeofPrd] = useState<string>('');
    const [image,setImage] = useState<string>('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        try {
            const response = await axios.put('/api/products/new/update', {
                product_id,                                       
                name,
                description,
                price,
                quantity,
                typeofPrd,
                image

            });
    
            console.log(response.data);
            alert('Successfully updated');

            navigate(`/products/${userId}`);

        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error, display error message to the user
            alert('Failed to update product');
        }    


    }
    
    const navback = () => {

        navigate(`/products/${userId}`);

    }


  return (


    <div className="p-4 flex flex-col items-center justify-center h-screen w-full ">
  <h1 className="text-xl font-bold mb-4">Edit or Delete</h1>

    <div className=' w-full flex flex-col items-center justify-center max-w-6xl h-5xl bg-gray-100 rounded-2xl'>

  <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full mt-4 mb-4  max-w-2xl">

    <div className='flex flex-col items-center justify-center gap-8 w-full'>

    <input type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                        <input type="text" placeholder="Enter product Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                        <input type="number" placeholder="Enter Product quantity" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                        <input type="number" placeholder="Enter product price" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                        <select value={typeofPrd} onChange={(e) => setTypeofPrd(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                            <option value="">Select type of product</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Fruit">Fruit</option>
                            <option value="Seed">Seed</option>
                        </select>
                        <input type="text" placeholder="Enter product Image as https url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />


    <div className='flex flex-row items-center justify-around w-full'>

    <button type="submit" className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>

    <button className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => navback()}>Cancel</button>

    </div>

    </div>

  </form>
  
  

  </div>

  </div>



  )
}
