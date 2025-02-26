import { Dispatch, SetStateAction } from "react"

export type ColumnType = "backlog" | "todo" | "in-progress" | "complete"

export type SetCardsFuncType = Dispatch<SetStateAction<ICard[]>>

export interface ICard {
  id: string
  title: string
  column: ColumnType
}

export interface IColumn {
  type: ColumnType
  title: string
  headingColor: string
  cards: ICard[]
  setCards: SetCardsFuncType
}
