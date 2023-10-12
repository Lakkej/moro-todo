import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { completeTask, deleteTask, getTasks } from "./api";
import { ActionsPanel } from "./components/ActionsPanel/ActionsPanel";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { Task } from "./types";

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

    setTodos([...newTodos]);
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
    switch (filter) {
      case "completed":
        return todo.completed;
      case "incomplete":
        return !todo.completed;
      default:
        return true;
    }
  });

  const completedItems = todos.filter((todo) => todo.completed).length;
  const totalItems = todos.length;

  return (
    <div className="App">
      <Paper
        sx={{
          width: "30%",
          height: "80%",
          maxHeight: "80%",
          minHeight: "600px",
        }}
        elevation={5}
      >
        <Typography variant="h1" component="h1">
          TODO
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          visibility={loading ? "hidden" : "visible"}
        >
          {`${completedItems}/${totalItems} completed ${
            totalItems === completedItems ? "🎉" : "😠"
          }`}
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
