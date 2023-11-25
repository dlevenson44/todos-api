import type { Request, Response } from 'express'

import isEmpty from 'lodash/isEmpty'
import type { QueryResult } from 'pg'

import {
  fetchAllTasks,
  fetchTaskById,
  createTask,
  updateTask,
  removeTask,
} from '../models/tasksModel'
import type { PostTaskPayload, Task } from '../types/tasks'

export const getTasks = (_req: Request, res: Response) =>
  fetchAllTasks()
    .then((result: QueryResult<Task>) =>
      res.status(200).json({ data: result.rows })
    )
    .catch((err) => {
      res.status(500).json({ err, message: 'Error fetching all tasks' })
    })

export const getTaskById = (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id))
  fetchTaskById(id)
    .then((result: QueryResult) =>
      isEmpty(result.rows)
        ? res.status(404).json({
            message: `Task ID ${id} was not found in DB`,
          })
        : res.status(200).json({ data: result.rows[0] })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ err, message: `Error fetching task with id ${id}` })
    )
}

export const postTask = (req: Request<PostTaskPayload>, res: Response) => {
  const { title, description } = req.body

  if (!title || !description || title.length > 255) {
    res.status(400).json({
      message:
        'Bad payload: title AND description are required to create new task',
    })
  } else {
    createTask({ title, description })
      .then((result: QueryResult<Task>) => res.status(201).json({ result }))
      .catch((err) => {
        res.status(500).json({ err, message: 'Error creating task' })
      })
  }
}

export const putTask = (req: Request<Task>, res: Response) => {
  const id = parseInt(String(req.params.id))
  const { title, description, completed } = req.body
  updateTask({ title, description, completed, id })
    .then((result: QueryResult<Task>) =>
      isEmpty(result.rows)
        ? res.status(404).json({
            message: `Task ID ${id} was not found in DB`,
          })
        : res.status(200).json({ result })
    )
    .catch((err) => {
      res.status(500).json({
        err,
        message: `Error updating task with id ${id}`,
      })
    })
}

export const deleteTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  removeTask(id)
    .then((result) =>
      isEmpty(result.rows)
        ? res.status(404).json({
            message: `Task ID ${id} was not found in DB`,
          })
        : res.status(200).json({ message: `Task ${id} has been removed` })
    )
    .catch((err) => {
      res.status(500).json({
        err,
        message: `Error deleting task with id ${id}`,
      })
    })
}
