// components/kitchen/KCard.tsx
"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateStatus } from "@/server-actions/Kitchen/route";
import { Hash, Package, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const STATUS_OPTIONS = ["PENDING", "PREPARING", "READY", "SERVED"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

interface OrderProps {
  id: string;
  itemName: string;
  itemPrice: number;
  menuId: string;
  orderId: string;
  quantity: number;
  status: string;
}

function KCard({ orders }: { orders: OrderProps }) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { color: "bg-rose-500", icon: <AlertCircle size={14} />, border: "border-rose-100" };
      case "PREPARING":
        return { color: "bg-amber-500", icon: <Clock size={14} />, border: "border-amber-100" };
      case "READY":
        return { color: "bg-orange-600", icon: <Package size={14} />, border: "border-orange-100" };
      case "SERVED":
        return { color: "bg-emerald-500", icon: <CheckCircle2 size={14} />, border: "border-emerald-100" };
      default:
        return { color: "bg-slate-500", icon: null, border: "border-slate-100" };
    }
  };

  const config = getStatusConfig(orders.status);

  async function handleStatus(status: Status) {
    await updateStatus({ id: orders.id, status });
  }

  return (
    <Card className="group relative overflow-hidden rounded-[2rem] border-none bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
      {/* Status Bar */}
      <div className={`h-2 w-full ${config.color}`} />
      
      <CardHeader className="p-6 pb-2">
        <div className="flex justify-between items-start">
          <div className="bg-slate-100 text-slate-500 p-2 rounded-xl">
             <Hash size={16} />
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-white font-bold text-[10px] tracking-widest ${config.color}`}>
            {config.icon}
            {orders.status}
          </div>
        </div>
        <CardTitle className="text-2xl font-black text-slate-900 mt-4 leading-tight">
          {orders.itemName}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Quantity Focus */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Quantity</p>
            <p className="text-2xl font-black text-slate-900">x{orders.quantity}</p>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Order Ref</p>
             <p className="text-sm font-mono font-bold text-slate-600">#{orders.orderId.slice(-4)}</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Move to next stage</p>
          <Select onValueChange={(value) => handleStatus(value as Status)} defaultValue={orders.status}>
            <SelectTrigger className="w-full h-12 rounded-xl bg-white border-2 border-slate-100 hover:border-orange-500 transition-colors font-bold text-slate-700">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-2xl">
              <SelectGroup>
                <SelectLabel className="text-slate-400 text-xs">Progress Update</SelectLabel>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status} className="font-bold py-3 rounded-lg focus:bg-orange-50 focus:text-orange-600 transition-colors">
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-slate-50/80 border-t border-slate-100">
        <p className="text-[10px] font-mono font-medium text-slate-400 truncate">
          UID: {orders.id}
        </p>
      </CardFooter>
    </Card>
  );
}

export default KCard;