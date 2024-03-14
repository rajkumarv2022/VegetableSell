
import Button from './Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div id='menubar' className='flex flex-col gap-8 items-center justify-between bg-white py-4'>
      <div className='flex flex-col gap-8 items-center justify-between bg-white py-4 fixed right-0 left-0 top-0 w-[100%]'>
        <div id='first_row' className='max-w-5xl flex flex-row items-center gap-4 justify-between w-full'>
          <Button name={'All'} />
          <div className='flex w-full flex-row items-center justify-center gap-4'>
            <div className='flex w-full max-w-2xl flex-row items-center justify-center overflow-clip border bg-white'>
              <span className='rou cursor-pointer border border-t-0 border-l-0 border-b-0 px-4 py-2 hover:bg-gray-100' title='Search'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='25' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-search'>
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.3-4.3' />
                </svg>
              </span>
              <input className='w-full px-4 py-2 outline-none' type='text' placeholder='Search' />
            </div>
          </div>
          <Link to='/login'>
            <Button name={'Logout'} />
          </Link>
        </div>
        <div id='second_row' className='max-w-5xl flex flex-row items-center gap-4 justify-between w-full'>
          <Button name={'Vegetables'} />
          <Button name={'Fruits'} />
          <Button name={'Seeds'} />
          <Button name={'Farmer'} />
        </div>
      </div>
    </div>
  );
}
