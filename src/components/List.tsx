import React, {FC} from 'react';
import ListItem from "./ListItem";
import {ITodo} from "./data";

export interface ITodoList{

    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const List: FC<ITodoList> = (props) => {
    const {todos, setTodos} = props;

    return (
        <ul>
            {
                todos.map((item, index) =>
                    <ListItem
                        todos={todos}
                        setTodos={setTodos}
                        key={index}
                        id={index}
                        sizes={item.sizes}
                        completed={item.completed}
                        title={item.title}
                    />)
            }
        </ul>
    );
};

export default List;