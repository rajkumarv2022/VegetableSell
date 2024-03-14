// components/AddProductForm.tsx
import React, { useState } from 'react';

// Define Product type in a separate file, e.g., types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}


interface Props {
  onAddProduct: (product: Partial<Product>) => void;
}

const AddProductForm: React.FC<Props> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Partial<Product> = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    onAddProduct(newProduct);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
