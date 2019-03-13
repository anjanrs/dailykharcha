import React from "react";
import { NavLink } from "react-router-dom";
import T from "prop-types";

const Link = ({ id, path, value }) => {
  return (
    <div id={id} className="control control-link">
      <NavLink to={path}> {value}</NavLink>
    </div>
  );
};

Link.propTypes = {
  id: T.string,
  path: T.string,
  value: T.string
};

Link.defaultProps = {
  id: "",
  path: "",
  value: ""
};

export default Link;
