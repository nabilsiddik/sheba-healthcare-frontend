"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { IUserInfo } from "@/types/user.types"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface INavItems {
  title: string,
  icon: React.ReactElement,
  isActive: boolean,
  items: INavItem[]
}

interface INavItem {
  title: string,
  url: string
}

type NavMainProps = {
  adminNavItems: INavItems[]
  doctorNavItems: INavItems[]
  patientNavItems: INavItems[]
  userInfo: IUserInfo
}


export function NavMain({ adminNavItems, doctorNavItems, patientNavItems, userInfo }: NavMainProps) {
  const pathName = usePathname()
  console.log(pathName)
  let navItems: INavItems[] | null = null

  if (userInfo.role === 'ADMIN') {
    navItems = adminNavItems
  } else if (userInfo.role === 'DOCTOR') {
    navItems = doctorNavItems
  } else if (userInfo.role === 'PATIENT') {
    navItems = patientNavItems
  }

  return (
    <SidebarGroup className="mt-5">
      <SidebarMenu>
        {navItems && navItems.length > 0 && navItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="cursor-pointer font-medium text-gray-700 text-md" tooltip={item.title}>
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem id="sidebarMenuSubItem" key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link className={`${subItem.url === pathName && 'bg-primary'} rounded-md py-5 px-3 font-medium`} href={subItem.url}>
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
