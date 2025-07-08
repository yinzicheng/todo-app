export interface Task {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
    category: string;
    section: 'today' | 'tomorrow' | 'overdue' | 'upcoming';
}

export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface TaskSection {
    title: string;
    tasks: Task[];
}

export type NavigationItem = {
    id: string;
    label: string;
    icon: string;
    active?: boolean;
}; 