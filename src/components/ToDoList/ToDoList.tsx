import { Container, Skeleton } from "@mui/material";
import {
	completeTask,
	createTask,
	deleteTask,
	incompleteTask,
	updateTask
} from "../../api";
import { Task } from "../../types";
import { ToDoItem } from "./ToDoItem/ToDoItem";

type ToDoListProps = {
	loading: boolean;
	todos: Task[];
	setTodos: (todos: Task[]) => void;
};

export const ToDoList = ({ loading, setTodos, todos }: ToDoListProps) => {
	const onDelete = (id: string) => {
		deleteTask(id);
		setTodos(todos.filter((task) => task.id !== id));
	};

	const onAdd = async (text: string) => {
		const newTask = await createTask(text);
		setTodos([newTask, ...todos]);
	};

	const onEdit = async (id: string, text: string) => {
		const newTask = await updateTask(id, text);
		setTodos(todos.map((task) => (task.id === id ? newTask : task)));
	};

	const onCompleted = (task: Task) => {
		const { id, completed } = task;
		setTodos(
			todos.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
		if (completed) {
			incompleteTask(id);
			return;
		}

		completeTask(id);
	};

	return (
		<Container
			sx={{
				display: "flex",
				flex: 1,
				flexDirection: "column",
				padding: "10px",
				gap: "10px",
				overflowY: "auto"
			}}
		>
			{!loading && <ToDoItem onSubmit={onAdd} />}
			{loading
				? Array.from(Array(5).keys()).map((index) => (
						<Skeleton
							key={index}
							animation="wave"
							variant="rectangular"
							height={"52px"}
						/>
				  ))
				: todos.map((task) => (
						<ToDoItem
							key={task.id}
							text={task.text}
							onCompleted={() => onCompleted(task)}
							onSubmit={(text: string) => onEdit(task.id, text)}
							onDelete={() => onDelete(task.id)}
						/>
				  ))}
		</Container>
	);
};
