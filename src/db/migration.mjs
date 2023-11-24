/* eslint-disable no-console */
import fs from 'fs'

import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const databaseUrl = process.env.DB_CONNECTION_STRING
const pool = new pg.Pool({ connectionString: databaseUrl })

if (process.env.NODE_ENV !== 'production') {
  const seedQuery = fs.readFileSync('src/db/seed.sql', { encoding: 'utf-8' })
  pool.query(seedQuery, (err) => {
    if (err) console.error('error seeding:  ', err)
    console.log('seeding complete')
    pool.end()
  })
}
