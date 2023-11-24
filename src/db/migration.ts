// import fs from 'fs'
const fs = require('fs')

const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config()

const databaseUrl = process.env.DB_CONNECTION_STRING
const pool = new Pool({ connectionString: databaseUrl })
console.log('DBURL', databaseUrl)
if (process.env.NODE_ENV !== 'production') {
  const seedQuery = fs.readFileSync('src/db/seed.sql', { encoding: 'utf-8' })
  pool.query(seedQuery, () => {
    // eslint-disable-next-line no-console
    console.info('seeding complete')
    pool.end()
  })
}
