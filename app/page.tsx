import { auth } from "@/lib/utils/auth";
import { allUser } from "@/server-actions/admin/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AllU from "@/components/admin/AllU";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default async function HomePage() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   redirect("/register");
  // }
  // const user = await allUser();
  // const data = user?.data
  // if(!data) return new Error()
  // console.log(user);
  return (
  <div className="relative min-h-screen  w-full flex flex-col justify-center items-center ">

    {/* CENTER CONTENT */}
    <div className="w-7xl  ">
      <Tabs defaultValue="overview" className="w-full">

        {/* TAB CONTENT (CENTERED) */}
      <TabsContent value="overview">

        </TabsContent>

        <TabsContent value="analytics">

        </TabsContent> 

        <TabsContent value="Staff">
                 {/* <AllU users={data}/> */}

        </TabsContent>
 
        <TabsContent value="settings">
        </TabsContent>

        {/* TAB BUTTONS AT BOTTOM */}
        <TabsList className="fixed bottom-6 left-1/2 -translate-x-1/2 grid w-100 grid-cols-4">
          <TabsTrigger value="overview"  >Overview</TabsTrigger>
          <TabsTrigger value="Staff">Staff</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

      </Tabs>
    </div>
  </div>
);
}
