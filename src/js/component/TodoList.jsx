import React from "react";


const TodoList = ({ tasks, deleteTask }) => {

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tasks.map((task, index) => (
        <li key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "5px 0" }}>
          <span style={{ marginRight: "30px" }}>{task}</span>
          <button onClick={() => deleteTask(index)} style={{ backgroundColor: "rgb(207, 245, 233)", color: "red", border: "none", borderRadius: "3px", cursor: "pointer" }}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
};


export default TodoList;