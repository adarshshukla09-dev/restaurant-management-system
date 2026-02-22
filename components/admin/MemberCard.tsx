"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { changeMemberRole } from "@/server-actions/admin/roles/routes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MemberCard({ member }: { member: any }) {
    const router = useRouter()
  const handleRoleChange = async (value: any) => {
    const res = await changeMemberRole({
      memberId: member.memberId,
      newRole: value,
    });

    if (res.success) {
      toast.success("Role updated");
      router.refresh()
    } else {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="p-6 border rounded-2xl shadow-sm bg-white">
      <h2 className="font-semibold">{member.name}</h2>
      <p className="text-sm text-gray-500">{member.email}</p>

      <div className="mt-4">
        <Select
          defaultValue={member.role}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="WAITER">WAITER</SelectItem>
            <SelectItem value="CASHIER">CASHIER</SelectItem>
            <SelectItem value="KITCHEN">KITCHEN</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}