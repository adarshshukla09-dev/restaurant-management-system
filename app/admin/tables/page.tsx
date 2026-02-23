// app/admin/tables/page.tsx
import QRCode from "qrcode";
import AllTable from "@/components/Tables/AllTable";
import CreateTableForm from "@/components/Tables/CreateTableForm";
import { readAllTable } from "@/server-actions/admin/tables/route";
import { Sparkles } from "lucide-react";
import { helperAdmin } from "@/server-actions/admin/roles/routes";

export default async function Page() {
    await helperAdmin()
  
  const res = await readAllTable();
  const data = res?.data ?? [];

  const tablesWithQR = await Promise.all(
    data.map(async (table: any) => {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const url = `${baseUrl}/menu?table=${table.qrToken}`;
      const qrImage = await QRCode.toDataURL(url, {
        margin: 2,
        scale: 10,
        color: {
          dark: "#0f172a", // slate-900
          light: "#ffffff",
        },
      });

      return { ...table, qrImage };
    })
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-[0.2em]">
               <Sparkles size={14} /> System Infrastructure
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">
              TABLE <span className="text-orange-500">MANAGEMENT</span>
            </h1>
            <p className="text-slate-400 font-medium">
              Oversee your physical dining space and QR connectivity.
            </p>
          </div>
          <CreateTableForm />
        </header>

        {/* Tables Grid */}
        {tablesWithQR.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tablesWithQR.map((item) => (
              <AllTable key={item.id} table={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
             <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-6">🪑</div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tight">Zero Tables Registered</h3>
             <p className="text-slate-400 mt-2 font-medium">Your restaurant floor is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}