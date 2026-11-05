import Swal from "sweetalert2";
import { api } from "../api";
import { nowVN } from "../../utils/date";


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

export async function getTienSuBenh(tiepNhanId) {
  const res = await api.get(`/get-list-category-tien-su-benh?KSKCD_TiepNhanId=${tiepNhanId}`);
  return res.data ?? [];
}

export async function getKhamTheLuc(tiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-the-luc?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getKetLuan(tiepNhanId) {
  const res = await api.get(`/get-ket-luan?KSKCD_TiepNhanId=${tiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getCLS(tiepNhanId) {
  const res = await api.get(`/get-kham-can-lam-sang?KSKCD_TiepNhanId=${tiepNhanId}`);
  return res.data ?? [];
}

export async function saveAdultTiepNhan(form, mauPhieu, id = null, tienSuCats = []) {
  try {
    const resolvedId = id ?? generateId();
    const payload = toPayload(form, mauPhieu, resolvedId, tienSuCats);
const result = await api.post("/add-update-tiep-nhan", payload);
    const TiepNhanId = result.data?.ID ?? result.ID ?? resolvedId;
    await Swal.fire({
      icon: "success",
      title: "Lưu thành công",
      text: "Thông tin đã được lưu.",
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

function clsRecord(tiepNhanId, tenDichVu, tenChiSo, giaTri, donViDo = null, existingId = null, moTa = null, ketLuan = null, maDichVu = null, maChiSo = null) {
  return {
    ID_CLS:              existingId ?? generateId(),
    KSKCD_TiepNhanId:   tiepNhanId,
    MA_DICH_VU:         maDichVu,
    TEN_DICH_VU:        tenDichVu,
    MA_CHI_SO:          maChiSo,
    TEN_CHI_SO:         tenChiSo,
    GIA_TRI:            giaTri,
    DON_VI_DO:          donViDo,
    MO_TA:              moTa,
    KET_LUAN:           ketLuan,
    CKDT_KET_QUA_CLS:   null,
    EmployeeCode_CLS:       "1",
    EmployeeCodeDoctor_CLS: "Nghia",
    PostingDate:        nowVN(),
  };
}

function buildCLSItems(form, tiepNhanId) {
  const items = [];
  if (form.cls_huyetHoc)     items.push(clsRecord(tiepNhanId, "Xét nghiệm máu",            "Huyết học: tổng phân tích tế bào máu ngoại vi", form.cls_huyetHoc,     null,     form.cls_huyetHoc_id,     null, null, "XN001", "CS001"));
  if (form.cls_duongMau)     items.push(clsRecord(tiepNhanId, "Xét nghiệm máu",            "Đường máu (mmol/L)",                            form.cls_duongMau,     "mmol/L", form.cls_duongMau_id,     null, null, "XN001", "CS002"));
  if (form.cls_ure)          items.push(clsRecord(tiepNhanId, "Xét nghiệm máu",            "Urê (mmol/L)",                                  form.cls_ure,          "mmol/L", form.cls_ure_id,          null, null, "XN001", "CS003"));
  if (form.cls_creatinin)    items.push(clsRecord(tiepNhanId, "Xét nghiệm máu",            "Creatinin (μmol/L)",                            form.cls_creatinin,    "μmol/L", form.cls_creatinin_id,    null, null, "XN001", "CS004"));
  if (form.cls_asat)         items.push(clsRecord(tiepNhanId, "Xét nghiệm máu",            "ASAT (U/L)",                                    form.cls_asat,         "U/L",    form.cls_asat_id,         null, null, "XN001", "CS005"));
  if (form.cls_alat)         items.push(clsRecord(tiepNhanId, "Xét nghiệm máu",            "ALAT (U/L)",                                    form.cls_alat,         "U/L",    form.cls_alat_id,         null, null, "XN001", "CS006"));
  if (form.cls_nuocTieu)     items.push(clsRecord(tiepNhanId, "Xét nghiệm nước tiểu",      "Tổng phân tích nước tiểu (Bằng máy tự động)",   form.cls_nuocTieu,     null,     form.cls_nuocTieu_id,     null, null, "XN002", "CS007"));
  if (form.cls_nuocTieuKhac) items.push(clsRecord(tiepNhanId, "Xét nghiệm nước tiểu",      "Khác",                                          form.cls_nuocTieuKhac, null,     form.cls_nuocTieuKhac_id, null, null, "XN002", "CS008"));
  if (form.cls_cdha)         items.push(clsRecord(tiepNhanId, "Chẩn đoán hình ảnh",        "Chẩn đoán hình ảnh (XQ tim phổi thẳng)",        form.cls_cdha,         null,     form.cls_cdha_id,         null, null, "CDHA1", "CS009"));
  if (form.cls_sieuAm)       items.push(clsRecord(tiepNhanId, "Chẩn đoán hình ảnh",        "Siêu âm",                                       form.cls_sieuAm,       null,     form.cls_sieuAm_id,       null, null, "CDHA1", "CS010"));
  if (form.cls_coKhac === "Có" && form.cls_ketQuaChiTiet)
    items.push(clsRecord(tiepNhanId, "Cận lâm sàng khác", "Kết quả chi tiết", form.cls_ketQuaChiTiet, null, form.cls_ketQuaChiTiet_id, null, null, "KHAC1", "CS011"));
  for (const dk of (form.clsDynamic || [])) {
    if (dk.giaTri && !dk._toDelete)
      items.push(clsRecord(tiepNhanId, dk.name, dk.code, dk.giaTri, dk.donViDo || null, dk._existingId ?? null, dk.moTa || null, dk.ketLuan || null));
  }
  return items;
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

function buildGiaTri(cat, form) {
  const val = form[cat.Field_AX];
  const loai = (cat.LoaiNhap || "").trim();
  if (loai === "Radio") {
    const opts = cat.Option ? JSON.parse(cat.Option) : [];
    const found = opts.find((o) => o.name === val);
    return found !== undefined ? String(found.id) : (val === "Có" ? "1" : "0");
  }
  if (loai.startsWith("MultiSelect")) {
    return (val || []).map((s) => s.split(" - ")[0]).join(";");
  }
  return val ?? "";
}

function buildTienSuBenhList(tienSuCats, form, tiepNhanId) {
  return tienSuCats.map((cat) => ({
    Id_TienSuBenh:      generateId(),
    KSKCD_TiepNhanId: tiepNhanId,
    td_cauhoiid:      cat.td_cauhoiid,
    GiaTri:           buildGiaTri(cat, form),
  }));
}

function toPayload(form, mauPhieu, resolvedId, tienSuCats = []) {
  return {
    Id: resolvedId,
    HO_TEN: form.hoTen,
    GIOI_TINH: Number(form.gioiTinh),
    NGAY_SINH: form.ngaySinh,
    DIEN_THOAI: form.dienThoai,
    MA_DAN_TOC: form.danToc,
    SO_CCCD: form.soDinhDanh,
    NGAYCAP_CCCD: form.ngayCap ? form.ngayCap.replace(/-/g, "") : null,
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
    TYPE: mauPhieu === 1 ? "ChildUnder" : mauPhieu === 2 ? "Minor" : "Adult",

    // ── Tiền sử bệnh ─────────────────────────────────────────────────────
    TienSuBenhList: buildTienSuBenhList(tienSuCats, form, resolvedId),

    // ── Khám thể lực ──────────────────────────────────────────────────────
    Id_TheLuc: generateId(),
    KSKCD_TiepNhanId: resolvedId,
    CHIEU_CAO: form.chieuCao ? Number(form.chieuCao) : null,
    CAN_NANG: form.canNang || null,
    CHI_SO_BMI: form.chieuCao && form.canNang
      ? (parseFloat(form.canNang) / Math.pow(parseFloat(form.chieuCao) / 100, 2)).toFixed(1)
      : null,
    MACH: form.mach || null,
    HUYET_AP: form.huyetAp || null,
    KHAM_THE_LUC_PL: form.phanLoaiTheLuc ? Number(form.phanLoaiTheLuc) : null,
    EmployeeCode_TheLuc: "1",
    EmployeeCodeDoctor_TheLuc: "Nghia",

    // ── Nội khoa ──────────────────────────────────────────────────────────
    Id_NoiKhoa: generateId(),
    EmployeeCode_NoiKhoa: "1",
    EmployeeCodeDoctor_NoiKhoa: "Nghia",
    NOI_KHOA_TUAN_HOAN:         form.nk_a   || null,
    NOI_KHOA_TUAN_HOAN_PL:      form.nk_a_pl ? Number(form.nk_a_pl) : null,
    CKDT_NOI_KHOA_TUAN_HOAN:    form.nk_a_ckdt || null,
    NOI_KHOA_HO_HAP:             form.nk_b   || null,
    NOI_KHOA_HO_HAP_PL:          form.nk_b_pl ? Number(form.nk_b_pl) : null,
    CKDT_NOI_KHOA_HO_HAP:        form.nk_b_ckdt || null,
    NOI_KHOA_TIEU_HOA:           form.nk_c   || null,
    NOI_KHOA_TIEU_HOA_PL:        form.nk_c_pl ? Number(form.nk_c_pl) : null,
    CKDT_NOI_KHOA_TIEU_HOA:      form.nk_c_ckdt || null,
    NOI_KHOA_THAN_TN_SD:         form.nk_d   || null,
    NOI_KHOA_THAN_TN_SD_PL:      form.nk_d_pl ? Number(form.nk_d_pl) : null,
    CKDT_NOI_KHOA_THAN_TN_SD:    form.nk_d_ckdt || null,
    NOI_KHOA_NOI_TIET:           form.nk_e   || null,
    NOI_KHOA_NOI_TIET_PL:        form.nk_e_pl ? Number(form.nk_e_pl) : null,
    CKDT_NOI_KHOA_NOI_TIET:      form.nk_e_ckdt || null,
    NOI_KHOA_CO_XUONG_KHOP:      form.nk_f   || null,
    NOI_KHOA_CO_XUONG_KHOP_PL:   form.nk_f_pl ? Number(form.nk_f_pl) : null,
    CKDT_NOI_KHOA_CO_XUONG_KHOP: form.nk_f_ckdt || null,
    NOI_KHOA_THAN_KINH:          form.nk_g   || null,
    NOI_KHOA_THAN_KINH_PL:       form.nk_g_pl ? Number(form.nk_g_pl) : null,
    CKDT_NOI_KHOA_THAN_KINH:     form.nk_g_ckdt || null,
    NOI_KHOA_TAM_THAN:           form.nk_h   || null,
    NOI_KHOA_TAM_THAN_PL:        form.nk_h_pl ? Number(form.nk_h_pl) : null,
    CKDT_NOI_KHOA_TAM_THAN:      form.nk_h_ckdt || null,

    // ── Ngoại khoa ────────────────────────────────────────────────────────
    Id_NgoaiKhoa:                 generateId(),
    EmployeeCode_NgoaiKhoa:       "1",
    EmployeeCodeDoctor_NgoaiKhoa: "Nghia",
    KET_QUA_KHAM_NGOAI_KHOA:     form.ngk    || null,
    KHAM_NGOAI_KHOA_PL:          form.ngk_pl ? Number(form.ngk_pl) : null,
    CKDT_KHAM_NGOAI_KHOA:        form.ngk_ckdt || null,

    // ── Da liễu ───────────────────────────────────────────────────────────
    Id_DaLieu:                    generateId(),
    EmployeeCode_DaLieu:          "1",
    EmployeeCodeDoctor_DaLieu:    "Nghia",
    KET_QUA_KHAM_DA_LIEU:        form.dl     || null,
    KHAM_DA_LIEU_PL:             form.dl_pl  ? Number(form.dl_pl) : null,
    CKDT_KHAM_DA_LIEU:           form.dl_ckdt || null,

    // ── Sản phụ khoa ──────────────────────────────────────────────────────
    Id_SPK:                generateId(),
    EmployeeCode_SPK:      "1",
    EmployeeCodeDoctor_SPK: "Nghia",
    KET_QUA_KHAM_SAN_PHU_KHOA:  form.spk    || null,
    KHAM_SAN_PHU_KHOA_PL:       form.spk_pl ? Number(form.spk_pl) : null,
    CKDT_KHAM_SAN_PHU_KHOA:     form.spk_ckdt || null,

    // ── Răng Hàm Mặt ──────────────────────────────────────────────────────
    Id_RHM:                       generateId(),
    EmployeeCode_RHM:             "1",
    EmployeeCodeDoctor_RHM:       "Nghia",
    HAM_TREN:                    form.rhm_hamTren  || null,
    HAM_DUOI:                    form.rhm_hamDuoi  || null,
    BENH_RANG_HAM_MAT:           form.rhm_ketQua   || null,
    BENH_KHAC_RANG_HAM_MAT:     form.rhm_benh     || null,
    KHAM_RANG_HAM_MAT_PL:       form.rhm_pl ? Number(form.rhm_pl) : null,
    CKDT_KHAM_RANG_HAM_MAT:     form.rhm_ckdt || null,

    // ── Tai Mũi Họng ──────────────────────────────────────────────────────
    Id_TMH:                       generateId(),
    EmployeeCode_TMH:             "1",
    EmployeeCodeDoctor_TMH:       "Nghia",
    TAI_TRAI_NOI_THUONG:         form.tmh_tt_trai || null,
    TAI_TRAI_NOI_THAM:           form.tmh_th_trai || null,
    TAI_PHAI_NOI_THUONG:         form.tmh_tt_phai || null,
    TAI_PHAI_NOI_THAM:           form.tmh_th_phai || null,
    BENH_TAI_MUI_HONG:           form.tmh_benh    || null,
    BENH_KHAC_TAI_MUI_HONG:     null,
    KHAM_TAI_MUI_HONG_PL:       form.tmh_pl ? Number(form.tmh_pl) : null,
    CKDT_KHAM_TAI_MUI_HONG:     form.tmh_ckdt || null,

    // ── Mắt ───────────────────────────────────────────────────────────────
    Id_Mat:                       generateId(),
    EmployeeCode_Mat:             "1",
    EmployeeCodeDoctor_Mat:       "Nghia",
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
    CKDT_KHAM_MAT:              form.mat_ckdt || null,

    // ── Cận lâm sàng ──────────────────────────────────────────────────────
    CLSList: buildCLSItems(form, resolvedId),

    // ── Kết luận ──────────────────────────────────────────────────────────
    Id_KetLuan:              generateId(),
    BINH_THUONG:             null,
    NGUY_CO_MAC_LAO:         null,
    VAN_DE_SUC_KHOE:         null,
    KET_LUAN_BENH:           (form.kl_icd10 || []).map((s) => s.split(" - ")[0]).join(";") || null,
    KET_LUAN_BENH_FULL:      (form.kl_icd10 || []).join(";") || null,
    GHI_RO_VAN_DE_SUC_KHOE: form.kl_tinhTrang || null,
    HEN_KHAM_LAN_SAU:        null,
    CHUYEN_CSKCB:            null,
    PHAN_LOAI_SK:            form.kl_phanLoai ? Number(form.kl_phanLoai) : null,
    CAC_VAN_DE_SUC_KHOE:     null,
    CAC_BENH_TAT_NEU_CO:     null,
    CKS_NGUOI_KET_LUAN:      form.kl_bacsi  || null,
    CKS_BENH_VIEN:           form.kl_cskcb  || null,
    EmployeeCode_KL:         "1",
    EmployeeCodeDoctor_KL:   "Nghia",
    PostingDate:             nowVN(),
  };
}
