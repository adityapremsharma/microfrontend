// Here, in import { mount } from "dashboard/DashboardApp", dashboard is coming from
// host -> webpack -> remote (property in module federation) -> dashboard (key)
// DashboardApp is coming from dashboard -> webpack -> exposes (property in module federation) -> ./DashboardApp (key)
// We are getting the mount element exported from the bootstrap file from the dashboard app
// eslint-disable-next-line import/no-unresolved
import { mount } from "dashboard/DashboardApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const DashboardApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // Getting onParentNavigate which was returned from dashboard bootstrap file.
    // Getting the dom element from dashboard and mounting it here.
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // Passing the onNavigate to dashboard for navigation.
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        // Checking if the navigation path has changed, then push the path in order to avoid infinite loop.
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    // Adding event listener to detect navigation changes.
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

export default DashboardApp;
