import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import SideBar from "../sideBar/SideBar";
import style from "./AppViewStyle";
import { AuthState } from "../../auth/auth.type";
import { appRoutes, RoutePathsEnum } from "../../routes";
import { RETRIEVE_CURRENT_USER } from "../../auth/auth.action";
import { AppState } from "../app.type";

interface AppViewProps {
  retrieveCurrentUser: () => void;
  auth: AuthState;
  classes: any;
}

const AppView: React.FC<AppViewProps> = (props: AppViewProps) => {    
  const { classes, retrieveCurrentUser } = props;  
  const user = localStorage.getItem("users");
  useEffect(() => {
    retrieveCurrentUser();
  }, [retrieveCurrentUser]);
  if (!user && !props.auth.pending) {
    return <Redirect to={RoutePathsEnum.SIGN_IN} />;
  }
  return (
    <div className={classes.main}>
      <SideBar />
      <div className={classes.content}>
        <Switch>
          {appRoutes.map((prop, key) => (
            <Route
              path={prop.path}
              exact={prop.exact}
              key={`route-${prop.path}`}
              component={prop.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Function) => ({
  retrieveCurrentUser: () => dispatch({ type: RETRIEVE_CURRENT_USER }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(AppView));
