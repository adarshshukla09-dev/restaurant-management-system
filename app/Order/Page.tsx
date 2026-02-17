<<<<<<< HEAD
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
=======
import React from 'react'

function Page() {
  return (
    <div>
      
>>>>>>> d165aa8531781bd49984b5655bdcb37391b68f67
    </div>
  )
}

<<<<<<< HEAD
export default Page
=======
export default Page
>>>>>>> d165aa8531781bd49984b5655bdcb37391b68f67
