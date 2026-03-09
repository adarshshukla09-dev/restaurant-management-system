'use client'

import { allOrders } from '@/server-actions/Order/routes'
import React, { useEffect, useState } from 'react'
import OCard from './OCard'
import { Button } from "../ui/button";

interface data {
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
  const [tableSessionId, setTableSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const totalAmount = data.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  )

  const totalQuantity = data.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await allOrders(tableId)

      if (orders.tableSessionId) {
        setTableSessionId(orders.tableSessionId)
      }

      setData(orders.data)
      setLoading(false)
    }

    fetchOrders()
  }, [tableId])

  if (loading) return <p>Loading...</p>

  const handleCheckout = async () => {
    if (!tableSessionId) {
      alert("No active table session")
      return
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "table-bill",
          amount: totalAmount * 100, // convert to paise
          tableSessionId,
        }),
      })

      const session = await res.json()

      if (!session.url) {
        alert("Payment session failed")
        return
      }

      window.location.href = session.url

    } catch (error) {
      console.error("Checkout error:", error)
      alert("Payment failed")
    }
  }

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

      <div className="pt-4">
        <p className="font-semibold">
          Total Items: {totalQuantity}
        </p>

        <p className="font-semibold">
          Total Bill: ₹{totalAmount}
        </p>

        <Button onClick={handleCheckout} className="mt-2">
          PAY NOW
        </Button>
      </div>

    </div>
  )
}

export default AllOrder