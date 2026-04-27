// frontend/src/components/TaskForm.tsx
// BEFORE (Likely causing error TS1484):
// import { NewTask } from '../types/Task';

// AFTER (Fixes error TS1484):
import React, { useState } from 'react';
import type { NewTask } from '../types/Task'; // <-- Added 'type' keyword
// ... rest of the file

interface TaskFormProps {
  onCreateTask: (task: NewTask) => void;
  
  isSubmitting: boolean; 
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      alert('Task title is required!');
      return;
    }

    onCreateTask({ title: title.trim(), description: description.trim() });

    // Clear inputs after submission
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl card-shadow">
      <h2 className="text-2xl font-bold text-primary-text mb-5">🎯 Create New Task</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition duration-150 text-base"
          placeholder="e.g., Implement backend tests"
          disabled={isSubmitting}
        />
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue resize-none transition duration-150 text-base"
          placeholder="Detailed steps or requirements..."
          disabled={isSubmitting}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className={`w-full py-3 px-4 text-white font-bold rounded-lg transition duration-200 
          ${isSubmitting || !title.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-blue hover:bg-indigo-700'}
        `}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;