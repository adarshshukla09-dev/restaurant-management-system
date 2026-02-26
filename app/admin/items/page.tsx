import AllItemAdmin from '@/components/menu/allItemAdmin';
import { readAll } from '@/server-actions/admin/menu/route';
import React from 'react'
type Data = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  foodType: "VEG" | "NONVEG";
  mealTime: "BREAKFAST" | "LUNCH" | "DINNER";
  category: string;
  createdAt: Date | null;
};
interface PageProps {
  searchParams: Promise<{ table?: string }>;
}
async function Page() {
      const menu = await readAll();
      const data: Data[] = menu?.data || [];
  return (
      <div className="container mx-auto py-10 space-y-10">
         <div className="flex flex-col items-center gap-4">
           <div className="flex justify-around gap-2 w-full">
        <AllItemAdmin data={data}/>
           </div>
         </div>
       </div>
  )
}

export default Page
