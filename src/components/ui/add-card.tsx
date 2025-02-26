import { FormEvent, Fragment, useState } from "react"
import { motion } from "motion/react"
import { ICard, ColumnType, SetCardsFuncType } from "../../lib/typings"
import { FiPlus } from "react-icons/fi"

interface AddCardProps {
  column: ColumnType
  setCards: SetCardsFuncType
}

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("")
  const [adding, setAdding] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!text.trim().length) return

    const newCard: ICard = {
      id: Math.random().toString(),
      column,
      title: text.trim(),
    }

    setCards((prevCards) => [...prevCards, newCard])
    setAdding(false)
  }

  return (
    <Fragment>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-amber-200 bg-amber-300/20 p-3 text-sm text-black placeholder-black/30 focus:outline-0 font-rubik"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-black/40 transition-colors hover:text-black/60 font-rubik"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300 font-rubik"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-black transition-colors hover:text-black/60 font-rubik"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </Fragment>
  )
}

export default AddCard
