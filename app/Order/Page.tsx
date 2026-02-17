"use client"

import AllOrder from '@/components/orders/AllOrder'
import { useTable } from '@/context/tableContext'
import { useEffect, useState } from 'react'

function Page() {
  const [tableId, setTableId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem("tableId")
    setTableId(id)
    
  }, [])
console.log(tableId)
  return (
    <div>
     {tableId &&  <AllOrder tableId={tableId} />}
    </div>
  )
}

export default Page
