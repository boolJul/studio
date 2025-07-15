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
import { Home, Dumbbell, Settings } from 'lucide-react';

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Dumbbell className="w-6 h-6 text-primary" />
             <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">TrackWise</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <SidebarMenuButton isActive={pathname === '/'} tooltip="Dashboard">
                        <Home />
                        <span>Dashboard</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/workouts" legacyBehavior passHref>
                    <SidebarMenuButton isActive={pathname.startsWith('/workouts')} tooltip="Workouts">
                        <Dumbbell />
                        <span>Workouts</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                     <Link href="/settings" legacyBehavior passHref>
                        <SidebarMenuButton isActive={pathname === '/settings'} tooltip="Settings">
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
         <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold capitalize">{pathname.split('/').pop() || 'Dashboard'}</h1>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
