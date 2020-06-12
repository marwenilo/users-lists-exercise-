import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Test from "../components/test/Test"
import E from "../components/test/e"
import Alert from "../components/Alert/Alert";
// import TableContainer from "../components/addT/TableContainer"


const AppRouter = () => (
  <Router>
    <Navigation />
    <Alert />
    <Switch>
    
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/users-list/:id" exact component={E} />
      <PrivateRoute path="/users-list" exact component={Test} />
    
    </Switch>
  </Router>
);

export default AppRouter;
