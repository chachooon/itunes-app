import axios from "axios";

export async function getAlbums(): Promise<any> {
  const url = `https://itunes.apple.com/us/rss/topalbums/limit=100/json`;

  try {
    const response = await axios.get<any>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}
