import { Outlet } from "react-router-dom"
import Sidebar, { SidebarContextProvider } from "../components/sidebar"
import FloatingMobileMenu from "../components/ui/floating-mobile-menu"
import { ThemeProvider } from "../components/theme-provider"

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarContextProvider>
        <div className="relative flex h-screen w-screen overflow-hidden">
          <Sidebar />

          <div className="w-full overflow-x-hidden overflow-y-auto">
            <Outlet />
          </div>

          <FloatingMobileMenu />
        </div>
      </SidebarContextProvider>
    </ThemeProvider>
  )
}
