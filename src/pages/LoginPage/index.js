import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withProps, compose } from "recompose";

import { authActions } from "../../redux/modules/auth";
import "./style.scss";

const LoginPage = props => {
  //handleSubmit event handler provided by reduxForm
  const { handleSubmit, onSubmit } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="login-form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="login-header">Log In</div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-3">
                  Email
                </label>
                <Field
                  name="email"
                  type="text"
                  component="input"
                  autoComplete="none"
                  className="form-control col-8"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-3">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  component="input"
                  autoComplete="none"
                  className="form-control col-8"
                  id="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group row">
                <div className="col-8 offset-3">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default compose(
  connect(
    mapStateToProps,
    authActions //https://blog.benestudio.co/5-ways-to-connect-redux-actions-3f56af4009c8?gi=4f1e8e396c7a
  ),
  withProps(({ loginAction }) => {
    return {
      //reduxForm will pass formProps via handleSubmit event handler
      onSubmit: formProps => {
        loginAction(formProps);
      }
    };
  }),
  reduxForm({ form: "loginForm" })
)(LoginPage);
