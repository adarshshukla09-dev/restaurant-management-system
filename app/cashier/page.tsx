
import AllInfo from '@/components/Cashier/AllInfo'
import { requireStaff } from '@/server-actions/admin/auth/route'
import React from 'react'

 async function page() {
  await requireStaff("CASHIER")
  return (
    <div className='p-2 min-h-screen w-full justify-center mx-auto space-y-3 items-center '>
   <AllInfo/>
    </div>
  )
}

export default page
