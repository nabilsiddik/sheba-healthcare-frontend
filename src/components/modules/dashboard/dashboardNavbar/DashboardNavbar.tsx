import { getUserInfo } from "@/services/auth/getUserInfo"
import { IUserInfo } from "@/types/user.types"
import DashboardNavbarContent from "./DashboardNavbarContent"

const DashboardNavbar = async() => {

  const userInfo: IUserInfo | null = await getUserInfo() 

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="w-full">
        <DashboardNavbarContent userInfo = {userInfo}/>
      </div>
    </header>
  )
}

export default DashboardNavbar
