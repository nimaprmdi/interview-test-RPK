import React, { forwardRef, LegacyRef } from "react";
import Button from "./Button";
import { FaCheckCircle, FaRegWindowClose } from "react-icons/fa";

// @todo make generic
interface CardProps {
  title: string;
  isDone: boolean;
  editHandler: React.MouseEventHandler<HTMLButtonElement>;
  deleteHandler: React.MouseEventHandler<HTMLButtonElement>;
  stateHandlerw: React.MouseEventHandler<HTMLButtonElement>;
  isEditMode: boolean;
  handleEdit: () => void;
}

const Card = forwardRef((props: CardProps, ref: LegacyRef<HTMLInputElement> | undefined) => {
  const { title, editHandler, deleteHandler, isEditMode, handleEdit, stateHandlerw, isDone } = props;

  return (
    <a
      href="#"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <Button handler={editHandler}>Edit</Button>
      <Button handler={deleteHandler}>Delete</Button>
      <Button handler={stateHandlerw}>{isDone ? <FaCheckCircle /> : <FaRegWindowClose />}</Button>

      <br />
      {isEditMode ? (
        <>
          <input ref={ref} type="text" />
          <Button handler={handleEdit}>Enter</Button>
        </>
      ) : null}
    </a>
  );
});

export default Card;
