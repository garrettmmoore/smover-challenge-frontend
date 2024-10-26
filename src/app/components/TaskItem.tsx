import React from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="font-semibold text-lg">{task.title}</h2>
      <p>{task.description}</p>
      <span className={`badge ${task.status.toLowerCase()}`}>
        {task.status}
      </span>
      <div className="flex mt-4">
        <button onClick={handleEdit} className="mr-2 text-blue-500">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
