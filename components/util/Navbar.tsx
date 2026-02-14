"use client"

import Link from "next/link"
import { Menu, ShoppingCartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

 function Navbar() {
  return (
    <nav className="max-w-7xl  mx-auto justify-center  border-b bg-background">
      <div className="container  flex  h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
Khana khazan        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/menu" className="text-sm font-medium hover:text-primary">
           Menu
          </Link>
            <Link href="/Cart" className="text-sm font-medium hover:text-primary">
           <ShoppingCartIcon/>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/admin">Dashboard</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/Cart">Cart</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}
export default Navbar