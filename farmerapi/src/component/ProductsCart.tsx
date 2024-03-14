import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface Props {
    sellerId: string;
}

export default function ProductsCart({ sellerId }: Props) {
    type Product = {
        product_id: number;
        seller_id: number;
        name: string;
        description: string;
        price: number;
        quantity: number;
        typeofPrd: string;
        image:string;
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter,setFilter] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/products/new/get-all')
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                const filteredProducts = data.results.filter((product: Product) => product.seller_id === Number(sellerId));
                setProducts(filteredProducts);
            })
            .finally(() => setLoading(false));
    }, [sellerId]);

    const deleteProduct = (prd_id: number) => {
        const url = `https://farmingapi.rajkumar-v2022cse.workers.dev/delete/${prd_id}`;
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
                setProducts((prevProducts) => prevProducts.filter((prd) => prd.product_id !== prd_id));
            })
            .catch((error) => {
                console.error('Error deleting resource:', error);
            });
    };

    const deleteAll = () => {
        const url = `https://farmingapi.rajkumar-v2022cse.workers.dev/delete/all/${Number(sellerId)}`;
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
                alert('All Products are Deleted');
                setProducts([]);
            })
            .catch((error) => {
                console.error('Error deleting resource:', error);
            });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
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

  };

  const vegPrd = () => {

    setFilter(products.filter((order) => order.typeofPrd === 'Vegetable'));

};
    const fruitPrd = () => {

      setFilter(products.filter((order) => order.typeofPrd === 'Fruit'))

    }

    const seedPrd =() => {

     setFilter(products.filter((order) => order.typeofPrd==='Seed'))

    }

    return (
        <div className='bg-gray-100'>

            <div id='menubar' className='flex flex-col gap-8 items-center justify-between bg-white py-4'>
                <div className='flex flex-col gap-8 items-center justify-between bg-white py-4 fixed right-0 left-0 top-0 w-[100%]'>
                    <div id='first_row' className='max-w-5xl flex flex-row items-center gap-4 justify-between w-full'>
                    <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => allPrd()}>All</button>
                        <div className='flex w-full flex-row items-center justify-center gap-4'>
                            <div className='md:flex md:w-full md:max-w-2xl md:flex-row md:items-center md:justify-center md:overflow-clip md:mt-0 border bg-white flex flex-row w-full'>
                                <span className='rou cursor-pointer border border-t-0 border-l-0 border-b-0 px-4 py-2 hover:bg-gray-100' title='Search'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='25'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        className='lucide lucide-search'
                                    >
                                        <circle cx='11' cy='11' r='8' />
                                        <path d='m21 21-4.3-4.3' />
                                    </svg>
                                </span>
                                <input
                                    className='w-full px-4 py-2 outline-none'
                                    type='text'
                                    placeholder='Search'
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <Link to='/login'>
                        <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden'>Logout</button>
                        </Link>
                    </div>
                    <div id='second_row' className='max-w-5xl flex flex-row items-center gap-4 justify-between w-full '>
                    <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() =>vegPrd()}>Vegetable</button>
                    <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => fruitPrd()}>Fruit</button>
                    <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden' onClick={() => seedPrd()}>Seed</button>
                    <button className='bg-green-500 px-8 py-2 text-white rounded-md sticky md:block hidden'>Profile</button>
                    </div>
                </div>
            </div>


            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-row items-center justify-around w-full text-center align-middle'>
                    <Link to='new'>
                        <button className='mt-4 border-blue-500 border px-4 py-2 hover:bg-blue-500 hover:text-white'>Create Product</button>
                    </Link>
                    <button onClick={deleteAll} className='mt-4 border-blue-500 border px-12 py-2 hover:bg-blue-500 hover:text-white'>
                        Delete All
                    </button>
                </div>
                <div id='item1' className='flex flex-wrap py-4 items-center justify-center'>
                    {loading && <h1 className='text-2xl text-green-600 text-center'>Loading...</h1>}
                    {filter.length === 0 && !loading && <p className='text-center'>No products available for this seller.</p>}
                    {filter.map((product) => (
                        <div key={product.product_id} className='bg-white flex flex-col items-center justify-center gap-6 border py-8 px-8 rounded-2xl shadow-md m-4'>
                            <Link to={`/products/${sellerId}/${product.product_id}`}>
                                <div id='img' className='border shadow'>
                                    <img src={product.image} className='h-52 w-52' />
                                </div>
                                <div className='flex flex-col gap-4 justify-center items-start'>
                                  
                                    <div className=''>
                                        <h1>{product.name}</h1>
                                    </div>
                                    <div>
                                        <p>{product.description}</p>
                                    </div>
                                    <div>
                                        <p>{product.quantity}</p>
                                    </div>
                                    <div>
                                        <p>{product.price}</p>
                                    </div>
                                    <div>
                                    <button onClick={(e) => { e.preventDefault(); deleteProduct(product.product_id); }}>Delete</button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
