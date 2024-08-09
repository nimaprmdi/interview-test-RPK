import { FC, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IKanbanState, ITask } from "../../types/kanban";
import { AddTodoModalRef } from "../../types/todo";
import { addTodo, createSlug, onDragEndCurrentCol, onDragEndOutSideCol } from "../../utils/helpers";
import initialData from "../../utils/kanban-initial-data";
import Button from "../elements/Button";
import AddTodoModal from "./AddTodoModal";
import Column from "./Column";
import { toast } from "react-toastify";

const Todos: FC = (): JSX.Element => {
  const [kanbanState, setKanbanState] = useState<IKanbanState>(initialData);
  const childRef = useRef<AddTodoModalRef>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = kanbanState.columns[source.droppableId];
    const finish = kanbanState.columns[destination.droppableId];

    // If dragged item was on the source
    if (start === finish) {
      onDragEndCurrentCol(kanbanState, result, setKanbanState);
    } else {
      onDragEndOutSideCol(kanbanState, result, setKanbanState);
    }
  };

  const handleAddTodo = () => {
    const todosClone: IKanbanState = { ...JSON.parse(JSON.stringify(kanbanState)) };
    if (childRef.current && childRef.current.getState().title) {
      // created a unique slug
      const taskSlug = createSlug(childRef.current.getState().title);
      const foundResult = Object.keys(todosClone.tasks).findIndex((item) => item === taskSlug);

      foundResult === -1 ? addTodo(todosClone, childRef, setKanbanState) : toast.error("Please Enter another name");
    }

    // Restore the input
    childRef.current?.setTodoForm({ title: "" });
  };

  const handleOpenModal = () => {
    childRef.current?.setModalState(true);
  };

  return (
    <section className="w-full">
      <h3 className="w-full text-3xl font-bold mt-4">Your Tasks</h3>

      <Button id="add-todo" handler={handleOpenModal}>
        Add Todo
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <section className="w-full flex flex-wrap justify-center lg:justify-start mt-4">
          {kanbanState.columnOrder.map((columnId) => {
            const column = kanbanState.columns[columnId];
            const tasks: ITask[] = column.taskIds.map((taskId) => kanbanState.tasks[taskId]);

            return (
              <Column key={column.id} title={column.title} id={column.id} tasks={tasks} className={column.color} />
            );
          })}
        </section>
      </DragDropContext>

      <AddTodoModal handleButton={handleAddTodo} ref={childRef} />
    </section>
  );
};

export default Todos;
