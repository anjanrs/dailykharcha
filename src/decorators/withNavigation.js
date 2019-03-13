import React from "react";
import Nav from "../components/Nav";

const withNavigation = WrappedComponent => {
  return props => {
    return (
      <React.Fragment>
        <Nav />
        <section className="main__content">
          <WrappedComponent {...props} />
        </section>
      </React.Fragment>
    );
  };
};

export default withNavigation;
