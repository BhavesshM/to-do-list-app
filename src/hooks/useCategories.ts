import { useState, useEffect, useCallback } from 'react';
import { categoryApi, Category } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(
    async (name: string, color: string = '#3B82F6') => {
      try {
        const newCategory = await categoryApi.create(name, color);
        setCategories((prev) => [...prev, newCategory]);
        return newCategory;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create category';
        setError(message);
        throw err;
      }
    },
    []
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      try {
        await categoryApi.delete(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete category';
        setError(message);
        throw err;
      }
    },
    []
  );

  return {
    categories,
    loading,
    error,
    createCategory,
    deleteCategory,
    refetch: fetchCategories,
  };
};
