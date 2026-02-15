import { readAll } from "@/server-actions/admin/menu/route";
import React from "react";
import MenuCard from "./MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UtensilsCrossed, Leaf, Flame, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
async function AllItem() {
  const menu = await readAll();
  const data: data[] = menu?.data || [];


  const vegItems = data.filter((item) => item.foodType === "VEG");
  const nonVegItems = data.filter((item) => item.foodType === "NONVEG");

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
      <UtensilsCrossed className="mb-4 text-slate-300" size={48} />
      <p className="text-slate-500 font-medium">{message}</p>
    </div>
  );

  const renderItems = (items: data[], message: string) => {
    if (items.length === 0) {
      return <EmptyState message={message} />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col space-y-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight italic">
              THE MENU
            </h1>
            <p className="text-slate-500 font-medium">
              Management Dashboard • {data.length} Total Items
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
              size={18}
            />
            <Input
              placeholder="Search dishes..."
              className="pl-10 h-12 bg-white border-slate-200 rounded-xl shadow-sm focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <TabsList className="bg-slate-100/80 p-1 h-12 rounded-2xl border border-slate-200/50">
              <TabsTrigger
                value="all"
                className="px-6 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                All
              </TabsTrigger>

              <TabsTrigger
                value="veg"
                className="px-6 rounded-xl data-[state=active]:text-emerald-600 data-[state=active]:bg-white"
              >
                <Leaf size={14} className="mr-2" /> Veg
              </TabsTrigger>

              <TabsTrigger
                value="nonveg"
                className="px-6 rounded-xl data-[state=active]:text-red-600 data-[state=active]:bg-white"
              >
                <Flame size={14} className="mr-2" /> Non-Veg
              </TabsTrigger>
            </TabsList>

            {/* Quick Stats */}
            <div className="hidden md:flex gap-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {vegItems.length} Veg
              </span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                {nonVegItems.length} Non-Veg
              </span>
            </div>
          </div>

          <div className="mt-8">
            <TabsContent value="all" className="focus-visible:outline-none">
              {renderItems(data, "Your menu is currently empty.")}
            </TabsContent>

            <TabsContent value="veg" className="focus-visible:outline-none">
              {renderItems(vegItems, "No vegetarian options found.")}
            </TabsContent>

            <TabsContent value="nonveg" className="focus-visible:outline-none">
              {renderItems(nonVegItems, "No non-vegetarian options found.")}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default AllItem;