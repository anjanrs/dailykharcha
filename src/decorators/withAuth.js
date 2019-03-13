import React from "react";
import { branch, renderComponent, compose } from "recompose";
import { Redirect, withRouter } from "react-router-dom";

const withAuth = compose(
  withRouter,
  branch(
    ({ auth }) => !auth.get("authenticated"),
    renderComponent(({ location }) => {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      );
    })
  )
);

export default withAuth;
