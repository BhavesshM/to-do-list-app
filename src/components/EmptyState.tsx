import { CheckCircle2 } from 'lucide-react';

interface EmptyStateProps {
  onCreateTodo: () => void;
}

export const EmptyState = ({ onCreateTodo }: EmptyStateProps) => {
  return (
    <div className="text-center py-20">
      <CheckCircle2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">All caught up!</h3>
      <p className="text-gray-600 mb-6">You have no tasks right now. Time to relax or create a new one?</p>
      <button
        onClick={onCreateTodo}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Create Your First Task
      </button>
    </div>
  );
};
