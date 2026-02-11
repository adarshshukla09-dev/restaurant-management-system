import { readAll } from '@/server-actions/admin/route'
import React from 'react'
import MenuCard from './MenuCard';

type data= {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    foodType: "VEG" | "NONVEG";
    mealTime: "BREAKFAST" | "LUNCH" | "DINNER";
    category: string;
    createdAt: Date | null;
}
const menu = await readAll();
const data =  menu?.data || [];
console.log(data.length)
console.log(data)

function AllItem() { 
   
  return (
    <div className='min-h-screen w-full flex justify-around items-center'>
      <div className='grid grid-cols-3 gap-2 m-2'>
        {data?.length > 0 ? (
          data?.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  )
}


export default AllItem
