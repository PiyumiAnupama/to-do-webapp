// backend/src/database.ts

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load .env variables (though Docker provides them directly)
dotenv.config();

// Configuration object using environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '3306', 10),
};

// Create a connection pool

export const pool = mysql.createPool(dbConfig);

// Function to test the database connection
export async function testDbConnection() {
  try {
    // Get a temporary connection from the pool to test connectivity
    const connection = await pool.getConnection();
    console.log('✅ MySQL Pool connected successfully!');
    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.error('❌ Failed to connect to MySQL Pool:', error);
   
  }
}