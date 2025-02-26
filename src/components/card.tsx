import { Fragment } from "react"
import { motion } from "motion/react"
import { ICard } from "../lib/typings"
import DropIndicator from "./ui/drop-indicator"

interface CardProps extends ICard {
  handleDragStart: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any,
    props: ICard
  ) => void
}

const Card = ({ id, title, column, handleDragStart }: CardProps) => {
  return (
    <Fragment>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-black/10 bg-blue-500 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-white font-rubik">{title}</p>
      </motion.div>
    </Fragment>
  )
}

export default Card
