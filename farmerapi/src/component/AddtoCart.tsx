import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div className='h-screen w-full flex flex-col items-center justify-start gap-4 bg-gray-100'>
      <h1 className='text-4xl font-bold capitalize'>Add to Cart</h1>

      <div className='flex flex-col justify-center items-center h-full w-full gap-8 flex-wrap bg-gray-100'>
      {/* Display cart records */}
      {carts.map((cart) => (
        <div key={cart.cart_id} className="flex flex-row w-full items-center justify-around bg-white border rounded-2xl max-w-6xl flex-wrap shadow-md">

          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap'>
            <span className='font-semibold'>NAME</span>
            <span>{cart.name}</span>
          </div>

          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap' >
          <span className='font-semibold'>DESCRIPTION</span>
          <span>{cart.description}</span>
          </div>

          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap' >
            <span className='font-semibold'>QUANTITY</span>
          <span>{cart.quantity}</span>
          </div>

          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap' >
            <span className='font-semibold'>PRICE</span>
          <span>{cart.price}</span>
          </div>

          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap' >
            <span className='font-semibold'>TYPE</span>
          <span>{cart.typeofPrd}</span>
          </div>
          
          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap' >
            <span className='font-semibold'>CART ID</span>
          <span>{cart.cart_id}</span>
          </div>

          <div className='flex flex-col gap-8 h-48 items-center justify-center flex-wrap'>

            <span className='font-semibold'>Cancel</span>

          <button onClick={() => deleteSingleCart(cart.cart_id)} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x text-red-500 size-5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
          

          </div>

        </div>
      ))}

    

 
        <button onClick={buyItems} className='bg-green-500 px-16 py-2 rounded-2xl border border-green-700 hover:bg-green-400 text-white mb-2'>Buy</button>

      </div>

    </div>
  );
}
