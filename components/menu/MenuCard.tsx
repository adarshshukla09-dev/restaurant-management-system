"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { PenBoxIcon, ShoppingCart, Trash } from "lucide-react";
import { deleteItem, updateItem } from "@/server-actions/admin/menu/route";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MenuItemInput, MenuItemSchema } from "@/lib/vaildator/table";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useTable } from "@/context/tableContext";
type Data = {
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

function MenuCard({ item }: { item: Data }) {
  const router = useRouter(); // 🔑 App Router refresh
  const { addItem } = useCart(); // ✅ MOVE IT HERE
 
  const formattedPrice = (item.price / 100).toFixed(2);
  const [isEditOpen, setIsEditOpen] = useState(false);


  async function handleDelete(id: string) {
    try {
      await deleteItem(id); // Call server action
      router.refresh(); // Re-fetch the page / server component
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }
  async function onSubmit(values: MenuItemInput) {
    try {
      // Call your update action here
      const updated = await updateItem(item.id, values);
      console.log(updated);
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  const form = useForm<MenuItemInput>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: item.name,
      description: item.description == null ? "" : item.description,
      price: item.price,
      image: item.image == null ? "" : item.image,
      foodType: item.foodType,
      mealTime: item.mealTime,
      category: item.category,
    },
  });



  return (
    <Card className="group overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={`font-bold border-none shadow-sm ${item.foodType === "VEG" ? "bg-emerald-500" : "bg-red-500"}`}
          >
            {item.foodType === "VEG" ? "• Veg" : "• Non-Veg"}
          </Badge>
        </div>

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-lg shadow-sm">
          <span className="text-sm font-black text-slate-900">
            ₹{formattedPrice}
          </span>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-[10px] uppercase font-bold text-orange-500 tracking-widest">
              {item.category}
            </p>
            <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1">
              {item.name}
            </CardTitle>
          </div>
          {/* Admin Quick Actions */}
          <div className="flex gap-1">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-slate-100"
                >
                  <PenBoxIcon size={14} className="text-slate-500" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit Menu Item</DialogTitle>
                  <DialogDescription>
                    Update the details of this menu item below.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Paneer Butter Masala"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Delicious creamy curry..."
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
                          <FormLabel>Price (in paisa)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image URL */}
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Food Type */}
                    <FormField
                      control={form.control}
                      name="foodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select food type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VEG">Veg</SelectItem>
                              <SelectItem value="NONVEG">Non-Veg</SelectItem>
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
                                <SelectValue placeholder="Select meal time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="BREAKFAST">
                                Breakfast
                              </SelectItem>
                              <SelectItem value="LUNCH">Lunch</SelectItem>
                              <SelectItem value="DINNER">Dinner</SelectItem>
                            </SelectContent>
                          </Select>
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
                            <Input placeholder="Main Course" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Update Item
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-red-50 text-red-500"
              onClick={() => handleDelete(item.id)}
            >
              <Trash size={14} />
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs line-clamp-2 mt-1">
          {item.description || "No description provided for this item."}
        </CardDescription>
      </CardHeader>

   <CardFooter className="p-4 pt-0">
<Button 
  onClick={() => {
    addItem({
      menuId: item.id,
      itemName: item.name,
      itemPrice: item.price,
    });

    toast.success(`${item.name} added to cart 🛒`);
  }}
  className="w-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 font-bold rounded-xl border-none transition-colors gap-2"
>
    <ShoppingCart size={16} />
    Add to Cart
  </Button>
</CardFooter>
    </Card>
  );
}

export default MenuCard;
