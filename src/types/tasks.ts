export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export interface PostTaskPayload extends Omit<Task, 'id' | 'completed'> {
  id?: string
}
