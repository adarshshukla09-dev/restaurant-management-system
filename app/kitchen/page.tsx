// app/kitchen/page.tsx
import AllCard from '@/components/kitchen/allCard';
import { pendingOrder } from '@/server-actions/Kitchen/route';
import React from 'react';
import { Order } from '@/components/kitchen/allCard';
import { ChefHat, Timer } from 'lucide-react';
import { requireStaff } from '@/server-actions/admin/auth/route';

async function Page() {
    await requireStaff("KITCHEN")
  const all: Order[] = await pendingOrder();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
    

      <main className="max-w-7xl mx-auto px-8 py-10">
        <AllCard all={all} />
      </main>
    </div>
  );
}

export default Page;