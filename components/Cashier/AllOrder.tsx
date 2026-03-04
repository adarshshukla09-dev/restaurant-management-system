'use client'

import { allOrders } from '@/server-actions/Order/routes'
import React, { useEffect, useState } from 'react'
import OCard from './OCard'
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
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
const [tableSessionId, setTableSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)
  const totalAmount = data.reduce(
  (acc, item) => acc + item.itemPrice * item.quantity,
  0
);

const totalQuantity = data.reduce(
  (acc, item) => acc + item.quantity,
  0
);
 useEffect(() => {
  const fetchOrders = async () => {
    const orders = await allOrders(tableId);
if(orders.tableSessionId){
    setTableSessionId(orders.tableSessionId); }// ✅ correct
    setData(orders.data);
    setLoading(false);
  };

  fetchOrders();
}, [tableId]);

  if (loading) return <p>Loading...</p>

const handleCheckout = async () => {
  if (!tableSessionId) {
    alert("No active session");
    return;
  }

  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "all-orders",
      amount: totalAmount ,
      quantity: totalQuantity,
      tableSessionId: tableSessionId, // ✅ SEND THIS
    }),
  });

  const session = await res.json();

  if (!session.url) {
    throw new Error("No checkout URL returned");
  }

  window.location.href = session.url;
};

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
       <Button onClick={handleCheckout}>
                PAY NOW
              </Button>
    </div>
  )
}

export default AllOrder