import Swal from "sweetalert2";
import { api } from "../api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateId() {
  const now = new Date();
  const yyyymmdd =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${yyyymmdd}${random}`;
}

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getAdultTiepNhanById(id) {
  const res = await api.get(`/get-thong-tin-hanh-chinh?KSKCD_TiepNhanId=${id}`);
  return (res.data ?? [])[0] ?? null;
}

// ─── Payload ──────────────────────────────────────────────────────────────────

function toPayload(form, mauPhieu, resolvedId, originalId) {
  return {
    Id:                      resolvedId,
    TYPE:                    originalId ? "UPDATE" : "ADD",
    td_loaimau_kskid:        Number(mauPhieu),

    HO_TEN:                  form.hoTen              || null,
    GIOI_TINH:               form.gioiTinh != null    ? Number(form.gioiTinh)    : null,
    NGAY_SINH:               form.ngaySinh            || null,
    DIEN_THOAI:              form.dienThoai           || null,
    MA_DAN_TOC:              form.danToc              || null,
    SO_CCCD:                 form.soDinhDanh          || null,
    NGAYCAP_CCCD:            form.ngayCap             || null,
    NOICAP_CCCD:             form.noiCap              || null,
    NHOM_MAU:                form.nhomMau             || null,
    MA_NGHE_NGHIEP:          form.ngheNghiep          || null,
    NOI_LAM_VIEC_HOC_TAP:    form.noiCongTac          || null,

    DIA_CHI:                 form.soNha               || null,
    MATINH_CU_TRU:           form.tinhThanhPho        || null,
    MAXA_CU_TRU:             form.phuongXa            || null,

    // Không dùng ở mẫu người lớn
    TUAN_THAI:               null,
    SINH_NON:                null,
    HO_TEN_NGUOI_DI_CUNG:    null,
    SO_CCCD_NGUOI_DI_CUNG:   null,
    MOI_QUAN_HE_VOI_TRE:     null,
    DIEN_THOAI_NGUOI_DI_CUNG: null,

    LY_DO_VV:                form.lyDoKham            || null,
    MA_LK:                   form.maLanKham           || null,
    DOI_TUONG:               form.doiTuongKham != null ? String(form.doiTuongKham) : null,
    NGUON_CHI_TRA:           form.nguonChiTra != null  ? Number(form.nguonChiTra)  : null,
    MA_LOAI_KCB:             form.loaiHinhKham         || null,
    NGAY_VAO:                form.ngayKham             || null,
  };
}

// ─── SAVE ─────────────────────────────────────────────────────────────────────

export async function saveAdultTiepNhan(form, mauPhieu, id = null) {
  try {
    const resolvedId = id ?? generateId();
    const payload = toPayload(form, mauPhieu, resolvedId, id);

    console.log("[saveAdultTiepNhan] payload:", payload);

    const result = await api.post("/add-update-tiep-nhan", payload);

    await Swal.fire({
      icon: "success",
      title: "Lưu thành công",
      text: "Thông tin hành chính đã được lưu.",
      confirmButtonText: "OK",
      confirmButtonColor: "#16a34a",
    });

    return { ...result, TiepNhanId: resolvedId };
  } catch (error) {
    console.error("[saveAdultTiepNhan] error:", error);
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
