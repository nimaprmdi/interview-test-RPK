import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IKanbanState, ITask } from "../../types/kanban";
import { FC } from "react";
import { onDragEndCurrentCol, onDragEndOutSideCol } from "../../utils/helpers";
import Column from "./Column";

interface TodoListProps {
  kanbanState: IKanbanState;
  setKanbanState: React.Dispatch<React.SetStateAction<IKanbanState>>;
}

const TodoList: FC<TodoListProps> = ({ kanbanState, setKanbanState }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // The start drag and destination
    const start = kanbanState.columns[source.droppableId];
    const finish = kanbanState.columns[destination.droppableId];

    if (start === finish) {
      // If dragged item was on the source (no move)
      onDragEndCurrentCol(kanbanState, result, setKanbanState);
    } else {
      // use drag on another column (outside)
      onDragEndOutSideCol(kanbanState, result, setKanbanState);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="w-full flex flex-wrap justify-center lg:justify-start mt-4">
        {kanbanState.columnOrder.map((columnId) => {
          const column = kanbanState.columns[columnId];
          const tasks: ITask[] = column.taskIds.map((taskId) => kanbanState.tasks[taskId]);

          return <Column key={column.id} title={column.title} id={column.id} tasks={tasks} className={column.color} />;
        })}
      </section>
    </DragDropContext>
  );
};

export default TodoList;
