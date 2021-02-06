import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../Models";

interface AlbumsState {
  albums: Album[] | null;
  loading: boolean;
  error: string | null;
  sorted: string | null;
  searched: string | null;
}

const albumInitialState: AlbumsState = {
  albums: null,
  loading: false,
  error: null,
  sorted: null,
  searched: null,
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
    getSearchedAlbums(state: AlbumsState, action: PayloadAction<string>): void {
      state.searched = action.payload;
    },
    getSortedAlbums(state: AlbumsState, action: PayloadAction<string>): void {
      state.sorted = action.payload;
    },
  },
});

export const albumsActions = {
  getAlbums: createAction<number>("getAlbums"),
  ...albums.actions,
};
