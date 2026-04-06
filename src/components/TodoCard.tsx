import { Trash2, Check, Calendar, AlertCircle } from 'lucide-react';
import { Todo } from '../services/api';

interface TodoCardProps {
  todo: Todo;
  onComplete: (id: number, status: 'pending' | 'completed') => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoCard = ({ todo, onComplete, onDelete, onEdit }: TodoCardProps) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && todo.status === 'pending';
  const isToday = todo.due_date && new Date(todo.due_date).toDateString() === new Date().toDateString();

  const formatDate = (date: string) => {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 cursor-pointer ${
        todo.status === 'completed'
          ? 'border-l-green-400 bg-gray-50'
          : isOverdue
            ? 'border-l-red-500'
            : 'border-l-blue-400'
      }`}
      onClick={() => onEdit(todo)}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(todo.id!, todo.status === 'completed' ? 'pending' : 'completed');
          }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.status === 'completed'
              ? 'bg-green-400 border-green-400'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.status === 'completed' && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-lg transition-all ${
              todo.status === 'completed'
                ? 'text-gray-400 line-through'
                : 'text-gray-800 group-hover:text-blue-600'
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p
              className={`text-sm mt-1 transition-all ${
                todo.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-600'
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className={`inline-block text-xs font-medium px-2 py-1 rounded border ${priorityColors[todo.priority]}`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>

            {todo.category && (
              <span className="inline-block text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-800 border border-purple-300">
                {todo.category}
              </span>
            )}

            {todo.due_date && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border ${
                  isOverdue
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : isToday
                      ? 'bg-orange-100 text-orange-800 border-orange-300'
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                }`}
              >
                {isOverdue && <AlertCircle className="w-3 h-3" />}
                {!isOverdue && <Calendar className="w-3 h-3" />}
                {formatDate(todo.due_date)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id!);
          }}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
