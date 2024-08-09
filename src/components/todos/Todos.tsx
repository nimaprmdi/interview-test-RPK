import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IKanbanState } from "../../types/kanban";
import { AddTodoModalRef } from "../../types/todo";
import { addTodo, createSlug } from "../../utils/helpers";
import initialData from "../../utils/kanban-initial-data";
import Button from "../elements/Button";
import AddTodoModal from "./AddTodoModal";
import TodoList from "./TodoList";

const Todos: FC = (): JSX.Element => {
  const [kanbanState, setKanbanState] = useState<IKanbanState>(initialData);
  const childRef = useRef<AddTodoModalRef>(null);

  const handleAddTodo = () => {
    const todosClone: IKanbanState = { ...JSON.parse(JSON.stringify(kanbanState)) };
    if (childRef.current && childRef.current.getState().title) {
      const taskSlug = createSlug(childRef.current.getState().title); // created a unique slug
      const foundResult = Object.keys(todosClone.tasks).findIndex((item) => item === taskSlug); // find a item

      foundResult === -1 ? addTodo(todosClone, childRef, setKanbanState) : toast.error("Please Enter another name"); // the action
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

      <Button id="add-todo" onClick={handleOpenModal}>
        Add Todo
      </Button>

      <TodoList kanbanState={kanbanState} setKanbanState={setKanbanState} />

      <AddTodoModal handleButton={handleAddTodo} ref={childRef} />
    </section>
  );
};

export default Todos;
