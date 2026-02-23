import { helperAdmin } from "@/server-actions/admin/roles/routes";
import React from "react";

export default async function Page() {
      await helperAdmin()
    
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold">
        Welcome to the Admin Page
      </h1>
    </div>
  );
}