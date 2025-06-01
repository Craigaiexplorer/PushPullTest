import React from 'react';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onDelete }: TodoListProps) {
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
        />
      ))}
    </div>
  );
}