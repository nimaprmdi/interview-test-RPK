interface IKanbanState {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: string[];
}

interface ITasks {
  [key: string]: ITask;
}

type ITask = {
  id: string;
  content: string;
};

interface IColumns {
  [key: string]: {
    id: string;
    title: string;
    color: string;
    taskIds: string[];
  };
}

export type { IKanbanState, ITasks, ITask, IColumns };
