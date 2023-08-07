import { DragDropContext } from "@hello-pangea/dnd";


import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import { useEffect, useState } from "react";
import React from "react";


// const InitialStateTodos = [ 
  
//   {id:1 , title: "CooperativaPangea", completed: true},
//   {id:2 , title: "Go to the swim", completed: false},
//   {id:3 , title: "no beber alcohol", completed: false},
//   {id:4 , title: "estudiar figma", completed: true},  
// ];

const InitialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {

  const  [todos, setTodos] = useState(InitialStateTodos);

  useEffect (() => {
      localStorage.setItem("todos", JSON.stringify(todos))
      }, [todos] );

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

  const handleDragEnd = (result) => {
    const { destination, source } = result;
        if (!destination) return;
        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        setTodos((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
        );
};

  return  (
    <div className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')]  bg-contain bg-no-repeat
    dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] 
    md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')] transition-all duration-1000 ">
        
        <Header />

        <main className="container mx-auto mt-8 px-4 md:max-w-xl transition-all duration-1000 ">
          
          <TodoCreate createTodo={createTodo} />
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoList  
                todos={filteredTodos()} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo}  
            />
          </DragDropContext>

          {/* TodoComputed operaciones computadas */}
          <TodoComputed  computedItemsLeft= {computedItemsLeft} clearCompleted={clearCompleted}  />

          {/* TodoFilter filtra elementos */}
          <TodoFilter changeFilter={changeFilter} filter={filter} />   

        </main>
   
        <footer className=" dark:text-gray-400 text-center mt-8">Arrastra y suelta , reordena tu lista</footer>
    </div>
  )
};

export default App;

