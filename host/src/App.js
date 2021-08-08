import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import "../styles/main.scss";
import Header from "./components/Header";
import Loader from "./components/Loader";

const HomeApp = lazy(() => import("./apps/HomeApp"));
const DashboardApp = lazy(() => import("./apps/DashboardApp"));
const ProfileApp = lazy(() => import("./apps/ProfileApp"));

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/profile");
    }
  }, [isSignedIn]);

  function toggleSignedIn() {
    setIsSignedIn(!isSignedIn);
  }

  return (
    <Router history={history}>
      <Header isSignedIn={isSignedIn} toggleSignedIn={toggleSignedIn} />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/dashboard">
            <DashboardApp />
          </Route>
          <Route path="/profile">
            {!isSignedIn && <Redirect to="/" />}
            <ProfileApp />
          </Route>
          <Route path="/">
            <HomeApp />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
