import React from 'react'

function OCard({ order }: any) {
  const statusColor =(status:string)=>{
     switch (status) {
      case "PENDING":
        return "bg-red-400";
      case "PREPARING":
        return "bg-yellow-400";
      case "READY":
        return "bg-orange-500";
      case "SERVED":
        return "bg-green-400 ";
    }}
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          {order.itemName}
        </h2>

        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${statusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-2 text-slate-600">
        <p><span className="font-semibold">Price:</span> {order.itemPrice}</p>
        <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
        <p><span className="font-semibold">Total:</span> {order.itemPrice * order.quantity} </p>
      </div>

      <div className="mt-4 text-xs text-slate-400 break-all">
        ID: {order.id}
      </div>
    </div>
  )
}

export default OCard