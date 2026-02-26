"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { UtensilsCrossed, Users, ShieldCheck, Table } from "lucide-react"

function AdminNavbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin/menu", label: "Add Item", icon: UtensilsCrossed },
    { href: "/admin/roles", label: "Roles", icon: ShieldCheck },
    { href: "/admin/tables", label: "tables", icon:Table  },
    { href: "/admin/items", label: "allMenu", icon: Users },
  ]

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2">
      <div className="flex items-center justify-around rounded-2xl border bg-background/80 backdrop-blur-lg shadow-lg px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all px-3 py-2 rounded-xl",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminNavbar