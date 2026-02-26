// components/menu/MenuCard.tsx
"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "@/components/ui/badge"
import { PenBoxIcon, ShoppingCart, Trash, Plus } from "lucide-react"
import { deleteItem, updateItem } from "@/server-actions/admin/menu/route"
import { Button } from "../ui/button"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
import { useState } from "react"
import { requireAdmin } from "@/server-actions/admin/auth/route"

export default function MenuCardAdmin({ item }: { item: any }) {
  const { addItem } = useCart()
  const router = useRouter()
  return (
    <Card className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
      {/* Visual Header */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Glassmorphism Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <Badge className={`backdrop-blur-md border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
            item.foodType === "VEG" ? "bg-emerald-500/80 text-white" : "bg-rose-500/80 text-white"
          }`}>
            {item.foodType === "VEG" ? "• Pure Veg" : "• Non Veg"}
          </Badge>
          <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
            {item.mealTime}
          </Badge>
        </div>

        {/* Floating Admin Tools */}
        <div className="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button size="icon" className="rounded-full bg-white/90 backdrop-blur-md text-slate-800 hover:bg-white border-none shadow-xl">
            <PenBoxIcon size={16} />
          </Button>
          <Button onClick={() => deleteItem(item.id)} size="icon" className="rounded-full bg-rose-500/90 backdrop-blur-md text-white hover:bg-rose-600 border-none shadow-xl">
            <Trash size={16} />
          </Button>
        </div>
      </div>

      <CardHeader className="p-7 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-orange-500 tracking-[0.2em]">{item.category}</span>
            <CardTitle className="text-2xl font-bold text-slate-900 leading-tight line-clamp-1">{item.name}</CardTitle>
          </div>
          <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl text-lg font-black">₹{item.price}</div>
        </div>
        <CardDescription className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed">
          {item.description || "Freshly prepared with authentic ingredients and the chef's secret spices."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-7 pt-4">
        <Button 
          onClick={() => {
            addItem({ menuId: item.id, itemName: item.name, itemPrice: item.price })
            toast.success(`${item.name} added to cart`)
          }}
          className="w-full h-14 bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-900 rounded-[1.2rem] font-bold transition-all active:scale-95 border-none flex items-center gap-3 shadow-inner group/btn"
        >
          <div className="p-1.5 bg-white rounded-lg group-hover/btn:bg-orange-400 transition-colors">
            <Plus size={18} className="text-slate-900 group-hover/btn:text-white"/>
          </div>
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  )
}