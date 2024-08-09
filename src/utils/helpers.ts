import { toast } from "react-toastify";
import { AddTodoModalRef } from "../types/todo";
import { IKanbanState } from "../types/kanban";
import { DropResult } from "react-beautiful-dnd";

/**
 * Create a slug by give text
 *
 * @param text {string}
 * @returns string Slugged string
 */
const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

/**
 *
 * @param todosClone {IKanbanState}
 * @param childRef {React.RefObject<AddTodoModalRef>}
 * @param setKanbanState {(value: React.SetStateAction<IKanbanState>) => void}
 *
 *
 * Add new todo and set it to the state (will add it to the doing state)
 *
 */
const addTodo = (
  todosClone: IKanbanState,
  childRef: React.RefObject<AddTodoModalRef>,
  setKanbanState: React.Dispatch<React.SetStateAction<IKanbanState>>
) => {
  if (childRef.current) {
    const taskSlug = createSlug(childRef.current.getState().title);

    // data manipulation
    const newTodos = {
      ...todosClone.tasks,
      [taskSlug]: { id: taskSlug, content: childRef.current.getState().title },
    };
    todosClone.tasks = newTodos;

    // add the task to todo state
    todosClone.columns["column-1"].taskIds.push(createSlug(childRef.current.getState().title));

    // set the state
    setKanbanState(todosClone);

    // close the modal
    childRef.current.setModalState(false);
    toast.success("Todo Added");
  }
};

/**
 *
 * @param kanbanState IKanbanState
 * @param dropResult DropResult
 * @param setKanbanState React.Dispatch<React.SetStateAction<IKanbanState>>
 * @returns
 *
 * this will act when user start drag and drop to current dragged column (not another column)
 *
 */
const onDragEndCurrentCol = (
  kanbanState: IKanbanState,
  dropResult: DropResult,
  setKanbanState: React.Dispatch<React.SetStateAction<IKanbanState>>
) => {
  const { destination, source, draggableId } = dropResult;

  if (!destination) return;

  const start = kanbanState.columns[source.droppableId];

  const newTaskIds = Array.from(start.taskIds);
  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);

  const newColumn = {
    ...start,
    taskIds: newTaskIds,
  };

  const newState = {
    ...kanbanState,
    columns: {
      ...kanbanState.columns,
      [newColumn.id]: newColumn,
    },
  };

  setKanbanState(newState);
};

const onDragEndOutSideCol = (
  kanbanState: IKanbanState,
  dropResult: DropResult,
  setKanbanState: React.Dispatch<React.SetStateAction<IKanbanState>>
) => {
  const { destination, source, draggableId } = dropResult;

  if (!destination) return;

  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  const start = kanbanState.columns[source.droppableId];
  const finish = kanbanState.columns[destination.droppableId];

  // if user drag to another column
  const startTaskIds = Array.from(start.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStart = {
    ...start,
    taskIds: startTaskIds,
  };
  const finishTaskIds = Array.from(finish.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finish,
    taskIds: finishTaskIds,
  };

  const newState = {
    ...kanbanState,
    columns: {
      ...kanbanState.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  setKanbanState(newState);
};

export { createSlug, addTodo, onDragEndCurrentCol, onDragEndOutSideCol };
