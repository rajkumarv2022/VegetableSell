import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


export default function OrderHistory() {

  const { user_id } = useParams();
  const userId = Number(user_id);
  const navigate = useNavigate();

  const back = () => {
    navigate(`/product/${userId}`);
  };

  // Function to clear all orders for the user
  const clearAll = () => {
    fetch(`https://farmingapi.rajkumar-v2022cse.workers.dev/orders/delete/user/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, navigate back to the product page
          navigate(`/product/${userId}`);
          alert('All orders cleared successfully');
        } else {
          // If deletion fails, show an error message
          alert('Failed to clear all orders');
        }
      })
      .catch((error) => {
        console.error('Error clearing all orders:', error);
        alert('Failed to clear all orders. Please try again later.');
      });
  };

  type Order = {
    order_id: number;
    user_id: number;
    product_id: number;
    name: string;
    description: string;
    quantity: number;
    total_price: number;
    order_date: string;
    typeofPrd: string;
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,setSearch] = useState<string>('');
  const [filter,setFilter] = useState<Order[]>([]);

  useEffect(() => {
    fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/orders/new/get-all')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        // Filter products based on sellerId from props
        const filteredProducts = data.results.filter((order: Order) => order.user_id === userId);
        setOrders(filteredProducts);
      })
      .finally(() => setLoading(false));
  }, [userId]);


useEffect(() => {

  const filteredOrder = orders.filter((order) => {

    return order.name.toLowerCase().includes(search.toLowerCase());

  },[search])
  setFilter(filteredOrder);

},[search])


  const clearbyId = (orderId:number) => {
    // Send a DELETE request to delete the order by its ID
    fetch(`https://farmingapi.rajkumar-v2022cse.workers.dev/orders/delete/${orderId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                // If deletion is successful, update the orders state to remove the deleted order
                setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
                alert('Order successfully deleted');
            } else {
                // If deletion fails, show an error message
                alert('Failed to delete order');
            }
        })
        .catch((error) => {
            console.error('Error deleting order:', error);
            alert('Failed to delete order. Please try again later.');
        });
      }


  return (

    
    <div className="h-full flex flex-col bg-gray-100">
    <div id="content-page" className="h-full w-full flex flex-col gap-8">
      <div className='flex flex-row items-center justify-around mt-8 w-full text-white flex-wrap'>
        <button onClick={back} className='bg-green-500 px-10 py-2 hidden md:block'>Back</button>
        <div className='flex flex-row w-full max-w-lg py-2  h-full'>
          <input type="text" placeholder='Search with Product name' className='text-black w-full max-w-lg outline-none px-4 h-10 border border-green-500' value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className='h-10 border border-green-500 px-2 text-black'>Search</button>
        </div>
        <button onClick={clearAll} className='bg-green-500 py-2 px-6'>Clear All</button>
      </div>
      <div className='flex flex-col items-center justify-center font-bold text-2xl w-full'>
        <h1 className='items-center justify-center font-bold text-2xl'>Order History</h1>
      </div>
      <div className='mt-8 md:block hidden'>
        <table className="w-full border-collapse">
          <thead>
            <tr className='bg-gray-200 text-center'>
              <th className="border px-4 py-2">PRODUCT NAME</th>
              <th className="border px-4 py-2">PRODUCT DESCRIPTION</th>
              <th className="border px-4 py-2">QUANTITY</th>
              <th className="border px-4 py-2">PRICE</th>
              <th className="border px-4 py-2">CANCEL</th>
              <th>MORE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td  className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              search.length > 0 ? (
                filter.map((order) => (
                  <tr key={order.order_id} className='text-center'>
                    <td className="border px-4 py-2">{order.name}</td>
                    <td className="border px-4 py-2">{order.description}</td>
                    <td className="border px-4 py-2">{String(order.quantity)}</td>
                    <td className="border px-4 py-2">{String(order.total_price)}</td>
                    <td className="border px-4 py-2 text-center">
                      <button onClick={(e) => e.preventDefault()}><button onClick={() => clearbyId(order.order_id)} className='text-red-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x "><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button></button>
                    </td>

                    <td>

                <Link to={`/product/${userId}/history/${order.order_id}`}>
                <button>View...</button>
                </Link>
                </td>

                  </tr>
                ))
              ) : (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="border px-4 py-2">{order.name}</td>
                    <td className="border px-4 py-2">{order.description}</td>
                    <td className="border px-4 py-2">{String(order.quantity)}</td>
                    <td className="border px-4 py-2">{String(order.total_price)}</td>
                    <td className="border px-4 py-2">
                      <button onClick={(e) => e.preventDefault()}><button onClick={() => clearbyId(order.order_id)} className='text-red-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x "><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button></button>
                    </td>
                   <td>

                    <Link to={`/product/${userId}/history/${order.order_id}`}>
                   <button>View...</button>
                   </Link>
                   </td>
                    
                    
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

         <div className='mt-8 md:hidden block'>

         <table className="w-full border-collapse">
          <thead>
            <tr className='bg-gray-200 text-center'>
              <th className="border px-4 py-2">PRODUCT NAME</th>
              <th className="border px-4 py-2">CANCEL</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td  className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              search.length > 0 ? (
                filter.map((order) => (
                  <tr key={order.order_id} className='text-center'>
                    <td className="border px-4 py-2">{order.name}</td>
                    <td className="border px-4 py-2 text-center">
                      <button onClick={(e) => e.preventDefault()}><button onClick={() => clearbyId(order.order_id)} className='text-red-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x "><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button></button>
                    </td>
                    <td>More</td>
                  </tr>
                ))
              ) : (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="border px-4 py-2">{order.name}</td>
                    <td className="border px-4 py-2">
                      <button onClick={(e) => e.preventDefault()}><button onClick={() => clearbyId(order.order_id)} className='text-red-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x "><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button></button>
                    </td>
                   <td>

                    <Link to={`/product/${userId}/history/${order.order_id}`}>
                   <button>View...</button>
                   </Link>
                   </td>
                    
                    
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>

         </div>

    </div>
  </div>
  

  );
}
