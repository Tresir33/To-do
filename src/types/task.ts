export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}