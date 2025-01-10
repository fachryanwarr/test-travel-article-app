import axios from "axios";

const api = axios.create({
  baseURL: "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
  timeoutErrorMessage: "Perikasa Kembali Koneksi Internet Anda.",
  withCredentials: false,
});

export default api;
