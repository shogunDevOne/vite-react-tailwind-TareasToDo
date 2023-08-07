import TodoItem from "./TodoItem";

const TodoList = ({todos, removeTodo, updateTodo}) => { 
    return (
        <div className="rounded-t-md overflow-hidden bg-white mt-8 dark:bg-gray-800 [&>article:p-4] ">

           {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />
           ))}
                 
            
            
        </div>
    );
 };

 export default TodoList;