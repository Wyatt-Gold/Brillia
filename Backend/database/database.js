import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    // TODO: Set up PostgreSQL database online, and update DATABASE_URL in '.env.example'
    connectionString: process.env.DATABASE_URL,
});

export default pool;
