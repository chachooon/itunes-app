import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../ducks/rootReducer";
import { albumsActions } from "../ducks/albums";
import CardImage from "components/CardImage";
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
    document.querySelector(".card_container").addEventListener("click", (e) => {
      e["path"].forEach((path: object) => {
        if (path["className"] === "card" && path["id"]) {
          setSelected(+path["id"]);
          setOpen(true);
        }
      });
    });
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
      <ul className="card_container">
        {loading ? (
          <p className="message">Loading...</p>
        ) : albums.length > 0 ? (
          albums.map((album, idx) => (
            <li className="card" key={idx} id={String(idx)}>
              <CardImage src={album.image[0]} alt={album.title} />
              <div className="card_content">
                <p>
                  <span className="card_title">{album.name}</span>
                  <span>{album.artist}</span>
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="message">검색 결과가 없습니다.</p>
        )}
      </ul>

      {albums.length > 0 && (
        <Modal onClose={() => setOpen(false)} open={open}>
          <div className="card">
            <CardImage
              src={albums[selected].image[2]}
              alt={albums[selected].title}
            />
            <div className="card_content">
              <h1 className="card_title">{albums[selected].name}</h1>
              <ul>
                <li>
                  <span>Artist:</span>
                  {albums[selected].artist}
                </li>
                <li>
                  <span>Category:</span>
                  {albums[selected].category}
                </li>
                <li>
                  <span>price:</span>
                  {albums[selected].price}
                </li>

                <li>
                  <span>Release Date:</span>
                  {albums[selected].releaseDate.toLocaleDateString()}
                </li>
                <li>
                  <span>Rights:</span>
                  {albums[selected].rights}
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default AlbumList;
