import { useState } from "react";

const TodoCreate = ({createTodo}) => { 
    
    const [title, setTitle] = useState("")

    const handleSubmitAddTodo =  (e) => { 
        
        e.preventDefault();
       

        if (!title.trim()) {           
            return setTitle("");
        }

        createTodo(title);
        setTitle("");
    };


    return (

        <form onSubmit={handleSubmitAddTodo} className="flex items-center gap-4 overflow-hidden rounded-md bg-white py-4 px-4 dark:bg-gray-800  transition-all duration-1000">
                  <span className="  inline-block h-4 w-4 rounded-full border-2"></span>
                  <input 
                      type="text" 
                      placeholder="Crea una nueva Tarea..." 
                      className="w-full outline-none text-gray-400 dark:bg-gray-800 transition-all duration-1000 "
                      value={title}
                      onChange= {(e) => setTitle(e.target.value)}
                  />
        </form>

    );
 };

 export default TodoCreate;