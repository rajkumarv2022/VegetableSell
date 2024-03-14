
import {  useParams } from 'react-router-dom'


import ProductsCart from './ProductsCart'

export default function ProductsList() {

  const {user_id} = useParams<string>();


  return (
    

    <div className='flex flex-col'>
      

        <div className='h-full w-full flex flex-row mt-36'>


            <div className='h-full w-full flex flex-col'>

                <ProductsCart sellerId={(user_id as unknown) as string} />

            </div>


        </div>


   </div>

  )
}
