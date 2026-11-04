import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || err.message || "Đã xảy ra lỗi";
    throw new Error(message);
  }
);

export const api = {
  get:    (path)        => instance.get(path),
  post:   (path, body)  => instance.post(path, body),
  put:    (path, body)  => instance.put(path, body),
  patch:  (path, body)  => instance.patch(path, body),
  delete: (path)        => instance.delete(path),
};
