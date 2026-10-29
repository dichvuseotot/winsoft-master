import Swal from "sweetalert2";
import { api } from "../api";


export async function getKhamTheLuc(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-the-luc?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function saveAdultTiepNhan(form, mauPhieu, id = null) {
  try {
    const resolvedId = id ?? generateId();
    const payload = toPayload(form, mauPhieu, resolvedId, id);
    console.log(`[saveAdultTiepNhan] TYPE: ${id ? "UPDATE" : "ADD"} | id:`, id);
    console.log("[saveAdultTiepNhan] payload:", payload);
    const result = await api.post("/add-update-tiep-nhan", payload);
    const TiepNhanId = result.data?.ID ?? result.ID ?? resolvedId;
    await Swal.fire({
      icon: "success",
      title: "Lưu thành công",
      text: "Thông tin hành chính đã được lưu.",
      confirmButtonText: "OK",
      confirmButtonColor: "#16a34a",
    });
    return { ...result, TiepNhanId };
  } catch (error) {
    console.error("saveAdultTiepNhan:", error);
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
    TUAN_THAI: null,
    SINH_NON: null,
    NHOM_MAU: form.nhomMau,
    DIA_CHI: form.soNha,
    MATINH_CU_TRU: form.tinhThanhPho,
    MAXA_CU_TRU: form.phuongXa,
    HO_TEN_NGUOI_DI_CUNG: null,
    SO_CCCD_NGUOI_DI_CUNG: null,
    MOI_QUAN_HE_VOI_TRE: null,
    DIEN_THOAI_NGUOI_DI_CUNG: null,
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

    // ── Khám thể lực ──────────────────────────────────────────────────────
    TheLucId: generateId(),
    KSKCD_TiepNhanId: resolvedId,
    CHIEU_CAO: form.chieuCao ? Number(form.chieuCao) : null,
    CAN_NANG: form.canNang || null,
    CHI_SO_BMI: form.chieuCao && form.canNang
      ? (parseFloat(form.canNang) / Math.pow(parseFloat(form.chieuCao) / 100, 2)).toFixed(1)
      : null,
    MACH: form.mach || null,
    HUYET_AP: form.huyetAp || null,
    KHAM_THE_LUC_PL: form.phanLoaiTheLuc ? Number(form.phanLoaiTheLuc) : null,
    EmployeeCode: null,
    EmployeeCodeDoctor: null,
    PostingDate: null,
  };
}
