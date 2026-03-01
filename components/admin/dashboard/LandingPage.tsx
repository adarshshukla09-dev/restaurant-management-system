"use client"

import React from "react"
import {
  ShoppingCart,
  Table,
  Users,
  IndianRupee,
} from "lucide-react"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type TypeProps = {
  tableNumber?: number
  TotalOrder?: number
  TotalPay?: number
  TotalMPay?: number
  totalStaff?: number
  monthlyData?: {
    month: string
    orders: number
    revenue: number
  }[]
  weekRevenue?:number
  weekOrder?:number
}
const ordersChartConfig: ChartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
}

const revenueChartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
}
function LandingPage({
  tableNumber,
  TotalOrder,
  TotalPay,
  TotalMPay,
  totalStaff,
  weekRevenue,
  weekOrder,
}: TypeProps) {
const weeklyChartData = [
    {
      name: "Last 7 Days",
      orders: weekOrder ?? 0,
      revenue: weekRevenue ?? 0,
    },
  ]

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Today Orders */}
        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <p className="font-semibold text-gray-600">Total Orders Today</p>
          <p className="text-2xl font-bold mt-2">{TotalOrder ?? 0}</p>
        </div>

        {/* Tables */}
        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <p className="font-semibold text-gray-600">Total Tables</p>
          <p className="text-2xl font-bold mt-2">{tableNumber ?? 0}</p>
        </div>

        {/* Staff */}
        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <p className="font-semibold text-gray-600">Active Staff</p>
          <p className="text-2xl font-bold mt-2">{totalStaff ?? 0}</p>
        </div>

        {/* Today Revenue */}
        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <p className="font-semibold text-gray-600">Today's Revenue</p>
          <p className="text-2xl font-bold mt-2">₹ {TotalPay ?? 0}</p>
        </div>
      </div>

      {/* Weekly Charts */}
    {/* Weekly Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <ChartContainer
    config={ordersChartConfig}
    className="bg-white p-4 rounded-2xl shadow border"
  >
    <BarChart data={weeklyChartData}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="name" />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="orders" fill="var(--color-orders)" radius={10} />
    </BarChart>
  </ChartContainer>

  <ChartContainer
    config={revenueChartConfig}
    className="bg-white p-4 rounded-2xl shadow border"
  >
    <BarChart data={weeklyChartData}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="name" />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={10} />
    </BarChart>
  </ChartContainer>

</div>
    </div>
  )
}

export default LandingPage