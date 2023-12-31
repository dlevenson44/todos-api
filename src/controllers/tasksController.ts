import type { Request, Response } from 'express'

import isEmpty from 'lodash/isEmpty'
import type { QueryResult } from 'pg'

import { generateServerError, generateClientError } from '../helpers/errors'
import {
  fetchAllTasks,
  fetchTaskById,
  createTask,
  updateTask,
  removeTask,
} from '../models/task'
import type { PostTaskPayload, Task } from '../types/tasks'

export const getTasks = (_req: Request, res: Response) =>
  fetchAllTasks()
    .then((result: QueryResult<Task>) =>
      res.status(200).json({ data: result.rows })
    )
    .catch((err) => generateServerError({ res, action: 'fetching', err }))

export const getTaskById = (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id))
  fetchTaskById(id)
    .then((result: QueryResult) =>
      isEmpty(result.rows)
        ? generateClientError({ res, action: 'fetching', id, status: 404 })
        : res.status(200).json({ data: result.rows[0] })
    )
    .catch((err) => generateServerError({ res, action: 'fetching', err, id }))
}

export const postTask = (req: Request<PostTaskPayload>, res: Response) => {
  const { title, description } = req.body

  if (!title || !description || title?.length > 255) {
    const messageDetails = title?.length
      ? 'Title length too long'
      : 'Missing Title or Description field'
    generateClientError({
      res,
      action: 'creating',
      status: 400,
      messageDetails,
    })
  } else {
    createTask({ title, description })
      .then((result: QueryResult<Task>) =>
        res.status(201).json({ data: result.rows[0] })
      )
      .catch((err) => generateServerError({ res, action: 'creating', err }))
  }
}

export const putTask = (req: Request<Task>, res: Response) => {
  const id = parseInt(String(req.params.id))
  const { title, description, completed } = req.body

  if (!title || !description || title?.length > 255) {
    const messageDetails =
      title.length > 255
        ? 'Title length too long'
        : 'Missing Title and/or Description field'
    generateClientError({
      res,
      action: 'updating',
      status: 400,
      messageDetails,
    })
  } else {
    updateTask({ title, description, completed, id })
      .then((result: QueryResult<Task>) =>
        isEmpty(result.rows)
          ? generateClientError({ res, action: 'updating', id, status: 404 })
          : res.status(200).json({ result })
      )
      .catch((err) => generateServerError({ res, action: 'updating', err, id }))
  }
}

export const deleteTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  removeTask(id)
    .then((result) =>
      !result.rowCount
        ? generateClientError({ res, action: 'deleting', id, status: 404 })
        : res.status(200).json({ message: `Task ${id} has been removed` })
    )
    .catch((err) => generateServerError({ res, action: 'deleting', err, id }))
}
