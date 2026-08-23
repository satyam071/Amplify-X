import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const getMusicById = async (id: string) => {
  const url = BASE_URL + `/api/music/${id}`;
  console.log(url);

  try {
    const music = await axios.get(url);
    console.log(music);
    return music.data.music;
  } catch (err) {
    return err;
  }
};
