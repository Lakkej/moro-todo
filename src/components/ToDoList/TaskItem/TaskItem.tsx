import { Task } from "../../../types";
import { ToDoItem } from "../ToDoItem/ToDoItem";

type TaskItemProps = {
  task: Task;
  onDelete: () => void;
  onEdit: (id: string, text: string) => void;
  onCompleted: () => void;
};

export const TaskItem = ({
  task,
  onDelete,
  onEdit,
  onCompleted,
}: TaskItemProps) => {
  const { completed, id, text } = task;

  const onSubmit = (text: string) => {
    onEdit(id, text);
  };

  return (
    <ToDoItem
      text={text}
      completed={completed}
      onCompleted={onCompleted}
      onDelete={onDelete}
      onSubmit={onSubmit}
    />
  );
};
