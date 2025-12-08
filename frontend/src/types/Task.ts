// frontend/src/types/Task.ts

// Defines the structure of a Task object fetched from the API
export interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean; 
  created_at: string; // Date represented as a string
}

// Defines the structure for creating a new task
export interface NewTask {
  title: string;
  description: string;
}