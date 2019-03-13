import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withHandlers } from "recompose";

import withAuth from "../../decorators/withAuth";
import UserGroupList from "./UserGroupList";
import withNavigation from "../../decorators/withNavigation";
import { userGroupListPageActions } from "./redux";
import ModalBox from "../../components/core/ModalBox";
import AccessPerUserGroupDetailPage from "../AccessPerUserGroupDetailPage";
import "./style.scss";

const UserGroupListPage = ({
  userGroupListPageState,
  onEditAccessOpenHandler,
  onEditAccessClosehandler,
  auth
}) => {
  const { showEditAccess, userGroupId } = userGroupListPageState.toJS();
  return (
    <div className="page-content">
      <ModalBox
        id="usergrouplist-editaccess-modal"
        isOpen={showEditAccess}
        onCloseClick={onEditAccessClosehandler}
        onOverlayClick={onEditAccessClosehandler}
      >
        <AccessPerUserGroupDetailPage dataId={userGroupId} />
      </ModalBox>
      <UserGroupList onEditAccessClick={onEditAccessOpenHandler} auth={auth} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  userGroupListPageState: state.userGroupListPage
});
const withPageHandlers = withHandlers({
  onEditAccessOpenHandler: ({ showEditAccessAction }) => rowItem => {
    showEditAccessAction(rowItem.get("id").toString());
  },
  onEditAccessClosehandler: ({ hideEditAccessAction }) => event => {
    hideEditAccessAction();
  }
});
export default compose(
  connect(
    mapStateToProps,
    userGroupListPageActions
  ),
  withAuth,
  withNavigation,
  withPageHandlers
)(UserGroupListPage);
