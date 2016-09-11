"use strict";

/*
 * Example of stateless function component in ES6
*/

import React from "react";
import TodoItem from "./todoItem.component.jsx";
import NewTodoItem from "./newTodoItem.component.jsx";

const TodoListComponent = ({ todos, userId }) => {
    let info,
        items,
        newTodo = "";

    if (todos.items.length) {
        info = <p className="todo-list__info">
                <span>Click a todo</span>
                <span>To edit it</span>
            </p>;
    } else {
        info = <p className="todo-list__info todo-list__info--nospace">
                <span>Nothing here, add something</span>
            </p>;
    }

    if (todos.onlyCompleted) {
        items = todos.items.filter(todo => !todo.completed);
        items = items.map(todo => <TodoItem key={todo.todo_id} todo={todo} />);
    } else {
        items = todos.items.map(todo => <TodoItem key={todo.todo_id} todo={todo} />);
    }

    if (todos.addingTodo) {
        newTodo = <NewTodoItem userId={userId} />;
    }

    return (
        <main className="todo-list">
            <ul>
                {newTodo}
                {items}
            </ul>
            {info}
        </main>
    );
};

TodoListComponent.propTypes = {
    todos: React.PropTypes.object.isRequired,
    userId: React.PropTypes.number.isRequired
};

export default TodoListComponent;