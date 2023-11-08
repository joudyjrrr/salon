import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./libs/redux/index.ts";
import { I18nextProvider } from "react-i18next";
import lang from "./libs/lang/lang.ts"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <I18nextProvider i18n={lang}>
      <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
