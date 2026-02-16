import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"


// Move this inside the component or a constants file
const STATUS_OPTIONS = ["PENDING", "PREPARING", "READY", "SERVED"] as const;
import { updateStatus } from "@/server-actions/Kitchen/route";
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
  const handleStatus = async (status: Status) => {
    await updateStatus({
      id: orders.id,
      status,
    });
  };
  return (
    <Card className="max-w-md shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-800">
          {orders.itemName}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Quantity
            </p>
            <span className="text-zinc-700 font-medium">{orders.quantity} Units</span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
              Current Status
            </p>
            <span className="inline-flex items-center bg-orange-100 px-3 py-1 rounded-full text-sm font-medium text-orange-700">
              {orders.status}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-zinc-500 uppercase">Update Status</p>
          <Select            onValueChange={(value) => handleStatus(value as Status)}
 defaultValue={orders.status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order Progress</SelectLabel>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-zinc-50/50 py-3">
        <p className="text-[10px] font-mono text-zinc-400 break-all">
          ID: {orders.id}
        </p>
      </CardFooter>
    </Card>
  );
}

export default KCard;