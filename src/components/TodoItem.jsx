export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className="flex justify-between items-center border-b py-2 dark:border-gray-600">
      <span
        className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800 dark:text-white"}`}
        onClick={() => toggleComplete(todo)}
      >
        {todo.title}
      </span>
      <button className="text-red-500 hover:text-red-400" onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
}