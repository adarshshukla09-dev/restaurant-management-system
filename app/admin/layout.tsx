import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { auth } from "@/lib/utils/auth"
import { headers } from "next/headers"
import { ensureRestaurantMember } from "@/lib/ensure-member"
import AdminNavbar from "@/components/admin/dashboard/AdminNavbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Restaurant admin panel",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    await ensureRestaurantMember(session.user.id)
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Page Content */}
        <main className="pb-24">{children}</main>

        {/* Floating Bottom Navbar */}
        <AdminNavbar />
      </body>
    </html>
  )
}