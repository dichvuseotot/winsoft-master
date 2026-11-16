import { axiosClient } from "../api";

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
    items:      res.data                          ?? [],
    total:      Number(res.pagination?.Total      ?? 0),
    totalPages: Number(res.pagination?.TotalPages ?? 1),
    page:       Number(res.pagination?.Page       ?? 1),
  };
};
