import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const connectionConfig =
  process.env.DB_HOST === 'localhost'
    ? {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
      }
    : { connectionString: process.env.DATABASE_URL }

const dbConfig = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ...connectionConfig,
})

export default dbConfig
