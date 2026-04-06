import { CheckSquare2, Plus } from 'lucide-react';

interface HeaderProps {
  onNewTodo: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header = ({ onNewTodo, completedCount, totalCount }: HeaderProps) => {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-lg">
              <CheckSquare2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">TaskFlow</h1>
              <p className="text-blue-100 text-sm mt-1">Your elegant task management companion</p>
            </div>
          </div>
          <button
            onClick={onNewTodo}
            className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-blue-100 text-sm">Tasks Completed</p>
            <p className="text-2xl font-bold">
              {completedCount} / {totalCount}
            </p>
          </div>
          <div className="flex-1 bg-blue-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-400 h-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Progress</p>
            <p className="text-2xl font-bold">{completionPercentage}%</p>
          </div>
        </div>
      </div>
    </header>
  );
};
