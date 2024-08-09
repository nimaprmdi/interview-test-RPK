import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../types/kanban";

interface ICardProps {
  task: ITask;
  index: number;
}

const Card: FC<ICardProps> = ({ task, index }): JSX.Element => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshopt) => (
        <article
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`w-full border border-gray-400 rounded-md p-3  mb-3 ${
            snapshopt.isDragging ? "bg-blue-100" : "bg-white"
          }`}
        >
          {task.content}
        </article>
      )}
    </Draggable>
  );
};

export default Card;
