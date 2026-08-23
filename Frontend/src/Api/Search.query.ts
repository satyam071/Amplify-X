import axios from "axios";
import { BASE_URL } from "./BASE_URL";

interface searchParam {
  q: String | null;
}

export const searchQueryApi = async (query: searchParam) => {
  const url = BASE_URL + "/api/music/search";

  const response = await axios.get(url, {
    params: query,
  });

  return response.data.results;
};
