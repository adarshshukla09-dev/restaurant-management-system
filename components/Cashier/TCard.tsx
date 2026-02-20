"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AllOrder from "./AllOrder";
import { Button } from "@base-ui/react";

type Data = {
  id: string;
  tableNumber: number;
  qrToken: string;
  status: "FREE" | "OCCUPIED" | "RESERVED";
  createdAt: Date | null;
};

function TCard({ data }: { data: Data }) {
  const statusColor = {
    FREE: "bg-green-500",
    OCCUPIED: "bg-red-500",
    RESERVED: "bg-yellow-500",
  };

  
  return (
    <Card className="cursor-pointer hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>Table {data.tableNumber}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          QR: {data.qrToken}
        </span>

        <Badge className={statusColor[data.status]}>
          {data.status}
        </Badge>
      </CardContent>

      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>All Orders</Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Orders for Table {data.tableNumber}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <AllOrder tableId={data.id} />

             
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default TCard;