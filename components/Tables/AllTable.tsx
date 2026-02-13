"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteItem } from "@/server-actions/admin/menu/route";
import { deleteTable } from "@/server-actions/admin/tables/route";
import { Download, Trash2Icon } from "lucide-react";

interface TableData {
  id: string;
  tableNumber: number;
  qrToken: string;
  status: "FREE" | "OCCUPIED" | "RESERVED";
  createdAt: Date | null;
  qrImage: string;
}

function AllTable({ table }: { table: TableData }) {
  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = table.qrImage;
    link.download = `Table-${table.tableNumber}-QR.png`;
    link.click();
  };
const handleDelete= async (id:string)=>{
const del = await deleteTable(id)
console.log(del)
}
  return (
    <div className="relative group p-1 rounded-3xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.03]">

      {/* 🔥 Flame Border Background Layer */}
      <div className="absolute inset-0 
        bg-linear-to-t
        from-red-950
        via-orange-500
        to-transparent
        bg-size-[100%_200%]
        animate-flame
        blur-xl
        opacity-90"
      />

      {/* 🔥 Secondary Glow Layer (Depth Effect) */}
      <div className="absolute inset-0 
        bg-linear-to-t
        from-orange-600
        via-yellow-400
        to-transparent
        blur-2xl
        opacity-60
        animate-flame
        animation-duration-[3s]"
      />

      {/* Card Content */}
      <Card className="relative bg-white/95 backdrop-blur-sm border-none rounded-[22px] overflow-hidden">
        <CardHeader className="pb-2 text-center">
          <div className="flex justify-between items-start mb-2">
            <Badge 
              variant={table.status === "FREE" ? "secondary" : "destructive"}
              className="font-semibold"
            >
              {table.status}
            </Badge>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={downloadQR} 
              className="h-8 w-8"
            >
              <Download className="h-4 w-4 text-slate-500" />
            </Button>
          </div>

          <CardTitle className="text-4xl font-black text-slate-800">
            {table.tableNumber}
          </CardTitle>

          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Dining Table
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center pb-6">
          <div className="p-3 bg-white rounded-xl shadow-inner mb-4 border border-slate-100">
            <img 
              src={table.qrImage} 
              alt="QR Code" 
              className="w-32 h-32 object-contain" 
            />
          </div>

          <code className="text-[10px] text-slate-400 font-mono">
            ID: {table.qrToken.slice(0, 8)}...
          </code>
        </CardContent>
        <CardFooter className="justify-end" >
<Trash2Icon onClick={ () =>handleDelete(table.id)}/>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AllTable;