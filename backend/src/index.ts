// backend/src/index.ts

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file (if running locally without Docker)
// In Docker, the variables are passed directly via docker-compose environment section
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Todo API is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log('--- Initializing Database Connection ---');
});