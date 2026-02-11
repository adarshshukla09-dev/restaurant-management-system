import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function page() {
  return (
    <div className='min-h-screen w-7xl justify-center items-center'>
        <Link href="/menu">
      <Button>Menu</Button></Link>
    </div>
  )
}

export default page

