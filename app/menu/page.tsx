import AllItem from "@/components/menu/AllItem";
import React from "react";
interface PageProps {
  searchParams: Promise<{ table: string }>;
}

async function Page({ searchParams }: PageProps) {
  // Await the params to get the table ID
 const qrToken = (await searchParams).table
  return (

    <div className="container mx-auto py-10 space-y-10">
      <div className="flex flex-col items-center gap-4">
        
        <div className="flex justify-around gap-2 w-full">
          {/* You can pass 'table' as a prop to AllItem if it needs to filter by table */}
          <AllItem   />
        </div>
      </div>
    </div>
  );
}

export default Page;