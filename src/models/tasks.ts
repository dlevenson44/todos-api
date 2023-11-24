import dbConfig from '../db/config'
import type { PostTaskPayload, Task } from '../types/tasks'

export const fetchAllTasks = () =>
  dbConfig.query('SELECT * FROM todos ORDER BY id ASC')

export const fetchTaskById = (id: number) =>
  dbConfig.query('SELECT * FROM todos WHERE id = $1', [id])

export const createTask = ({ title, description }: PostTaskPayload) =>
  dbConfig.query(
    'INSERT INTO (title, description, completed) todos VALUES ($1, $2, false)',
    [title, description]
  )

export const updateTask = ({ title, description, completed, id }: Task) =>
  dbConfig.query(
    'UPDATE todos SET title = $1, description = $2, completed = $3, WHERE id = $4',
    [title, description, completed, id]
  )

export const removeTask = (id: number) =>
  dbConfig.query('DELETE FROM todos WHERE id = $1', [id])
