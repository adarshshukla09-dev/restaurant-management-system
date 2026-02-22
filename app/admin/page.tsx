import AddMemberDialog from "@/components/admin/AddMemberDialog";
import MembersList from "@/components/admin/MembersList";
import { getRestaurantMembers } from "@/server-actions/admin/roles/routes";

type Member = {
  memberId: string;
  role: "ADMIN" | "WAITER" | "CASHIER" | "KITCHEN";
  status: "APPROVED" | "PENDING" | "REJECTED";
  userId: string;
  name: string;
  email: string;
  image: string | null;
};

export default async function Page() {
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