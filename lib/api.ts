import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function logoutHandler() {
  await api.post("auth/logout");
  window.location.href = "/";
}
