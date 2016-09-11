"use strict";

import actions from "../enums/actions";
import data from "../data.json";

export const setUserTodos = (id) => {
    let todos = data.todos.filter(function (item) {
            return item.user_id === id;
        }), 
        lastId = Math.max.apply(Math, todos.map((item) => { return item.todo_id; }));

    return {
        type: actions.SET_USER_TODOS,
        lastId,
        todos
    };
};

export const sortTodosByName = () => {
    return {
        type: actions.SORT_BY_NAME
    };
};

export const sortTodosByStatus = () => {
    return {
        type: actions.SORT_BY_STATUS
    };
};

export const showOnlyCompleted = () => {
    return {
        type: actions.HIDE_DONE
    };
};

export const deleteTodo = (id) => {
    return {
        type: actions.DELETE_TODO,
        id
    };
};

export const completeTodo = (id) => {
    return {
        type: actions.COMPLETE_TODO,
        id
    };
};

export const changeTodoName = (id, value) => {
    return {
        type: actions.CHANGE_TODO_NAME,
        id,
        value
    };
};

export const addingTodoState = () => {
    return {
        type: actions.ADDING_TODO
    };
};

export const addTodo = (user_id, value) => {
    return {
        type: actions.ADD_TODO,
        user_id,
        value
    };
};