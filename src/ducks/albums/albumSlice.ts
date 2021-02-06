import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../Models";

interface AlbumsState {
  albums: Album[] | null;
  loading: boolean;
  error: string | null;
  searchText: string | null;
  sortType: string[];
}

const albumInitialState: AlbumsState = {
  albums: null,
  loading: false,
  error: null,
  searchText: null,
  sortType: ["", "desc"],
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
    setSearchText(state: AlbumsState, action: PayloadAction<string>): void {
      state.searchText = action.payload;
    },
    setSortType(state: AlbumsState, action: PayloadAction<string[]>): void {
      state.sortType = action.payload;
    },
  },
});

export const albumsActions = {
  getAlbums: createAction<number>("getAlbums"),
  getSearchedAlbums: createAction<string>("getSearchedAlbums"),
  getSortedAlbums: createAction<string[]>("getSortedAlbums"),
  ...albums.actions,
};
