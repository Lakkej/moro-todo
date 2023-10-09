import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { getTasks } from "../../hooks/api";

export const ToDoList = () => {
  const [todos, setTodos] = useState<Task[]>([]);

  useEffect(() => {
    const saveTodos = async () => {
      setTodos(await getTasks());
    };
    saveTodos();
  }, [setTodos]);

  return <Box>{todos.map((task) => task.text)}</Box>;
};
