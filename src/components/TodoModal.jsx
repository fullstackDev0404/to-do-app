import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createTodo, updateTodo } from "../api/todoApi";

export default function TodoModal({
  closeModal,
  editingTodo,
  setTodos
}) {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [completed,setCompleted] = useState(false);

  useEffect(() => {

    if(editingTodo){
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setCompleted(editingTodo.completed);
    }

  },[editingTodo]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      if(editingTodo){

        const updated = await updateTodo(editingTodo._id,{
          title,
          description,
          completed
        });

        setTodos(prev =>
          prev.map(t => t._id === updated._id ? updated : t)
        );

        toast.success("Todo updated");

      }else{

        const newTodo = await createTodo({
          title,
          description,
          completed
        });

        setTodos(prev => [...prev,newTodo]);

        toast.success("Todo created");

      }

      closeModal();

    }catch{
      toast.error("Operation failed");
    }

  };

  return(

    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >

      <motion.div
        initial={{scale:0.8}}
        animate={{scale:1}}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[420px]"
      >

        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {editingTodo ? "Edit Todo":"Create Todo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
          />

          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
          />

          <div className="flex gap-2">

            <input
              type="checkbox"
              checked={completed}
              onChange={(e)=>setCompleted(e.target.checked)}
            />

            <span className="dark:text-white">
              Completed
            </span>

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded"
            >
              Save
            </button>

          </div>

        </form>

      </motion.div>

    </motion.div>

  );

}