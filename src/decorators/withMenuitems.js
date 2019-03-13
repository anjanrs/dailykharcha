import { lifecycle } from "recompose";

const withMenuitems = lifecycle({
  componentWillMount() {
    const { auth, fetchMenuitems } = this.props;
    if (auth.get("authenticated")) {
      //check if auth.permissions are already set
      //if set do noting
      //if  auth.permissions are not yet set
      if (auth.get("menuitems").size === 0) {
        //execute redux action to set the auth.permissions state
        fetchMenuitems();
      }
    }
  }
});

export default withMenuitems;
