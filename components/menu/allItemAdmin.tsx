// components/menu/AllItem.tsx
"use client"
import MenuCard from "./MenuCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtensilsCrossed, Leaf, Flame, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import MenuCardAdmin from "./menuCardAdmin"

export default function AllItemAdmin({ data}: { data: any[]}) {
  

  const vegItems = data.filter((item) => item.foodType === "VEG")
  const nonVegItems = data.filter((item) => item.foodType === "NONVEG")

  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Premium Header */}
      <header className="sticky top-0  bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
                <Sparkles size={14}/> Exclusive Menu
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">THE MENU</h1>
            </div>

            <div className="relative group w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <Input
                placeholder="Search for your cravings..."
                className="pl-12 h-14 bg-slate-100 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500/20 shadow-inner"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-4">
            <TabsList className="bg-slate-100/50 p-1.5 h-14 rounded-2xl gap-2">
              <TabsTrigger value="all" className="px-8 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">All Items</TabsTrigger>
              <TabsTrigger value="veg" className="px-8 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold gap-2">
                <Leaf size={16} className="text-emerald-500" /> Veg
              </TabsTrigger>
              <TabsTrigger value="nonveg" className="px-8 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold gap-2">
                <Flame size={16} className="text-rose-500" /> Non-Veg
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <TabsContent value="all" className="contents">
              {data.map((item) => <MenuCardAdmin key={item.id} item={item} />)}
            </TabsContent>
            <TabsContent value="veg" className="contents">
              {vegItems.map((item) => <MenuCardAdmin key={item.id} item={item} />)}
            </TabsContent>
            <TabsContent value="nonveg" className="contents">
              {nonVegItems.map((item) => <MenuCardAdmin key={item.id} item={item} />)}
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  )
}