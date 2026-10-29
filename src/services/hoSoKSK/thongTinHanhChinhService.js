import Swal from "sweetalert2";
import { api } from "../api";

const ENDPOINT = "/add-update-thong-tin-hanh-chinh";

export async function getThongTinHanhChinhById(id) {
  const res = await api.get(`/get-thong-tin-hanh-chinh?KSKCD_TiepNhanId=${id}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getThongTinHanhChinhList({ fromDate, toDate, mauPhieu, search = "", page = 1, pageSize = 20 } = {}) {
  const params = new URLSearchParams();
  if (fromDate) params.set("FromDate", fromDate);
  if (toDate) params.set("ToDate", toDate);
  params.set("Search", search);
  params.set("Page", page);
  params.set("PageSize", pageSize);
  if (mauPhieu) params.set("td_loaimau_kskid", mauPhieu);
  const res = await api.get(`/list-thong-tin-hanh-chinh?${params.toString()}`);
  const items = res.data ?? [];
  return {
    items,
    total: Number(res.pagination?.Total ?? 0),
    totalPages: Number(res.pagination?.TotalPages ?? 1),
  };
}


export async function saveThongTinHanhChinh(form, mauPhieu, id = null) {
  try {
    const resolvedId = id ?? generateId();
    const payload = toPayload(form, mauPhieu, resolvedId, id);
    // console.log("saveThongTinHanhChinh payload:", payload);
    const result = await api.post(ENDPOINT, payload);
    await Swal.fire({
      icon: "success",
      title: "Lưu thành công",
      text: "Thông tin hành chính đã được lưu.",
      confirmButtonText: "OK",
      confirmButtonColor: "#16a34a",
    });
    return result;
  } catch (error) {
    console.error("saveThongTinHanhChinh:", error);
    await Swal.fire({
      icon: "error",
      title: "Lưu thất bại",
      text: error?.message || "Đã xảy ra lỗi, vui lòng thử lại.",
      confirmButtonText: "Đóng",
      confirmButtonColor: "#dc2626",
    });
    throw error;
  }
}

function generateId() {
  const now = new Date();
  const yyyymmdd =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${yyyymmdd}${random}`;
}

function toPayload(form, mauPhieu, resolvedId, originalId) {
  return {
    Id: resolvedId,
    HO_TEN: form.hoTen,
    GIOI_TINH: Number(form.gioiTinh),
    NGAY_SINH: form.ngaySinh,
    DIEN_THOAI: form.dienThoai,
    MA_DAN_TOC: form.danToc,
    SO_CCCD: form.soDinhDanh,
    NGAYCAP_CCCD: form.ngayCap,
    NOICAP_CCCD: form.noiCap,
    TUAN_THAI: form.tuanThaiKhiSinh,
    SINH_NON: Number(form.sinhNon),
    NHOM_MAU: form.nhomMau,
    DIA_CHI: form.soNha,
    MATINH_CU_TRU: form.tinhThanhPho,
    MAXA_CU_TRU: form.phuongXa,
    HO_TEN_NGUOI_DI_CUNG: form.hoTenNguoiDiCung,
    SO_CCCD_NGUOI_DI_CUNG: form.soDinhDanhGiamHo,
    MOI_QUAN_HE_VOI_TRE: Number(form.moiQuanHe),
    DIEN_THOAI_NGUOI_DI_CUNG: form.dienThoaiNguoiDiCung,
    LY_DO_VV: form.lyDoKham,
    MA_NGHE_NGHIEP: form.ngheNghiep,
    NOI_LAM_VIEC_HOC_TAP: form.noiCongTac,
    td_loaimau_kskid: Number(mauPhieu),
    MA_LK: form.maLanKham,
    DOI_TUONG: String(form.doiTuongKham),
    NGUON_CHI_TRA: Number(form.nguonChiTra),
    MA_LOAI_KCB: form.loaiHinhKham,
    NGAY_VAO: form.ngayKham,
    TYPE: originalId ? "UPDATE" : "ADD",
  };
}
