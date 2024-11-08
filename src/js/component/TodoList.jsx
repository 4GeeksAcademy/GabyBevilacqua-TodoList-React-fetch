import React from "react";


const TodoList = ({ tasks, deleteTask, editTask }) => {

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "5px 0" }}>
          <span style={{ marginRight: "30px" }}>{task.label}</span>
          <button onClick={() => editTask(task)} style={{ backgroundColor: "rgb(223, 214, 242)", color: "black", border: "none", borderRadius: "3px", cursor: "pointer" }}>
          <i className="fas fa-pencil-alt"></i>
          </button>
          <button onClick={() => deleteTask(task.id)} style={{ backgroundColor: "rgb(223, 214, 242)", color: "red", border: "none", borderRadius: "3px", cursor: "pointer" }}>
          <i className="far fa-times-circle"></i>
          </button>
        </li>
      ))}
    </ul>
  );
};


export default TodoList;