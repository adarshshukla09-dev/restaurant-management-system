import React from 'react'
import { Card } from '../ui/card'

// Define a type for better DX (Developer Experience)
interface OrderData {
  id: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'SERVED' | 'PAID';
}

function OCard({ data }: { data: OrderData }) {
  
  // 1. Remove 'async'. This is a synchronous calculation.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-red-500";
      case "PREPARING": return "bg-orange-500";
      case "READY": return "bg-yellow-500";
      case "SERVED": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="font-medium p-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold capitalize">Order: {data.itemName}</h1>
          <p className="font-thin text-xs text-muted-foreground">ID: {data.id}</p>
          
          {/* 2. Call the function directly; it now returns a string immediately */}
        {/* Status Badge */}
  {/* Status Badge */}
  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase shadow-sm ${getStatusColor(data.status)}`}>
    {data.status}
  </span>

  {/* Quantity Badge - Switched to a cleaner 'ghost' or 'pill' style */}
  <span className=" items-center gap-1 bg-amber-100  text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-200">
    <span className="opacity-70 text-[8px]">QTY</span> {data.quantity || 1}
  </span>
        </div>

        <div className="font-semibold text-lg">
          ₹{data.itemPrice}
        </div>
      </div>
    </Card>
  )
}

export default OCard