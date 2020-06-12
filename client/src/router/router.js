import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Test from "../components/test";
import Alert from "../components/Alert/Alert";
import UsersList from "../components/Users/UsersList";
// import App from "../App.js"

const AppRouter = () => (
  <Router>
    <Navigation />
    <Alert />
    <Switch>
      {/* <PrivateRoute path="/test" exact component={Test} /> */}
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/users-list" exact component={UsersList} />
      {/* <Route path="/registration" exact component={Register} /> */}
    </Switch>
  </Router>
);

export default AppRouter;
