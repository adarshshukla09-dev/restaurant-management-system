"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2 } from "lucide-react";

import { tableInput, tableSchema } from "@/lib/vaildator/table";
import { createTable } from "@/server-actions/admin/tables/route";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function CreateTableForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<tableInput>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      tableNumber: 0,
    },
  });

  const handleCreate = async (values: tableInput) => {
    setIsPending(true);
    try {
      const res = await createTable(values);
      if (res?.success) {
        setIsOpen(false);
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create table:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-6">
      <div className="flex justify-end items-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm">
              <Plus className="w-4 h-4" />
              Add New Table
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Create Table</DialogTitle>
              <DialogDescription>
                Add a new table to your dining area. Ensure the number is unique.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreate)}
                className="space-y-6 pt-4"
              >
                <FormField
                  control={form.control}
                  name="tableNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table Number / Identifier</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 12"
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

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isPending} type="submit" className="min-w-25">
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Create Table"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTableForm;