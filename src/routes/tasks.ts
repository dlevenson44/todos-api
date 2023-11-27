import type { Express } from 'express'

import {
  getTasks,
  getTaskById,
  postTask,
  putTask,
  deleteTask,
} from '../controllers/tasksController'

const tasksRoute = (app: Express) => {
  app.get('/tasks', getTasks)
  app.get('/tasks/:id', getTaskById)
  app.post('/tasks', postTask)
  app.put('/tasks/:id', putTask)
  app.delete('/tasks/:id', deleteTask)
}

export default tasksRoute
