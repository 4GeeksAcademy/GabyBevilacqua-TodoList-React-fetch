import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import Swal from 'sweetalert2'
import axios from "axios";

const API_BASE_URL = "https://playground.4geeks.com/todo/";

const Home = () => {

	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState(""); // This holds the new task's label

  // Fetch tasks del server en component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function para fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}todos/user/gaby`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function para añadir a new task
  const addNewTask = async () => {
    if (task.trim() === "") return; // Prevent empty tasks

    try {
      const newTask = {
        label: task,
        is_done: false
      };

      const response = await fetch(`${API_BASE_URL}todos/gaby`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error("Failed to add new task");
      }

      const result = await response.json();
      setTasks((prevTasks) => [...prevTasks, result]); // Update tasks with the new task
      setTask(""); // Clear input field

    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  // Function to delete a task by index
  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);

    try {
      await axios.put(`${API_BASE_URL}todos/user/gaby`, updatedTasks);
      setTasks(updatedTasks); // Update tasks state

      Swal.fire({
        title: "Bien hecho!",
        text: "Has terminado una tarea!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function para limpiar tasks
  const clearAllTasks = async () => {
    try {
      await axios.put(`${API_BASE_URL}todos/user/gaby`, []);
      setTasks([]); // limpia los tasks en el front end tambien

      Swal.fire({
        title: "Lista Limpiada!",
        text: "Todas las tareas fueron eliminadas.",
        icon: "info",
      });
    } catch (error) {
      console.error("Error clearing all tasks:", error);
    }
  };


	return (
		<>
			<div className="card justify-content-center align-items-center shadow-lg col-6 mx-auto mt-5">
				<h1 className="card-title mb-3 mt-5 dynapuff">
					Lista de Tareas
				</h1>

				<input
					className="text-center rounded"
					type="text"
					placeholder="Añade una nueva tarea"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button
					type="button"
					className="btn btn-outline-secondary mt-4"
					onClick={addNewTask}>
					<i className="fas fa-plus-circle me-2"></i>
					Agregar
				</button>
				<button
					type="button"
					className="btn btn-danger mt-4"
					onClick={clearAllTasks}
				>
					Limpiar Todo
				</button>
				<TodoList tasks={tasks} deleteTask={deleteTask} />
				<p className="dancing-script mb-5">{tasks.length} Tareas pendientes</p>
			</div>

		</>
	);
};
export default Home;