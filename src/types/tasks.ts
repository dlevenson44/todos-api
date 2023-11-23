export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export type PostTaskPayload = Omit<Task, 'id' | 'completed'>
