"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createMember, getAllUsers } from "@/server-actions/admin/roles/routes";
import { useRouter } from "next/navigation";
type data={
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: "ADMIN" | "WAITER" | "CASHIER" | "KITCHEN";
        createdAt: Date;
        updatedAt: Date;
    }
export default function AddMember() {
  const [users, setUsers] = useState<data[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      const data = res.data
      if (res.success && data) setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleAdd = async (userId: string) => {
    const res = await createMember({ userId });

    if (res.success) {
      toast.success("Member added");
      router.refresh(); // 🔥 refresh admin page
    } else {
      toast.error("Failed");
    }
  };

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between border p-4 rounded-xl"
        >
          <div>
            <p>{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <Button onClick={() => handleAdd(user.id)}>
            Add
          </Button>
        </div>
      ))}
    </div>
  );
}