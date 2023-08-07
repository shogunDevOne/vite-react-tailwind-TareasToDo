import IconCross from "./icons/IconCross";
import React from "react";
import IconCheck from "./icons/IconCheck";

const TodoItem = ({todo, removeTodo, updateTodo}) => {
    
    const {id, title, completed} = todo;
    
    return (
        <article className="flex gap-4 border-b border-b-gray-400 py-4 px-4 transition-all duration-1000  dark:bg-gray-800 ">

                <button 
                    className={`h-5 w-5 flex-none rounded-full border-2 ${
                        completed ? "grid  place-items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" 
                        : "inline-block" }`} 
                    onClick={() => updateTodo(id)}
                >
                    { completed && <IconCheck />}
                       
                    
                </button>

                <p className= {`text-gray-600 grow dark:text-gray-400 ${completed && "line-through"}`}>
                  {title}
                </p>
                <button className="flex-none" onClick={() => removeTodo(id)} >
                    <IconCross />
                </button>
        </article>
    )
}

export default TodoItem;