import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../ducks/rootReducer";
import { albumsActions } from "../ducks/albums";
import Card from "../components/Card";

const TopAlbums = () => {
  const dispatch: Dispatch<Action> = useDispatch();

  const { albums, error, loading } = useSelector((state: RootState) => {
    return {
      albums: state.albums.albums,
      error: state.albums.error,
      loading: state.albums.loading,
    };
  }, shallowEqual);

  useEffect((): void => {
    dispatch(albumsActions.getAlbums());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading ? "Loading..." : albums && <Card></Card>}
      {error && <p>error</p>}
    </div>
  );
};
export default TopAlbums;
