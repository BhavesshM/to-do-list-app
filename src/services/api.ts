const API_URL = 'http://localhost:5000/api';

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: number;
  name: string;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  created_at?: string;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'An error occurred');
  }
  return response.json();
}

export const todoApi = {
  getAll: async (filters?: { status?: string; priority?: string; category?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.category) params.append('category', filters.category);

    const response = await fetch(`${API_URL}/todos?${params}`);
    return handleResponse(response);
  },

  create: async (todo: Todo) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/todos/${id}`);
    return handleResponse(response);
  },

  update: async (id: number, updates: Partial<Todo>) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  complete: async (id: number, status: 'pending' | 'completed') => {
    const response = await fetch(`${API_URL}/todos/${id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  search: async (query: string) => {
    const response = await fetch(`${API_URL}/todos/search?q=${encodeURIComponent(query)}`);
    return handleResponse(response);
  },
};

export const tagApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/tags`);
    return handleResponse(response);
  },

  create: async (name: string) => {
    const response = await fetch(`${API_URL}/tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

export const categoryApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/categories`);
    return handleResponse(response);
  },

  create: async (name: string, color: string) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    return handleResponse(response);
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
