"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createMember } from "@/server-actions/admin/roles/routes";
import { useRouter } from "next/navigation";

export default function UCard({ user }: { user: any }) {
    const router = useRouter()
  const handleAdd = async () => {
    const res = await createMember({ userId: user.id });

    if (res.success) {
      toast.success(res.message);
      router.refresh()
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="border p-6 rounded-xl flex justify-between">
      <div>
        <h2>{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <Button onClick={handleAdd}>
        Add to Restaurant
      </Button>
    </div>
  );
}