import React, {FC, useReducer, useState} from 'react';
import {ITodoList} from "./List";
import {initialState, reducer} from "../ModalReducer";

interface IAddTodoModal extends ITodoList {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTodoModal: FC<IAddTodoModal> = (props) => {
    const {todos, setTodos, setShowModal} = props

    const [inputValue, setInputValue] = useState("")
    const [state, dispatch] = useReducer(reducer, initialState)

    function saveTodo(): void {
        setInputValue(inputValue)

        if (inputValue) {
            setTodos([...todos, {
                title: inputValue,
                sizes: [state.width, state.height],
                completed: false,
            }])
        }
        setShowModal(false)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter") {
            e.preventDefault()
            saveTodo()
        }
    }

    function handleResize(e: any) {
        if (state.isActive) {
            dispatch({ type: "WIDTH", payload: e.clientX })
            dispatch({ type: "HEIGHT", payload: e.clientY })
        }
    }

    function suggestSize(w: number, h: number): void {
        dispatch({ type: "WIDTH", payload: w })
        dispatch({ type: "HEIGHT", payload: h })
    }

    return (
        <div className={"add-todo"}>
            <form
                onMouseMove={handleResize}
                onMouseUp={() => dispatch({ type: "IsACTIVE", payload: false })}
                action={"add todo"}
                style={{userSelect: state.isActive ? "none" : "auto"}}
            >
                <label htmlFor="input-field">Добавьте заметку</label>
                <div
                    className={"container"}
                    onMouseMove={handleResize}
                    style={{width: `${state.width}px`, height: `${state.height}px`}}
                >
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        id="input-field"
                        placeholder={"Some text"}
                    />
                    <button
                        className="resizer"
                        onMouseDown={() => dispatch({ type: "IsACTIVE", payload: true })}
                    >
                        <img src="/images/drag.png" alt=""/>
                    </button>
                </div>
                <button className={"save"} type={"button"} onClick={() => {
                    saveTodo()
                }}>Сохранить
                </button>
                <ul className="resize-panel">
                    <li>
                        <button type={"button"} onClick={() => suggestSize(150, 150)}>150x150</button>
                    </li>
                    <li>
                        <button type={"button"} onClick={() => suggestSize(300, 300)}>300x300</button>
                    </li>
                    <li>
                        <button type={"button"} onClick={() => suggestSize(600, 600)}>600x600</button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default AddTodoModal;