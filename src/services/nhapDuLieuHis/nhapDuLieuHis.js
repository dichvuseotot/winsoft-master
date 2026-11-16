import { axiosClient } from "../api";

export const getTiepNhanCCCD = async ({ soCCCD, maLK }) => {
  const params = new URLSearchParams({ SoCCCD: soCCCD, MA_LK: maLK });
  const res = await axiosClient.get(`/get-tiep-nhan-cccd?${params.toString()}`);
  return (res.data ?? [])[0] ?? null;
};

export const getListTiepNhanTuHis = async ({ fromDate, toDate, tdLoaimauKskid, search = '', page = 1, pageSize = 20 } = {}) => {
  const params = new URLSearchParams();
  if (fromDate) params.set('FromDate', fromDate);
  if (toDate) params.set('ToDate', toDate);
  if (tdLoaimauKskid) params.set('td_loaimau_kskid', tdLoaimauKskid);
  params.set('Search', search);
  params.set('Page', page);
  params.set('PageSize', pageSize);
  const res = await axiosClient.get(`/list-tiep-nhan-tu-his-len-web?${params.toString()}`);
  return {
    items:      res.data                          ?? [],
    total:      Number(res.pagination?.Total      ?? 0),
    totalPages: Number(res.pagination?.TotalPages ?? 1),
    page:       Number(res.pagination?.Page       ?? 1),
  };
};
