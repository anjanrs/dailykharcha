import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import StoreList from "./StoreList";
import withNavigation from "../../decorators/withNavigation";

const StoreListPage = props => {
  return (
    <div className="page-content">
      <StoreList {...props} />
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
)(StoreListPage);
