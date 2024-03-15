import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderHistoryMangement() {

    const { order_id } = useParams<{ order_id: string }>();
    const orderId = Number(order_id);

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

    useEffect(() => {
        fetch(`https://farmingapi.rajkumar-v2022cse.workers.dev/orders/${orderId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                setOrders(data.results);
            })
            .finally(() => setLoading(false));
    }, [orderId]);

    const clearbyId = () => {
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
    };

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center gap-16'>
            <h1 className='text-2xl font-bold'>Order History Management</h1>

            <div className='w-full max-w-4xl bg-gray-100 border rounded-2xl shadow-md '>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col items-center justify-center w-84  gap-4'>
                    {orders.map((order) => (
                        <div className='flex flex-col w-full gap-8 items-start max-w-80' key={order.order_id}>

                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>Order ID</span>         <span> {order.order_id}     </span>   </div> 
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>User ID</span>          <span> {order.user_id}      </span>   </div> 
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>Product ID</span>       <span> {order.product_id}   </span>   </div>
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'> Name</span>            <span> {order.name}         </span>   </div>
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'> Description</span>     <span> {order.description}  </span>   </div>
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>Quantity</span>         <span> {order.quantity}     </span>   </div>
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>Total Price</span>      <span> {order.total_price}  </span>   </div>
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>Type of Product</span>  <span> {order.typeofPrd}    </span>   </div>
                            <div className='flex flex-row items-start justify-between w-full gap-8'>   <span className='font-semibold'>Order Date</span>       <span> {order.order_date}   </span>   </div> 

                        </div>
                    ))}
                    <button onClick={clearbyId} className='bg-red-600 px-4 py-2 text-white rounded-xl hover:bg-red-500'>Clear Order</button>
                </div>
            )}

            </div>

        </div>

    );
}
