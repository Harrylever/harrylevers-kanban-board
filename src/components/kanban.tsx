import { useState } from "react"
import { ICard, ColumnType, IColumn } from "../lib/typings"
import Column from "./column"

const COLUMN_TITLE_MAP: Record<ColumnType, string> = {
  backlog: "Backlog",
  todo: "Todo",
  "in-progress": "In Progress",
  complete: "Complete",
}

const Kanban = () => {
  const [cards, setCards] = useState<ICard[]>(DEFAULT_CARDS)

  const columns: IColumn[] = [
    {
      type: "backlog",
      title: COLUMN_TITLE_MAP["backlog"],
      headingColor: "text-black/80 dark:text-white/80",
      cards,
      setCards,
    },
    {
      type: "todo",
      title: COLUMN_TITLE_MAP["todo"],
      headingColor: "text-amber-600",
      cards,
      setCards,
    },
    {
      type: "in-progress",
      title: COLUMN_TITLE_MAP["in-progress"],
      headingColor: "text-blue-600",
      cards,
      setCards,
    },
    {
      type: "complete",
      title: COLUMN_TITLE_MAP["complete"],
      headingColor: "text-emerald-600",
      cards,
      setCards,
    },
  ]

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex-1 flex gap-5 overflow-x-scroll p-12">
        {columns.map((column) => (
          <Column key={column.type} {...column} column={column} />
        ))}
      </div>
    </div>
  )
}

const DEFAULT_CARDS: ICard[] = [
  { title: "Lock-in like jinwoo", id: "1", column: "backlog" },
  { title: "Complete today's workout session", id: "2", column: "backlog" },
  { title: "Defeat the Demon king, Baran", id: "3", column: "backlog" },
  // Todo
  { title: "Clear tower level 89", id: "4", column: "todo" },
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Farm Aura like Jinwoo", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // In-Progress
  {
    title: "Flex on Guild Masters' Choi and Baek",
    id: "9",
    column: "in-progress",
  },
  // DONE
  {
    title: "Get Hunter Cha to ask me out",
    id: "10",
    column: "complete",
  },
  {
    title: "Complete daily 30 minutes LooksMaxxing session",
    id: "11",
    column: "complete",
  },
]

export default Kanban
