import { getSongsAction, SongsSelector } from "../../_redux/features/song";
import { useAppDispatch } from "../../_redux/hooks";
import { useEffect, useState } from "react";
import { fetchSongs } from "../../apis/track";
import { ISong } from "../../types/song";

function useGetListSong(): [
  boolean,
  ISong[] | undefined,
  // ISong[],
  (searchKey: string) => void
] {
  const songSelector = SongsSelector();

  const loading = songSelector.loading;
  const listSong = songSelector.list;

  const dispatch = useAppDispatch();
  const getSong = (searchKey: string) => {
    dispatch(getSongsAction({ searchKey }));
  };
  useEffect(() => {
    getSong("");
  }, []);
  const onSearch = (searchKey: string) => {
    getSong(searchKey);
  };
  
  return [loading, listSong, onSearch];
}

export default useGetListSong;
