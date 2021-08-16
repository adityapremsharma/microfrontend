import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Profile from "./components/Profile";
import "../styles/main.scss";
import SubPath from "./components/SubPath";
import PropTypes from "prop-types";

const App = (props) => {
  const { history } = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/subpath">
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
