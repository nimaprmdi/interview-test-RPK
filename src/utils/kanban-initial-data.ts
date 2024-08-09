import { IKanbanState } from "../types/kanban";

const initialData: IKanbanState = {
  tasks: {
    "task-1": { id: "task-1", content: "Task Title 1" },
    "task-2": { id: "task-2", content: "Task Title 2" },
    "task-3": { id: "task-3", content: "Task Title 3" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      color: "border-red-500",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      color: "border-yellow-500",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      color: "border-green-500",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
