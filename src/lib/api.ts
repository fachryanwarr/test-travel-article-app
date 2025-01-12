import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
  timeoutErrorMessage: "Perikasa Kembali Koneksi Internet Anda.",
  withCredentials: false,
});

export default api;
