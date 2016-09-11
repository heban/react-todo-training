"use strict";

import actions from "../enums/actions";

const userReducer = (state={
    isLogged: false,
    data: {
        id: null,
        login: "",
        password: ""
    }
}, action) => {
    switch (action.type) {
        case actions.USER_LOGIN:
            return {
                ...state, 
                isLogged: true,
                data: {
                    id: action.id,
                    login: action.login,
                    password: action.password
                }
            };
        default:
            return state;
    }
};

export default userReducer;