import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../Models";

interface AlbumsState {
  albums: Album[] | null;
  loading: boolean;
  error: string | null;
}

const albumInitialState: AlbumsState = {
  albums: null,
  loading: false,
  error: null,
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
  },
});

export const albumsActions = {
  getAlbums: createAction<number>("getAlbums"),
  ...albums.actions,
};
