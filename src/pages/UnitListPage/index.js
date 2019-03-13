import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import UnitList from "./UnitList";
import withNavigation from "../../decorators/withNavigation";

const UnitListPage = props => {
  return (
    <div className="page-content">
      <UnitList {...props} />
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuth,
  withNavigation
)(UnitListPage);
