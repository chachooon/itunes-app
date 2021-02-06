import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store";
import TopAlbums from "./pages/TopAlbums";
import "./app.scss";

export interface MessageProps {
  message: string;
}
export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <Provider store={store}>
          <TopAlbums />
        </Provider>
      </div>
    </React.StrictMode>
  );
};
