"use strict";

/*
 * Example of stateless function component in ES6
*/

import React from "react";
import { connect } from "react-redux";
import { deleteTodo, completeTodo, changeTodoName } from "../actions/todos";

const mapDispatchToProps = dispatch => ({
    deleteTodo: id => dispatch(deleteTodo(id)),
    completeTodo: id => dispatch(completeTodo(id)),
    changeTodoName: (id, name) => dispatch(changeTodoName(id, name))
});

const TodoItemComponent = ({ todo, deleteTodo, completeTodo, changeTodoName }) => {
    return (
        <li className="todo-item">
            <input onBlur={(e) => {
                changeTodoName(todo.todo_id, e.target.value);
            }} onKeyDown={(e) => {
                if (e.keyCode === 13) { 
                    e.target.blur(); 
                }
            }} className={"todo-item__name " + (todo.completed ? "todo-item__name--completed" : "")} type="text" defaultValue={todo.name} />
            <div className="todo-actions">
                <input onChange={() => {completeTodo(todo.todo_id);}} type="checkbox" id={"todo-check" + todo.todo_id} defaultChecked={todo.completed} />
                <label htmlFor={"todo-check" + todo.todo_id} className="todo-action__complete"></label>
                <a href="#" onClick={(e) => {e.preventDefault(); deleteTodo(todo.todo_id);}} className="todo-action todo-action__delete">🗑</a>
            </div>
        </li>
    );
};

TodoItemComponent.propTypes = {
    todo: React.PropTypes.object.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired,
    changeTodoName: React.PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(TodoItemComponent);