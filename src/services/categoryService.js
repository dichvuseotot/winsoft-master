import { axiosClient } from "./api";

export const getGioiTinhList = async () => {
  const res = await axiosClient.get("/get-category-gioi-tinh");
  return res.data;
};

export const getMoiQuanHeList = async () => {
  const res = await axiosClient.get("/get-category-moi-quan-he");
  return res.data;
};

export const getDanTocList = async () => {
  const res = await axiosClient.get("/get-category-dan-toc");
  return res.data;
};

export const getTinhThanhList = async () => {
  const res = await axiosClient.get("/get-category-tinh-thanh");
  return res.data;
};

export const getPhuongXaList = async (maTinh) => {
  const res = await axiosClient.get(`/get-category-phuong-xa?MaTinh=${maTinh}`);
  return res.data;
};

export const getDoiTuongList = async () => {
  const res = await axiosClient.get("/get-category-doi-tuong");
  return res.data;
};

export const getNguonChiTraList = async () => {
  const res = await axiosClient.get("/get-category-nguon-chi-tra");
  return res.data;
};

export const getPhanLoaiSucKhoeList = async () => {
  const res = await axiosClient.get("/get-category-phan-loai-suc-khoe");
  return res.data;
};

export const getNhomMauList = async () => {
  const res = await axiosClient.get("/get-category-nhom-mau");
  return res.data ?? [];
};

export const getLoaiHinhKCBList = async () => {
  const res = await axiosClient.get("/get-category-loai-hinh-kcb");
  return res.data;
};

export const getLoaiMauKSKList = async () => {
  const res = await axiosClient.get("/get-category-loai-mau-ksk");
  return res.data ?? [];
};

export const getCareerList = async () => {
  const res = await axiosClient.get("/get-category-career");
  return res.data ?? [];
};

export const getTienSuBenhCategories = async () => {
  const res = await axiosClient.get("/get-list-category-tien-su-benh");
  return res.data ?? [];
};

export const getICD10List = async ({ search = "", page = 1, pageSize = 20 } = {}) => {
  const params = new URLSearchParams({ Search: search, Page: page, PageSize: pageSize });
  const res = await axiosClient.get(`/get-category-icd10?${params}`);
  const items = (res.data ?? []).map((d) => `${d.MaICD10} - ${d.TenICD10}`);
  const totalPages = Number(res.pagination?.TotalPages ?? 1);
  return { items, hasMore: page < totalPages };
};
