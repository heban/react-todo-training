"use strict";

/*
 * Example with class in ES6
*/

import React from "react";
import Sidebar from "./sidebar.component.jsx";
import TodoList from "./todoList.component.jsx";
import { connect } from "react-redux";
import { setUserTodos } from "../actions/todos";

const mapStateToProps = ({ user, todos }) => ({
    user,
    todos
});

const mapDispatchToProps = dispatch => ({
    setUserTodos: id => dispatch(setUserTodos(id))
});

class TodoContainerComponent extends React.Component {
    componentWillMount() {
        this.props.setUserTodos(this.props.user.data.id);
    }
    
    render() {
        return (
            <div className="todo-container">
                <Sidebar todosStatus={this.props.todos.onlyCompleted} userName={this.props.user.data.login} />
                <TodoList todos={this.props.todos} userId={this.props.user.data.id} />
            </div>
        );
    }
}

TodoContainerComponent.propTypes = {
    setUserTodos: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(TodoContainerComponent);