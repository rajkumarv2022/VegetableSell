
import  { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


interface Props {
  userId: string;
}

export default function ProductCart({ userId }: Props) {
  type Cart = {
    user_id: number;
    product_id: number;
    seller_id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    typeofPrd: string;
    image:string;
  };

  const [products, setProducts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<Cart[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/products/new/get-all')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setFilter(data.results); // Initialize filter with all products
      })
      .finally(() => setLoading(false));
  }, []);

  const navigateToOrderPage = () => {
    navigate(`/product/${userId}/history`);
  };

  const AddtoCartpage = (prd_id: number, userId: string) => {
    navigate(`/product/${Number(userId)}/${prd_id}/addtocart`);
  };

  useEffect(() => {
    // Filter products based on search term
    const filteredProducts = products.filter((order) =>
      order.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filteredProducts);
  }, [search, products]);


  const allPrd = () => {

      setFilter(products);

  }

  const vegPrd = () => {

       setFilter(products.filter((order) => order.typeofPrd === 'Vegetable'));

  }

  const fruitPrd =() => {

       setFilter(products.filter((order) => order.typeofPrd === 'Fruit'));    

  }

  const seedPrd = () => {

       setFilter(products.filter((order) => order.typeofPrd === 'Seeds'));

  }


  return (
    <div>

      <div id='menubar' className='flex flex-col gap-8 items-center justify-between  py-4'>
        <div className='flex flex-col gap-8 items-center justify-between bg-white py-4 fixed right-0 left-0 top-0 w-[100%]'>
          <div id='first_row' className='max-w-5xl flex flex-row items-center gap-4 justify-between w-full'>
          <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => {allPrd()}}>All</button>
            <div className='flex w-full flex-row items-center justify-center gap-4'>
              <div className='md:flex md:w-full md:max-w-2xl md:flex-row md:items-center md:justify-center md:overflow-clip border bg-white w-full flex flex-row'>
                <span className='rou cursor-pointer border border-t-0 border-l-0 border-b-0 px-4 py-2 hover:bg-gray-100' title='Search'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='25' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-search hidden md:block '>
                    <circle cx='11' cy='11' r='8' />
                    <path d='m21 21-4.3-4.3' />
                  </svg>
                </span>
                <input className='w-full px-4 py-2 outline-none md:block hidden' type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <Link to='/login'>
            <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden'>Logout</button>
            </Link>
          </div>

          <div id='second_row' className='max-w-5xl flex flex-row items-center gap-4 justify-between w-full'>
          <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => {vegPrd()}}>Vegetables</button>
          <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => {fruitPrd()}}>Fruits</button>
          <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => {seedPrd()}}>Seeds</button>
          <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden'>Profile</button>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <div className='flex flex-row items-center justify-around w-full text-center gap-4'>
          <button onClick={navigateToOrderPage} className='mt-4 border-blue-500 border px-4 py-2 hover:bg-blue-500 hover:text-white'>
            Order History
          </button>
        
          <Link to={`/product/${userId}/viewcart`}>
            <button className='mt-4 border-blue-500 border px-6 py-2 hover:bg-blue-500 hover:text-white'>View Cart</button>
          </Link>
        </div>
        <div id='item1' className='flex flex-wrap py-4 items-center justify-center'>
          {loading && <h1 className='text-2xl text-green-600 text-center'>Loading...</h1>}

          {filter.length === 0 && !loading && <h1 className='text-2xl text-red-600 text-center'>No products found</h1>}
          {filter.map((product) => (

              

            <div key={product.product_id} className='bg-white flex flex-col items-center justify-center gap-6 border py-8 px-8 rounded-2xl shadow-md m-4'>
              <div id='img' className='border shadow'>
                <img src={product.image} className='h-52 w-52' />
              </div>
              <div id='item-name' className='flex flex-col'>
                <p className='text-gray-500'>{product.name}</p>
              </div>
              <div className='flex flex-col gap-4 justify-center items-center'>
                <div id='offer'>
                  <p className='text-red-500'>Get it for &#8377;{product.price}!</p>
                </div>
                <div id='buy' className='flex flex-row gap-2'>
                  <button onClick={() => AddtoCartpage(product.product_id, userId)} className='text-red-400 border border-red-500 py-2 px-8 rounded-2xl hover:bg-red-500 hover:text-white'>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
