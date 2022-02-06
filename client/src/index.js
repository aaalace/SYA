import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { App } from './App.js';
// import { PersistGate } from "redux-persist/integration/react";
// import { persistedStore } from "./store";
import { Provider } from 'react-redux';
import { store } from './store'

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/* <PersistGate persistor={persistedStore}> */}
              <BrowserRouter>
                  <App/>
              </BrowserRouter>
          {/* </PersistGate> */}
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
