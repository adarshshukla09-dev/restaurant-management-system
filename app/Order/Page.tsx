"use client"

import AllOrder from '@/components/orders/AllOrder'
import { useEffect, useState } from 'react'

function Page() {
  const [tableId, setTableId] = useState<string | null>(null)
 useEffect(() => {
    const storedTableId = localStorage.getItem("tableId")
    setTableId(storedTableId)
  }, [])
console.log(tableId)
  return (
    <div>
     {tableId &&  <AllOrder tableId={tableId} />}
    </div>
  )
}

export default Page
