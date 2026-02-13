import QRCode from "qrcode";
import AllTable from "@/components/Tables/AllTable";
import CreateTableForm from "@/components/Tables/CreateTableForm";
import { readAllTable } from "@/server-actions/admin/tables/route";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const res = await readAllTable();
  const data = res?.data ?? [];

  const tablesWithQR = await Promise.all(
    data.map(async (table) => {
      // PRO TIP: In production, replace localhost with your actual domain environment variable
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const url = `${baseUrl}/menu?table=${table.qrToken}`;
      const qrImage = await QRCode.toDataURL(url);

      return {
        ...table,
        qrImage,
      };
    })
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Manage Tables
            </h1>
            <p className="text-slate-500 mt-1">
              Create, edit, and download QR codes for your restaurant tables.
            </p>
          </div>
          <CreateTableForm />
        </header>

        <Separator className="mb-10" />

        {/* Tables Grid */}
        {tablesWithQR.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tablesWithQR.map((item) => (
              <AllTable key={item.id} table={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-75 border-2 border-dashed rounded-xl bg-white p-12 text-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <span className="text-2xl">🪑</span>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No tables found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              It looks like you haven't added any tables yet. Use the "Add New Table" button to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}