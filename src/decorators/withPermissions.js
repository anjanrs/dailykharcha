import { lifecycle } from "recompose";

const withPermissions = lifecycle({
  componentWillMount() {
    const { auth, fetchPermissions } = this.props;
    if (auth.get("authenticated")) {
      //check if auth.permissions are already set
      //if set do noting
      //if  auth.permissions are not yet set
      if (auth.get("permissions") === null) {
        //execute redux action to set the auth.permissions state
        fetchPermissions();
      }
    }
  }
});

export default withPermissions;
