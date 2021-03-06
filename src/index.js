import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import store from "./redux/store";
import Main from "./pages/Main";
import App from "./App";
import "./style/index.scss";
// import * as serviceWorker from "./serviceWorker";
// {
//   renderRoutes(Routes);
// }

const client = new ApolloClient({
  uri: "http://localhost:3090/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <App>
        <Main />
      </App>
      {/* </BrowserRouter> */}
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
