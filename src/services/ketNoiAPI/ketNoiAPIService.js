import { axiosClient } from "../api";

export const getInfoConnectAPI = async () => {
  const res = await axiosClient.get("/get-info-connect-api?Id=1");
  return (res.data ?? [])[0] ?? null;
};

export const updateInfoConnectAPI = async (payload) => {
  const res = await axiosClient.post("/add-update-info-connect-api", payload);
  return res;
};
