import { FC, useEffect, useRef, useState } from "react";
import Portal from "../../portals/ModalPortal";
import Button from "../elements/Button";
import { FaRegWindowClose } from "react-icons/fa";
import Card from "../elements/Card";

// Task needs
// only implement the done state

interface IToDo {
  title: string;
  id: string;
  isDone: boolean;
  isEditMode: boolean;
}

const Todos: FC = (): JSX.Element => {
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = () => {
    setTodos((prevState) => {
      const todosClone = [
        ...JSON.parse(JSON.stringify(prevState)),
        { title: todoTitle, id: Math.floor(Math.random() * 10000), isDone: false },
      ];
      localStorage.setItem("todos", JSON.stringify(todosClone));
      return todosClone;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const editHandler = (id: string) => {
    setTodos((prevState) => {
      const foundIndex = prevState.findIndex((item) => item.id === id);

      if (foundIndex !== -1) {
        const newTodos = [...prevState];
        newTodos[foundIndex] = {
          ...newTodos[foundIndex],
          isEditMode: !newTodos[foundIndex].isEditMode,
        };
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      }
      localStorage.setItem("todos", JSON.stringify(prevState));
      return prevState;
    });
  };

  const handleEditButton = (id: string) => {
    setTodos((prevState) => {
      const foundIndex = prevState.findIndex((item) => item.id === id);

      if (foundIndex !== -1) {
        const newTodos = [...prevState];
        newTodos[foundIndex] = {
          ...newTodos[foundIndex],
          title: inputRef.current?.value || "",
        };
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      }
      localStorage.setItem("todos", JSON.stringify(prevState));
      return prevState;
    });
  };

  const deleteHandler = (id: string) => {
    const clonedTodo = [...todos];
    const resTodos = clonedTodo.filter((item) => item.id !== id);
    setTodos(resTodos);
    localStorage.setItem("todos", JSON.stringify(resTodos));
  };

  const handleTodoState = (id: string) => {
    setTodos((prevState) => {
      const foundIndex = prevState.findIndex((item) => item.id === id);

      if (foundIndex !== -1) {
        const newTodos = [...prevState];
        newTodos[foundIndex] = {
          ...newTodos[foundIndex],
          isDone: !newTodos[foundIndex].isDone,
        };
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      }
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    });
  };

  // use Effect
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <section className="w-full">
      <h3 className="w-full">Your Tasks</h3>

      <Button handler={() => setIsModalOpen(true)}>Add Todo</Button>

      <div className="w-full flex-wrap flex justify-start gap-2">
        {todos && todos.length > 0 ? (
          todos.map((todoItem) => (
            <Card
              isDone={todoItem.isDone}
              stateHandlerw={() => handleTodoState(todoItem.id)}
              handleEdit={() => handleEditButton(todoItem.id)}
              isEditMode={todoItem.isEditMode}
              key={`the-card-item-${Math.random() * 5400000}`}
              deleteHandler={() => deleteHandler(todoItem.id)}
              editHandler={() => editHandler(todoItem.id)}
              title={todoItem.title}
              ref={inputRef}
            />
          ))
        ) : (
          <p>No Todos</p>
        )}
      </div>

      {isModalOpen ? (
        <Portal>
          <div className="w-full flex justify-center items-center h-screen bg-slate-800 absolute top-0 left-0 ">
            <div className="relative w-full h-full flex items-center justify-center flex-col ">
              <FaRegWindowClose onClick={handleCloseModal} className="absolute right-0 top-0" />
              <input
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.currentTarget.value)}
                placeholder="todo title"
                type="text"
                name="todo-name"
                id="todo-name"
              />
              <Button handler={handleAddTodo}>Add Todo</Button>
            </div>
          </div>
        </Portal>
      ) : null}
    </section>
  );
};

export default Todos;
