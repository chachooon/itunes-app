import React, { useEffect, useState, useRef } from "react";
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
import { Album } from "../Models";

const AlbumList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);

  const selectRef = React.useRef<HTMLSelectElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const dispatch: Dispatch<Action> = useDispatch();

  const { albums, loading, sorted, searched } = useSelector(
    (state: RootState) => {
      return {
        albums: state.albums.albums,
        loading: state.albums.loading,
        sorted: state.albums.sorted,
        searched: state.albums.searched,
      };
    },
    shallowEqual
  );

  useEffect((): void => {
    dispatch(albumsActions.getAlbums());
  }, []);

  // useEffect((): void => {
  //   dispatch(albumsActions.searchAlbums(searchText));
  // }, [searchText]);
  // useEffect((): void => setAlbumList(albums), [albums]);

  return (
    <>
      <Header>
        <SearchBox
          ref={searchRef}
          onChange={() => {
            dispatch(albumsActions.getSearchedAlbums(searchRef.current.value));
          }}
        />
        <SelectBox
          ref={selectRef}
          label="sort"
          options={[
            { value: "", label: "-" },
            { value: "releaseDate", label: "출시일순" },
            { value: "name", label: "이름순" },
          ]}
          onChange={() =>
            dispatch(
              albumsActions.getSortedAlbums(
                selectRef.current["selectedOptions"][0].value
              )
            )
          }
        />
      </Header>
      {loading
        ? "Loading..."
        : albums &&
          albums.map((album, idx) => (
            <Card
              key={idx}
              onClick={() => {
                setSelected(idx);
                setOpen(true);
              }}
            >
              <CardImage src={album.image[0]} />
              <CardContent>
                <p>{album.title}</p>
              </CardContent>
            </Card>
          ))}
      {albums && (
        <AlbumDetail
          onClose={() => setOpen(false)}
          selectedAlbum={albums[selected]}
          open={open}
        />
      )}
    </>
  );
};
export default AlbumList;
