import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import Swal from 'sweetalert2'

const API_BASE_URL = "https://playground.4geeks.com/todo/";

const Home = () => {

	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState(""); // esto mantiene el new task's label

	// Fetch tasks del server en component mount
	useEffect(() => {
		fetchTasks();
	}, []);

	// Function para fetch tasks
	const fetchTasks = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}users/gaby`);
			const data = await response.json()
			console.log(data);
			setTasks(data.todos);

		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	// Function para añadir a new task
	const addNewTask = async () => {
		if (task.trim() === "") return; // Previene tasks vacios

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
				throw new Error("Fallo al agregar new task");
			}

			const result = await response.json();
			setTasks((prevTasks) => [...prevTasks, result]); // Update tasks con el nuevo task
			setTask(""); // limpia el campo input 

		} catch (error) {
			console.error("Error agregando new task:", error);
		}
	};
	// funcion para editar una tarea
	const editTask = async (id) => {
		try {
			const body = {
				label: task,
				is_done: true
			}

			const response = await fetch(`${API_BASE_URL}todos/${id}`, {
				method: "PUT",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			})
			if (!response.ok) {
				alert("No se puedo editar la tarea");
			}
			alert("Se edito la tarea")
		}
		catch (error) {
			console.log(error);
		}
	}

	// Function para borrar un task a traves del index
	const deleteTask = async (taskId) => {

		try {
			const response = await fetch(`${API_BASE_URL}todos/${taskId}`, {
				method: "DELETE",
			});
			// revisa si la response fue successful
			if (response.ok) {
				// Re-fetch las tasks del servidor para asegurar que la lista esta sincronizando
				await fetchTasks();
				Swal.fire({
					title: "Bien hecho!",
					text: "Has terminado una tarea!",
					icon: "success",
				});
			} else {
				console.error("Fallo al update tasks en el servidor.");
			}
		} catch (error) {
			console.error("Error borrando task:", error);
		}
	};
	// Function para limpiar todos tasks
	const clearAllTasks = async () => {
		tasks.forEach((task) => {
			deleteTask(task.id)
		})
	};

	return (
		<>
			<div className="card justify-content-center align-items-center shadow-lg col-6 mx-auto">
				<h1 className="card-title mb-3 mt-5 dynapuff">
					Lista de Tareas
				</h1>
				<div className="container d-flex justify-content-center align-items-center">
					<input
						className="text-center rounded"
						type="text"
						placeholder="Añade una nueva tarea"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<button
						type="button"
						className="btn btn-success ms-2"
						style={{ borderRadius: "50%" }}
						onClick={addNewTask}>
						<i className="fas fa-plus-circle"></i>
					</button>
				</div>
				<TodoList tasks={tasks} deleteTask={(id) => deleteTask(id)} />
				<button
					type="button"
					className="btn btn-danger"
					onClick={clearAllTasks}>
					<i className="far fa-trash-alt me-2"></i>
					Limpiar
				</button>
				<p className="dancing-script mt-2 mb-5">{tasks.length} Tareas pendientes</p>
			</div>
		</>
	);
};
export default Home;
