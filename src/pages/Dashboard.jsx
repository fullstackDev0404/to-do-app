import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoTable from "../components/TodoTable";
import TodoModal from "../components/TodoModal";
import { fetchTodos, deleteTodo } from "../api/todoApi";

export default function Dashboard({ darkMode = true }) {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const isLoggedIn = () =>
    !!(localStorage.getItem("token") || sessionStorage.getItem("token"));

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    loadTodos();
  }, [navigate]);

  const handleDelete = async(id)=>{

    try{

      await deleteTodo(id);

      setTodos(prev => prev.filter(t => t._id !== id));

      toast.success("Todo deleted");

    }catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }

  };

  const openEdit = (todo)=>{
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const openCreate = ()=>{
    setEditingTodo(null);
    setModalOpen(true);
  };

  return(

    <div className="p-10">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold dark:text-white">
          Todo Dashboard
        </h1>

        <button
          onClick={openCreate}
          className="px-4 py-2 bg-sky-500 text-white rounded"
        >
          + New Todo
        </button>

      </div>

      <TodoTable
        todos={todos}
        deleteTodo={handleDelete}
        openEdit={openEdit}
        darkMode={darkMode}
      />

      {modalOpen && (

        <TodoModal
          closeModal={()=>setModalOpen(false)}
          editingTodo={editingTodo}
          setTodos={setTodos}
        />

      )}

    </div>

  );

}