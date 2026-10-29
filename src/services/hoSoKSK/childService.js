import Swal from "sweetalert2";
import { api } from "../api";

function generateId() {
  const now = new Date();
  const yyyymmdd =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${yyyymmdd}${random}`;
}

export async function getBungCoQuanSinhDuc(kskcdTiepNhanId) {
  const res = await api.get(`/get-bung-co-quang-sinh-duc?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function saveBungCoQuanSinhDuc(form, kskcdTiepNhanId) {
  try {
    const payload = {
      Id: generateId(),
      KSKCD_TiepNhanId: kskcdTiepNhanId,
      HINH_DANG_BUNG_RON: Number(form.cl_hinhDangBung),
      GAN_LACH_TO: Number(form.cl_ganLachTo),
      KHOI_BAT_THUONG: Number(form.cl_khoiBatThuongBung),
      LO_HAU_MON: Number(form.cl_loHauMon),
      CO_QUAN_SINH_DUC_NGOAI: Number(form.cl_coQuanSinhDuc),
      EmployeeCode: "1",
      EmployeeCodeDoctor: "Nghĩa",
      PostingDate: new Date().toISOString(),
    };
    console.log("[saveBungCoQuanSinhDuc] payload:", payload);
    const res = await api.post("/add-update-bung-co-quang-sinh-duc", payload);
    console.log("[saveBungCoQuanSinhDuc] response:", res);
    if (res?.Code !== "ok") throw new Error(res?.Content || "Lỗi không xác định");
    await Swal.fire({ icon: "success", title: "Lưu thành công", text: res.Content, confirmButtonText: "OK", confirmButtonColor: "#16a34a" });
    return res;
  } catch (error) {
    console.error("saveBungCoQuanSinhDuc:", error);
    await Swal.fire({ icon: "error", title: "Lưu thất bại", text: error?.message || "Đã xảy ra lỗi, vui lòng thử lại.", confirmButtonText: "Đóng", confirmButtonColor: "#dc2626" });
    throw error;
  }
}

export async function getDanhGiaDinhDuong(kskcdTiepNhanId) {
  const res = await api.get(`/get-danh-gia-dinh-duong?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

const DG_VONG_DAU_MAP = { "Bình thường": 1, "To": 2, "Nhỏ": 3 };
const DG_VONG_DAU_REVERSE = { 1: "Bình thường", 2: "To", 3: "Nhỏ" };

export async function saveDanhGiaDinhDuong(form, kskcdTiepNhanId) {
  try {
    const payload = {
      Id: generateId(),
      KSKCD_TiepNhanId: kskcdTiepNhanId,
      CHIEU_DAI: form.child_chieuDai ? Number(form.child_chieuDai) : null,
      CHIEU_DAI_TUOI_SD: form.child_chieuDaiSD || null,
      CAN_NANG: form.child_canNang || null,
      CAN_NANG_TUOI_SD: form.child_canNangSD || null,
      VONG_DAU: form.child_vongDau ? Number(form.child_vongDau) : null,
      DG_VONG_DAU: DG_VONG_DAU_MAP[form.child_danhGiaVongDau] ?? null,
      CHU_VI_VONG_CANH_TAY: form.child_chuViVongCanhTay ? Number(form.child_chuViVongCanhTay) : null,
      DGDD_BINH_THUONG: 0,
      PHU_DINH_DUONG: form.child_phuDinhDuong ? 1 : 0,
      DGDD_THIEU_MAU: form.child_thieuMau ? 1 : 0,
      DGDD_COI_XUONG: form.child_coiXuong ? 1 : 0,
      SUY_DINH_DUONG: form.child_suyDinhDuong ? 1 : 0,
      THUA_CAN_BEO_PHI: form.child_thuaCan ? 1 : 0,
      EmployeeCode: "1",
      EmployeeCodeDoctor: "Nghĩa",
      PostingDate: new Date().toISOString(),
    };
    const res = await api.post("/add-update-danh-gia-dinh-duong", payload);
    if (res?.Code !== "ok") throw new Error(res?.Content || "Lỗi không xác định");
    await Swal.fire({ icon: "success", title: "Lưu thành công", text: res.Content, confirmButtonText: "OK", confirmButtonColor: "#16a34a" });
    return res;
  } catch (error) {
    await Swal.fire({ icon: "error", title: "Lưu thất bại", text: error?.message || "Đã xảy ra lỗi, vui lòng thử lại.", confirmButtonText: "Đóng", confirmButtonColor: "#dc2626" });
    throw error;
  }
}

export { DG_VONG_DAU_REVERSE };

export async function getCoXuongThanKinh(kskcdTiepNhanId) {
  const res = await api.get(`/get-co-xuong-than-kinh?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function saveCoXuongThanKinh(form, kskcdTiepNhanId) {
  try {
    const payload = {
      Id: generateId(),
      KSKCD_TiepNhanId: kskcdTiepNhanId,
      VAN_DONG_KHONG_DOI_XUNG: Number(form.cl_vanDongKhongDoiXung),
      PHAN_XA_BU: Number(form.cl_phanXaBu),
      PHAN_XA_NAM: Number(form.cl_phanXaNam),
      PHAN_XA_MORO: Number(form.cl_phanXaMoro),
      TRUONG_LUC_CO: Number(form.cl_truongLucCo),
      KHOP_HANG: Number(form.cl_khopHang),
      PHAN_XA_CO: Number(form.cl_phanXaCo),
      KIEM_TRA_LUNG_COT_SONG: Number(form.cl_kiemTraLung),
      TU_CHI_KHOP: Number(form.cl_khamTuChi),
      QUAN_SAT_DANG_DI: Number(form.cl_quanSatDangDi),
      EmployeeCode: "1",
      EmployeeCodeDoctor: "Nghĩa",
      PostingDate: new Date().toISOString(),
    };
    const res = await api.post("/add-update-co-xuong-than-kinh", payload);
    if (res?.Code !== "ok") throw new Error(res?.Content || "Lỗi không xác định");
    await Swal.fire({ icon: "success", title: "Lưu thành công", text: res.Content, confirmButtonText: "OK", confirmButtonColor: "#16a34a" });
    return res;
  } catch (error) {
    await Swal.fire({ icon: "error", title: "Lưu thất bại", text: error?.message || "Đã xảy ra lỗi, vui lòng thử lại.", confirmButtonText: "Đóng", confirmButtonColor: "#dc2626" });
    throw error;
  }
}

