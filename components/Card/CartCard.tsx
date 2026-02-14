import { MinusCircle, PlusCircle } from 'lucide-react'
import React from 'react'

function CartCard() {
  const url = `https://upload.wikimedia.org/wikipedia/commons/c/cc/Burger_King_2020.svg`

  return (
    <div className=' max-w-3xl lg:max-w-4xl mx-auto bg-zinc-100 mt-4 
                    flex  sm:flex-row 
                    items-center gap-6 
                    p-4 sm:p-6 
                    rounded-lg shadow'>

      {/* Image */}
      <div className='w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center'>
        <img
          src={url}
          alt="burger"
          className='w-full h-full object-contain'
        />
      </div>

      {/* Content */}
      <div className='flex flex-col gap-2 flex-1 text-center sm:text-left'>
        <h2 className='text-lg sm:text-xl font-semibold'>Burger</h2>
        <p className='text-gray-600 text-base sm:text-lg'>₹100</p>
  </div>
        {/* Quantity Controls */}
        <div className='flex items-center justify-center sm:justify-start 
                        gap-4 bg-white px-4 py-2 rounded-md w-fit shadow-sm'>
          <MinusCircle className='cursor-pointer text-red-500' />
          <span className='font-medium text-lg'>1</span>
          <PlusCircle className='cursor-pointer text-green-600' />
        </div>
    
    </div>
  )
}

export default CartCard