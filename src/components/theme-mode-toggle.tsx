import { AnimatePresence, motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { FaLaptop } from "react-icons/fa6"
import { Theme, useTheme } from "./theme-provider"
import { useState } from "react"

const MODE_LIST: {
  icon: React.ReactNode
  label: string
  value: Theme
}[] = [
  {
    icon: <FaLaptop size={30} />,
    label: "System",
    value: "system",
  },
  {
    icon: <Sun size={30} />,
    label: "Light",
    value: "light",
  },
  {
    icon: <Moon size={30} />,
    label: "Dark",
    value: "dark",
  },
]

const totalButtons = MODE_LIST.length
const radius = 100
const startAngle = -90
const endAngle = 0
const angleIncrement = (endAngle - startAngle) / (totalButtons - 1)

interface ModeToggleProps {
  canExpand?: boolean
}

const ModeToggle = ({ canExpand = true }: ModeToggleProps) => {
  const { theme, setTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    if (canExpand) {
      setIsExpanded(!isExpanded)
      return
    }
  }

  const handleModeClick = (value: Theme) => {
    setTheme(value)
    setIsExpanded(false)
  }

  const activeThemeIcon = MODE_LIST.find((mode) => mode.value === theme)?.icon

  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        className="z-10 text-white dark:text-white"
        whileTap={{ scale: 0.9 }}
      >
        {activeThemeIcon}
      </motion.button>

      {/* Curved Arc of Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0"
          >
            {MODE_LIST.map((mode, index) => {
              const angle = startAngle + angleIncrement * index
              const radians = (angle * Math.PI) / 180
              const translateX = radius * Math.cos(radians)
              const translateY = radius * Math.sin(radians)

              return (
                <motion.button
                  key={mode.value}
                  id={mode.label}
                  onClick={() => handleModeClick(mode.value)}
                  className="absolute text-white dark:text-white"
                  initial={{ translateX: 0, translateY: 0, opacity: 0 }}
                  animate={{ translateX, translateY, opacity: 1 }}
                  exit={{ translateX: 0, translateY: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {mode.icon}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModeToggle
