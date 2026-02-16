import AllCard from '@/components/kitchen/allCard';
import { pendingOrder } from '@/server-actions/Kitchen/route';
import React from 'react';
import { Order } from '@/components/kitchen/allCard';
async function Page() {
  const all :Order[]= await pendingOrder();

  return (
   <div className="min-h-screen w-full mb-5 px-8 flex justify-center">
  <div className="w-full mb-5 max-w-7xl">
      <AllCard all={all} />
    </div>
    </div>
  );
}

export default Page;