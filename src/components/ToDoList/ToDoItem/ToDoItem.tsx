import { Add as AddIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Box,
	Checkbox,
	FormControl,
	IconButton,
	InputBase
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

const BOX_WIDTH = "42px";

type ToDoItemProps = {
	id?: string;
	completed?: boolean;
	text?: string;
	onSubmit: (text: string) => void;
	onCompleted?: () => void;
	onDelete?: () => void;
};

const debounce = (func: Function, timeout: number) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
};

export const ToDoItem = ({
	completed,
	onCompleted,
	text,
	onSubmit,
	onDelete
}: ToDoItemProps) => {
	const [textValue, setTextValue] = useState(text || "");

	const isNewButton = onDelete === undefined;
	const isErrored = textValue.length === 0 && !isNewButton;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSubmit = useCallback(debounce(onSubmit, 300), [onSubmit]);
	const onChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTextValue(event.target.value);
	};

	const onKeyUp = (
		event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (isErrored) return;

		if (!isNewButton) debouncedSubmit(textValue);

		if (event.key === "Enter") {
			event.preventDefault();
			onSubmit(textValue);
			isNewButton && setTextValue("");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "5px",
				gap: "20px",
				backgroundColor: completed ? "#D3D3D3" : "transparent"
			}}
			className="todo-item"
		>
			<Box sx={{ width: BOX_WIDTH }}>
				{isNewButton ? (
					<IconButton
						onClick={() => {
							if (textValue.length > 0) {
								onSubmit(textValue);
								setTextValue("");
							}
						}}
					>
						<AddIcon color="success" />
					</IconButton>
				) : (
					<Checkbox
						disabled={isErrored}
						color="secondary"
						checked={completed}
						onChange={onCompleted}
					/>
				)}
			</Box>
			<InputBase
				fullWidth
				multiline
				inputProps={{
					sx: {
						color: isErrored ? "error.main" : "inherit",
						textAlign: "center",
						borderBottom: "2px solid",
						borderBottomColor: isErrored ? "error.main" : "transparent",
						"&:hover, &:focus": {
							borderColor: isErrored ? "error.main" : "secondary.main"
						}
					}
				}}
				onKeyUp={onKeyUp}
				value={textValue}
				placeholder={isErrored ? "Item must have some text" : "What to do..."}
				onChange={onChange}
			/>
			<IconButton
				sx={{ width: BOX_WIDTH }}
				disabled={isNewButton}
				onClick={onDelete}
				color="secondary"
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	);
};
