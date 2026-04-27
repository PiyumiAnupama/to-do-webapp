// frontend/src/App.tsx

import React, { useState, useEffect, useCallback } from 'react';
import type { Task, NewTask } from './types/Task'; // <-- Added 'type' keyword
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import axios from 'axios'; // <-- Ensure this is correctly imported

// Define the API URL from environment variables for Docker and local running
// Note: VITE_ prefix is required for Vite to expose env vars to the browser
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8080/api';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingDone, setIsProcessingDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- FETCH LOGIC ---
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Ensure the backend API is running on ' + API_URL);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  // --- CREATE Task Handler ---
  const handleCreateTask = async (newTaskData: NewTask) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // POST the new task data
      await axios.post(`${API_URL}/tasks`, newTaskData);

      // Re-fetch the list to ensure we show the latest 5 tasks (including the new one)
      await fetchTasks();
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // --- MARK DONE Task Handler ---
  const handleMarkDone = async (id: number) => {
    setIsProcessingDone(true);
    setError(null);
    try {
      // PATCH the endpoint to mark the task as done
      await axios.patch(`${API_URL}/tasks/${id}/done`);

      // Optimistic update: Remove the task from the local state immediately for fast UI feedback
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

    } catch (err) {
      console.error('Error marking task as done:', err);
      setError('Failed to mark task as done. Please refresh.');
    } finally {
      setIsProcessingDone(false);
    }
  };


  return (
    <div className="min-h-screen bg-light-bg p-6 sm:p-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-blue tracking-tight">
          ✅ To-Do Web App
        </h1>
        <p className="text-gray-500 mt-2 text-lg">The latest 5 tasks await your completion!</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Task Creation Form (Left Side - takes 1/3 space on large screens) */}
        <div className="lg:col-span-1">
          <TaskForm onCreateTask={handleCreateTask} isSubmitting={isSubmitting} />
        </div>

        {/* Task List (Right Side - takes 2/3 space on large screens) */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-primary-text mb-4 border-b pb-2">
            Current Tasks (Latest 5)
          </h2>

          {/* Display Error State */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md font-medium" role="alert">
              {error}
            </div>
          )}

          {/* List of Tasks */}
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-primary-blue p-4 text-center border rounded-xl bg-white card-shadow">Loading tasks...</p>
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMarkDone={handleMarkDone}
                  isProcessing={isProcessingDone}
                />
              ))
            ) : (
              <p className="text-gray-500 p-4 text-center border rounded-xl bg-white card-shadow">
                🎉 All caught up! Time to create a new task.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;