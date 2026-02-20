import React from "react";
import UCard from "./UCard";

export type Userdata = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "ADMIN" | "WAITER" | "CASHIER" | "KITCHEN";
  createdAt: Date;
  updatedAt: Date;
};

function AllU({ users }: { users: Userdata[] }) {
  return (
    <div className="w-full h-[80vh] relative bottom-15 bg-white rounded-2xl flex flex-wrap gap-4  p-5">
      {users.map((user) => (
        <UCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default AllU;