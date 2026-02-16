import React from 'react'
import KCard from './KCard';
 export type Order ={
    id:string,
    orderId:string,
    menuId:string,
    itemName:string,
    itemPrice:number,
    quantity:number,
    status:string,
};
function allCard({all}:{all:Order[]}) {
  return (
     <div className="grid grid-cols-3 gap-8 mt-7 mb-12">
      {all.map((item: Order) => (
        <KCard key={item.id} orders={item} />
      ))}
    </div>
  )
}

export default allCard
