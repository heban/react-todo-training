"use strict";

import { combineReducers } from "redux";
import userReducer from "./user";
import todosReducer from "./todos";

const todoReducers = combineReducers({
    user: userReducer,
    todos: todosReducer
});

module.exports = todoReducers;