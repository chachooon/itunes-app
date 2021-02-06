import { Action } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { albumsActions } from "./albumSlice";
import { Album } from "../../Models";
import * as API from "../../api";

const {
  getAlbums,
  getAlbumStart,
  getAlbumSuccess,
  getAlbumFailure,
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

export function* albumSaga() {
  yield takeLatest(getAlbums, fetchAlbums);
}
