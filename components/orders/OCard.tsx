import React from 'react'

function OCard({ order }: any) {
  const statusColor =
    order.status === "PENDING"
      ? "bg-yellow-100 text-yellow-600"
      : order.status === "COMPLETED"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          {order.itemName}
        </h2>

        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${statusColor}`}>
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