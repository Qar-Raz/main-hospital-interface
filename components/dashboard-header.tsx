"use client";

import { Bell, MessageSquare, Search, Menu, Home, SquareActivity } from "lucide-react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/40 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:border-gray-800/40 dark:bg-gray-900/60 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Title (Replaced text with SeaView Clinic Button) */}
        <div className="flex items-center gap-2 md:gap-2 shrink-0">
            {/* Mobile Menu Trigger (hidden on desktop) */}
            <Button variant="ghost" size="icon" className="md:hidden text-gray-500">
                <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" passHref>
                <Button variant="outline" className="hidden md:flex items-center gap-2 pl-2 pr-4 py-1.5 h-auto border-gray-200/60 bg-white/50 hover:bg-blue-50/50 hover:border-blue-200 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-gray-100 font-semibold text-base tracking-tight rounded-2xl transition-all duration-300 shadow-sm">
                     <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400">
                        <SquareActivity className="h-5 w-5" />
                     </div>
                     SeaView Clinic
                </Button>
                {/* Mobile version just icon */}
                <Button variant="ghost" size="icon" className="md:hidden text-blue-600 dark:text-blue-400">
                     <SquareActivity className="h-6 w-6" />
                </Button>
            </Link>
        </div>

        {/* Center Section: Global Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
            <input
                type="text"
                placeholder="Search doctors, records, messages..."
                className={cn(
                    "block w-full pl-10 pr-4 py-2.5",
                    "bg-gray-100/50 border border-transparent rounded-2xl",
                    "text-sm text-gray-900 placeholder-gray-500",
                    "focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100",
                    "transition-all duration-300 ease-in-out shadow-sm",
                    "dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-800 dark:focus:border-blue-700 dark:focus:ring-blue-900/30"
                )}
            />
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Search Icon for Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden text-gray-500 rounded-full">
                <Search className="h-5 w-5" />
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-all duration-300"
            >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-all duration-300 hidden sm:inline-flex"
            >
                <MessageSquare className="h-5 w-5" />
            </Button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 sm:mx-2 hidden sm:block"></div>

            <div className="flex items-center">
                <SignedIn>
                    <div className="rounded-full ring-2 ring-transparent hover:ring-blue-100 transition-all p-0.5">
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "h-9 w-9 ring-1 ring-gray-200 dark:ring-gray-700"
                                }
                            }}
                            afterSignOutUrl="/"
                        />
                    </div>
                </SignedIn>
                <SignedOut>
                     <SignInButton mode="modal">
                        <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 ">
                            Sign In
                        </Button>
                     </SignInButton>
                </SignedOut>
            </div>
        </div>
      </div>
    </header>
  );
}
