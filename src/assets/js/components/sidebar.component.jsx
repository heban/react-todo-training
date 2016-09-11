"use strict";

/*
 * Example of stateless function component in ES6
*/

import React from "react";
import { connect } from "react-redux";
import { sortTodosByName, sortTodosByStatus, showOnlyCompleted, addingTodoState } from "../actions/todos";

const mapDispatchToProps = dispatch => ({
    sortTodosByName: () => dispatch(sortTodosByName()),
    sortTodosByStatus: () => dispatch(sortTodosByStatus()),
    showOnlyCompleted: () => dispatch(showOnlyCompleted()),
    addingTodoState: () => dispatch(addingTodoState())
});

const SidebarComponent = ({ userName, todosStatus, sortTodosByName, sortTodosByStatus, showOnlyCompleted, addingTodoState }) => (
    <aside className="todo-sidebar">
        <h2>{userName}</h2>
        <ul>
            <li><a href="#" onClick={(e) => {e.preventDefault(); addingTodoState();}}>add todo</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); showOnlyCompleted();}}>{!todosStatus ? "hide done" : "unhide done"}</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); sortTodosByName();}}>sort by name</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); sortTodosByStatus();}}>sort by status</a></li>
        </ul>
    </aside>
);

SidebarComponent.propTypes = {
    addingTodoState: React.PropTypes.func.isRequired,
    sortTodosByName: React.PropTypes.func.isRequired,
    sortTodosByStatus: React.PropTypes.func.isRequired,
    showOnlyCompleted: React.PropTypes.func.isRequired,
    userName: React.PropTypes.string.isRequired,
    todosStatus: React.PropTypes.bool.isRequired
};

export default connect(null, mapDispatchToProps)(SidebarComponent);