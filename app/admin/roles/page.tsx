import AddMemberDialog from "@/components/admin/AddMemberDialog";
import MembersList from "@/components/admin/MembersList";
import { auth } from "@/lib/utils/auth";
import { requireAdmin } from "@/server-actions/admin/auth/route";
import { getRestaurantMembers } from "@/server-actions/admin/roles/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { date } from "zod";

type Member = {
  memberId: string;
  role: "ADMIN" | "WAITER" | "CASHIER" | "KITCHEN" ;
  status: "APPROVED" | "PENDING" | "REJECTED";
  userId: string;
  name: string;
  email: string;
  image: string | null;
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    redirect("/register");
  }
  await requireAdmin()
  const res = await getRestaurantMembers();
  if (!res.success) {
    return <div>Failed to load</div>;
  }

  const members: Member[] = res.data;

  return (
    <div className="p-10">
       <AddMemberDialog  />
      <MembersList members={members} />
    </div>
  );
}