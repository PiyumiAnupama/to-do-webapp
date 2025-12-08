// frontend/src/components/TaskCard.tsx

import React from 'react';
import type { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onMarkDone: (id: number) => void;
  isProcessing: boolean; // State to handle button disabling
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMarkDone, isProcessing }) => {

  const handleDoneClick = () => {
    onMarkDone(task.id);
  };

  // creation time
  const formattedTime = new Date(task.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    // Card design with a subtle left border to highlight importance
    <div className="card-shadow p-5 bg-white rounded-xl border-l-4 border-primary-blue transition duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">

        {/* Title, Description, and Timestamp */}
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-bold text-primary-text mb-1 truncate">{task.title}</h3>
          <p className="text-gray-600 text-sm leading-snug break-words mb-2">
            {task.description || "No description provided."}
          </p>
          <span className="text-xs text-gray-400 font-medium">
            Created at: {formattedTime}
          </span>
        </div>

        {/* Done Button */}
        <button
          onClick={handleDoneClick}
          disabled={isProcessing}
          className={`ml-4 flex-shrink-0 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-150 ease-in-out 
            ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
          `}
          aria-label={`Mark ${task.title} as done`}
        >
          {isProcessing ? 'Saving...' : 'Done'}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;