"use client"

import * as React from "react"
import {
  Home,
  Folder,
  Settings,
   User2,
  ChevronUp, UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarRail,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {usePathname, useRouter} from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return <button onClick={logout}>Logout</button>;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  items?: NavItem[];
  roles?: string[];   // optional role-based gating
  isActive?: boolean; // manual override if needed
}



export const sidebarNav: {
  navMain: NavItem[];
} = {
  navMain: [
    {
      title: "Organization",
      href: "",
      icon: Home,
      items: [
        {
          title: "Projects",
          href: "projects",
          icon: Folder,
          items: [
            {
              title: "Boards",
              href: "boards",
              items: [
                {
                  title: "Epics",
                  href: "/projects/boards/epics",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Members",
      href: "members",
      icon: User2,
    },
    {
      title: "Teams",
      href: "teams",
      icon: UsersIcon,
    },
    {
      title: "Settings",
      href: "settings",
      icon: Settings,
    },

  ],
};
function SidebarItemTree({ item }: { item: NavItem }) {
  const Icon = item.icon
  const pathname = usePathname()



  const fullHref = item.href.startsWith("/")
      ? item.href
      : `${pathname}/${item.href}`

  return (
      <div className="relative">
        <SidebarMenuButton asChild>
          <a href={fullHref} className="flex items-center gap-2 font-medium">
            {Icon && <Icon className="size-4" />}
            {item.title}
          </a>
        </SidebarMenuButton>

        {item.items && item.items.length > 0 && (
            <SidebarMenuSub>
              <div className="space-y-1">
                {item.items.map((subitem) => (
                    <div key={subitem.title}>
                      <SidebarItemTree item={subitem} />
                    </div>
                ))}
              </div>
            </SidebarMenuSub>
        )}
      </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/*SideBar Header*/}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <span>
                <div className="flex flex-col gap-0.5 leading-none">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="inline align-middle mr-2"
                        priority
                    />
                </div>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/*SideBar Content*/}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarNav.navMain.map((item) => (
                <SidebarItemTree key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/*SideBar Footer*/}
      {/*WIP add connection to actual user, and profuil pic*/}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {/*Profile pic, and email here*/}
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutButton/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
