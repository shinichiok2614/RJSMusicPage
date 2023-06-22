import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISong } from "../../types/song";
import { getAccountInfo } from "../../apis/auth";
import { useAppSelector } from "../hooks";
import { ListSong } from "../../types/song";
import { fetchSongs, createASong, IGetListSongParam } from "../../apis/track";
export interface SongState {
  songs: {
    loading: boolean;
    list: ListSong | undefined;
  };
}

const initialState: SongState = {
  songs: {
    loading: false,
    list: undefined,
  },
};

export const songsSlice = createSlice({
  name: "song",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSongsAction.pending, (state) => {
        state.songs.loading = true;
      })
      .addCase(getSongsAction.fulfilled, (state, action) => {
        state.songs.loading = false;
        state.songs.list = action.payload.list;
      })
      .addCase(getSongsAction.rejected, (state) => {
        state.songs.loading = false;
        state.songs.list= undefined;
      });
  },
});

export const getSongsAction = createAsyncThunk(
  "song/fetchSongs",
  async (params: IGetListSongParam) => {
    return await fetchSongs(params);
  }
);
export const SongsSelector = ()=>
useAppSelector((state) => state.song.songs);
export default songsSlice.reducer;
