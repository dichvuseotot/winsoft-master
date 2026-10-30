import Swal from "sweetalert2";
import { api } from "../api";


export async function getKhamNoiKhoa(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-noi-khoa?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getNgoaiKhoa(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-ngoai-khoa?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getDaLieu(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-da-lieu?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getSanPhuKhoa(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-san-phu-khoa?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getKhamMat(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-mat?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getKhamTMH(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-tai-mui-hong?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getKhamRHM(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-rang-ham-mat?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

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

    // ── Nội khoa ──────────────────────────────────────────────────────────
    NoiKhoaId: generateId(),
    NOI_KHOA_TUAN_HOAN:         form.nk_a   || null,
    NOI_KHOA_TUAN_HOAN_PL:      form.nk_a_pl ? Number(form.nk_a_pl) : null,
    CKDT_NOI_KHOA_TUAN_HOAN:    null,
    NOI_KHOA_HO_HAP:             form.nk_b   || null,
    NOI_KHOA_HO_HAP_PL:          form.nk_b_pl ? Number(form.nk_b_pl) : null,
    CKDT_NOI_KHOA_HO_HAP:        null,
    NOI_KHOA_TIEU_HOA:           form.nk_c   || null,
    NOI_KHOA_TIEU_HOA_PL:        form.nk_c_pl ? Number(form.nk_c_pl) : null,
    CKDT_NOI_KHOA_TIEU_HOA:      null,
    NOI_KHOA_THAN_TN_SD:         form.nk_d   || null,
    NOI_KHOA_THAN_TN_SD_PL:      form.nk_d_pl ? Number(form.nk_d_pl) : null,
    CKDT_NOI_KHOA_THAN_TN_SD:    null,
    NOI_KHOA_NOI_TIET:           form.nk_e   || null,
    NOI_KHOA_NOI_TIET_PL:        form.nk_e_pl ? Number(form.nk_e_pl) : null,
    CKDT_NOI_KHOA_NOI_TIET:      null,
    NOI_KHOA_CO_XUONG_KHOP:      form.nk_f   || null,
    NOI_KHOA_CO_XUONG_KHOP_PL:   form.nk_f_pl ? Number(form.nk_f_pl) : null,
    CKDT_NOI_KHOA_CO_XUONG_KHOP: null,
    NOI_KHOA_THAN_KINH:          form.nk_g   || null,
    NOI_KHOA_THAN_KINH_PL:       form.nk_g_pl ? Number(form.nk_g_pl) : null,
    CKDT_NOI_KHOA_THAN_KINH:     null,
    NOI_KHOA_TAM_THAN:           form.nk_h   || null,
    NOI_KHOA_TAM_THAN_PL:        form.nk_h_pl ? Number(form.nk_h_pl) : null,
    CKDT_NOI_KHOA_TAM_THAN:      null,

    // ── Ngoại khoa ────────────────────────────────────────────────────────
    NgoaiKhoaId:                  generateId(),
    KET_QUA_KHAM_NGOAI_KHOA:     form.ngk    || null,
    KHAM_NGOAI_KHOA_PL:          form.ngk_pl ? Number(form.ngk_pl) : null,
    CKDT_KHAM_NGOAI_KHOA:        null,

    // ── Da liễu ───────────────────────────────────────────────────────────
    DaLieuId:                     generateId(),
    KET_QUA_KHAM_DA_LIEU:        form.dl     || null,
    KHAM_DA_LIEU_PL:             form.dl_pl  ? Number(form.dl_pl) : null,
    CKDT_KHAM_DA_LIEU:           null,

    // ── Sản phụ khoa ──────────────────────────────────────────────────────
    SanPhuKhoaId:                 generateId(),
    KET_QUA_KHAM_SAN_PHU_KHOA:  form.spk    || null,
    KHAM_SAN_PHU_KHOA_PL:       form.spk_pl ? Number(form.spk_pl) : null,
    CKDT_KHAM_SAN_PHU_KHOA:     null,

    // ── Răng Hàm Mặt ──────────────────────────────────────────────────────
    RangHamMatId:                 generateId(),
    HAM_TREN:                    form.rhm_hamTren  || null,
    HAM_DUOI:                    form.rhm_hamDuoi  || null,
    BENH_RANG_HAM_MAT:           form.rhm_ketQua   || null,
    BENH_KHAC_RANG_HAM_MAT:     form.rhm_benh     || null,
    KHAM_RANG_HAM_MAT_PL:       form.rhm_pl ? Number(form.rhm_pl) : null,
    CKDT_KHAM_RANG_HAM_MAT:     null,

    // ── Tai Mũi Họng ──────────────────────────────────────────────────────
    TaiMuiHongId:                 generateId(),
    TAI_TRAI_NOI_THUONG:         form.tmh_tt_trai || null,
    TAI_TRAI_NOI_THAM:           form.tmh_th_trai || null,
    TAI_PHAI_NOI_THUONG:         form.tmh_tt_phai || null,
    TAI_PHAI_NOI_THAM:           form.tmh_th_phai || null,
    BENH_TAI_MUI_HONG:           form.tmh_benh    || null,
    BENH_KHAC_TAI_MUI_HONG:     null,
    KHAM_TAI_MUI_HONG_PL:       form.tmh_pl ? Number(form.tmh_pl) : null,
    CKDT_KHAM_TAI_MUI_HONG:     null,

    // ── Mắt ───────────────────────────────────────────────────────────────
    MatId:                        generateId(),
    VI_TRI_HAI_MAT:              null,
    MI_MAT_KET_MAC:              null,
    LAC_MAT:                     null,
    DONG_TU:                     null,
    KHONG_KINH_MAT_PHAI:        form.mat_kk_phai || null,
    KHONG_KINH_MAT_TRAI:        form.mat_kk_trai || null,
    CO_KINH_MAT_PHAI:           form.mat_ck_phai || null,
    CO_KINH_MAT_TRAI:           form.mat_ck_trai || null,
    BENH_KHAC_MAT:              form.mat_benh    || null,
    KHAM_MAT_PL:                form.mat_pl ? Number(form.mat_pl) : null,
    CKDT_KHAM_MAT:              null,
  };
}
