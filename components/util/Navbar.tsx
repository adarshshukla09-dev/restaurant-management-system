"use client"

import Link from "next/link"
import { Flame, ListOrdered, Menu, MenuSquare, ShoppingCartIcon } from "lucide-react"

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
import { useTable } from "@/context/tableContext"
import { useEffect, useState } from "react"

function Navbar() {
  // const { tableId } = useTable()
   const [tableId, setTableId] = useState<string | null>(null)

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId")
    setTableId(storedTableId)
  }, [])

  return (
    <nav className="max-w-7xl mx-auto justify-center border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Khana Khazan
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={`./menu?table=${tableId}`} className="text-sm font-medium hover:text-primary">
                     <div className="flex text-center font-sans">Menu<MenuSquare className="hover:text-red-400" /> </div>
          </Link>

          <Link href={`./order?table=${tableId}`} className="text-sm font-medium hover:text-primary">
             <div className="flex text-center font-sans">Order      <ListOrdered size={24} className="hover:text-purple-500" /></div>
          </Link>

          <Link href={`./Cart?table=${tableId}`} className="text-sm font-medium hover:text-primary">
            <div className="flex text-center gap-2 font-sans">Cart <ShoppingCartIcon className="hover:text-green-500" /></div>
          </Link>
           <Link href={`./kitchen`} className="text-sm font-medium hover:text-primary">
                     <div className="flex text-center  font-sans">kitchen<Flame className="hover:text-orange-500"/>
                     </div>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
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
                <Link href="/menu">Menu</Link>
                <Link href="/order">Order</Link>
                <Link href="/Cart">Cart</Link>
                <Link href="/admin">Dashboard</Link>
                <Link href="/pricing">Pricing</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}

export default Navbar