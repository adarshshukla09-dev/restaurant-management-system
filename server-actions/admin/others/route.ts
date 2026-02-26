import { db } from "@/db"
import { orders } from "@/db/schema"
import { and, eq, gte, lt } from "drizzle-orm"

export const todOrder = async()=>{
    try {
       

  const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const tomorrow = new Date(startOfDay)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const data = await db
      .select()
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, startOfDay),
          lt(orders.createdAt, tomorrow)
        )
      )
              console.log(data)
    } catch (error) {
        console.log(error)
    }
}