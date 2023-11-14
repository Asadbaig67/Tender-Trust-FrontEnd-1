import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './Toolkit/store'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
