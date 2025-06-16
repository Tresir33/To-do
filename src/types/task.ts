// to-do/src/types/task.ts
export interface Task {
  id: string;
  title: string;
  deadline: string; // ISO 8601 format (e.g., "2025-06-15T23:59:00Z")
  description?: string; // Optional
  createdAt: string;
  updatedAt: string;
}