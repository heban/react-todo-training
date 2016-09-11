"use strict";

/*
 * Example of stateless function component in ES5
*/

var React = require("react"),
    AvatarComponent;

AvatarComponent = function AvatarComponent() {
    return <div className="todo-avatar">A</div>;
};

module.exports = AvatarComponent;