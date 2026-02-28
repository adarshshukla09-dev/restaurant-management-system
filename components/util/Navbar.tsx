"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
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
  ArrowRight
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
import { authClient } from "@/lib/utils/auth-client";
import { getRestaurantMembers } from "@/server-actions/admin/roles/routes";

function Navbar() {
  const [tableId, setTableId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // Changed from [] to null
  const pathname = usePathname();

  const { data } = authClient.useSession();
  const user = data?.user;
  
  const userImage = user?.image || 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "default"}`;

  useEffect(() => {
    const initNavbar = async () => {
      // 1. Handle Table ID
      const storedTableId = localStorage.getItem("tableId");
      if (storedTableId) setTableId(storedTableId);

      // 2. Handle Roles
      if (user?.id) {
        try {
          const all = await getRestaurantMembers();
          const member = all.data?.find((mem) => mem.userId === user.id);
          if (member) setRole(member.role);
        } catch (error) {
          console.error("Failed to fetch roles:", error);
        }
      }
    };

    initNavbar();
  }, [user?.id]);

  const isActive = (path: string) => pathname.startsWith(path);

  // Memoize links so they only update when role or tableId changes
  const navLinks = useMemo(() => {
    const base = [
      { name: "Menu", href: "/menu", icon: MenuSquare, color: "hover:text-orange-500" },
      { name: "Order", href: "/order", icon: ListOrdered, color: "hover:text-purple-500" },
      { name: "Cart", href: "/Cart", icon: ShoppingCartIcon, color: "hover:text-emerald-500" },
    ];

    const adminLinks = [];
    if (role === "ADMIN" || role === "KITCHEN") {
      adminLinks.push({ name: "Kitchen", href: "/kitchen", icon: Flame, color: "hover:text-rose-500" });
    }
    if (role === "ADMIN" || role === "CASHIER") {
      adminLinks.push({ name: "Cashier", href: "/cashier", icon: Wallet, color: "hover:text-blue-500" });
    }
    if (role === "ADMIN") {
      adminLinks.push({ name: "Admin", href: "/admin", icon: LayoutDashboard, color: "hover:text-green-500" });
    }

    return [...base, ...adminLinks].map(link => ({
      ...link,
      // Apply tableId query param where applicable
      fullHref: tableId && !["/kitchen", "/cashier", "/admin"].some(p => link.href.includes(p))
        ? `${link.href}?table=${tableId}`
        : link.href
    }));
  }, [role, tableId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-100 px-4 py-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto h-16 rounded-2xl border border-white/20 bg-white/80 backdrop-blur-md shadow-lg px-6 flex items-center justify-between pointer-events-auto">
        
        {/* Logo */}
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
          {navLinks.map((link) => (
            <Link key={link.name} href={link.fullHref}>
              <Button
                variant="ghost"
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive(link.href) ? "bg-slate-100 text-slate-900" : "text-slate-500"
                } ${link.color}`}
              >
                <link.icon size={18} strokeWidth={isActive(link.href) ? 2.5 : 2} />
                <span className="text-sm font-bold tracking-tight">{link.name}</span>
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                )}
              </Button>
            </Link>
          ))}

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <div className="relative h-10 w-10 rounded-xl overflow-hidden cursor-pointer border-2 border-white shadow-sm hover:scale-105 transition-all">
                  <img src={userImage} alt="User" className="h-full w-full object-cover" />
                </div>
              ) : (
                <Link href="/register">
                  <Button className="bg-slate-900 text-white hover:bg-orange-500 rounded-xl px-6 font-bold transition-all">
                    Login
                  </Button>
                </Link>
              )}
            </DropdownMenuTrigger>

            {user && (
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl">
                <DropdownMenuLabel className="flex flex-col p-3">
                  <span className="text-sm font-bold text-slate-900">{user.name}</span>
                  <span className="text-xs text-slate-400">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                   <Link href="/profile" className="flex items-center gap-2"><User size={16} /> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => authClient.signOut()} className="rounded-lg cursor-pointer gap-2 text-rose-500 focus:bg-rose-50">
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 rounded-l-[2rem]">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-2xl font-black italic">NAVIGATE</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.fullHref} className="group">
                    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-sm">
                          <link.icon className="text-slate-600" size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-800">{link.name}</span>
                      </div>
                      <ArrowRight className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={18} />
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

export default Navbar;