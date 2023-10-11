import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Paper, Typography } from "@mui/material";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { Task } from "./types";
import { completeTask, deleteTask, getTasks } from "./api";
import { ActionsPanel } from "./components/ActionsPanel/ActionsPanel";

function App() {
	const [loading, setLoading] = useState(false);
	const [todos, setTodos] = useState<Task[]>([]);
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const getTodos = async () => {
			setLoading(true);
			setTodos(await getTasks());
			setLoading(false);
		};
		getTodos();
	}, [setTodos]);

	const onCompleteAll = () => {
		const newTodos = todos.map((todo) => {
			completeTask(todo.id);
			return { ...todo, completed: true };
		});
		setTodos(newTodos);
	};

	const onDeleteCompleted = () => {
		const newTodos = todos.filter((todo) => {
			const isCompleted = todo.completed;
			if (isCompleted) deleteTask(todo.id);
			return !isCompleted;
		});
		setTodos(newTodos);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === "all") return true;
		if (filter === "completed") return todo.completed;
		if (filter === "incomplete") return !todo.completed;
	});

	return (
		<div className="App">
			<Paper
				sx={{
					width: "30%",
					height: "80%",
					maxHeight: "80%",
					minHeight: "600px"
				}}
				elevation={5}
			>
				<Typography variant="h1" component="h1" gutterBottom>
					TODO
				</Typography>
				<ActionsPanel
					loading={loading}
					filter={filter}
					setFilter={setFilter}
					onCompleteAll={onCompleteAll}
					onDeleteCompleted={onDeleteCompleted}
				/>
				<ToDoList loading={loading} todos={filteredTodos} setTodos={setTodos} />
			</Paper>
		</div>
	);
}

export default App;
