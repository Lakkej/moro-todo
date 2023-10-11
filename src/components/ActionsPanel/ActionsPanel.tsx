import { Check, Delete } from "@mui/icons-material";
import {
	Box,
	BoxProps,
	Button,
	MenuItem,
	Select,
	SelectProps,
	Skeleton,
	SxProps
} from "@mui/material";
import { Task } from "../../types";

type ActionsPanelProps = {
	loading: boolean;
	todos: Task[];
	setTodos: (todos: Task[]) => void;
};

const CommonBox = (props: BoxProps) => (
	<Box
		sx={{
			maxWidth: "100%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "10px 24px"
		}}
		{...props}
	/>
);

const LoadingPanel = () => {
	return (
		<CommonBox>
			{Array.from(Array(3).keys()).map((index) => (
				<Skeleton
					key={index}
					animation="wave"
					variant="rectangular"
					sx={{
						width: "30%",
						height: "50px"
					}}
				/>
			))}
		</CommonBox>
	);
};

const commonButtonProps: any = {
	color: "secondary",
	sx: {
		height: "50px",
		width: "30%"
	}
};

export const ActionsPanel = ({
	loading,
	setTodos,
	todos
}: ActionsPanelProps) => {
	if (loading) return <LoadingPanel />;

	return (
		<CommonBox>
			<Select variant="standard" {...commonButtonProps}>
				<MenuItem value="all">All</MenuItem>
				<MenuItem value="incomplete">Incomplete</MenuItem>
				<MenuItem value="completed">Completed</MenuItem>
			</Select>
			<Button {...commonButtonProps}>
				<Check /> Complete All
			</Button>
			<Button {...commonButtonProps}>
				<Delete /> Delete All Completed
			</Button>
		</CommonBox>
	);
};
