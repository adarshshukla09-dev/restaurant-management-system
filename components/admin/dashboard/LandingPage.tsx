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

function LandingPage() {
  const chartData = [
    { month: "January", orders: 120, revenue: 8000 },
    { month: "February", orders: 210, revenue: 14000 },
    { month: "March", orders: 170, revenue: 11000 },
    { month: "April", orders: 90, revenue: 7000 },
    { month: "May", orders: 240, revenue: 18000 },
    { month: "June", orders: 200, revenue: 15000 },
  ]

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "#2563eb",
    },
    revenue: {
      label: "Revenue",
      color: "#16a34a",
    },
  } satisfies ChartConfig

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-600">Total Orders Today</p>
            <ShoppingCart className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">25</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-600">Total Tables</p>
            <Table className="text-green-500" />
          </div>
          <p className="text-2xl font-bold mt-2">7</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-600">Active Staff</p>
            <Users className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-600">Today's Revenue</p>
            <IndianRupee className="text-red-500" />
          </div>
          <p className="text-2xl font-bold mt-2">₹18,540</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Orders Chart */}
        <ChartContainer config={chartConfig} className="min-h-75 w-full bg-white p-4 rounded-2xl shadow border">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
          </BarChart>
        </ChartContainer>

        {/* Revenue Chart */}
        <ChartContainer config={chartConfig} className="min-h-75 w-full bg-white p-4 rounded-2xl shadow border">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>

      </div>

    </div>
  )
}

export default LandingPage