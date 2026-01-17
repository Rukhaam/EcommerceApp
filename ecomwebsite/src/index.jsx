import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from './Redux/store';

// Import new Providers
import { UserProvider } from "./context/user.context";
import { DirectoryProvider } from "./context/directory.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserProvider>       {/* 1. Wrap UserProvider */}
        <DirectoryProvider>{/* 2. Wrap DirectoryProvider */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DirectoryProvider>
      </UserProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();