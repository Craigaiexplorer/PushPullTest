import React from 'react';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
}

export function TodoList({ todos, onDelete, onToggle, onAddComment }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onDelete={onDelete}
          onToggle={onToggle}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
}