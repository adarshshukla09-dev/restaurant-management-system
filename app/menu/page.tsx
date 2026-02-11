import AllItem from '@/components/AllItem'
import {CreateMenuComp} from "@/components/CreateItems"
import React from 'react'
function page() {
  return (
      <div className="p-8">
      <h1 className="text-2xl text-center font-bold mb-6">Create Menu Item</h1>
      <CreateMenuComp/>
    </div>
  )
}

export default page
