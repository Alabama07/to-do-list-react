import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoCreateForm from "./components/TodoCreateForm";
import TodoList from "./components/TodoList";
import ChangeDeadline from "./components/ChangeDeadline";
import Count from "./components/Count";
  
export default function App() {
  const [todos, setTodos] = useState([]);
  const [lastId, setLastId] = useState(0);
  const changingTodoIndex = useRef(null);

  const onCreateTodo = (event) => {
    const deadlineString = event.target.elements["search-form__date"].value; 

    todos.push({
      text: event.target.elements["search-form__input"].value,
      completed: false,
      id: lastId,
      date: new Date(),
      deadline: deadlineString !== "" ? new Date(deadlineString) : null,
    });

    setLastId(lastId + 1);
    setTodos([...todos]);
    event.target.elements["search-form__input"].value = '';
    event.target.elements["search-form__date"].value = '';

  };
  console.log(todos);
  
  const deleteTodo = (index) => {
    todos.splice(index, 1);
    const updatedTodos = [...todos];
    setTodos(updatedTodos);
  };

  const switchTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    setTodos([...todos]);
  };

  const changeTodo = (index, text) => {
    todos[index].text = text;
    setTodos([...todos]);
  };

  const  isDeadlineComplited = (index) => {
    if(todos[index].deadline !== null && todos[index].deadline < new Date()){
      return true
    } 
    return false;
  }
  
  const openModalNewDeadline = (index) => {
    const calendar = document.querySelector(".calendar");
    calendar.style.display = 'flex';
    changingTodoIndex.current = index
  }

  const closeModalNewDeadline = (newDeadline) => {
    const calendar = document.querySelector('.calendar');
    calendar.style.display = 'none';

    if (todos.length > changingTodoIndex.current) {
      const updatedTodos = [...todos];
      updatedTodos[changingTodoIndex.current].deadline = newDeadline;
      setTodos(updatedTodos);
    }
  }

  return (
    <>
      <header>
        <h1 className="logo">My to-do list</h1>
      </header>
      <main>
        <TodoCreateForm onSubmit={onCreateTodo}/>
        <TodoList
          list={todos}
          onDeleteTodo={deleteTodo}
          onSwitchTodo={switchTodo}
          onChangeTodo={changeTodo}
          onDeadlineComplited={isDeadlineComplited}
          onOpenModalNewDeadline={openModalNewDeadline}
        />
        <ChangeDeadline
          onCloseModalNewDeadline={closeModalNewDeadline}

        />
      </main>
    </>
  );
}

export function Fanil() {
  return (
    <div>
      <h1>Fanil</h1>
    </div>
  );
}
