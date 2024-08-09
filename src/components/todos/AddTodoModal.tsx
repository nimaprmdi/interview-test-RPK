import { forwardRef, useImperativeHandle, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Portal from "../../portals/ModalPortal";
import { AddTodoModalRef, TodoModalState } from "../../types/todo";
import Button from "../elements/Button";
import Input from "../elements/Input";

interface AddTodoModalProps {
  handleButton: () => void;
}

const AddTodoModal = forwardRef<AddTodoModalRef, AddTodoModalProps>(({ handleButton }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todoForm, setTodoForm] = useState<TodoModalState>({
    title: "",
  });

  // Expose the state to the parent component
  useImperativeHandle(ref, () => ({
    getState: () => todoForm,
    setTodoForm: (title: TodoModalState) => setTodoForm(title),
    setModalState: (state: boolean) => setIsModalOpen(state),
  }));

  return isModalOpen ? (
    <Portal>
      <dialog className="c-modal w-full flex justify-center items-center h-screen bg-slate-800 fixed top-0 left-0 z-50">
        <div className="relative w-full h-full flex items-center justify-center flex-col ">
          <AiOutlineCloseCircle
            onClick={() => setIsModalOpen(false)}
            className="absolute right-0 top-0 text-white text-6xl m-8"
          />

          <Input
            name="todo-name"
            placeHolder="Todo title"
            value={todoForm.title}
            onChange={(e) => setTodoForm({ ...todoForm, title: e.currentTarget.value })}
          />

          <Button id="add-todo-btn-modal" handler={handleButton}>
            Add New Todo
          </Button>
        </div>
      </dialog>
    </Portal>
  ) : null;
});

export default AddTodoModal;
