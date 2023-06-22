import axios from 'axios';
import { BASE_URL, getQueryParams } from '..';
import { ISong, ListSong } from '../../types/song';

export interface IGetListSongParam {
  searchKey: string;
}

interface IGetListSongRes {
  list: ListSong;
  status: boolean;
  message?: string;
}

const fetchSongs = (params: IGetListSongParam) => {
  return axios
    .get(
      `${BASE_URL}/api/v1/users?${getQueryParams({
        name_like: params.searchKey,
      })}`
    )
    .then((res) => {
      const resData: IGetListSongRes = {
        list: res.data,
        status: true,
      };
      return resData;
    });
};

interface ICreateSongParam {
  title: string;
  src: string;
  author: string;
  thumbnail: string;
}

interface ICreateSongRes {
  status: boolean;
  message?: string;
}

const createASong = (params: ICreateSongParam) => {
  return axios.post(`${BASE_URL}/api/v1/users`, params).then((data) => {
    let status = true;
    let message = 'Something went wrong!';
    if (data.request?.status !== 200 && data.request?.status !== 201) {
      status = false;
    }
    if (data.request?.status === 401) {
      message = 'Unauthorized';
    }
    const resData: ICreateSongRes = {
      status,
      message,
    };
    return resData;
  });
};

export { fetchSongs, createASong };