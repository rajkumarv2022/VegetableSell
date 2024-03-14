import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import ProductCart from './ProductCart';

export default function ProductList() {
  const { user_id } = useParams<{ user_id: string }>();

  return (
    <div className='h-full flex flex-col bg-gray-50 items-center justify-end'>
      <div className='h-full w-full items-center justify-center'>
        <div className='mt-28 flex items-center h-full  justify-center'>
          <ProductCart userId={(user_id as unknown) as string} />
        </div>
      </div>
    </div>
  );
}

// userId={(user_id as unknown) as string}
