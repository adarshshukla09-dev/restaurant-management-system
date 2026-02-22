"use client";

import MemberCard from "./MemberCard";

type data =  {
    memberId: string;
    role: "ADMIN" | "WAITER" | "CASHIER" | "KITCHEN";
    status: "APPROVED" | "PENDING" | "REJECTED";
    userId: string;
    name: string;
    email: string;
    image: string | null;
}

export default function MembersList({ members }: { members: data[] }) {
  if (!members.length) {
    return <div>No members found</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {members.map((member) => (
        <MemberCard key={member.memberId} member={member} />
      ))}
    </div>
  );
}