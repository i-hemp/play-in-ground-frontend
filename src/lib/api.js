import axios from "axios";

export const API_URL =
  process.env.REACT_APP_PYTHON_API_URL ||
  "http://localhost:8000" ||
  "http://127.0.0.1:8000";

export async function fetchGrounds() {
  const res = await axios.get(`${API_URL}/grounds/locations`);
  if (res.data != null) {
    console.log("ground details received");
  }
  return res.data;
}
