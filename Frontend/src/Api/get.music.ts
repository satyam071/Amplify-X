import axios from "axios";
import { BASE_URL } from "./BASE_URL";
interface SearchResult {
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

export const getAllMusic = async ()  => {
  const url = BASE_URL + "/api/music";
  try {
    const response = await axios.get<MusicResponse>(url, {
      params: {
        limit: 20,
      },
    });
    return response.data.musics;
  } catch (err) {
    return err;
  }
};
