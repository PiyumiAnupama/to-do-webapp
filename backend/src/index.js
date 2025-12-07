// backend/src/index.ts (updated)

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
// Import the database connection test function
import { testDbConnection } from './database'; 

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple health check route
app.get('/api/health', (Request, Response) => {
  res.status(200).json({ status: 'ok', message: 'Todo API is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  // Test the connection immediately after the server starts listening
  testDbConnection(); 
});