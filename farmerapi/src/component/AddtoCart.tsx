import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function AddtoCart() {
  const { userId } = useParams<{ userId: string }>();
  const userIdNumber = Number(userId);

  type Cart = {
    cart_id: number;
    user_id: number;
    product_id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    typeofPrd: string;
  };

  const [carts, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/cart/new/get-all')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        // Filter carts based on userId
        const filteredCarts = data.results.filter((cart: Cart) => cart.user_id === userIdNumber);
        setCart(filteredCarts);
      })
      .finally(() => console.log('Fetched successfully'));
  }, [userIdNumber]);

  const deleteSingleCart = async (cartId: number) => {
    const url = `https://farmingapi.rajkumar-v2022cse.workers.dev/cart/delete/${cartId}`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete resource');
        }
        // Handle success
        console.log('Resource deleted successfully');
        // Remove the deleted cart item from the state
        setCart((prevCarts) => prevCarts.filter((cart) => cart.cart_id !== cartId));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting resource:', error);
      });
  };

  const clearall = (userId: number) => {
    const url = `https://farmingapi.rajkumar-v2022cse.workers.dev/cart/delete/user/${userId}`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete resource');
        }
        // Handle success
        console.log('Resource deleted successfully');
        // Remove the deleted cart items from the state
        setCart((prevCarts) => prevCarts.filter((cart) => cart.user_id !== userId));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting resource:', error);
      });
  };

  const buyItems = async () => {
    
    try {
      // Iterate through the cart items and insert each item into the orders table
      for (const cartItem of carts) {
        const response = await fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/orders/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: cartItem.user_id,
            product_id: cartItem.product_id,
            name: cartItem.name,
            description: cartItem.description,
            quantity: cartItem.quantity,
            total_price: cartItem.price * cartItem.quantity,
            typeofPrd: cartItem.typeofPrd,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to insert order into the database');
        }
      }

      // Clear the cart after successfully buying the items
      await clearall(userIdNumber);

      // Notify the user about the successful purchase
      alert('Items successfully bought!');
    } catch (error) {
      console.error('Error buying items:', error);
      alert('Failed to buy items. Please try again later.');
    }
  };

  const navigate = useNavigate();

  const back = () => {

    navigate(`/product/${userId}`);

  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center min-h-screen gap-12'>
      <h1 className='text-2xl font-bold capitalize'>Add to Cart</h1>

      <div className='flex flex-col justify-center items-center w-full  gap-8 flex-wrap'>
      {/* Display cart records */}
      {carts.map((cart) => (
        <div key={cart.cart_id} className="flex lg:flex-row w-full lg:items-center lg:justify-around  border rounded-2xl lg:max-w-6xl flex-col gap-4 shadow-md max-w-60 p-4">
          

          <div className='flex lg:flex-col lg:gap-8 lg:h-48 lg:items-center lg:justify-center flex-row justify-between'>
            <span className='font-semibold'>NAME</span>
            <span>{cart.name}</span>
          </div>

          <div className='flex lg:flex-col lg:gap-8 lg:h-48 lg:items-center lg:justify-center flex-row justify-between' >
            <span className='font-semibold'>QUANTITY</span>
            <span>{cart.quantity}</span>
          </div>

          <div className='flex lg:flex-col lg:gap-8 lg:h-48 lg:items-center lg:justify-center flex-row justify-between' >
            <span className='font-semibold'>PRICE</span>
            <span>{cart.price}</span>
          </div>

          <div className='flex lg:flex-col lg:gap-8 lg:h-48 lg:items-center lg:justify-center flex-row justify-between' >
            <span className='font-semibold'>TYPE</span>
            <span>{cart.typeofPrd}</span>
          </div>
          
          <div className='flex lg:flex-col lg:gap-8 lg:h-48 lg:items-center lg:justify-center flex-row justify-between' >
            <span className='font-semibold'>CART ID</span>
            <span>{cart.cart_id}</span>
          </div>

          <div className='flex lg:flex-col lg:gap-8 lg:h-48 lg:items-center lg:justify-center flex-row justify-between'>

            <span className='font-semibold'>Cancel</span>

          <button onClick={() => deleteSingleCart(cart.cart_id)} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x text-red-500 size-5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
          

          </div>

        </div>
      ))}

    

{ 
  carts.length > 0 ? (
    <button onClick={buyItems} className='bg-yellow-500  px-16 py-2 rounded-2xl border border-yellow-600 hover:bg-yellow-400 text-white mb-2'>Buy</button>
  ) : (
    <div className='flex flex-col items-center justify-center gap-6'>
    <p>No Carts Available</p>
    <button onClick={() => back()} className='text-black px-12 py-2  border border-red-600 hover:bg-red-500 hover:text-white' >Shop</button> 
    </div>
  )
}



        
      

       
      


      </div>

    </div>
  );
}
