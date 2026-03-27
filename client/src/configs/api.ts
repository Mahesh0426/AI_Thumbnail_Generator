import axios from "axios";

// Dynamically use the IP or domain where the frontend is currently loaded.
// If loaded from http://72.61.125.129:5173, backend will be http://72.61.125.129:3000
const dynamicBaseURL =
  import.meta.env.VITE_BASE_URL ||
  `${window.location.protocol}//${window.location.hostname}:3000`;

const api = axios.create({
  baseURL: dynamicBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
