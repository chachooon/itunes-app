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
  setSearchText,
  setSortType,
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

function sortAlbums(albums: Album[], sortType: string[]) {
  if (sortType[0] === "" && sortType[1] === "asc") {
    return albums.reverse();
  } else {
    return albums.sort((a: Album, b: Album) => {
      if (sortType[0] === "releaseDate") {
        return b["releaseDate"].getTime() - a["releaseDate"].getTime();
      }
      if (sortType[0] === "name") {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return sortType[1] === "asc" ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortType[1] === "asc" ? 1 : -1;
        }
        return 0;
      }
    });
  }
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
    yield put(getAlbumStart());
    const state = yield select();
    const json: any = yield call(API.getAlbums);
    let albums: Album[] = yield call(parseAlbums, json);
    let searchText: string = state.albums.searchText;
    let sortType: string[] = state.albums.sortType;

    if (getSearchedAlbums.match(action)) {
      yield put(setSearchText(action.payload));
      searchText = action.payload.toLowerCase();
    }
    if (getSortedAlbums.match(action)) {
      yield put(setSortType(action.payload));
      sortType = action.payload;
    }

    if (searchText && searchText !== "") {
      albums = albums.filter((album: Album) =>
        album.title.toLowerCase().includes(searchText)
      );
    }

    if (sortType[0] === "" && sortType[1] === "desc") {
      yield put(getAlbumSuccess(albums));
    } else {
      const sorted = yield call(sortAlbums, albums, sortType);
      yield put(getAlbumSuccess(sorted));
    }
  } catch (e) {
    yield put(getAlbumFailure(e.message));
  }
}

export function* albumSaga() {
  yield takeLatest(getAlbums, fetchAlbums);
  yield takeLatest(getSearchedAlbums, searchSortAlbumsFlow);
  yield takeLatest(getSortedAlbums, searchSortAlbumsFlow);
}
