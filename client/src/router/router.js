import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";

import Alert from "../components/Alert/Alert";
import TableContainer from "../components/addT/TableContainer"


const AppRouter = () => (
  <Router>
    <Navigation />
    <Alert />
    <Switch>
    
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/users-list" exact component={TableContainer} />
    
    </Switch>
  </Router>
);

export default AppRouter;
