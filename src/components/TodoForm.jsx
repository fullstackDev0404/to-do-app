import { useState } from "react";
import { toast } from "react-toastify";

export default function TodoForm({ setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setTodos((prevTodos) => [...prevTodos, data]);
        setTitle("");
        setDescription("");
        toast.success("Todo added successfully!");  // Success toast
      } else {
        setError(data.error || "Error adding todo");
        toast.error(data.error || "Error adding todo");  // Error toast
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding the todo");
      toast.error("An error occurred while adding the todo");  // Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Your Todos</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-400 outline-none"
          ></textarea>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition">
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}