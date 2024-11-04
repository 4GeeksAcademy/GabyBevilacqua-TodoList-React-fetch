import React, { useState } from "react";
import TodoList from "./TodoList";
import Swal from 'sweetalert2'

const Home = () => {

	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const addTask = () => {
		if (newTask.trim() === "") return; // Evitar tareas vacías
		setTasks([...tasks, newTask.trim()]);
		setNewTask(""); // Limpiar el campo de entrada
	};

	// Eliminar una tarea por índice
	const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));

		Swal.fire({
			title: "Bien hecho!",
			text: "Has terminado una tarea!",  // alerta sacada de sweetAlert, hay que instalar el npm e importar sweetAlert
			icon: "success"
		  });
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
				<TodoList tasks={tasks} deleteTask={deleteTask} />
				<p className="dancing-script mb-5">{tasks.length} Tareas pendientes</p>
			</div>

		</>
	);
};
export default Home;