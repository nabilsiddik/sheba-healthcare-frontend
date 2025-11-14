"use client"
import { FaRegUser } from "react-icons/fa";
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { IUserInfo } from "@/types/user.types";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBedPulse } from "react-icons/fa6";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  adminNavItems: [
    {
      title: "User Management",
      icon: <FaRegUser />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/admin/dashboard/history",
        },
        {
          title: "Starred",
          url: "/admin/dashboard/starred",
        },
        {
          title: "Settings",
          url: "/admin/dashboard/settings",
        },
      ],
    },
    {
      title: "Doctor Management",
      icon: <FaUserDoctor />,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Patient Management",
      icon: <FaBedPulse />,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    }
  ],
  doctorNavItems: [
    {
      title: "Patient Management",
      icon: <FaRegUser />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Schedule Management",
      icon: <FaRegUser />,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Appointment Management",
      icon: <FaRegUser />,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    }
  ],
  patientNavItems: [
    {
      title: "Appointments",
      icon: <FaRegUser />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Prescriptions",
      icon: <FaRegUser />,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    }
  ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userInfo: IUserInfo
}

export function AppSidebar({ userInfo, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain adminNavItems={data.adminNavItems} doctorNavItems={data.doctorNavItems} patientNavItems={data.patientNavItems} userInfo={userInfo} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
