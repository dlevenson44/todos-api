import type { Request, Response } from 'express'
import type { QueryResult } from 'pg'

import DB from '../db'

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

export const fetchAllTasks = (_req: Request, resp: Response) => {
  DB.query('SELECT * FROM todos ORDER BY id ASC',
    (err: Record<string, any>, results: QueryResult) => {
      if (err) throw err
      resp.status(200).json(results.rows)
    }
  )
}

export const fetchTaskById = (req: Request, resp: Response) => {
  const taskId = parseInt(req.params.id)

  DB.query(
    'SELECT * FROM todos WHERE id = $1',
    [taskId],
    (err, results) => {
      if (err) throw err
      resp.status(200).json(results.rows)
    }
  )
}

export const createTask = (req: Request, resp: Response) => {
  const { title, description }  = req.body

  DB.query(
    `INSERT INTO (title, description, completed) todos VALUES ($1, $2, false)`,
    [title, description],
    (err, results) => {
      if (err) throw err
      console.log('results: ', results)
      resp.status(201).send(`User added with ID ${results.oid}`)
    }
  )
}

export const updateTask = (req: Request, resp: Response) => {
  const id = parseInt(req.params.id)
  const { title, description, completed } = req.body

  DB.query(
    'UPDATE todos SET title = $1, description = $2, completed = $3, WHERE id = $4',
    [title, description, completed, id],
    (err) => {
      if (err) throw err
      resp.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

export const deleteTask = (req: Request, resp: Response) => {
  const id = parseInt(req.params.id)

  DB.query(
    'DELETE FROM todos WHERE id = $1',
    [id],
    (err) => {
      if (err) throw err
      resp.status(200).send(`User deleted with ID: ${id}`)
    }
  )
}
