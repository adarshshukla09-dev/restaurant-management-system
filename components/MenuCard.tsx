"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "@/components/ui/badge"
import { PenBoxIcon, Trash } from "lucide-react"
import { deleteItem, updateItem } from "@/server-actions/admin/route"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { MenuItemInput, MenuItemSchema } from "@/lib/vaildator/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Button } from "./ui/button"
type Data = {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  foodType: "VEG" | "NONVEG"
  mealTime: "BREAKFAST" | "LUNCH" | "DINNER"
  category: string
  createdAt: Date | null
}

function MenuCard({ item }: { item: Data }) {
  const router = useRouter() // 🔑 App Router refresh
  const formattedPrice = (item.price / 100).toFixed(2)
  const [isEditOpen, setIsEditOpen] = useState(false)
  async function handleDelete(id: string) {
    try {
      await deleteItem(id) // Call server action
      router.refresh()      // Re-fetch the page / server component
    } catch (err) {
      console.error("Failed to delete", err)
    }
  }

  async function onSubmit(values: MenuItemInput) {
    try {
      // Call your update action here
      await updateItem(item.id, values)
      router.refresh()
      setIsEditOpen(false)
    } catch (err) {
      console.error(err)
    }
  }
  const form = useForm<MenuItemInput>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: item.name,
      description: item.description == null ? "":item.description,
      price: item.price,
      image:item.image== null ? "": item.image,
      foodType: item.foodType,
      mealTime: item.mealTime,
      category: item.category,
    },
  })


  return (
    <Card className="overflow-hidden rounded-xl m-3 border-black transition hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-white text-black font-semibold">
          ₹ {formattedPrice}
        </Badge>
        <Badge variant="secondary" className="absolute bottom-3 left-3">
          {item.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {item.description || "Delicious and freshly prepared."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <Badge
          variant={item.foodType === "VEG" ? "secondary" : "destructive"}
        >
          {item.foodType === "VEG" ? "Veg" : "Non-Veg"}
        </Badge>

        <Badge variant="outline">
          {item.mealTime.charAt(0) + item.mealTime.slice(1).toLowerCase()}
        </Badge>
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        {/* Edit Dialog */}

             <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <PenBoxIcon
                size={16}
                className="cursor-pointer"
                onClick={() => setIsEditOpen(true)}
              />
            </DialogTrigger>
          <DialogContent>
           <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogDescription>Edit the menu item below</DialogDescription>
              </DialogHeader>
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
          update
        </Button>
      </form>
    </Form>
          </DialogContent>
        </Dialog>

        {/* Delete */}
        <Trash
          onClick={() => handleDelete(item.id)}
          size={16}
          className="cursor-pointer text-destructive hover:text-red-600 transition"
        />
      </CardFooter>
    </Card>
  )
}

export default MenuCard