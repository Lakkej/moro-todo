import { Box, Checkbox, IconButton } from "@mui/material";
import { Task } from "../../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { completeTask, deleteTask, incompleteTask } from "../../../api";
import { ToDoItem } from "../ToDoItem/ToDoItem";

type TaskItemProps = {
	task: Task;
	optimisticDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
};

export const TaskItem = ({ task, optimisticDelete, onEdit }: TaskItemProps) => {
	const [checked, setChecked] = useState(task.completed);

	const onCompleted = () => {
		setChecked(!checked);
		try {
			if (!checked) {
				completeTask(task.id);
				return;
			}

			incompleteTask(task.id);
		} catch (error) {
			setChecked(checked);
			console.error(error);
		}
	};

	const onSubmit = (text: string) => {
		onEdit(task.id, text);
	};

	const onDelete = () => {
		optimisticDelete(task.id);
		try {
			deleteTask(task.id);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ToDoItem
			text={task.text}
			completed={checked}
			onCompleted={onCompleted}
			onDelete={onDelete}
			onSubmit={onSubmit}
		/>
	);
};
