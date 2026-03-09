import React from "react";

export default function TodoTable({ todos, deleteTodo, openEdit, darkMode = true }) {

  if (!todos.length) {
    return (
      <div className={`text-center mt-10 ${darkMode ? "text-white" : "text-gray-800"}`}>
        No todos found
      </div>
    );
  }

  const editBtnClass = darkMode
    ? "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
    : "px-3 py-1 bg-blue-200 hover:bg-blue-300 text-gray-900 rounded";
  const deleteBtnClass = darkMode
    ? "px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
    : "px-3 py-1 bg-red-200 hover:bg-red-300 text-gray-900 rounded";

  return (
    <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
      <thead className={darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}>
        <tr>
          <th className="p-3 text-left w-14">No</th>
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-center">Completed</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}>
        {todos.map((todo, index) => (
          <tr
            key={todo._id}
            className={darkMode ? "border-b border-gray-700" : "border-b border-gray-200"}
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{todo.title}</td>
            <td className="p-3">{todo.description}</td>
            <td className="p-3 text-center">
              {todo.completed ? "✔" : "❌"}
            </td>
            <td className="p-3 text-center space-x-2">
              <button
                onClick={() => openEdit(todo)}
                className={editBtnClass}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className={deleteBtnClass}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}