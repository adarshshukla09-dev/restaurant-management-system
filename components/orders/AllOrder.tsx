"use client"

import React, { useEffect, useState } from 'react'
import { allOrders } from '@/server-actions/Order/routes'
import OCard from './OCard'

function AllOrder({ tableId }: { tableId: string }) {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    if (!tableId) return

    async function fetchOrders() {
      const all = await allOrders(tableId)
      setOrders(all.data)
    }

    fetchOrders()
  }, [tableId])

  if (!orders.length) return <div className='min-h-screen flex justify-center items-center'>Cooking..</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight italic">
          ALL Orders
        </h1>
        <p className="text-slate-500 font-medium">
          Management Dashboard • Total Items: {orders.length}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order: any) => (
          <OCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default AllOrder