import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { Provider } from 'react-redux'
import store from './Toolkit/store'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
          <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
