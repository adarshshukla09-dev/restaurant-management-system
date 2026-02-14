import AllItem from "@/components/menu/AllItem";
// import { CreateMenuComp } from "@/components/menu/CreateItems"; // Unused but kept if needed
import React from "react";
import { TableProvider } from "@/lib/context/TableContext";
// Define the shape of your params
interface PageProps {
  searchParams: Promise<{ table: string }>;
}

async function Page({ searchParams }: PageProps) {
  // Await the params to get the table ID
 const tableToken = (await searchParams).table
  return (
        <TableProvider tableToken={tableToken}>

    <div className="container mx-auto py-10 space-y-10">
      <div className="flex flex-col items-center gap-4">
        
        <div className="flex justify-around gap-2 w-full">
          {/* You can pass 'table' as a prop to AllItem if it needs to filter by table */}
          <AllItem   />
        </div>
      </div>
    </div>
    </TableProvider>
  );
}

export default Page;