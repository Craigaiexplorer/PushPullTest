import React, { useState } from 'react';
import { Trash2, MessageSquarePlus, Check, X } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
}

export function TodoItem({ todo, onDelete, onToggle, onAddComment }: TodoItemProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleDelete = () => {
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }
    
    setIsExiting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(todo.id, commentText);
      setCommentText('');
      setIsAddingComment(false);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(todo.createdAt);

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 ${
        todo.completed ? 'border-green-500' : 'border-purple-500'
      } hover:shadow-md transition-all duration-300 ${
        isExiting ? 'opacity-0 transform translate-x-10' : 'opacity-100 transform translate-x-0'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(todo.id)}
              className={`p-2 rounded-full transition-colors ${
                todo.completed 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600'
              }`}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Check className="h-5 w-5" />
            </button>
            <p className={`text-gray-800 font-medium break-words ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>{todo.text}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
          
          {/* Comments section */}
          {todo.comments.length > 0 && (
            <div className="mt-3 space-y-2">
              {todo.comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded p-2 text-sm">
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    }).format(comment.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {/* Add comment form */}
          {isAddingComment && (
            <form onSubmit={handleAddComment} className="mt-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type your comment..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingComment(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
                >
                  Add Comment
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="flex gap-2">
          {!isAddingComment && (
            <button
              onClick={() => setIsAddingComment(true)}
              className="p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
              aria-label="Add comment"
            >
              <MessageSquarePlus className="h-5 w-5" />
            </button>
          )}
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