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
import Modal from "components/Modal";
import { Album } from "../Models";

const AlbumList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);

  const selectSortRef = React.useRef<HTMLSelectElement>(null);
  const selectTypeRef = React.useRef<HTMLSelectElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const dispatch: Dispatch<Action> = useDispatch();

  const { albums, loading } = useSelector((state: RootState) => {
    return {
      albums: state.albums.albums,
      loading: state.albums.loading,
    };
  }, shallowEqual);

  useEffect((): void => {
    dispatch(albumsActions.getAlbums());
  }, []);

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
          ref={selectSortRef}
          label="sort"
          options={[
            { value: "", label: "인기순" },
            { value: "releaseDate", label: "출시일순" },
            { value: "name", label: "이름순" },
          ]}
          onChange={() =>
            dispatch(
              albumsActions.getSortedAlbums([
                selectSortRef.current["selectedOptions"][0].value,
                selectTypeRef.current["selectedOptions"][0].value,
              ])
            )
          }
        />
        <SelectBox
          ref={selectTypeRef}
          options={[
            { value: "desc", label: "내림차순" },
            { value: "asc", label: "오름차순" },
          ]}
          onChange={() =>
            dispatch(
              albumsActions.getSortedAlbums([
                selectSortRef.current["selectedOptions"][0].value,
                selectTypeRef.current["selectedOptions"][0].value,
              ])
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
        <Modal onClose={() => setOpen(false)} open={open}>
          <Card key={albums[selected].id}>
            <CardImage src={albums[selected].image[2]} />
            <CardContent>
              <p>{albums[selected].title}</p>
            </CardContent>
          </Card>
        </Modal>
      )}
    </>
  );
};
export default AlbumList;
