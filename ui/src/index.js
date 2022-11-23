import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Home.jsx";
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import StoreHome from "./StoreHome.jsx"
import UserHome from "./UserHome.jsx";

function getRoutes() {
    const userInfo = document.querySelector("meta[name='user-info']").getAttribute("value");
    if (userInfo == "") {
        return [
            <Route exact path={"/"} component={Home} />,
            <Route exact path={"/user/signin"} component={() => <Signin url={"/user/signin"} redirectTo={"/user/home"} />} />,
            <Route exact path={"/store/signin"} component={() => <Signin url={"/store/signin"} redirectTo={"/store/home"} />} />
        ];
    }
    const userInfoJson = JSON.parse(userInfo);
    switch (userInfoJson["userType"]) {
        case "user": return [
            <Route exact path={"/user"} component={() => <UserHome userInfo={userInfoJson} />} />,
            <Redirect to={"/user"} />,
        ];
        case "store": return [
            <Route exact path={"/store"} component={() => <StoreHome userInfo={userInfoJson} />} />,
            <Redirect to={"/store"} />,
        ]
    }
}

function App() {
    const userInfo = document.querySelector("meta[name='user-info']").getAttribute("value");
    const userInfoJson = userInfo == "{}" ? null : JSON.parse(userInfo);
    return <div className="app-body">
        <ToastContainer />
        <Router>
            <Switch>
                <Route path={"/user-signin"} render={() => <Signin userType="user" />} />
                <Route path={"/user-signup"} render={() => <Signup url={"/user/signup"} redirectTo={"/user"} />} />
                <Route path={"/store-signin"} render={() => <Signin userType="store" />} />
                <Route path={"/user"} render={(props) => <UserHome userInfo={userInfoJson} {...props} />} />
                <Route path={"/store"} render={(props) => <StoreHome userInfo={userInfoJson} {...props} />} />
                <Route path={"/"} render={Home} />
            </Switch>
        </Router>
    </div>
}

ReactDom.render(<App />, document.getElementById("container"));