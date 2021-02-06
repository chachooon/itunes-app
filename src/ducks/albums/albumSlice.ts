import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../Models";

interface AlbumsState {
  albums: Album[] | null;
  loading: boolean;
  error: string | null;
  sort: string;
}

const albumInitialState: AlbumsState = {
  albums: null,
  loading: false,
  error: null,
  sort: "",
};

export const albums = createSlice({
  name: "albums",
  initialState: albumInitialState,
  reducers: {
    getAlbumStart(state: AlbumsState): void {
      state.loading = true;
    },
    getAlbumSuccess(state: AlbumsState, action: PayloadAction<Album[]>): void {
      state.albums = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAlbumFailure(state: AlbumsState, action: PayloadAction<string>): void {
      state.loading = false;
      state.error = action.payload;
    },
    selectSort(state: AlbumsState, action: PayloadAction<string>): void {
      state.sort = action.payload;
      state.albums = [...state.albums].sort((a: Album, b: Album) => {
        if (action.payload === "releaseDate") {
          return b["releaseDate"].getTime() - a["releaseDate"].getTime();
        }
        if (action.payload === "name") {
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
    },
  },
});

export const albumsActions = {
  getAlbums: createAction<number>("getAlbums"),
  ...albums.actions,
};
