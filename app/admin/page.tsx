import { headers } from "next/headers";
import { auth } from "@/lib/utils/auth";
import { requireAdmin } from "@/server-actions/admin/auth/route";
import React from "react";
import { redirect } from "next/navigation";
import { todOrder } from "@/server-actions/admin/others/route";
import LandingPage from "@/components/admin/dashboard/LandingPage";

export default  async function Page() {

  const session = await auth.api.getSession({
     headers: await headers(),
   });
   
   if (!session) {
     redirect("/register");
   }
 await requireAdmin()
//  await todOrder()
      
  return (
    <LandingPage/>
    // <div className="h-[80vh] flex justify-center items-center">
    //  <div>
    //   {/* {session?.user ?    <h1 className="text-3xl font-bold">
    //     Welcome to the Admin Page
    //   </h1> : <p>Not logged in</p>
    //   } */}
    // </div>
    // </div>
  );
}
