import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onDelete }: TodoItemProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleDelete = () => {
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }
    
    // Start exit animation
    setIsExiting(true);
    
    // Delay actual deletion to allow animation to complete
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  // Format date to readable string
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(todo.createdAt);

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-purple-500 hover:shadow-md transition-all duration-300 ${
        isExiting ? 'opacity-0 transform translate-x-10' : 'opacity-100 transform translate-x-0'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <p className="text-gray-800 font-medium break-words">{todo.text}</p>
          <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
        </div>
        
        <button
          onClick={handleDelete}
          className={`p-2 rounded-full ${
            isConfirmingDelete 
              ? 'bg-red-100 text-red-600 animate-pulse' 
              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
          } transition-all`}
          aria-label={isConfirmingDelete ? "Confirm delete" : "Delete task"}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      
      {isConfirmingDelete && (
        <div className="mt-2 text-sm text-red-600 flex justify-between items-center">
          <span>Click again to confirm deletion</span>
          <button 
            onClick={() => setIsConfirmingDelete(false)}
            className="text-gray-500 hover:text-gray-700 underline text-xs"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}