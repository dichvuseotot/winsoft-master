import { axiosClient } from "../api";

export const getThongTinHanhChinhById = async (id) => {
  const res = await axiosClient.get(`/get-thong-tin-hanh-chinh?KSKCD_TiepNhanId=${id}`);
  return (res.data ?? [])[0] ?? null;
};

export const getThongTinHanhChinhList = async ({ fromDate, toDate, mauPhieu, search = "", page = 1, pageSize = 20 } = {}) => {
  const params = new URLSearchParams();
  if (fromDate) params.set("FromDate", fromDate);
  if (toDate) params.set("ToDate", toDate);
  params.set("Search", search);
  params.set("Page", page);
  params.set("PageSize", pageSize);
  if (mauPhieu) params.set("td_loaimau_kskid", mauPhieu);
  const res = await axiosClient.get(`/list-thong-tin-hanh-chinh?${params.toString()}`);
  return {
    items:      res.data                          ?? [],
    total:      Number(res.pagination?.Total      ?? 0),
    totalPages: Number(res.pagination?.TotalPages ?? 1),
    page:       Number(res.pagination?.Page       ?? 1),
  };
};


export const getThongKeDongBo = async () => {
  const res = await axiosClient.get("/thong-ke-dong-bo-ksk");
  const p = res.pagination ?? {};
  return {
    "da-dong-bo":   Number(p.DaDongBo   ?? 0),
    "chua-dong-bo": Number(p.ChuaDongBo ?? 0),
    "dong-bo-loi":  Number(p.LoiDongBo  ?? 0),
    "dang-dong-bo": Number(p.DangDongBo ?? 0),
  };
};
