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
    items: res.data ?? [],
    total: Number(res.pagination?.Total ?? 0),
    totalPages: Number(res.pagination?.TotalPages ?? 1),
  };
};

export const exportXmlLienThong = async ({ tuNgay, denNgay, tdLoaimauKskid, kskcdTiepNhanIds = [] } = {}) => {
  const res = await axiosClient.post("/export-xml-tren-18-tuoi-send-to-portal", {
    TuNgay: tuNgay,
    DenNgay: denNgay,
    td_loaimau_kskid: tdLoaimauKskid,
    KSKCD_TiepNhanIds: kskcdTiepNhanIds.join(","),
  });
  return res;
};

export const importExcelFile = async ({ file, tdLoaimauKskid }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("td_loaimau_kskid", tdLoaimauKskid);
  const res = await axiosClient.post("/import-file-excel", formData, {
    headers: { "Content-Type": "undefined" },
  });
  return res;
};

export const getListImportFileExcel = async ({ fromDate, toDate, tdLoaimauKskid, isSuccess = -1, search = '', page = 1, pageSize = 20 } = {}) => {
  const params = new URLSearchParams();
  if (fromDate) params.set('FromDate', fromDate);
  if (toDate) params.set('ToDate', toDate);
  if (tdLoaimauKskid) params.set('td_loaimau_kskid', tdLoaimauKskid);
  params.set('IsSuccess', isSuccess);
  params.set('Search', search);
  params.set('Page', page);
  params.set('PageSize', pageSize);
  const res = await axiosClient.get(`/list-import-file-excel?${params.toString()}`);
  return {
    items: res.data ?? [],
    total: Number(res.pagination?.Total ?? 0),
    totalPages: Number(res.pagination?.TotalPages ?? 1),
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
