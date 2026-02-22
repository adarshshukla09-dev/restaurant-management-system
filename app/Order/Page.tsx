// app/order/page.tsx
"use client"

import AllOrder from '@/components/orders/AllOrder'
import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'

function Page() {
  const [tableId, setTableId] = useState<string | null>(null)

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId")
    setTableId(storedTableId)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {tableId ? (
          <AllOrder tableId={tableId} />
        ) : (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="bg-slate-100 p-6 rounded-full mb-4 text-slate-400">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">No active table found</h2>
            <p className="text-slate-500">Scan a QR code to start ordering.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page