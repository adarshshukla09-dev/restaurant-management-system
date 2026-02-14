import React from 'react'
import CartCard from './CartCard'
import { Button } from '../ui/button'

function CartComp() {
  return (
    <div className='max-w-8xl mx-auto flex flex-col '>
      <div className=' lg:grid lg:grid-cols-3'>
  <CartCard />
  <CartCard />
  <CartCard />
  <CartCard />
  <CartCard />
  <CartCard />
  <CartCard />
  <CartCard />
  <CartCard />
  </div>
  <div className='mt-auto mx-auto  p-4'>
    <Button className='w-full md:w-[90%]   bg-green-900'>
      buy now
    </Button>
  </div>
</div>
  )
}

export default CartComp
