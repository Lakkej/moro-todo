import { Task } from "../types";

const URL = "http://localhost:8080/tasks/";

const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createTask = async (taskText: Task["text"]) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ text: taskText }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const updateTask = async (task: Task) => {
  const response = await fetch(`${URL}/${task.id}`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const deleteTask = async (taskId: Task["id"]) => {
  const response = await fetch(`${URL}/${taskId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const completeTask = async (taskId: Task["id"]) => {
  const response = await fetch(`${URL}/${taskId}/complete`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

const incompleteTask = async (taskId: Task["id"]) => {
  const response = await fetch(`${URL}/${taskId}/incomplete`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  incompleteTask,
};
