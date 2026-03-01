import { db } from "@/db"
import { orders, payments } from "@/db/schema"
import { and, eq, gte, lt, sql } from "drizzle-orm"
import { readAllTable } from "../tables/route"
import { getAllUsers } from "../roles/routes"
import { startOfWeek } from "date-fns"

export const todOrder = async () => {
  try {
    // 🔹 Start of today
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const tomorrow = new Date(startOfDay)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // 🔹 Start of month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const nextMonth = new Date(startOfMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    // ✅ Count today's orders
    const todayOrders = await db
      .select({
        count: sql<number>`count(*)`
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, startOfDay),
          lt(orders.createdAt, tomorrow)
        )
      )

    // ✅ Today's revenue (SUCCESS only)
    const todayRevenue = await db
      .select({
        total: sql<number>`coalesce(sum(${payments.amount}),0)`
      })
      .from(payments)
      .where(
        and(
          gte(payments.createdAt, startOfDay),
          lt(payments.createdAt, tomorrow),
          eq(payments.status, "SUCCESS")
        )
      )

    // ✅ Monthly revenue
    const monthlyRevenue = await db
      .select({
        total: sql<number>`coalesce(sum(${payments.amount}),0)`
      })
      .from(payments)
      .where(
        and(
          gte(payments.createdAt, startOfMonth),
          lt(payments.createdAt, nextMonth),
          eq(payments.status, "SUCCESS")
        )
      )

    const allTable = await readAllTable()
    const tabledata =allTable?.data;
    const allStaff = await getAllUsers()

    return {
      data: {
        tableNumber: tabledata?.length ?? 0,
        totalStaff: allStaff?.data?.length ?? 0,
        TotalOrder: todayOrders[0]?.count ?? 0,
        TotalPay: todayRevenue[0]?.total ?? 0,
        TotalMPay: monthlyRevenue[0]?.total ?? 0,
      },
      status: 200,
    }
  } catch (error) {
    return {status:500 , message:error instanceof Error ? error.message : "something went wrong" }
  }
}

export const last7DaysStats = async () => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 6)

    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const ordersCount = await db
      .select({
        count: sql<number>`count(*)`
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, startDate),
          lt(orders.createdAt, tomorrow)
        )
      )

    const revenue = await db
      .select({
        total: sql<number>`coalesce(sum(${payments.amount}),0)`
      })
      .from(payments)
      .where(
        and(
          gte(payments.createdAt, startDate),
          lt(payments.createdAt, tomorrow),
          eq(payments.status, "SUCCESS")
        )
      )

    return {
      data: {
        orders: ordersCount[0]?.count ?? 0,
        revenue: revenue[0]?.total ?? 0,
      },
      status: 200,
    }
  } catch (error) {
    return {status:500 , message:error instanceof Error ? error.message : "something went wrong" }
  }
}