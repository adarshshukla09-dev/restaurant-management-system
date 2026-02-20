import React from "react";
import { Userdata } from "./AllU";

function UCard({ user }: { user: Userdata }) {
  return (
    <div className="w-64  bg-gray-100 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm mt-2 font-medium">Role: {user.role}</p>
    </div>
  );
}

export default UCard;