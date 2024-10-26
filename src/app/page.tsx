"use client";

import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Task } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { fetchTasks, addTask, editTask, deleteTask } from "./api";

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Partial<Task> | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      const fetchedTasks = await fetchTasks();
      if (!ignore) {
        setTasks(fetchedTasks);
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  const handleAddTask = async () => {
    const newTask: Task = {
      id: nanoid(),
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      status: selectedTask?.status || "Pending"
    };

    // Prevent adding duplicate tasks
    setTasks(prevTasks => {
      if (prevTasks.some(task => task.id === newTask.id)) {
        return prevTasks; // Skip addition if duplicate ID detected
      }
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });

    await addTask(newTask); // Add task to the backend
    setSelectedTask(null); // Reset form data after adding
  };

  const handleEditTask = async (updatedTask: Task) => {
    await editTask(updatedTask); // Update task in the backend or data source
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null); // Clear form after editing
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id); // Delete task from the backend
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    setSelectedTask(null); // Clear form after editing
  };

  const handleFormSubmit = () => {
    if (selectedTask?.id) {
      // Edit mode
      handleEditTask(selectedTask as Task); // Edit existing task
    } else {
      // Add mode
      handleAddTask();
    }
  };

  const handleFormChange = (field: keyof Task, value: string) => {
    setSelectedTask(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <TaskForm
        task={selectedTask || {}}
        onSubmit={handleFormSubmit} // Use handleFormSubmit to handle both add and edit modes
        onChange={handleFormChange}
      />
      <TaskList
        tasks={tasks}
        onEdit={setSelectedTask} // Set selected task for editing
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default Page;
