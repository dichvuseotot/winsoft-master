import { api } from "./api";

export async function getGioiTinhList() {
  const res = await api.get("/get-category-gioi-tinh");
  return res.data;
}

export async function getMoiQuanHeList() {
  const res = await api.get("/get-category-moi-quan-he");
  return res.data;
}

export async function getDanTocList() {
  const res = await api.get("/get-category-dan-toc");
  return res.data;
}

export async function getTinhThanhList() {
  const res = await api.get("/get-category-tinh-thanh");
  return res.data;
}

export async function getPhuongXaList(maTinh) {
  const res = await api.get(`/get-category-phuong-xa?MaTinh=${maTinh}`);
  return res.data;
}

export async function getDoiTuongList() {
  const res = await api.get("/get-category-doi-tuong");
  return res.data;
}

export async function getNguonChiTraList() {
  const res = await api.get("/get-category-nguon-chi-tra");
  return res.data;
}
