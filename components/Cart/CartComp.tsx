"use client";
import { useCart } from "@/context/CartContext";
import { buyFromCart } from "@/server-actions/Order/routes";
import CartCard from "./CartCard";
import { Button } from "../ui/button";
import { CreditCard, ReceiptText, Truck } from "lucide-react";
import { useTable } from "@/context/tableContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";

function CartComp() {
  const { cart, removeItem, clearCart, total } = useCart();
  const [ tableId, setTableId ] = useState("");
  useEffect(()=>{

    const tId = localStorage.getItem("tableId");
    if(tId)  setTableId(tId);
    console.log(tableId);
  },[])
  const handleOrder = async () => {
    if (cart.length === 0) return;

    if (tableId) {
      await buyFromCart(tableId, cart);
      toast.success("order placed sucessfully");
    }
    clearCart();
  };
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">
        Your Order
        <p> {tableId}</p>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Scrollable List of Items */}
        <div className="lg:col-span-2 space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          {cart.length != 0 ? (
            cart.map((item) => <CartCard key={item.menuId} item={item} />)
          ) : (
            <div className="h-80 w-full flex items-center justify-center  border-2 border-dotted">
              No order yet
            </div>
          )}
          {/* Add as many as you want; the container handles the scroll */}
        </div>

        {/* RIGHT COLUMN: Sticky Summary Card */}
        <div className="lg:sticky lg:top-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ReceiptText size={20} className="text-orange-500" />
            Order Summary
          </h3>

          <div className="space-y-4 text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">{total}</span>
            </div>

            <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 p-2 rounded-lg text-sm">
              <span className="flex items-center gap-1">
                <Truck size={14} /> Delivery
              </span>
              <span className="font-bold uppercase">Free</span>
            </div>

            <hr className="border-slate-100" />

            <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>

          <Button
            onClick={handleOrder}
            className="w-full mt-8 bg-orange-600 hover:bg-orange-700 h-14 text-lg font-bold rounded-xl shadow-lg shadow-orange-100 flex gap-2"
          >
            <CreditCard size={20} />
            Checkout Now
          </Button>

          <p className="text-center text-xs text-slate-400 mt-4">
            Estimated delivery time: 25-35 mins
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartComp;
