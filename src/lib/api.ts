import { Task, Category } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

export async function fetchTasks(): Promise<Task[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        return null;
    }
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }

        return response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        return null;
    }
}

export async function deleteTask(taskId: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting task:', error);
        return false;
    }
} 