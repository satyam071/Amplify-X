import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export interface SearchResult {
  _id: string;
  title: string;
  coverArt: string;
  uri?: string;
  artist: {
    _id: string;
    username: string;
  };
}

interface MusicResponse {
  musics: SearchResult[];
}

export const getAllMusic = async (): Promise<SearchResult[]> => {
  const url = BASE_URL + "/api/music";

  const response = await axios.get<MusicResponse>(url, {
    params: {
      limit: 20,
    },
  });

  return response.data.musics;
};