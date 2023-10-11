import { Box, Container, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { createTask, getTasks, updateTask } from "../../api";
import { ToDoItem } from "./ToDoItem/ToDoItem";
import { TaskItem } from "./TaskItem/TaskItem";

type ToDoListProps = {
	loading: boolean;
	todos: Task[];
	setTodos: (todos: Task[]) => void;
};

export const ToDoList = ({ loading, setTodos, todos }: ToDoListProps) => {
	const optimisticDelete = (id: string) => {
		setTodos(todos.filter((task) => task.id !== id));
	};

	const onAdd = async (text: string) => {
		const newTask = await createTask(text);
		setTodos([...todos, newTask]);
	};

	const onEdit = async (id: string, text: string) => {
		const newTask = await updateTask(id, text);
		setTodos(todos.map((task) => (task.id === id ? newTask : task)));
	};

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				padding: "10px",
				gap: "10px"
			}}
		>
			{loading
				? Array.from(Array(5).keys()).map((index) => (
						<Skeleton
							key={index}
							animation="wave"
							variant="rectangular"
							height={"52px"}
						/>
				  ))
				: todos.map((task, index) => (
						<TaskItem
							key={task.id}
							task={task}
							onEdit={onEdit}
							optimisticDelete={optimisticDelete}
						/>
				  ))}
			{!loading && <ToDoItem onSubmit={onAdd} />}
		</Container>
	);
};
