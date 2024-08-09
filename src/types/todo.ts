interface AddTodoModalRef {
  getState: () => TodoModalState;
  setTodoForm: (title: TodoModalState) => void;
  setModalState: (state: boolean) => void;
}

interface TodoModalState {
  title: string;
}

interface TodoModalStateUpdate {
  title?: string;
  desc?: string;
}

export type { AddTodoModalRef, TodoModalState, TodoModalStateUpdate };
