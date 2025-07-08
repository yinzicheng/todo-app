# Todo App

A modern todo application built with NextJS, TypeScript, TailwindCSS, and JSON Server.

## Features

- ✅ Modern, clean UI matching the design specification
- 📱 Responsive design
- 🎯 Task management with completion tracking
- 🏷️ Category-based task organization
- 📅 Date-based task sections (Today, Tomorrow, Overdue)
- 🔄 Real-time updates with JSON Server API
- ⚡ Fast development with TailwindCSS
- 🔒 Type-safe with TypeScript

## Tech Stack

- **Frontend**: NextJS 15 with React 19
- **Styling**: TailwindCSS 4
- **Language**: TypeScript
- **Backend**: JSON Server (for development)
- **Dev Tools**: ESLint, Concurrently

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   
   This command runs both the NextJS dev server (port 3000) and JSON Server (port 3001) concurrently.

3. **Open your browser**:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── layout/
│   │   └── sidebar.tsx     # Navigation sidebar
│   ├── tasks/
│   │   ├── task-item.tsx   # Individual task component
│   │   └── task-section.tsx # Task section grouping
│   └── ui/
│       └── button.tsx      # Reusable button component
├── lib/
│   └── api.ts              # API utility functions
└── types/
    └── index.ts            # TypeScript interfaces
```

## Available Scripts

- `npm run dev` - Start development servers (NextJS + JSON Server)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run json-server` - Start JSON Server only

## API Endpoints

The JSON Server provides these endpoints:

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /categories` - Get all categories

## Data Structure

### Task
```typescript
interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  category: string;
  section: 'today' | 'tomorrow' | 'overdue' | 'upcoming';
}
```

### Category
```typescript
interface Category {
  id: number;
  name: string;
  color: string;
}
```

## Development Notes

- The app is configured to use TailwindCSS 4 with the latest features
- JSON Server watches `db.json` for changes and updates the API automatically
- All components are built with TypeScript for type safety
- The design matches the provided screenshot specification

## Customization

- Modify `db.json` to add/edit initial data
- Update TailwindCSS configuration in the globals.css
- Add new components in the `src/components` directory
- Extend the API by modifying the JSON Server data structure
