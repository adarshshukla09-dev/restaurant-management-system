"use client";

import { useEffect, useState } from "react";
import { getAllUsers, createMember } from "@/server-actions/admin/roles/routes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Router from "next/router";
export default function AddMemberDialog() {
    
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      const data = res.data
      if (res.success && data) {
        setUsers(data);
        router.refresh()
      }
    };

    fetchUsers();
  }, []);

  const handleAdd = async (userId: string) => {
    const res = await createMember({ userId });

    if (res.success) {
      toast.success("Member added");
      router.refresh(); // 🔥 refresh admin page
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="border m-3 p-6 rounded-xl">
      <h2 className="font-semibold mb-4">Add New Member</h2>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center border p-3 rounded-lg"
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
    </div>
  );
}