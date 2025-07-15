"use client"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { Home, Dumbbell, Settings, Utensils, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <Link href="/">
             <div className="flex items-center gap-2">
                 <Dumbbell className="w-6 h-6 text-primary" />
                 <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">TrackWise</span>
             </div>
           </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton isActive={pathname === '/'} tooltip="Overview">
                  <Home />
                  <span>Overview</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/workouts">
                <SidebarMenuButton isActive={pathname.startsWith('/workouts')} tooltip="Workouts">
                    <Dumbbell />
                    <span>Workouts</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/nutrition">
                <SidebarMenuButton isActive={pathname.startsWith('/nutrition')} tooltip="Nutrition">
                    <Utensils />
                    <span>Nutrition</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/progress">
                    <SidebarMenuButton isActive={pathname.startsWith('/progress')} tooltip="Progress">
                        <TrendingUp />
                        <span>Progress</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                  <Link href="/settings">
                    <SidebarMenuButton isActive={pathname === '/settings'} tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Guest User" data-ai-hint="avatar user" />
                    <AvatarFallback>GU</AvatarFallback>
                </Avatar>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="font-semibold text-sm">Guest User</span>
                    <span className="text-xs text-muted-foreground">guest@trackwise.fit</span>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
         <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
