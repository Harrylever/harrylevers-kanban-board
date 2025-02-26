import { MdMenu } from "react-icons/md"
import { useSidebarContext } from "../sidebar"
import { useIsMobile } from "../../hooks/use-is-mobile"
import { useMemo } from "react"

const FloatingMobileMenu = () => {
  const { openMobile, toggleSidebar } = useSidebarContext()
  const isMobile = useIsMobile()

  const shouldDisplay = useMemo(
    () => isMobile && !openMobile,
    [isMobile, openMobile]
  )

  return shouldDisplay ? (
    <button
      type="button"
      onClick={toggleSidebar}
      className="fixed bottom-10 right-10 w-[60px] h-[60px] rounded-full bg-amber-600 text-white flex items-center justify-center"
    >
      <MdMenu size={30} />
    </button>
  ) : null
}

export default FloatingMobileMenu
