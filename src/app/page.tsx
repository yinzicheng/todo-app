'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { fetchTasks, updateTask, createTask } from '@/lib/api';
import Sidebar from '@/components/layout/sidebar';
import TaskSection from '@/components/tasks/task-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, User } from 'lucide-react';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeNav, setActiveNav] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
    setLoading(false);
  };

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTask = await updateTask(taskId, { completed: !task.completed });
    if (updatedTask) {
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    }
  };

  const handleAddTask = async () => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const newTask = await createTask({
      title,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      category: 'Personal',
      section: 'today'
    });

    if (newTask) {
      setTasks([...tasks, newTask]);
    }
  };

  const filterTasksBySection = (section: string) => {
    return tasks.filter(task => task.section === section);
  };

  const getTodayTasks = () => filterTasksBySection('today');
  const getTomorrowTasks = () => filterTasksBySection('tomorrow');
  const getOverdueTasks = () => filterTasksBySection('overdue');

  const getPageTitle = () => {
    switch (activeNav) {
      case 'today':
        return 'Today';
      case 'upcoming':
        return 'Upcoming';
      case 'projects':
        return 'Projects';
      case 'tags':
        return 'Tags';
      default:
        return 'Today';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      <div className="flex-1 flex justify-center bg-muted/30">
        <div className="w-full max-w-4xl flex flex-col">
          {/* Top bar */}
          <Card className="rounded-none border-l-0 border-r-0 border-t-0 bg-card/50 backdrop-blur">
            <CardHeader className="px-8 py-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {getPageTitle()}
                </CardTitle>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-6">
              {/* Add task button */}
              <Button
                onClick={handleAddTask}
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground border border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 h-12"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add new task
              </Button>

              {/* Task sections */}
              {activeNav === 'today' && (
                <div className="space-y-6">
                  <TaskSection
                    title="Today"
                    tasks={getTodayTasks()}
                    onToggleComplete={handleToggleComplete}
                  />

                  <TaskSection
                    title="Tomorrow"
                    tasks={getTomorrowTasks()}
                    onToggleComplete={handleToggleComplete}
                  />

                  <TaskSection
                    title="Overdue"
                    tasks={getOverdueTasks()}
                    onToggleComplete={handleToggleComplete}
                  />
                </div>
              )}

              {activeNav === 'upcoming' && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <p>Upcoming tasks view - to be implemented</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeNav === 'projects' && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <p>Projects view - to be implemented</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeNav === 'tags' && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <p>Tags view - to be implemented</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
