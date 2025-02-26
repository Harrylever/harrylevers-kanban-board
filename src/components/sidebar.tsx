import {
  ComponentProps,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { cn } from "../lib/utils"
import { motion } from "motion/react"
import { CgMenuRight } from "react-icons/cg"
import ModeToggle from "./theme-mode-toggle"
import InitialsAvatar from "./ui/initials-avatar"
import { useIsMobile } from "../hooks/use-is-mobile"

interface SidebarContextProps {
  open: boolean
  setOpen: (value: boolean) => void
  openMobile: boolean
  setOpenMobile: (value: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }

  return context
}

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(true)
  const [openMobile, setOpenMobile] = useState(true)
  const isMobile = useIsMobile()

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, openMobile])

  const contextValue: SidebarContextProps = useMemo(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [open, openMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

const SidebarContainer = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {
    openMobile?: boolean
    onOpenMobileChange?: (value: boolean) => void
  }
>(({ children, id }, ref) => {
  const { open, openMobile, toggleSidebar } =
    useSidebarContext()

  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <motion.div
        id={id}
        ref={ref}
        role="menu"
        initial={{ width: 0 }}
        animate={openMobile ? { width: "256px" } : { width: 0 }}
        transition={{ duration: 0.4 }}
        className={cn("h-screen z-[100] bg-gray-800 fixed top-0 left-0 overflow-hidden")}
      >
        <div className="flex items-center justify-end p-3.5 pb-0">
          <button type="button" onClick={toggleSidebar}>
            <CgMenuRight size={26} className="text-gray-200" />
          </button>
        </div>
        <div className="flex-1 h-full w-full">{children}</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      id={id}
      ref={ref}
      role="menu"
      initial={{ width: 0 }}
      animate={
        open
          ? { width: "256px", minWidth: "256px" }
          : { width: "80px", minWidth: "80px" }
      }
      transition={{ duration: 0.4 }}
      className={cn("h-screen bg-gray-800 relative")}
    >
      {open ? (
        <>
          <div className="flex items-center justify-end p-3.5 pb-0">
            <button type="button" onClick={toggleSidebar}>
              <CgMenuRight size={26} className="text-gray-200" />
            </button>
          </div>
          <div className="flex-1 h-full w-full">{children}</div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-between p-3.5 pb-6 gap-3.5">
          <div className="flex flex-col items-center gap-3.5">
            <button type="button" onClick={toggleSidebar}>
              <CgMenuRight size={26} className="text-gray-200" />
            </button>

            <InitialsAvatar initials="HL" />
          </div>

          <ModeToggle canExpand={false} />
        </div>
      )}
    </motion.div>
  )
})
SidebarContainer.displayName = "SidebarContainer"

const Sidebar = () => {
  return (
    <SidebarContainer id="sidebar">
      <div className="relative flex flex-col justify-between flex-1 h-full w-full p-3.5 gap-6 pb-14">
        <div>
          <WorkspaceTitleButton />
        </div>

        <div>
          <ModeToggle />
        </div>
      </div>
    </SidebarContainer>
  )
}

const WorkspaceTitleButton = () => {
  return (
    <div className="w-full flex items-center gap-3 p-2 rounded-lg border-[0.5px] border-white/40 bg-black/10 cursor-pointer">
      <InitialsAvatar initials="HL" />
      <h2 className="font-rubik whitespace-nowrap text-white dark:text-white">
        Harrylever&rsquo;s Kanban
      </h2>
    </div>
  )
}



export default Sidebar
