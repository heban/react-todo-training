"use strict";

/*
 * Example of stateless function component in ES6
*/

import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todos";

const mapDispatchToProps = dispatch => ({
    addTodo: (user_id, value) => dispatch(addTodo(user_id, value))
});

const NewTodoItemComponent = ({ userId, addTodo }) => {
    return (
        <li onBlur={(e) => {
            addTodo(userId, e.target.value.trim());
        }} onKeyDown={(e) => {
            if (e.keyCode === 13) { 
                e.target.blur();
            }
        }} className="todo-item todo-item--new">
            <input placeholder="Write something" className="todo-item__name" type="text" autoFocus />
        </li>
    );
};

NewTodoItemComponent.propTypes = {
    userId: React.PropTypes.number.isRequired,
    addTodo: React.PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(NewTodoItemComponent);