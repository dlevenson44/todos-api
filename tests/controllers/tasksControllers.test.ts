import request from 'supertest'

import app from '../../src/index'

describe('Task Controller', () => {
  describe('get all tasks', () => {
    it('should return 200 and all tasks', async () => {
      const response = await request(app)
        .get('/tasks')
        .set('content-type', 'application/json')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
    })
  })

  describe('get a single task', () => {
    let data: any
    beforeAll(async () => {
      data = await request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({
          title: 'Test Task',
          description:
            'We are creating a task that is going to be used for testing',
        })
      data = JSON.parse(data.text)
    })

    afterAll(async () => {
      await request(app)
        .delete(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
    })

    it('should return 200 with a single task', async () => {
      const response = await request(app)
        .get(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')

      expect(response.status).toBe(200)
      expect(data?.data?.title).toBe('Test Task')
    })

    it('should return 404 with invalid ID for single task', async () => {
      const badId = data?.data?.id + 1
      const response = await request(app)
        .get(`/tasks/${badId}`)
        .set('content-type', 'application/json')
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(parsedResponse.message).toBe(
        `Not Found fetching task: ID ${badId}`
      )
    })
  })

  describe('create a task', () => {
    it('should return 201 and create the task', async () => {
      const response = await request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({
          title: 'Test Task',
          description:
            'We are creating a task that is going to be used for testing',
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('data')

      const id = JSON.parse(response.text).data.id
      await request(app)
        .delete(`/tasks/${id}`)
        .set('content-type', 'application/json')
    })

    it('should return 400 and generate missing property message', async () => {
      const response = await request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({
          description: 'Task description',
        })
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(400)
      expect(parsedResponse.message).toBe(
        'Bad Payload creating: Missing Title or Description field'
      )
    })

    it('should return a 400 and generate title too long message', async () => {
      const longTitle = 'long title'.repeat(30)
      const response = await request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({
          title: longTitle,
          description: 'task description',
        })
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(400)
      expect(parsedResponse.message).toBe(
        'Bad Payload creating: Title length too long'
      )
    })
  })

  describe('update a task', () => {
    let data: any
    beforeAll(async () => {
      data = await request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({
          title: 'Test Task',
          description:
            'We are creating a task that is going to be used for testing',
        })
      data = JSON.parse(data.text)
    })

    afterAll(async () => {
      await request(app)
        .delete(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
    })

    it('should return 200 and update the task', async () => {
      const response = await request(app)
        .put(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
        .send({
          ...data?.data,
          title: 'Updated Test Task Title',
        })
      const updatedTitleData = JSON.parse(response.text).result.rows[0].title
      expect(response.status).toBe(200)
      expect(updatedTitleData).toBe('Updated Test Task Title')
    })

    it('should return 400 with missing title', async () => {
      const response = await request(app)
        .put(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
        .send({
          ...data?.data,
          title: '',
        })
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(400)
      expect(parsedResponse.message).toBe(
        'Bad Payload updating: Missing Title and/or Description field'
      )
    })

    it('should return 400 with missing description', async () => {
      const response = await request(app)
        .put(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
        .send({
          ...data?.data,
          description: '',
        })
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(400)
      expect(parsedResponse.message).toBe(
        'Bad Payload updating: Missing Title and/or Description field'
      )
    })

    it('should return 400 with title too long', async () => {
      const longTitle = 'long title'.repeat(30)
      const response = await request(app)
        .put(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
        .send({
          ...data?.data,
          title: longTitle,
        })
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(400)
      expect(parsedResponse.message).toBe(
        'Bad Payload updating: Title length too long'
      )
    })

    it('should return 404 with invalid ID for single task', async () => {
      const badId = data?.data?.id + 1
      const response = await request(app)
        .put(`/tasks/${badId}`)
        .set('content-type', 'application/json')
        .send({
          ...data?.data,
          title: 'Updated Test Task Title',
        })
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(parsedResponse.message).toBe(
        `Not Found updating task: ID ${badId}`
      )
    })
  })

  describe('delete a task', () => {
    let data: any
    beforeAll(async () => {
      data = await request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({
          title: 'Test Task',
          description:
            'We are creating a task that is going to be used for testing',
        })
      data = JSON.parse(data.text)
    })

    it('should reutnr 200 and delete the task', async () => {
      const response = await request(app)
        .delete(`/tasks/${data?.data?.id}`)
        .set('content-type', 'application/json')
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(parsedResponse.message).toBe(
        `Task ${data?.data?.id} has been removed`
      )
    })

    it('should return 404 and not delete the task with a bad id', async () => {
      const response = await request(app)
        .delete(`/tasks/${data?.data?.id + 1}`)
        .set('content-type', 'application/json')
      const parsedResponse = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(parsedResponse.message).toBe(
        `Not Found deleting task: ID ${data?.data?.id + 1}`
      )
    })
  })
})

// describe('get a task', () => {
//   let task
//   beforeEach(async () => {
//     task = await TaskModel.create({
//       name: 'task testid',
//     })
//   })

//   it('should return 200 and a single task', async () => {
//     const response = await request(app)
//       .get(`/api/v1/tasks/${task.id}`)
//       .set('content-type', 'application/json')

//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('task')
//   })
// })

// describe('update a task', () => {
//   let task
//   beforeEach(async () => {
//     task = await TaskModel.create({
//       name: 'task2 testid',
//     })
//   })

//   it('should return 404 if the task with the id doesnt exist', async () => {
//     const taskId = '639c80ef98284bfdf111ad09'
//     const response = await request(app).patch(`/api/v1/tasks/${taskId}`)

//     expect(response.status).toBe(404)
//     expect(response.body.msg).toEqual('this task does not exist')
//   })

//   it('should return 200 and the updated task', async () => {
//     const response = await request(app)
//       .patch(`/api/v1/tasks/${task.id}`)
//       .send({ name: 'newtask' })

//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('task')
//   })
// })

// describe('delete a task', () => {
//   let task
//   beforeEach(async () => {
//     task = await TaskModel.create({
//       name: 'task2 testid',
//     })
//   })

// it('should return 404 if the task with the id doesnt exist', async () => {
//   const taskId = '639c80ef98284bfdf111ad09'
//   const response = await request(app).delete(`/api/v1/tasks/${taskId}`)

//   expect(response.status).toBe(404)

//   expect(response.body.msg).toEqual('this task does not exist')
// })

// it('should return 200 and the deleted task', async () => {
//   const response = await request(app).delete(`/api/v1/tasks/${task.id}`)

//   expect(response.status).toBe(200)
//   expect(response.body).toHaveProperty('task')
// })
//   })
// })
