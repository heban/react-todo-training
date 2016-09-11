(function () {
    "use strict";
    
    /*
     * Example in pure ES5
    */

    var React = require("react"),
        ReactDOM = require("react-dom"),
        Provider = require("react-redux").Provider,
        createStore = require("redux").createStore,
        Router = require("react-router").Router,
        Route = require("react-router").Route,
        hashHistory = require("react-router").hashHistory,
        TodoContainer = require("./components/todoContainer.component.jsx"),
        Login = require("./components/login.component.jsx"),
        appStore = createStore(require("./reducers")),
        isUserAuthorized;
    
    isUserAuthorized = function (nextState, replace) {
        var isLogged = appStore.getState().user.isLogged;

        if (nextState.location.pathname === "/todolist") {
            if (!isLogged) {
                replace({
                    pathname: "/"
                });
            }
        } else {
            if (isLogged) {
                replace({
                    pathname: "/todolist"
                });
            }
        }
    };

    ReactDOM.render(
        <Provider store={appStore}>
            <Router history={hashHistory}>
                <Route path="/" component={Login} onEnter={isUserAuthorized} />
                <Route path="/todolist" component={TodoContainer} onEnter={isUserAuthorized} />
            </Router>
        </Provider>,
        document.getElementById("todo-app")
    );
}());
