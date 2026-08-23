import axios from "axios";
import { BASE_URL } from "./BASE_URL";

interface musicData {
  title: string;
  coverArt: File | null;
  musicFile: File | null;
}

export const createRelease = async (data: musicData) => {
  const formData = new FormData();
  formData.append("title", data.title);

  if (data.coverArt) {
    formData.append("cover", data.coverArt);
  }

  if (data.musicFile) {
    formData.append("music", data.musicFile);
  }

  const url = BASE_URL + "/api/music/upload";

  const response = await axios.post(url, formData, {
    withCredentials: true,
  });

  return response.data;
};
