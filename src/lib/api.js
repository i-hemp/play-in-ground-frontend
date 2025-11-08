import axios from "axios";
const API_URL =
  process.env.REACT_APP_PYTHON_API_URL ||
  "http://127.0.0.1:8000" ||
  "http://localhost:8000";

export async function fetchGrounds() {
  // export function fetchGrounds() {
  // eslint-disable-next-line no-unused-vars
  const grounds = {
    data: {
      1: {
        id: 10,
        name: "Play Basketball",
        place: "Bangalore",
        price_per_hour: 200,
        image_url:
          "https://res.cloudinary.com/dyhbmm3or/image/upload/v1759860298/1_fyjj95.jpg",
      },
      2: {
        id: 20,
        name: "Play Football",
        place: "Nellore",
        price_per_hour: 200,
        image_url:
          "https://res.cloudinary.com/dyhbmm3or/image/upload/v1759860299/8_qimrpz.jpg",
      },
      3: {
        id: 30,
        name: "Play Shuttle",
        place: "Hyderabad",
        price_per_hour: 200,
        image_url:
          "https://res.cloudinary.com/dyhbmm3or/image/upload/v1759860298/4_hmsfo8.jpg",
      },
    },
  };

  // Convert object values to array
  const res = await axios.get(`${API_URL}/locations`);
  if (res.data != null) {
    console.log("ground details received");
  }
  const resGrounds = Object.values(res.data);
  // return res.data;
  return resGrounds;
}
