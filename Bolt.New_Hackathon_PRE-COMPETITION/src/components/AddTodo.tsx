import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      onAdd(text);
      setText('');
      
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`bg-white rounded-lg shadow-md p-4 mb-6 transition-all duration-300 ${
        isAnimating ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 py-3 px-4 bg-gray-50 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
          maxLength={100}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={`ml-3 p-3 rounded-lg text-white ${
            text.trim() 
              ? 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
              : 'bg-purple-300 cursor-not-allowed'
          } transition-colors duration-200 flex items-center justify-center`}
          aria-label="Add task"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      {text.length > 80 && (
        <div className="mt-2 text-right text-sm text-gray-500">
          {text.length}/100
        </div>
      )}
    </form>
  );
}