import express from 'express'

import bodyParser from 'body-parser'

import tasksRoute from './routes/tasks'

const app = express()
const port = process.env.PORT || 3000

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

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running at localhost:${port}`))

export default app
