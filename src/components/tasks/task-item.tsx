'use client';

import { Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TaskItemProps {
    task: Task;
    onToggleComplete: (taskId: string) => void;
}

const categoryVariantMap = {
    Work: 'work' as const,
    Personal: 'personal' as const,
    Urgent: 'urgent' as const,
};

export default function TaskItem({ task, onToggleComplete }: TaskItemProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const categoryVariant = categoryVariantMap[task.category as keyof typeof categoryVariantMap] || 'secondary';

    return (
        <div className="group flex items-center gap-4 p-4 hover:bg-accent/50 rounded-lg transition-all duration-200 border border-transparent hover:border-border/50">
            <button
                onClick={() => onToggleComplete(task.id)}
                className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                    task.completed
                        ? 'bg-green-500 border-green-500 text-white shadow-md'
                        : 'border-muted-foreground/30 hover:border-muted-foreground/60 hover:shadow-sm'
                )}
            >
                {task.completed && (
                    <Check className="h-3 w-3" />
                )}
            </button>

            <div className="flex-1 flex justify-between items-center min-w-0">
                <span className={cn(
                    "text-sm font-medium transition-all duration-200",
                    task.completed
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground group-hover:text-foreground'
                )}>
                    {task.title}
                </span>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground font-medium">
                        {formatDate(task.dueDate)}
                    </span>
                    <Badge variant={categoryVariant} className="text-xs">
                        {task.category}
                    </Badge>
                </div>
            </div>
        </div>
    );
} 