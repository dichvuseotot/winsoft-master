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

export async function getPhanLoaiSucKhoeList() {
  const res = await api.get("/get-category-phan-loai-suc-khoe");
  return res.data;
}

export async function getLoaiHinhKCBList() {
  const res = await api.get("/get-category-loai-hinh-kcb");
  return res.data;
}

export async function getLoaiMauKSKList() {
  const res = await api.get("/get-category-loai-mau-ksk");
  return res.data ?? [];
}

export async function getCareerList() {
  const res = await api.get("/get-category-career");
  return res.data ?? [];
}

export async function getICD10List({ search = "", page = 1, pageSize = 20 } = {}) {
  const params = new URLSearchParams({ Search: search, Page: page, PageSize: pageSize });
  const res = await api.get(`/get-category-icd10?${params}`);
  const items = (res.data ?? []).map((d) => `${d.MaICD10} - ${d.TenICD10}`);
  const totalPages = Number(res.pagination?.TotalPages ?? 1);
  return { items, hasMore: page < totalPages };
}
