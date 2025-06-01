import React from 'react';
import { Header } from './components/Header';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, addComment } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Tasks</h2>
        
        <AddTodo onAdd={addTodo} />
        
        <TodoList 
          todos={todos} 
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onAddComment={addComment}
        />
      </main>
      
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <p>TaskMaster © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;