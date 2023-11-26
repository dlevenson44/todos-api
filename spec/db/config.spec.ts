import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

// Define the test
describe('Postgres DB Connection', () => {
  it('should establish a successful pg db connection', async () => {
    // Create a new connection pool
    const pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: 5432,
    })

    // Attempt to connect to the database
    const client = await pool.connect()

    // Verify the connection
    expect(client).toBeTruthy()

    // Release the client
    client.release()
  })
})
