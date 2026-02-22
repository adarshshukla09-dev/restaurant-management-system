// components/Cart/CartCard.tsx
"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";

function CartCard({ item }: any) {
  const { addItem, removeItem } = useCart(); // Assuming deleteItem removes the whole row

  return (
    <div className="group bg-white flex items-center gap-4 p-4 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300">
      {/* Item Visual Placeholder/Icon */}
      <div className="h-20 w-20 bg-slate-50 rounded-2xl flex items-center justify-center text-orange-500 font-bold overflow-hidden border border-slate-100">
         <img src={item.image || "/placeholder-food.jpg"} alt="" className="object-cover h-full w-full" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-slate-800 truncate leading-tight">
          {item.itemName}
        </h2>
        <p className="text-orange-600 font-black text-sm mt-1">
          ₹{item.itemPrice}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
        <button
          onClick={() => removeItem(item.menuId)}
          className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-white hover:text-red-500 transition-colors text-slate-400"
        >
          <Minus size={16} strokeWidth={3} />
        </button>

        <span className="w-8 text-center font-black text-slate-800">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            addItem({
              menuId: item.menuId,
              itemName: item.itemName,
              itemPrice: item.itemPrice,
            })
          }
          className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-white hover:text-emerald-500 transition-colors text-slate-400"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>

      {/* Quick Remove */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.menuId)}
        className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}

export default CartCard;