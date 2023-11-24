import express from 'express'

import bodyParser from 'body-parser'

import tasksRoute from './routes/tasksRoutes'

const app = express()
const port = process.env.PORT || 9000

app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Node.js, Express, and Postgres TODOs API',
  })
})

tasksRoute(app)

app.listen(port, () => console.log(`Server running at localhost:${port}`))
