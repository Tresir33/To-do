import AsyncStorage from '@react-native-async-storage/async-storage';
   import { Task } from '../types/task';

   const TASKS_KEY = '@ToDoApp:Tasks';

   const generateId = () => {
     return Math.random().toString(36).substr(2, 8) + Date.now().toString(36);
   };

   export const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Promise<Task> => {
     if (!task.title || typeof task.title !== 'string') {
       throw new Error('Task title is required and must be a string');
     }
     try {
       const tasks = await getTasks();
       const newTask: Task = {
         id: generateId(),
         title: task.title.trim(),
         description: task.description?.trim(),
         deadline: task.deadline,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
         completed: false,
       };
       const updatedTasks = [...tasks, newTask];
       await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
       return newTask;
     } catch (error) {
       console.error('Error adding task:', error);
       throw error;
     }
   };

   export const getTasks = async (): Promise<Task[]> => {
     try {
       const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
       const tasks = tasksJson ? JSON.parse(tasksJson) : [];
       // Validate tasks
       return tasks.filter((task: any) => task.id && task.title && typeof task.completed === 'boolean');
     } catch (error) {
       console.error('Error retrieving tasks:', error);
       return [];
     }
   };

   export const updateTask = async (updatedTask: Task): Promise<void> => {
     try {
       const tasks = await getTasks();
       const updatedTasks = tasks.map(task =>
         task.id === updatedTask.id
           ? { ...updatedTask, updatedAt: new Date().toISOString() }
           : task
       );
       await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
     } catch (error) {
       console.error('Error updating task:', error);
       throw error;
     }
   };

   export const deleteTask = async (taskId: string): Promise<void> => {
     try {
       const tasks = await getTasks();
       const updatedTasks = tasks.filter(task => task.id !== taskId);
       await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
     } catch (error) {
       console.error('Error deleting task:', error);
       throw error;
     }
   };

   export const clearTasks = async (): Promise<void> => {
     try {
       await AsyncStorage.removeItem(TASKS_KEY);
     } catch (error) {
       console.error('Error clearing tasks:', error);
       throw error;
     }
   };