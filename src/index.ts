import express from 'express'

import bodyParser from 'body-parser'

import { fetchAllTasks, fetchTaskById, createTask, updateTask, deleteTask } from './models/tasks'

const app = express()
const port = process.env.PORT || 9000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Node.js, Express, and Postgres TODOs API'
  })
})

app.get('/tasks', fetchAllTasks)
app.get('/tasks/:id', fetchTaskById)
app.post('/tasks', createTask)
app.put('/users/:id', updateTask)
app.delete('/users/:id', deleteTask)

app.listen(port, () =>
  console.log(`Server running at localhost:${port}`)
)
