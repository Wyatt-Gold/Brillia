// test-db.js

/* USED TO TEST IF OUT DATABASE_URL PROPERLY CONNECTS TO THE DATABASE */
/* TO TEST: run 'node test-db.js' in terminal in database directory */
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Client } = pkg;

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

client.connect()
    .then(() => {
        console.log("✅ Connected successfully!");
        return client.end();
    })
    .catch(err => {
        console.error("❌ Connection error:", err);
    });
