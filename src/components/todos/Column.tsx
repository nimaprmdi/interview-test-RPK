import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import { ITask } from "../../types/kanban";
import Card from "../common/Card";

interface ColumnProps {
  id: string;
  title: string;
  className?: string;
  tasks: ITask[];
}

const Column: FC<ColumnProps> = ({ id, title, className, tasks }): JSX.Element => {
  const cards =
    tasks &&
    tasks.map((task, index) => <Card index={index} task={task} key={`card-${Math.floor(Math.random() * 50000)}`} />);

  return (
    <section className={`w-96 min-h-80 p-4 border-2 `}>
      <div className={twMerge(`w-full pb-3 border-b-4 rounded-sm relative z-50 ${className}`)}>
        <h4>{title}</h4>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`w-full h-full flex flex-col pt-4 px-1 rounded-b-lg ${
              snapshot.isDraggingOver && "bg-gray-600 bg-opacity-10"
            }`}
          >
            {cards}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default Column;
