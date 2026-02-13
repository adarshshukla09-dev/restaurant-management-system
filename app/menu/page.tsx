import AllItem from "@/components/AllItem";
import { CreateMenuComp } from "@/components/CreateItems";
import React from "react";

function page() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className=" flex justify-around gap-2 ">
        <AllItem />
      </div>
    </div>
  );
}

export default page;
