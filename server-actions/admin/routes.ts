"use server"

import { db } from "@/db"
import { user } from "@/db/schema"

export const allUser = async ()=>{
     try {
        const all = await db.select().from(user)
        return {sucess:true , data:all}
    } catch (error) {
        console.log(error)
    }
}

export const changeRole = async ()=>{
    try {
        // const 
    } catch (error) {
        console.log(error)
    }
}