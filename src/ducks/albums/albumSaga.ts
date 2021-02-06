import { Action } from "@reduxjs/toolkit";
import {
  call,
  put,
  select,
  take,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import { albumsActions } from "./albumSlice";
import { Album } from "../../Models";
import * as API from "../../api";

const {
  getAlbums,
  getAlbumStart,
  getAlbumSuccess,
  getAlbumFailure,
  getSearchedAlbums,
  getSortedAlbums,
} = albumsActions;

function parseAlbums(json: any) {
  return new Promise(function (resolve, reject) {
    try {
      const albums: Album[] = json.feed.entry.map((item: any) => {
        return {
          id: Number(item.id.attributes["im:id"]),
          name: item["im:name"].label,
          title: item.title.label,
          artist: item["im:artist"].label,
          category: item.category.attributes.label,
          rights: item.rights.label,
          link: item.link.attributes.href,
          image: item["im:image"].map((element: any) => element.label),
          price: Number(item["im:price"].attributes.amount),
          itemCount: Number(item["im:itemCount"]),
          releaseDate: new Date(item["im:releaseDate"].attributes.label),
        };
      });

      resolve(albums);
    } catch (error) {
      reject(Error(error.message));
    }
  });
}

function sortAlbums(albums: Album[], type: string) {
  return albums.sort((a: Album, b: Album) => {
    if (type === "releaseDate") {
      return b["releaseDate"].getTime() - a["releaseDate"].getTime();
    }
    if (type === "name") {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
  });
}

function* fetchAlbums(action: Action) {
  try {
    if (getAlbums.match(action)) {
      yield put(getAlbumStart());
      const json: any = yield call(API.getAlbums);
      const albums: Album[] = yield call(parseAlbums, json);
      yield put(getAlbumSuccess(albums));
    }
  } catch (e) {
    yield put(getAlbumFailure(e.message));
  }
}

function* searchSortAlbumsFlow(action: Action) {
  try {
    const state = yield select();
    const json: any = yield call(API.getAlbums);
    let albums: Album[] = yield call(parseAlbums, json);

    if (state.albums.searched !== "") {
      const searchText: string = state.albums.searched.toLowerCase();
      albums = albums.filter((album: Album) =>
        album.title.toLowerCase().includes(searchText)
      );
    }

    if (state.albums.sorted !== "") {
      albums = yield call(sortAlbums, albums, state.albums.sorted);
    }
    yield put(getAlbumSuccess(albums));
  } catch (e) {
    yield put(getAlbumFailure(e.message));
  }
}

export function* albumSaga() {
  yield takeLatest(getAlbums, fetchAlbums);
  yield takeLatest(getSearchedAlbums, searchSortAlbumsFlow);
  yield takeLatest(getSortedAlbums, searchSortAlbumsFlow);
}
