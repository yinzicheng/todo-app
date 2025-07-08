'use client';

import { NavigationItem } from '@/types';
import { Calendar, Inbox, FolderOpen, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface SidebarProps {
    activeNav: string;
    onNavChange: (navId: string) => void;
}

const navigationItems: NavigationItem[] = [
    { id: 'today', label: 'Today', icon: 'calendar', active: true },
    { id: 'upcoming', label: 'Upcoming', icon: 'inbox' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'tags', label: 'Tags', icon: 'tag' },
];

const iconMap = {
    calendar: Calendar,
    inbox: Inbox,
    folder: FolderOpen,
    tag: Tag,
};

export default function Sidebar({ activeNav, onNavChange }: SidebarProps) {
    return (
        <Card className="w-64 h-full rounded-none border-r border-l-0 border-t-0 border-b-0 bg-sidebar">
            <div className="p-6 border-b border-sidebar-border">
                <h1 className="text-2xl font-bold text-sidebar-foreground">ToDo</h1>
            </div>

            <nav className="p-2">
                {navigationItems.map((item) => {
                    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-sidebar-accent",
                                activeNav === item.id
                                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                                    : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                            )}
                        >
                            <IconComponent className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </Card>
    );
} 