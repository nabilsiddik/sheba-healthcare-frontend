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
import { BriefcaseMedical, CalendarClock, Hospital, ListCheck, NotebookPen, PersonStanding, SquareActivity, Stethoscope, User } from "lucide-react";

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
      icon: <User/>,
      isActive: true,
      items: [
        {
          title: "Admins",
          url: "/admin/dashboard/admins",
          icon: <PersonStanding/>
        },
        {
          title: "Doctors",
          url: "/admin/dashboard/doctors",
          icon: <Stethoscope/>
        },
        {
          title: "Patients",
          url: "/admin/dashboard/patients",
          icon: <SquareActivity/>
        },
      ],
    },
    {
      title: "Hospital Management",
      icon: <Hospital/>,
      isActive: false,
      items: [
        {
          title: "Appointments",
          url: "/admin/dashboard/appointments",
          icon: <NotebookPen/>
        },
        {
          title: "Schedules",
          url: "/admin/dashboard/schedules",
          icon: <CalendarClock/>
        },
        {
          title: "Specialties",
          url: "/admin/dashboard/specialties-management",
          icon: <ListCheck/>
        },
      ],
    }
  ],
  doctorNavItems: [
    {
      title: "User Management",
      icon: <User/>,
      isActive: true,
      items: [
        {
          title: "Admins",
          url: "/admin/dashboard/admins",
          icon: <PersonStanding/>
        },
        {
          title: "Doctors",
          url: "/admin/dashboard/doctors",
          icon: <Stethoscope/>
        },
        {
          title: "Patients",
          url: "/admin/dashboard/patients",
          icon: <SquareActivity/>
        },
      ],
    },
    {
      title: "Hospital Management",
      icon: <Hospital/>,
      isActive: false,
      items: [
        {
          title: "Appointments",
          url: "/admin/dashboard/appointments",
          icon: <NotebookPen/>
        },
        {
          title: "Schedules",
          url: "/admin/dashboard/schedules",
          icon: <CalendarClock/>
        },
        {
          title: "Specialties",
          url: "/admin/dashboard/specialties",
          icon: <ListCheck/>
        },
      ],
    }
  ],
  patientNavItems: [
    {
      title: "User Management",
      icon: <User/>,
      isActive: true,
      items: [
        {
          title: "Admins",
          url: "/admin/dashboard/admins",
          icon: <PersonStanding/>
        },
        {
          title: "Doctors",
          url: "/admin/dashboard/doctors",
          icon: <Stethoscope/>
        },
        {
          title: "Patients",
          url: "/admin/dashboard/patients",
          icon: <SquareActivity/>
        },
      ],
    },
    {
      title: "Hospital Management",
      icon: <Hospital/>,
      isActive: false,
      items: [
        {
          title: "Appointments",
          url: "/admin/dashboard/appointments",
          icon: <NotebookPen/>
        },
        {
          title: "Schedules",
          url: "/admin/dashboard/schedules",
          icon: <CalendarClock/>
        },
        {
          title: "Specialties",
          url: "/admin/dashboard/specialties",
          icon: <ListCheck/>
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
