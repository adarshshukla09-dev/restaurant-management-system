"use client";

import Link from "next/link";
import {
  Flame,
  ListOrdered,
  Menu,
  MenuSquare,
  ShoppingCartIcon,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTable } from "@/context/tableContext";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/utils/auth-client";
import Image from "next/image";

function Navbar() {
  const [tableId, setTableId] = useState<string | null>(null);
  const { data } = authClient.useSession();

  const user = data?.user;
  const image = user?.image
    ? user?.image
    : ` https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg`;
  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId");
    setTableId(storedTableId);
  }, []);

  return (
    <nav className="max-w-7xl mx-auto my-3 rounded-2xl  justify-center border-b bg-background">
      <div className="container  flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Khana Khazan
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href={tableId ? `./menu?table=${tableId}` : "./menu"}
            className="text-sm font-medium hover:text-primary"
          >
            <div className="flex text-center font-sans">
              Menu
              <MenuSquare className="hover:text-red-400" />{" "}
            </div>
          </Link>

          <Link
            href={tableId ? `./order?table=${tableId}` : "./order"}
            className="text-sm font-medium hover:text-primary"
          >
            <div className="flex text-center font-sans">
              Order <ListOrdered size={24} className="hover:text-purple-500" />
            </div>
          </Link>

          <Link
            href={tableId ? `./Cart?table=${tableId}` : "./Cart"}
            className="text-sm font-medium hover:text-primary"
          >
            <div className="flex text-center gap-2 font-sans">
              Cart <ShoppingCartIcon className="hover:text-green-500" />
            </div>
          </Link>
          <Link
            href={`./kitchen`}
            className="text-sm font-medium hover:text-primary"
          >
            <div className="flex text-center  font-sans">
              kitchen
              <Flame className="hover:text-orange-500" />
            </div>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <div className="relative h-9 w-9 rounded-full overflow-hidden cursor-pointer border border-gray-300 hover:scale-105 transition-transform duration-200">
                  <img
                    src={image}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <Link href="/register">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </DropdownMenuTrigger>

            {user && (
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => authClient.signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
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
  );
}

export default Navbar;
