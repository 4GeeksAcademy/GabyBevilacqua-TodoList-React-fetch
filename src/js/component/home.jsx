import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import Swal from 'sweetalert2'
import axios from "axios";

const API_BASE_URL = "https://playground.4geeks.com/todo/";

const Home = () => {

	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");



	/* const addNewTask = async () => {
		try { const newTask ={
		"label": task,
		"is_done": false
			}	
			const response = await fetch("https://playground.4geeks.com/todo/todos/gaby", {
			method: "POST",
			headers:
			{accept: "application/jason",
			"Content-Type": "application/jason"},
			body: JSON.stringify{newTask}
			
			}
			)
			const result = await response.json()
			setTask(result.label)

		}catch (error) {
		console.log(error);
		}
		}*/

 // Fetch tasks del servidor cuando el componente se monta
 useEffect(() => {
    fetchTasks();
  }, []);

  // Function para fetch tasks del servidor
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}todos/users/gaby`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function para agregar un new task
  const addTask = async () => {
    if (newTask.trim() === "") return;

    const newTaskObject = {
      label: newTask.trim(),
      is_done: false,
    };

    try {
      const updatedTasks = [...tasks, newTaskObject];
      await axios.put(`${API_BASE_URL}todos/users/gaby`, updatedTasks);
      setTasks(updatedTasks); // actualiza el estado de los tasks
      setNewTask(""); //  Limpia el input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to delete a task by index
  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);

    try {
      await axios.put(`${API_BASE_URL}todos/users/gaby`, updatedTasks);
      setTasks(updatedTasks);

      Swal.fire({
        title: "Bien hecho!",
        text: "Has terminado una tarea!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to clear all tasks
  const clearAllTasks = async () => {
    try {
      await axios.put(`${API_BASE_URL}todos/users/gaby`, []);
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
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button
					type="button"
					className="btn btn-outline-secondary mt-4"
					onClick={addTask}>
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