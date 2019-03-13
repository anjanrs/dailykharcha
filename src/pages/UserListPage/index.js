import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import withNavigation from "../../decorators/withNavigation";
import UserList from "./UserList";
import ModalBox from "../../components/core/ModalBox";
import AccessPerUserDetailPage from "../AccessPerUserDetailPage";
import { withHandlers } from "recompose";
import { userlistPageActions } from "./redux";
import "./style.scss";

const UserListPage = ({
  userlistPageState,
  onEditAccessOpenHandler,
  onEditAccessClosehandler,
  auth
}) => {
  const { showEditAccess, userId } = userlistPageState.toJS();
  return (
    <div className={`page-content`}>
      <ModalBox
        id="userlist-editaccess-modal"
        isOpen={showEditAccess}
        onCloseClick={onEditAccessClosehandler}
        onOverlayClick={onEditAccessClosehandler}
      >
        <AccessPerUserDetailPage dataId={userId} />
      </ModalBox>
      <UserList onEditAccessClick={onEditAccessOpenHandler} auth={auth} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  userlistPageState: state.userlistPage
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
    userlistPageActions
  ),
  withAuth,
  withNavigation,
  withPageHandlers
)(UserListPage);
