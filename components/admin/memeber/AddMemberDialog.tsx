"use client";

import { useEffect, useState } from "react";
import { getAllUsers, createMember } from "@/server-actions/admin/roles/routes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddMemberDialog() {
  const [users, setUsers] = useState<any[]>([]);
  const [exist, setExist] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Example:
      // const allUsersRes = await getAllUsers();
      // const existingMembersRes = await getExistingMembers();

      const allUsersRes = await getAllUsers();
      const existingRes = await getAllUsers(); // replace with correct API

      if (allUsersRes.success && existingRes.success) {
        const allUsers = allUsersRes.data || [];
        const existingUsers = existingRes.data || [];

        setExist(existingUsers);

        // ✅ Create Set for fast lookup
        const existingEmails = new Set(
          existingUsers.map((u: any) => u.email.toLowerCase())
        );

        // ✅ Filter users NOT in existing list
        const filteredUsers = allUsers.filter(
          (user: any) => !existingEmails.has(user.email.toLowerCase())
        );

        setUsers(filteredUsers);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (userId: string) => {
    const res = await createMember({ userId });

    if (res.success) {
      toast.success("Member added");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
    {users.length > 0 && (
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
     )}
  </>
)}