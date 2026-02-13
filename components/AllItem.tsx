import { readAll } from "@/server-actions/admin/route";
import React from "react";
import MenuCard from "./MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type data = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  foodType: "VEG" | "NONVEG";
  mealTime: "BREAKFAST" | "LUNCH" | "DINNER";
  category: string;
  createdAt: Date | null;
};

const menu = await readAll();
const data = menu?.data || [];

const renderItems = (type?: "VEG" | "NONVEG") => {
  const filtered = type
    ? data.filter((item) => item.foodType === type)
    : data;

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No items found
      </div>
    );
  }

  return (
    <div className="grid gap-6  sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
};

function AllItem() {
  return (
    <div className="w-full flex gap-2 justify-around m-5 ">

      <Tabs defaultValue="all" className="text-center  space-y-6">
        <TabsList className=" mx-auto" >
          <TabsTrigger  value="all">All</TabsTrigger>
          <TabsTrigger  value="veg">Veg</TabsTrigger>
          <TabsTrigger value="nonveg">Non-Veg</TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderItems()}</TabsContent>
        <TabsContent value="veg">
          {renderItems("VEG")}
        </TabsContent>
        <TabsContent value="nonveg">
          {renderItems("NONVEG")}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AllItem;