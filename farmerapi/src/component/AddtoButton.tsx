import axios from 'axios';
import  { useEffect, useState } from 'react';


interface PrdidProps {
  prd_id: number;
  userId: number;
  nqnty: number;
}

  type product = {
    product_id: number;
    seller_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    typeofPrd: string;
    oqnt:number;
  };

export default function AddtoButton({ prd_id, userId, nqnty }: PrdidProps) {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://farmingapi.rajkumar-v2022cse.workers.dev/products/${prd_id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.results))
      .finally(() => setLoading(false));
  }, [prd_id]);

  const handleAddtoCart = async (
    userid: number,
    prd_id: number,
    sellerId: number,
    prdname: string,
    desc: string,
    prdprice: number,
    typeprd: string,
    oqnty:number
  ) => {
    try {
      const response = await axios.post(
        'https://farmingapi.rajkumar-v2022cse.workers.dev/cart/new',
        {
          user_id: userid,
          product_id: prd_id,
          seller_id: sellerId,
          name: prdname,
          description: desc,
          price: prdprice * nqnty, // Updated price based on quantity
          quantity: nqnty, // Updated quantity
          typeofPrd: typeprd,
          oqnt: oqnty
        }
      );

      console.log(response.data);
      alert('Successfully added to cart');
    } catch (error) {
      alert('Failed to add to cart');
      console.error('Failed to add to cart', error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && products.map((product) => (
        <button key={product.product_id} onClick={() =>
          handleAddtoCart(
            userId,
            product.product_id,
            product.seller_id,
            product.name,
            product.description,
            product.price,
            product.typeofPrd,
            product.quantity
          
          )
        }>
          Add to Cart
        </button>
      ))}
    </div>
  );
}
