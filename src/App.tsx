import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import List from "./components/List";
import {ITodo} from "./components/data";
import "./styles.css"

const storage: ITodo[] =  JSON.parse(localStorage.getItem('todos')!)



function App() {
    // const [state, dispatch] = useReducer(reducer, state)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [todos, setTodos] = useState<ITodo[]>(storage ? storage : [])
    const test = useRef(null)

    const AddTodoModal = lazy(() => import("./components/AddTodoModal"))

    function modalInteract(): void {
        setShowModal(!showModal)
    }

    useEffect(() => {
        const todoList = localStorage.getItem('todos')
        if (todoList !== null) setTodos(JSON.parse(todoList))
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos])

  return (
      <div className={"todo-container"} ref={test}>
          <h1 className={"todo-header"}>TODO-Лист</h1>
          <button className={"modal-interact"} onClick={modalInteract} >
              <p style={{rotate: showModal ? "45deg" : "0deg"}}>+</p>
          </button>
          {
              showModal ?
                  <Suspense fallback={<div>Loading...</div>}>
                      <AddTodoModal
                          todos={todos}
                          setTodos={setTodos}
                          setShowModal={setShowModal}
                      />
                  </Suspense>
              : null
          }
          {<List todos={todos} setTodos={setTodos}  />}
      </div>
  );
}

export default App;
