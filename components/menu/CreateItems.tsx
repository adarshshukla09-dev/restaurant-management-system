// components/menu/CreateItems.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MenuItemSchema, MenuItemInput } from "@/lib/vaildator/table"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createItem } from "@/server-actions/admin/menu/route"
import { Utensils, ImageIcon, Clock, Leaf, PlusCircle, IndianRupee } from "lucide-react"

export function CreateMenuComp() {
  const form = useForm<MenuItemInput>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      foodType: "VEG",
      mealTime: "LUNCH",
      category: "",
    },
  })

  async function onSubmit(values: MenuItemInput) {
    try {
      const created = await createItem(values)
      if (created) form.reset()
    } catch (error) {
      console.error("Failed to create item", error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-[2.5rem] p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create <span className="text-orange-500 italic">Dish</span></h2>
            <p className="text-slate-400 font-medium">Add a new masterpiece to your digital menu.</p>
          </div>
          <div className="h-14 w-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-100">
            <PlusCircle className="size-7" />
          </div>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 ml-1">Dish Name</FormLabel>
                    <FormControl>
                      <Input className="h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20" placeholder="e.g. Signature Truffle Pasta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 ml-1">Category</FormLabel>
                    <FormControl>
                      <Input className="h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20" placeholder="Appetizers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 ml-1">Description</FormLabel>
                  <FormControl>
                    <Textarea className="rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 min-h-25 resize-none" placeholder="Describe the flavors and ingredients..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 ml-1">Price</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500" />
                        <Input type="number" className="pl-10 h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 ml-1">Image URL</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500" />
                        <Input className="pl-10 h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20" placeholder="https://unsplash..." {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="foodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 ml-1">Dietary Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-none shadow-xl">
                        <SelectItem value="VEG">🌿 Vegetarian</SelectItem>
                        <SelectItem value="NONVEG">🥩 Non-Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mealTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 ml-1">Serving Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none">
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-none shadow-xl">
                        <SelectItem value="BREAKFAST">🍳 Breakfast</SelectItem>
                        <SelectItem value="LUNCH">☀️ Lunch</SelectItem>
                        <SelectItem value="DINNER">🌙 Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Button 
              disabled={form.formState.isSubmitting}
              className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-[1.2rem] font-bold text-lg transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
            >
              {form.formState.isSubmitting ? "Creating Masterpiece..." : "Publish to Menu"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}