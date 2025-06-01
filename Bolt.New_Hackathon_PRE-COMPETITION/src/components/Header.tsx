import React from 'react';
import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start">
          <CheckSquare className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold tracking-tight">TaskMaster</h1>
        </div>
      </div>
    </header>
  );
}