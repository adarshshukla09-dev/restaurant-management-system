// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  ListOrdered,
  Menu,
  MenuSquare,
  ShoppingCartIcon,
  Wallet,
  ChefHat,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/utils/auth-client";
import { getRestaurantMembers } from "@/server-actions/admin/roles/routes";

function Navbar() {
  const [tableId, setTableId] = useState<string | null>(null);
  const [role, setRole] = useState<any>([]);
  const pathname = usePathname();

  const { data } = authClient.useSession();

  const user = data?.user;
  const userImage =
    user?.image ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "default"}`;
const userId=user?.id
  useEffect(() => {
    if (!user?.id) return;

    const allUser = async () => {
      const all = await getRestaurantMembers();
      const data = all.data;
      const fil = data.find((mem) => mem.userId === user?.id);

      if (fil) setRole(fil.role);
    };
    const storedTableId = localStorage.getItem("tableId");
    allUser();
    setTableId(storedTableId);
  }, [userId]);

  // Helper for active link styling
  const isActive = (path: string) => pathname.includes(path);

 const baseLinks = [
  {
    name: "Menu",
    href: "/menu",
    icon: MenuSquare,
    color: "hover:text-orange-500",
  },
  {
    name: "Order",
    href: "/order",
    icon: ListOrdered,
    color: "hover:text-purple-500",
  },
  {
    name: "Cart",
    href: "/Cart",
    icon: ShoppingCartIcon,
    color: "hover:text-emerald-500",
  },
];

const navLinks = [
  ...baseLinks,
  ...(role === "ADMIN" || role === "KITCHEN"
    ? [
        {
          name: "Kitchen",
          href: "/kitchen",
          icon: Flame,
          color: "hover:text-rose-500",
        },
      ]
    : []),
  ...(role === "ADMIN" || role === "CASHIER"
    ? [
        {
          name: "Cashier",
          href: "/cashier",
          icon: Wallet,
          color: "hover:text-blue-500",
        },
      ]
    : []),
  ...(role === "ADMIN"
    ? [
        {
          name: "Admin",
          href: "/admin",
          icon: LayoutDashboard,
          color: "hover:text-green-500",
        },
      ]
    : []),
];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 mb-10  px-4 py-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto h-16 rounded-2xl border border-white/20 bg-white/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] px-6 flex items-center justify-between pointer-events-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <ChefHat className="text-white size-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 italic">
            KHANA <span className="text-orange-500">KHAZANA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const fullHref =
              tableId &&
              !link.href.includes("kitchen") &&
              !link.href.includes("cashier")
                ? `${link.href}?table=${tableId}`
                : link.href;

            return (
              <Link key={link.name} href={fullHref}>
                <Button
                  variant="ghost"
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500"
                  } ${link.color}`}
                >
                  <Icon size={18} strokeWidth={isActive(link.href) ? 2.5 : 2} />
                  <span className="text-sm font-bold tracking-tight">
                    {link.name}
                  </span>
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                  )}
                </Button>
              </Link>
            );
          })}

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <div className="relative h-10 w-10 rounded-xl overflow-hidden cursor-pointer border-2 border-white shadow-sm hover:scale-105 transition-all active:scale-95">
                  <img
                    src={userImage}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <Link href="/register">
                  <Button className="bg-slate-900 text-white hover:bg-orange-500 rounded-xl px-6 font-bold shadow-lg shadow-slate-200 transition-all">
                    Login
                  </Button>
                </Link>
              )}
            </DropdownMenuTrigger>

            {user && (
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl p-2 border-slate-100 shadow-2xl"
              >
                <DropdownMenuLabel className="flex flex-col p-3">
                  <span className="text-sm font-bold text-slate-900">
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-2 font-medium">
                  <User size={16} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-2 font-medium">
                  <LayoutDashboard size={16} /> Admin Panel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => authClient.signOut()}
                  className="rounded-lg py-2 cursor-pointer gap-2 font-medium text-rose-500 focus:bg-rose-50 focus:text-rose-600"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <div className="h-8 w-8 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={userImage}
                alt="User"
                className="object-cover h-full w-full"
              />
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-slate-50 text-slate-900"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-87.5 border-none rounded-l-[3rem]"
            >
              <SheetHeader className="text-left mb-10">
                <SheetTitle className="text-3xl font-black italic">
                  MENU
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="group">
                    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-md transition-all`}
                        >
                          <link.icon className="text-slate-600" size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-800">
                          {link.name}
                        </span>
                      </div>
                      <ArrowRightIcon
                        className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                        size={18}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default Navbar;
