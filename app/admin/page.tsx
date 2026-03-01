import { headers } from "next/headers"
import { auth } from "@/lib/utils/auth"
import { requireAdmin } from "@/server-actions/admin/auth/route"
import React from "react"
import { redirect } from "next/navigation"
import { last7DaysStats, todOrder } from "@/server-actions/admin/others/route"
import LandingPage from "@/components/admin/dashboard/LandingPage"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/register")
  }

  await requireAdmin()

  const today = await todOrder()
 const week = await last7DaysStats();
  if (!today?.data) {
    return <div>Error loading dashboard</div>
  }

  const data = today.data
const data2 =week.data;
  return (
    <LandingPage
      tableNumber={data.tableNumber}
      totalStaff={data.totalStaff}
      TotalOrder={data.TotalOrder}
      TotalPay={data.TotalPay}
      TotalMPay={data.TotalMPay}
      weekRevenue={data2?.revenue}
      weekOrder={data2?.orders}
    />
  )
}