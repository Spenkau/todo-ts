import React, {FC, useRef, useState} from 'react';
import {ITodo} from "./data";

interface ITodoItem extends ITodo {
    id: number;
    sizes: number[];
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const ListItem: FC<ITodoItem> = (props) => {
    const {
        id,
        title,
        completed,
        todos,
        setTodos,
        sizes
    } = props;

    const [isEdit, setIsEdit] = useState(true)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    function deleteItem(): void {
        setTodos(todos.filter((el, index) => index !== id))
    }

    function handlePerform(): void {
        setTodos(todos.map((todo, index) => {
            if (index !== id) return todo;

            return {
                ...todo,
                completed: !todo.completed
            }
        }))
    }

    function editText(e: any): void {
        setTodos(todos.map((todo, index) => {
            if (index !== id) return todo;

            return {
                ...todo,
                title: e.target.value,
            }
        }))
    }


    return (
        <li className={"list-item"} style={{width: `${sizes[0]}px`, height: `${sizes[1]}px`}}>
            <ul>
                <li className={"decoration"} style={{left: `${sizes[0] / 2}px`}}>
                    <img src="/images/pin.png" alt=""/>
                </li>
                <li
                    className={"main-content"}
                    style={{width: `${sizes[0]}px`, height: `${sizes[1]}px`}}
                >
                    <div className="text-content">
                        <input type={"checkbox"} checked={completed} onChange={handlePerform} title={"Выполнить"}/>
                        <textarea
                            ref={textareaRef}
                            style={{
                                textDecoration: completed ? 'line-through' : 'none',
                            }}
                            disabled={isEdit}
                            onChange={editText}
                            value={title}
                        />
                    </div>
                    <button onClick={() => setIsEdit(!isEdit)}>
                        {
                            isEdit ?
                                <img
                                    src="/images/edit.png"
                                    width={20}
                                    height={20}
                                    style={{marginRight: "35px"}}
                                    alt="Edit"
                                    onClick={() => textareaRef.current?.focus()}
                                    title={"Редактировать заметку"}/> :
                                <img
                                    src="/images/performed.png"
                                    width={20}
                                    height={20}
                                    style={{marginRight: "35px"}}
                                    alt="Edit"
                                    title={"Редактировать заметку"}/>
                        }
                    </button>
                    <button onClick={deleteItem}>
                        <img
                            src="/images/trashcan.png"
                            width={20}
                            height={20}
                            alt="Delete"
                            title={"Удалить заметку"}/>
                    </button>
                </li>
            </ul>
        </li>
    );
};

export default ListItem;