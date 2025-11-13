import { AppSidebar } from "@/components/app-sidebar"
import DashboardNavbar from "@/components/modules/dashboard/dashboardNavbar/DashboardNavbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const CommonDashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <SidebarProvider>
      {/* sidebar  */}
      <AppSidebar />
      <SidebarInset>
        {/* daahsboard navbar  */}
        <DashboardNavbar/>
        {/* main dynamic content  */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CommonDashboardLayout
