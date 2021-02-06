import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../ducks/rootReducer";
import { albumsActions } from "../ducks/albums";
import Card from "../components/Card";
import CardImage from "components/CardImage";
import CardContent from "../components/CardContent";
import Header from "components/Header";
import SearchBox from "components/SearchBox";
import SelectBox from "components/SelectBox";
import AlbumDetail from "./AlbumDetail";

const AlbumList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
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
    <>
      <Header>
        <SearchBox />
        <SelectBox />
      </Header>
      {loading
        ? "Loading..."
        : albums &&
          albums.map((album, idx) => (
            <Card key={idx} onClick={() => setSelected(idx)}>
              <CardImage src={album.image[0]} />
              <CardContent>
                <p>{album.title}</p>
              </CardContent>
            </Card>
          ))}
      <AlbumDetail
        onClose={() => {}}
        selectedAlbum={albums[selected]}
        open={open}
      />
    </>
  );
};
export default AlbumList;
