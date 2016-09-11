"use strict";

/*
 * Example in pure ES5
*/

var React = require("react"),
    ReactRedux = require("react-redux"),
    users = require("../data.json").users,
    Avatar = require("./avatar.component.jsx"),
    userLoginAction = require("../actions/user"),
    hashHistory = require("react-router").hashHistory,
    LoginComponent;

LoginComponent = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            warning: false
        };
    },
    formHandler: function (e) {
        e.preventDefault();
        var login = this._loginInput.value.trim(),
            pass = this._passwordInput.value.trim(),
            userData = this.getUserData(login, pass);

        if (!this.simpleValidator(login, pass) ||
            !userData) {
            this.setState({
                warning: true
            });
            return;
        }

        this.props.dispatch(userLoginAction(userData));
        hashHistory.push("/todolist");
    },
    simpleValidator: function (loginValue, passValue) {
        if (loginValue !== "" && passValue !== "") {
            return true;
        }
        return false;
    },
    getUserData: function (loginValue, passValue) {
        var userToFind = users.filter(function (user) {
            return user.login === loginValue && user.password === passValue;
        });

        return userToFind.length ? userToFind[0] : null;
    },
    render: function () {
        return (
            <main className="todo-login">
                <Avatar />
                <form onSubmit={this.formHandler}>
                    <input ref={function (input) { this._loginInput = input; }.bind(this)} type="text" placeholder="My Login" autoFocus />
                    <input ref={function (input) { this._passwordInput = input; }.bind(this)} type="password" placeholder="Password" />

                    <button>Log in</button>
                </form>
                <p className="todo-login__example">
                    Example data:<br />login: <strong>johnny</strong>, password: <strong>five</strong>
                </p>
                <p className={"todo-login__warning " + (this.state.warning === false ? "" : "todo-login__warning--show")}>
                    Wrong login or password
                </p>
            </main>
        );
    }
});

module.exports = ReactRedux.connect()(LoginComponent);