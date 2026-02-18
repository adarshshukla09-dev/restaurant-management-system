'use client'

import { allOrders } from '@/server-actions/Order/routes'
import React, { useEffect, useState } from 'react'
import OCard from './OCard'
interface  data{
        id: string;
        orderId: string;
        menuId: string;
        itemName: string;
        itemPrice: number;
        quantity: number;
        status: "PENDING" | "PREPARING" | "READY" | "SERVED" | "PAID";
    }
function AllOrder({ tableId }: { tableId: string }) {
  const [data, setData] = useState<data[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await allOrders(tableId)
      setData(orders.data)
      setLoading(false)
    }

    fetchOrders()
  }, [tableId])

  if (loading) return <p>Loading...</p>
      console.log(data)

  return (
    <div className="space-y-3 mt-4">
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No orders found.
        </p>
      )}

      {data.map((item: data) => (
        <OCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default AllOrder