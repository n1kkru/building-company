export type TStatus = "not considered" | "done" | "rejected"

export type TReport = {
  id: number
  title: string
  text: string
  email: string
  date: string
  status: TStatus
  objectName: string
}

export type TObject = {
  id: number
  name: string
  date: string
  total: number
}