import type { Response } from 'express'

type Action = 'fetching' | 'creating' | 'updating' | 'deleting'

interface ErrorPayload {
  res: Response
  action: Action
  id?: number
  err?: string
  status?: number
  messageDetails?: string
}

export const generateServerError = ({ res, action, err, id }: ErrorPayload) => {
  const message = !id
    ? `Error ${action} tasks`
    : `Error ${action} task with id of ${id}`

  return res.status(500).json({ err, message })
}

export const generateClientError = ({
  res,
  action,
  id,
  status,
  messageDetails,
}: ErrorPayload) => {
  switch (status) {
    case 400:
      res.status(400).json({
        message: `Bad Payload ${action}: ${messageDetails ?? ''}`,
      })
      break
    case 404:
      res.status(404).json({ message: `Not Found ${action} task: ID ${id}` })
      break
    default:
      res.status(418).json({ message: 'I am a teapot!' })
  }
}
