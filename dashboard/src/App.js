import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SubPath from "./components/SubPath";
import "../styles/main.scss";
import PropTypes from "prop-types";

const App = (props) => {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/subpath">
          <SubPath />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
