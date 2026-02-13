"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {MenuItemSchema,MenuItemInput} from "@/lib/vaildator/admin"
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
import { createItem } from "@/server-actions/admin/route"
import { number } from "zod"

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
 <div className=" bg-muted/40 py-10 px-4">
  <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
    
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">
        Create Menu Item
      </h2>
      <p className="text-muted-foreground text-sm">
        Add a new item to your restaurant menu.
      </p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Name + Category Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Margherita Pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-25"
                  placeholder="Fresh tomatoes, mozzarella, basil..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    type="number"
                    className="pl-8"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value == "" ? 0 : Number(e.target.value))
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL + Preview */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://..." {...field} />
              </FormControl>

              {field.value && (
                <div className="mt-3 rounded-lg overflow-hidden border">
                  <img
                    src={field.value}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Food Type */}
          <FormField
            control={form.control}
            name="foodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VEG">🥦 Veg</SelectItem>
                    <SelectItem value="NONVEG">🍗 Non Veg</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Meal Time */}
          <FormField
            control={form.control}
            name="mealTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BREAKFAST">🌅 Breakfast</SelectItem>
                    <SelectItem value="LUNCH">🌤 Lunch</SelectItem>
                    <SelectItem value="DINNER">🌙 Dinner</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 text-base rounded-lg"
        >
          Create Menu Item
        </Button>
      </form>
    </Form>
  </div>
</div>
  )
}