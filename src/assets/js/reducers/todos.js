"use strict";

import actions from "../enums/actions";

const todosReducer = (state={
    lastId: 0,
    onlyCompleted: false,
    sortByStatus: 0,
    sortByName: 0,
    addingTodo: false,
    items: []
}, action) => {
    switch(action.type) {
        case actions.SET_USER_TODOS: {
            return {
                ...state,
                lastId: action.lastId,
                items: action.todos
            };
        }
        case actions.SORT_BY_STATUS: {
            let todos = {
                ...state,
                sortByStatus: state.sortByStatus ? -state.sortByStatus : 1
            };

            todos.items.sort((a, b) => {
                const todoFirstStatus = a.completed, 
                    todoSecondStatus = b.completed;

                return (todos.sortByStatus > 0) ? todoSecondStatus - todoFirstStatus : todoFirstStatus - todoSecondStatus;
            });

            return todos;
        }
        case actions.SORT_BY_NAME: {
            let todos = {
                ...state,
                sortByName: state.sortByName ? -state.sortByName : 1
            };

            todos.items.sort((a, b) => {
                const todoFirstName = a.name.toLowerCase(), 
                    todoSecondName = b.name.toLowerCase();

                if (todoFirstName < todoSecondName) {
                    return -todos.sortByName;
                }
                if (todoFirstName > todoSecondName) {
                    return todos.sortByName;
                }
                return 0;
            });

            return todos;
        }
        case actions.HIDE_DONE: {
            return {
                ...state,
                onlyCompleted: !state.onlyCompleted
            };
        }
        case actions.DELETE_TODO: {
            let todos = state.items.filter((item) => {
                return item.todo_id !== action.id;
            });

            return {
                ...state,
                items: todos
            };
        }
        case actions.COMPLETE_TODO: {
            let todos = state.items.map((item) => {
                if (item.todo_id !== action.id) {
                    return item;
                } else {
                    return Object.assign({}, item, {
                        completed: !item.completed
                    });
                }
            });

            return {
                ...state,
                items: todos
            };
        }
        case actions.CHANGE_TODO_NAME: {
            let todos = state.items.map((item) => {
                if (item.todo_id !== action.id) {
                    return item;
                } else {
                    if (item.name === action.value) {
                        return item;
                    } else {
                        return Object.assign({}, item, {
                            name: action.value
                        });
                    }
                }
            });

            return {
                ...state,
                items: todos
            };
        }
        case actions.ADDING_TODO: {
            return {
                ...state,
                addingTodo: !state.addingTodo
            };
        }
        case actions.ADD_TODO: {
            let newTodo = [{
                todo_id: state.lastId + 1,
                user_id: action.user_id,
                name: action.value,
                completed: false
            }];

            if (action.value !== "") {
                return {
                    ...state,
                    lastId: state.lastId + 1,
                    addingTodo: false,
                    items: newTodo.concat(state.items)
                };
            }

            return {
                ...state,
                addingTodo: false
            };
        }
        default: {
            return state;
        }
    }
};

export default todosReducer;