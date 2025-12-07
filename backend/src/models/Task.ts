// backend/src/models/Task.ts

// Defines the structure of a Task object returned from the database
export interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: Date;
}

// Defines the structure of the data expected when a user creates a new task
export interface NewTask {
  title: string;
  description: string;
}