'use client';

import { Task } from '@/types';
import TaskItem from './task-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskSectionProps {
    title: string;
    tasks: Task[];
    onToggleComplete: (taskId: string) => void;
}

export default function TaskSection({ title, tasks, onToggleComplete }: TaskSectionProps) {
    if (tasks.length === 0) return null;

    return (
        <Card className="mb-6">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">
                    {title}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({tasks.length})
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-1">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={onToggleComplete}
                    />
                ))}
            </CardContent>
        </Card>
    );
} 