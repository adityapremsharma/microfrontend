import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "../styles/main.scss";
import PropTypes from "prop-types";

const App = (props) => {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
