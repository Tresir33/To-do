import AsyncStorage from '@react-native-async-storage/async-storage';
   import { Task } from '../types/task';

   const TASKS_KEY = '@ToDoApp:Tasks';

   const generateId = () => {
     return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
   };

   export const addTaskLocally = async (userId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
     try {
       const tasks = await getLocalTasks(userId);
       const newTask: Task = {
         id: generateId(),
         ...task,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
       };
       const updatedTasks = [...tasks, newTask];
       await AsyncStorage.setItem(`${TASKS_KEY}:${userId}`, JSON.stringify(updatedTasks));
       return newTask;
     } catch (error) {
       console.error('Error adding task locally:', error);
       throw error;
     }
   };

   export const getLocalTasks = async (userId: string): Promise<Task[]> => {
     try {
       const tasksJson = await AsyncStorage.getItem(`${TASKS_KEY}:${userId}`);
       return tasksJson ? JSON.parse(tasksJson) : [];
     } catch (error) {
       console.error('Error retrieving local tasks:', error);
       return [];
     }
   };

   export const updateTaskLocally = async (userId: string, updatedTask: Task): Promise<void> => {
     try {
       const tasks = await getLocalTasks(userId);
       const updatedTasks = tasks.map(task =>
         task.id === updatedTask.id
           ? { ...updatedTask, updatedAt: new Date().toISOString() }
           : task
       );
       await AsyncStorage.setItem(`${TASKS_KEY}:${userId}`, JSON.stringify(updatedTasks));
     } catch (error) {
       console.error('Error updating task locally:', error);
       throw error;
     }
   };

   export const deleteTaskLocally = async (userId: string, taskId: string): Promise<void> => {
     try {
       const tasks = await getLocalTasks(userId);
       const updatedTasks = tasks.filter(task => task.id !== taskId);
       await AsyncStorage.setItem(`${TASKS_KEY}:${userId}`, JSON.stringify(updatedTasks));
     } catch (error) {
       console.error('Error deleting task locally:', error);
       throw error;
     }
   };

   export const clearLocalTasks = async (userId: string): Promise<void> => {
     try {
       await AsyncStorage.removeItem(`${TASKS_KEY}:${userId}`);
     } catch (error) {
       console.error('Error clearing local tasks:', error);
     }
   };