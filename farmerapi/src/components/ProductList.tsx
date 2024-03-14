// components/ProductList.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>Price: ${product.price}</div>
            <div>Quantity: {product.quantity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
