"use strict";

import actions from "../enums/actions";

module.exports = ({id, login, password}) => {
    return {
        type: actions.USER_LOGIN,
        id,
        login,
        password
    };
};