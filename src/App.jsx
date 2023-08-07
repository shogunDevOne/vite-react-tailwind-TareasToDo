import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import { useState } from "react";
import React from "react";


const InitialStateTodos = [ 
  
  {id:1 , title: "CooperativaPangea", completed: true},
  {id:2 , title: "Go to the swim", completed: false},
  {id:3 , title: "no beber alcohol", completed: false},
  {id:4 , title: "estudiar figma", completed: true},  
];

const App = () => {

  const  [todos, setTodos] = useState(InitialStateTodos);

  const createTodo = (title) => {
     const newTodo = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
     }

     setTodos([...todos, newTodo]);
  }

  const removeTodo = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id))

  }

  const updateTodo = (id) => {
      setTodos(todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length ; // retorna cantidad de tareas no completados

  const clearCompleted = () => {
      setTodos(todos.filter((todo) => !todo.completed))
  }

  const [filter, setFilter] = useState ("all")

  const changeFilter = (filter) => setFilter(filter) 

  const filteredTodos = () => {
        switch (filter) {
          case "all":
            return todos;
          case "active":
            return todos.filter((todo) => !todo.completed); 
          case "completed":
            return todos.filter((todo) => todo.completed)
          default:
            return todos;
        } 
  }


  return  (
    <div className="min-h-screen bg-gray-300 
    bg-[url('./assets/images/bg-mobile-dark.jpg')]  bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-light.jpg')">
        
        <Header />

        <main className="container mx-auto mt-8 px-4">
          {/*TodoCreate - Crea Todo's */}
          <TodoCreate createTodo={createTodo} />
          
          {/* TodoList (TodoItem) TodoUpdate & TodoDelete */}
          <TodoList  todos={filteredTodos()} removeTodo={removeTodo} updateTodo={updateTodo}  />
      
          {/* TodoComputed operaciones computadas */}
          <TodoComputed  computedItemsLeft= {computedItemsLeft} clearCompleted={clearCompleted}  />

          {/* TodoFilter */}
          <TodoFilter changeFilter={changeFilter} filter={filter} />   

        </main>
   
        <footer className=" dark:text-gray-400 text-center mt-8">Drag and drop to reorder list</footer>
    </div>
  )
};

export default App;

