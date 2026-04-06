import { useState, useEffect, useCallback } from 'react';
import { todoApi, Todo } from '../services/api';

export const useTodos = (filter?: { status?: string; priority?: string; category?: string }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAll(filter);
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = useCallback(
    async (todo: Todo) => {
      try {
        const newTodo = await todoApi.create(todo);
        setTodos((prev) => [newTodo, ...prev]);
        return newTodo;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create todo';
        setError(message);
        throw err;
      }
    },
    []
  );

  const updateTodo = useCallback(
    async (id: number, updates: Partial<Todo>) => {
      try {
        const updated = await todoApi.update(id, updates);
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update todo';
        setError(message);
        throw err;
      }
    },
    []
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        await todoApi.delete(id);
        setTodos((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete todo';
        setError(message);
        throw err;
      }
    },
    []
  );

  const completeTodo = useCallback(
    async (id: number, status: 'pending' | 'completed') => {
      try {
        const updated = await todoApi.complete(id, status);
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to complete todo';
        setError(message);
        throw err;
      }
    },
    []
  );

  const searchTodos = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await todoApi.search(query);
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search todos');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
    searchTodos,
    refetch: fetchTodos,
  };
};
