import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { toast } from "react-toastify";

export default function Dashboard({ darkMode, setDarkMode }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos/get", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTodos(data);
        } else {
          setError("Error fetching todos");
        }
      } catch (err) {
        setError("An error occurred while fetching todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const toggleComplete = (todo) => {
    // Logic for toggling the completion status of the todo
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        toast.success("Todo deleted successfully!");  // Success toast
      } else {
        toast.error(data.error || "Error deleting todo");  // Error toast
      }
    } catch (err) {
      toast.error("An error occurred while deleting the todo");  // Error toast
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-12">
      <TodoForm setTodos={setTodos} />

      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">Your Todos</h2>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}