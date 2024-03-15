import  { useEffect, useState } from 'react';

export default function Test() {
  type Product = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    is_seller: number;
    image: string;
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://farmingapi.rajkumar-v2022cse.workers.dev/products/new/get-all')
      .then((response) => response.json())
      .then((data) => setProducts(data.results))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      {products.map((product, index) => (
        <div key={index}>
          <img src={product.image} alt={`Product ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
