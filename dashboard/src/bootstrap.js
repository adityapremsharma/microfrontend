import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { initialPath, onNavigate, defaultHistory }) => {
  // defaultHistory is the history object for individual app for development independently.
  // createMemoryHistory is going to take initial path from the host.
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  // Adding event listener to detect navigation changes.
  if (onNavigate) {
    history.listen(onNavigate);
  }

  // Rendering the app to host passing the history object.
  ReactDOM.render(<App history={history} />, el);

  // Returning an object in order to use it on host. Here, we are passing the function to get host navigation.
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      // Checking if the navigation path has changed, then push the path in order to avoid infinite loop.
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// For independent development
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dashboard-app");
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

// For using it in host
export { mount };
