import { Task } from "../types";

const tasks: Task[] = [];

export const fetchTasks = async (): Promise<Task[]> => {
  return Promise.resolve(tasks);
};

export const addTask = async (task: Task): Promise<void> => {
  tasks.push(task);
};

export const editTask = async (updatedTask: Task): Promise<void> => {
  const index = tasks.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
};
