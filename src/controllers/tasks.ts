import type { Request, Response } from 'express'
import type { QueryResult } from 'pg'

import {
    fetchAllTasks,
    fetchTaskById,
    createTask,
    updateTask,
    removeTask,
} from '../models/tasks'
import type { PostTaskPayload, Task } from '../types/tasks'

export const getTasks = (_req: Request, res: Response) =>
    fetchAllTasks()
        .then((result: QueryResult<Task>) => res.status(200).json({ data: result.rows  }))
        .catch((err) => {
          console.log('ERROR:   ', err)
            res.status(500).json({ err, message: 'Error fetching all tasks' })
        })

export const getTaskById = (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id))
  fetchTaskById(id)
    .then((result: QueryResult<Task>) => res.status(200).json({ data: result }))
    .catch((err) => {
      console.log('ERROR:   ', err)
      res.status(500).json({ err, message: `Error fetching task with id ${id}`})
    })
}

export const postTask = (req: Request<PostTaskPayload>, res: Response) => {
  const { title, description } = req.body
  createTask({ title, description })
    .then((result: QueryResult<Task>) => res.status(201).json({ result }))
    .catch((err) => {
      console.log('ERROR:   ', err)
      res.status(500).json({ err, message: 'Error creating task'})
    })
}

export const putTask = (req: Request<Task>, res: Response) => {
  const id = parseInt(String(req.params.id))
  const { title, description, completed } = req.body
  updateTask({ title, description, completed, id })
    .then((result: QueryResult<Task>) => res.status(200).json({ result }))
    .catch((err) => {
      console.log('ERROR:   ', err)
      res.status(500).json({ err, message: `Error updating task with id ${id}` })
    })
}

export const deleteTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  removeTask(id)
    .then(() => res.status(200).json({ message: `Task ${id} has been removed`}))
    .catch((err) => {
      console.log('ERROR:   ', err)
      res.status(500).json({ err, message: `Error updating task with id ${id}` })
    })
}
