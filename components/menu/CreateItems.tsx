"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {MenuItemSchema,MenuItemInput} from "@/lib/vaildator/table"
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
import { number } from "zod"
import { Utensils } from "lucide-react"

export  function CreateMenuComp() {
  const form = useForm<MenuItemInput>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      foodType: undefined,
      mealTime: undefined,
      category: "",
    },
  })

async function onSubmit(values: MenuItemInput) {
  try {
    const payload = {
      ...values,
      price: values.price * 100,
    }

    const created = await createItem(payload)
console.log(created)
    if (created) {
      form.reset()
    }

  } catch (error) {
    console.error("Failed to create item", error)
  }
}

  return (
 // Inside your CreateMenuComp return...
<div className="bg-slate-50/50 py-12 px-4 min-h-screen">
  <div className="max-w-2xl mx-auto bg-white shadow-sm border border-slate-200 rounded-3xl p-8 space-y-8">
    
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add to Menu</h2>
        <p className="text-slate-500 text-sm">Configure your dish details and pricing.</p>
      </div>
      <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
        <Utensils className="size-6" />
      </div>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Item Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-slate-700">Dish Title</FormLabel>
              <FormControl>
                <Input className="h-11 rounded-xl border-slate-200 focus:ring-orange-500" placeholder="e.g. Truffle Mushroom Risotto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grid: Category + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700">Category</FormLabel>
                <FormControl>
                  <Input className="h-11 rounded-xl" placeholder="Main Course" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700">Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 font-medium">₹</span>
                    <Input type="number" className="pl-8 h-11 rounded-xl" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit with Loading State (Recommended) */}
        <Button 
          disabled={form.formState.isSubmitting}
          type="submit" 
          className="w-full h-12 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all active:scale-[0.98]"
        >
          {form.formState.isSubmitting ? "Saving..." : "Publish to Menu"}
        </Button>
      </form>
    </Form>
  </div>
</div>
  )
}