import React from "react";
import { Provider } from "react-redux";
import store from "./ducks/store";
import AlbumList from "./pages/AlbumList";

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <Provider store={store}>
          <AlbumList />
        </Provider>
      </div>
    </React.StrictMode>
  );
};
