import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Login from "../components/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";
import UsersList from "../components/UsersContainer/UsersList";
import User from "../components/UsersContainer/User";
import Alert from "../components/Alert/Alert";

const AppRouter = () => (
  <Router>
    <Navigation />
    <Alert />
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/user/:id" exact component={User} />
      <PrivateRoute path="/users-list" exact component={UsersList} />
    </Switch>
  </Router>
);

export default AppRouter;
