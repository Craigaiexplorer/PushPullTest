import React from 'react';
import { ClipboardList } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <ClipboardList className="h-16 w-16 text-purple-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No tasks yet</h2>
      <p className="text-gray-500 max-w-md">
        Add your first task using the form above. Your tasks will be saved automatically.
      </p>
    </div>
  );
}