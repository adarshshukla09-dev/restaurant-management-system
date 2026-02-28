import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/util/Navbar";
import { CartProvider } from "@/context/CartContext";
import { TableProvider } from "@/context/tableContext";
import { Toaster } from "sonner";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";
import { ensureRestaurantMember } from "@/lib/ensure-member";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DineFlow | Smart Restaurant Management",
  description: "Manage orders, tables, and staff seamlessly.",
};

// Recommended for responsive SaaS apps
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side session & member validation
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    // This ensures roles are initialized in the DB before the app renders
    await ensureRestaurantMember(session.user.id);
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <TableProvider>
          <CartProvider>
            <Navbar />
            
            <main className="min-h-screen pt-24 md:pt-28">
              {children}
            </main>
            <Toaster position="top-right" richColors />
          </CartProvider>
        </TableProvider>
      </body>
    </html>
  );
}