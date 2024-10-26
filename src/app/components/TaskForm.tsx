import React, { useState } from "react";
import { Task } from "../types";

interface TaskFormProps {
  task: Partial<Task>;
  onSubmit: () => void;
  onChange: (field: keyof Task, value: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button on submit
    onSubmit();
    setIsSubmitting(false); // Re-enable after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-lg shadow-md mb-4"
    >
      <input
        type="text"
        value={task.title || ""}
        onChange={e => onChange("title", e.target.value)}
        placeholder="Title"
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        value={task.description || ""}
        onChange={e => onChange("description", e.target.value)}
        placeholder="Description"
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <select
        value={task.status || "Pending"}
        onChange={e => onChange("status", e.target.value as Task["status"])}
        className="block w-full mb-2 p-2 border rounded"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={isSubmitting}
      >
        {task.id ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
