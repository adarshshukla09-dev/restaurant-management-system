// components/kitchen/allCard.tsx
import React from 'react'
import KCard from './KCard';
import { Utensils } from 'lucide-react';

export type Order = {
    id: string,
    orderId: string,
    menuId: string,
    itemName: string,
    itemPrice: number,
    quantity: number,
    status: string,
};

function allCard({ all }: { all: Order[] }) {
  if (all.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <Utensils className="text-slate-300 size-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-400">All caught up!</h2>
        <p className="text-slate-400">New orders will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {all.map((item: Order) => (
        <KCard key={item.id} orders={item} />
      ))}
    </div>
  )
}

export default allCard