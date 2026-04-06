import { Filter } from 'lucide-react';
import { Category } from '../services/api';

interface FilterBarProps {
  categories: Category[];
  selectedStatus?: string;
  selectedPriority?: string;
  selectedCategory?: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  categories,
  selectedStatus,
  selectedPriority,
  selectedCategory,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onClearFilters,
}: FilterBarProps) => {
  const hasActiveFilters = selectedStatus || selectedPriority || selectedCategory;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-700">Filters</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus || ''}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={selectedPriority || ''}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
