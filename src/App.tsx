import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Paper, Typography } from "@mui/material";
import { ToDoList } from "./components/ToDoComp/ToDoList";

function App() {
  return (
    <div className="App">
      <Paper
        sx={{
          width: "50%",
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          WHAT SHOULD I DO
        </Typography>
        <ToDoList />
      </Paper>
    </div>
  );
}

export default App;
