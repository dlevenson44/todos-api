import DB from '../db'
import type { PostTaskPayload, Task } from '../types/tasks'

export const fetchAllTasks = () =>
    DB.query('SELECT * FROM todos ORDER BY id ASC')

export const fetchTaskById = (id: number) =>
    DB.query('SELECT * FROM todos WHERE id = $1', [id])

export const createTask = ({ title , description }: PostTaskPayload) =>
    DB.query(
        'INSERT INTO (title, description, completed) todos VALUES ($1, $2, false)',
        [title, description]
    )

export const updateTask = ({
    title,
    description,
    completed,
    id,
}: Task) =>
    DB.query(
        'UPDATE todos SET title = $1, description = $2, completed = $3, WHERE id = $4',
        [title, description, completed, id]
    )

export const removeTask = (id: number) =>
    DB.query('DELETE FROM todos WHERE id = $1', [id])
