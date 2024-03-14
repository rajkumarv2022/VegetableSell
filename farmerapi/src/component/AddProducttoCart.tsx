import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddtoButton from './AddtoButton';

export default function AddProducttoCart({}) {
  const prdId = useParams();
  const user_id = Number(prdId.userId);
  const prd_id = Number(prdId.productId);

  type product = {
    //product_id	seller_id	name	description	price	quantity	typeofPrd
    product_id: number;
    seller_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    typeofPrd: string;
  };

  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qnty, setQnty] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    fetch(`https://farmingapi.rajkumar-v2022cse.workers.dev/products/${prd_id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.results))
      .finally(() => setLoading(false));
  }, [prd_id]);

  useEffect(() => {
    if (products.length > 0) {
      // Calculate total price based on quantity and price
      setTotalPrice(products[0].price * qnty);
    }
  }, [qnty, products]);

  const handleInc = (maxQnty: number) => {
    if (qnty >= maxQnty) {
      alert(`You can buy only up to ${maxQnty} products`);
    } else {
      setQnty(qnty + 1);
    }
  };

  const handleDec = () => {
    if (qnty <= 0) {
      setQnty(0);
    } else {
      setQnty(qnty - 1);
    }
  };

  return (



    <div className='flex flex-col items-center justify-center w-full  h-screen gap-y-8 bg-gray-100'>
      <h1 className='text-2xl font-semibold'>ADD TO CART PAGE</h1>

      <div className='flex flex-col items-center  w-full max-w-4xl h-full max-h-80 border  justify-center bg-white rounded-2xl overflow-clip'>

      <div id="item1" className="flex flex-col py-4 px-4  shadow-md   gap-8 w-full max-w-4xl h-full max-h-80 justify-center flex-wrap">

        <div id="first-row" className='flex flex-row items-center justify-between font-semibold flex-wrap'>

          <span>PRODUCT NAME </span> <span>PRODUCT DESCRIPTION</span> <span>PRODUCT QUANTITY</span> <span>PRODUCT PRICE</span>

        </div>


        {loading && <h1 className="text-2xl text-green-600 text-center">Loading...</h1>}
        {products.map((product) => (
          <div key={product.product_id} className='flex flex-col gap-16 justify-between flex-wrap'>

            <div className="flex flex-row items-center justify-between flex-wrap">

            <h1>{product.name}</h1>

            <p className='ml-10'>{product.description}</p>

            <div className='flex flex-row justify-between mr-14 gap-6 flex-wrap'>
            <p className='inline'>{product.quantity}</p>
            <button onClick={() => handleInc(product.quantity)}>+</button>
            <span>{qnty}</span>
            <button onClick={() => handleDec()}>-</button>
            </div>

            <p>{totalPrice}</p>

            </div>

           
          <div className='flex flex-row items-around justify-around flex-wrap'>

            <span className='border border-white bg-black hover:bg-gray-600 transition-all duration-500 text-white py-2 px-4 rounded-lg'>
            <AddtoButton prd_id={product.product_id} userId={user_id}/>
            </span>

            <Link to={`/product/${user_id}`}>

            <button className='border border-red-500 px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all duration-500'>Cancel</button>

            </Link>

          </div>

          </div>
        ))}

      </div>

      </div>

      </div>
    
  
  );
}
