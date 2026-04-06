import { useState, useCallback } from 'react';
import { useTodos } from './hooks/useTodos';
import { useCategories } from './hooks/useCategories';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { TodoCard } from './components/TodoCard';
import { TodoModal } from './components/TodoModal';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { Todo } from './services/api';

function App() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [hasSearched, setHasSearched] = useState(false);

  const filters = {
    status: selectedStatus || undefined,
    priority: selectedPriority || undefined,
    category: selectedCategory || undefined,
  };

  const { todos, loading, error, createTodo, updateTodo, deleteTodo, completeTodo, searchTodos, refetch } =
    useTodos(filters);
  const { categories } = useCategories();

  const completedCount = todos.filter((t) => t.status === 'completed').length;

  const handleNewTodo = () => {
    setSelectedTodo(undefined);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveTodo = async (todo: Todo) => {
    try {
      if (todo.id) {
        await updateTodo(todo.id, todo);
      } else {
        await createTodo(todo);
      }
      setIsModalOpen(false);
      setSelectedTodo(undefined);
    } catch (err) {
      console.error('Error saving todo:', err);
    }
  };

  const handleSearch = useCallback(
    async (query: string) => {
      setHasSearched(true);
      setSelectedStatus('');
      setSelectedPriority('');
      setSelectedCategory('');
      await searchTodos(query);
    },
    [searchTodos]
  );

  const handleClearSearch = useCallback(async () => {
    setHasSearched(false);
    await refetch();
  }, [refetch]);

  const handleClearFilters = () => {
    setSelectedStatus('');
    setSelectedPriority('');
    setSelectedCategory('');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Connection Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-red-600 text-sm">
            Make sure the backend server is running on http://localhost:5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header onNewTodo={handleNewTodo} completedCount={completedCount} totalCount={todos.length} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

          {!hasSearched && <FilterBar {...filters} categories={categories} onCategoryChange={setSelectedCategory} onPriorityChange={setSelectedPriority} onStatusChange={setSelectedStatus} onClearFilters={handleClearFilters} />}

          {loading ? (
            <LoadingState />
          ) : todos.length === 0 ? (
            <EmptyState onCreateTodo={handleNewTodo} />
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onComplete={completeTodo}
                  onDelete={deleteTodo}
                  onEdit={handleEditTodo}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TodoModal
        isOpen={isModalOpen}
        todo={selectedTodo}
        categories={categories}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTodo(undefined);
        }}
        onSave={handleSaveTodo}
      />
    </div>
  );
}

export default App;
