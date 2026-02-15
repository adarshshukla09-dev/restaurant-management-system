"use client";

import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

function CartCard({ item }: any) {
  const { addItem, removeItem } = useCart();

  return (
    <div className="bg-white flex items-center gap-6 p-5 rounded-2xl border border-slate-100 shadow-sm">
      
      {/* Info */}
      <div className="flex-1">
        <h2 className="text-lg font-bold text-slate-800">
          {item.itemName}
        </h2>
        <p className="text-slate-500 text-sm">
          ₹{item.itemPrice.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => removeItem(item.menuId)}
          className="text-red-500"
        >
          <MinusCircle size={22} />
        </button>

        <span className="font-bold text-slate-700">
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
          className="text-emerald-500"
        >
          <PlusCircle size={22} />
        </button>
      </div>

      {/* Remove Entire Item */}
      <button
        onClick={() => removeItem(item.menuId)}
        className="text-slate-400 hover:text-red-600"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default CartCard;