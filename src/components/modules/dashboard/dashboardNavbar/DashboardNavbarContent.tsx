import DashboardNavbarSearch from "@/components/modules/dashboard/dashboardNavbar/DashboardNavbarSearch"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IUserInfo } from "@/types/user.types"
import DashboardNavbarProfile from "./dashboardNavbarProfile"
import Link from "next/link"

interface DashbaordNavbarContentProps {
  userInfo: IUserInfo | null
}

const DashboardNavbarContent = ({ userInfo }: DashbaordNavbarContentProps) => {
  return (
    <div className="flex items-center justify-between gap-2 px-4">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div className="flex flex-10 items-center justify-between gap-10">
        <div className="flex-1 flex justify-start">
          <Link href={'/'}>
            <h2 className="font-bold text-2xl text-primary">Sheba</h2>
          </Link>
        </div>
        <div className="flex-10">
          <DashboardNavbarSearch />
        </div>
        <div className="flex-5 flex justify-end">
          <DashboardNavbarProfile/>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbarContent
