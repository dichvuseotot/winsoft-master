import Swal from "sweetalert2";
import { api } from "../api";
import { nowVN } from "../../utils/date";

function generateId() {
  const now = new Date();
  const yyyymmdd =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${yyyymmdd}${random}`;
}

function toChildPayload(form, mauPhieu, resolvedId) {
  return {
    Id: resolvedId,
    HO_TEN: form.hoTen,
    GIOI_TINH: form.gioiTinh !== "" ? Number(form.gioiTinh) : null,
    NGAY_SINH: form.ngaySinh,
    DIEN_THOAI: form.dienThoai || null,
    MA_DAN_TOC: form.danToc || null,
    SO_CCCD: form.soDinhDanh || null,
    NGAYCAP_CCCD: null,
    NOICAP_CCCD: null,
    TUAN_THAI: form.tuanThaiKhiSinh || null,
    SINH_NON: form.sinhNon !== "" && form.sinhNon !== undefined ? Number(form.sinhNon) : null,
    NHOM_MAU: form.nhomMau || null,
    DIA_CHI: form.soNha || null,
    MATINH_CU_TRU: form.tinhThanhPho || null,
    MAXA_CU_TRU: form.phuongXa || null,
    HO_TEN_NGUOI_DI_CUNG: form.hoTenNguoiDiCung || null,
    SO_CCCD_NGUOI_DI_CUNG: form.soDinhDanhGiamHo || null,
    MOI_QUAN_HE_VOI_TRE: form.moiQuanHe ? Number(form.moiQuanHe) : null,
    DIEN_THOAI_NGUOI_DI_CUNG: form.dienThoaiNguoiDiCung || null,
    LY_DO_VV: form.lyDoKham || null,
    MA_NGHE_NGHIEP: null,
    NOI_LAM_VIEC_HOC_TAP: null,
    td_loaimau_kskid: Number(mauPhieu),
    MA_LK: form.maLanKham || null,
    DOI_TUONG: String(form.doiTuongKham),
    NGUON_CHI_TRA: Number(form.nguonChiTra),
    MA_LOAI_KCB: form.loaiHinhKham || null,
    NGAY_VAO: form.ngayKham,
    TYPE: "ChildUnder",
    // ── Dấu hiệu sinh tồn ─────────────────────────────────────────────────
    Id_DauHieuSinhTon: generateId(),
    NHIET_DO: form.child_nhietDo || null,
    DGDHST_NHIET_DO: form.child_danhGiaNhietDo != null ? Number(form.child_danhGiaNhietDo) : null,
    MACH: form.child_mach || null,
    DGDHST_MACH: form.child_danhGiaMach != null ? Number(form.child_danhGiaMach) : null,
    NHIP_THO: form.child_nhipTho || null,
    DGDHST_NHIP_THO: form.child_danhGiaNhipTho != null ? Number(form.child_danhGiaNhipTho) : null,
    EmployeeCode_DauHieuSinhTon: "1",
    EmployeeCodeDoctor_DauHieuSinhTon: "Nghia",
    PostingDate_DauHieuSinhTon: nowVN(),
    // ── Đánh giá dinh dưỡng ───────────────────────────────────────────────
    Id_DanhGiaDinhDuong: generateId(),
    CHIEU_DAI: form.child_chieuDai ? Number(form.child_chieuDai) : null,
    CHIEU_DAI_TUOI_SD: form.child_chieuDaiSD || null,
    CAN_NANG: form.child_canNang || null,
    CAN_NANG_TUOI_SD: form.child_canNangSD || null,
    VONG_DAU: form.child_vongDau ? Number(form.child_vongDau) : null,
    DG_VONG_DAU: Number(Object.keys(DG_VONG_DAU_REVERSE).find((k) => DG_VONG_DAU_REVERSE[k] === form.child_danhGiaVongDau)) || null,
    CHU_VI_VONG_CANH_TAY: form.child_chuViVongCanhTay ? Number(form.child_chuViVongCanhTay) : null,
    DGDD_BINH_THUONG: 0,
    PHU_DINH_DUONG: form.child_phuDinhDuong ? 1 : 0,
    DGDD_THIEU_MAU: form.child_thieuMau ? 1 : 0,
    DGDD_COI_XUONG: form.child_coiXuong ? 1 : 0,
    SUY_DINH_DUONG: form.child_suyDinhDuong ? 1 : 0,
    THUA_CAN_BEO_PHI: form.child_thuaCan ? 1 : 0,
    EmployeeCode_DGDD: "1",
    EmployeeCodeDoctor_DGDD: "Nghia",
    PostingDate_DGDD: nowVN(),
    // ── Đánh giá phát triển tinh thần và vận động ─────────────────────────
    Id_DanhGiaPTT_VD: generateId(),
    PT_TTBT_THEO_DO_TUOI: form.child_phatTrienTinhThan === "Có" ? 1 : 0,
    PT_VDBT_THEO_DO_TUOI: form.child_phatTrienVanDong === "Có" ? 1 : 0,
    NGUY_CO_TU_KY: form.child_nguyCoBo === "Có" ? 1 : 0,
    EmployeeCode_DanhGiaPTT_VD: "1",
    EmployeeCodeDoctor_DanhGiaPTT_VD: "Nghia",
    PostingDate_DanhGiaPTT_VD: nowVN(),
    // ── Đánh giá tiêm chủng ───────────────────────────────────────────────
    Id_DanhGiaTC: generateId(),
    TIEM_CHUNG_BCG_SS: form.child_tc_lao === "Có" ? 1 : 0,
    TIEM_CHUNG_VGB_SS_MUI1: form.child_tc_viemGanB === "Có" ? 1 : 0,
    TIEM_CHUNG_DAY_DU_THEO_DO_TUOI: form.child_tc_dayDu === "Có" ? 1 : 0,
    EmployeeCode_DanhGiaTC: "1",
    EmployeeCodeDoctor_DanhGiaTC: "Nghia",
    PostingDate_DanhGiaTC: nowVN(),
    // ── Toàn trạng ────────────────────────────────────────────────────────
    Id_ToanTrang: generateId(),
    MAU_SAC_DA: form.child_mauSacDa ? Number(form.child_mauSacDa) : null,
    LONG_BAN_TAY: form.child_longBanTay ? Number(form.child_longBanTay) : null,
    EmployeeCode_ToanTrang: "1",
    EmployeeCodeDoctor_ToanTrang: "Nghia",
    PostingDate_ToanTrang: nowVN(),
    // ── Đầu cổ ────────────────────────────────────────────────────────────
    Id_DauCo: generateId(),
    THOP: form.child_thop ? Number(form.child_thop) : null,
    HINH_DANG_DAU: form.child_hinhDangDau ? Number(form.child_hinhDangDau) : null,
    VAN_DONG_CO: form.child_vanDongCo ? Number(form.child_vanDongCo) : null,
    KHOI_BAT_THUONG_DAU_CO: form.child_khoiBatThuongDauCo ? Number(form.child_khoiBatThuongDauCo) : null,
    EmployeeCode_DauCo: "1",
    EmployeeCodeDoctor_DauCo: "Nghia",
    PostingDate_DauCo: nowVN(),
    // ── Mắt ───────────────────────────────────────────────────────────────
    Id_Mat: generateId(),
    VI_TRI_HAI_MAT: form.child_viTriHaiMat ? Number(form.child_viTriHaiMat) : null,
    MI_MAT_KET_MAC: form.child_miMatKetMac ? Number(form.child_miMatKetMac) : null,
    LAC_MAT: form.child_lacMat ? Number(form.child_lacMat) : null,
    DONG_TU: form.child_dongTu ? Number(form.child_dongTu) : null,
    KHONG_KINH_MAT_PHAI: form.child_khongKinhMatPhai || null,
    KHONG_KINH_MAT_TRAI: form.child_khongKinhMatTrai || null,
    CO_KINH_MAT_PHAI: form.child_coKinhMatPhai || null,
    CO_KINH_MAT_TRAI: form.child_coKinhMatTrai || null,
    BENH_KHAC_MAT: form.child_benhKhacMat || null,
    KHAM_MAT_PL: form.child_khamMatPL ? Number(form.child_khamMatPL) : null,
    CKDT_KHAM_MAT: form.child_ckdtKhamMat || null,
    EmployeeCode_Mat: "1",
    EmployeeCodeDoctor_Mat: "Nghia",
    PostingDate_Mat: nowVN(),
    // ── Tai ───────────────────────────────────────────────────────────────
    Id_Tai: generateId(),
    TAI_MANG_NHI: form.child_taiMangNhi ? Number(form.child_taiMangNhi) : null,
    DAP_UNG_AM_THANH: form.child_dapUngAmThanh ? Number(form.child_dapUngAmThanh) : null,
    KHOI_SUNG_SAU_TAI: form.child_khoiSungSauTai ? Number(form.child_khoiSungSauTai) : null,
    CHAY_MU_NUOC_TAI: form.child_chayMuNuocTai ? Number(form.child_chayMuNuocTai) : null,
    EmployeeCode_Tai: "1",
    EmployeeCodeDoctor_Tai: "Nghia",
    PostingDate_Tai: nowVN(),
    // ── Mũi họng ──────────────────────────────────────────────────────────
    Id_MuiHong: generateId(),
    HINH_DANG_MUI: form.child_hinhDangMui ? Number(form.child_hinhDangMui) : null,
    CHAY_NUOC_MUI: form.child_chayNuocMui ? Number(form.child_chayNuocMui) : null,
    NGHET_MUI: form.child_nghetMui ? Number(form.child_nghetMui) : null,
    HONG: form.child_hong ? Number(form.child_hong) : null,
    EmployeeCode_MuiHong: "1",
    EmployeeCodeDoctor_MuiHong: "Nghia",
    PostingDate_MuiHong: nowVN(),
    // ── Miệng răng ────────────────────────────────────────────────────────
    Id_MiengRang: generateId(),
    HINH_DANG_MIENG: form.child_hinhDangMieng ? Number(form.child_hinhDangMieng) : null,
    RANG_SUA_SO_SINH: form.child_rangSuaSoSinh ? Number(form.child_rangSuaSoSinh) : null,
    HINH_DANG_LUOI: form.child_hinhDangLuoi ? Number(form.child_hinhDangLuoi) : null,
    DINH_THANG_LUOI: form.child_dinhThangLuoi ? Number(form.child_dinhThangLuoi) : null,
    NAM_MIENG: form.child_namMieng ? Number(form.child_namMieng) : null,
    CAM_NHO_TUT_VE_SAU: form.child_camNhoTutVeSau ? Number(form.child_camNhoTutVeSau) : null,
    SAU_MANG_BAM_LO: form.child_sauMangBamLo ? Number(form.child_sauMangBamLo) : null,
    EmployeeCode_MR: "1",
    EmployeeCodeDoctor_MR: "Nghia",
    PostingDate_MR: nowVN(),
    // ── Hô hấp ────────────────────────────────────────────────────────────
    Id_HoHap: generateId(),
    NHIP_THO_KHONG_DEU: form.child_nhipThoKhongDeu ? Number(form.child_nhipThoKhongDeu) : null,
    THO_RUT_LOM_LONG_NGUC: form.child_thoRutLomLongNguc ? Number(form.child_thoRutLomLongNguc) : null,
    TIENG_THO_BAT_THUONG: form.child_tiengThoBatThuong ? Number(form.child_tiengThoBatThuong) : null,
    SUY_HO_HAP: form.child_suyHoHap ? Number(form.child_suyHoHap) : null,
    NGHE_PHOI: form.child_nghePhoi ? Number(form.child_nghePhoi) : null,
    EmployeeCode_HoHap: "1",
    EmployeeCodeDoctor_HoHap: "Nghia",
    PostingDate_HoHap: nowVN(),
    // ── Tim mạch ──────────────────────────────────────────────────────────
    Id_TimMach: generateId(),
    VI_TRI_MOM_TIM: form.child_viTriMomTim ? Number(form.child_viTriMomTim) : null,
    MACH_NGOAI_VI: form.child_machNgoaiVi ? Number(form.child_machNgoaiVi) : null,
    TIENG_TIM: form.child_tiengTim ? Number(form.child_tiengTim) : null,
    EmployeeCode_TimMach: "1",
    EmployeeCodeDoctor_TimMach: "Nghia",
    PostingDate_TimMach: nowVN(),
    // ── Bụng và cơ quan sinh dục ──────────────────────────────────────────
    Id_BungCoQuanSinhDuc: generateId(),
    HINH_DANG_BUNG_RON: form.child_hinhDangBung ? Number(form.child_hinhDangBung) : null,
    GAN_LACH_TO: form.child_ganLachTo ? Number(form.child_ganLachTo) : null,
    KHOI_BAT_THUONG: form.child_khoiBatThuong ? Number(form.child_khoiBatThuong) : null,
    LO_HAU_MON: form.child_loHauMon ? Number(form.child_loHauMon) : null,
    CO_QUAN_SINH_DUC_NGOAI: form.child_coQuanSinhDuc ? Number(form.child_coQuanSinhDuc) : null,
    EmployeeCode_BungCoQuanSinhDuc: "1",
    EmployeeCodeDoctor_BungCoQuanSinhDuc: "Nghia",
    PostingDate_BungCoQuanSinhDuc: nowVN(),
    // ── Cơ xương và thần kinh ─────────────────────────────────────────────
    Id_CoXuongThanKinh: generateId(),
    VAN_DONG_KHONG_DOI_XUNG: form.child_vanDongKhongDoiXung ? Number(form.child_vanDongKhongDoiXung) : null,
    PHAN_XA_BU: form.child_phanXaBu ? Number(form.child_phanXaBu) : null,
    PHAN_XA_NAM: form.child_phanXaNam ? Number(form.child_phanXaNam) : null,
    PHAN_XA_MORO: form.child_phanXaMoro ? Number(form.child_phanXaMoro) : null,
    TRUONG_LUC_CO: form.child_truongLucCo ? Number(form.child_truongLucCo) : null,
    KHOP_HANG: form.child_khopHang ? Number(form.child_khopHang) : null,
    PHAN_XA_CO: form.child_phanXaCo ? Number(form.child_phanXaCo) : null,
    KIEM_TRA_LUNG_COT_SONG: form.child_kiemTraLung ? Number(form.child_kiemTraLung) : null,
    TU_CHI_KHOP: form.child_khamTuChi ? Number(form.child_khamTuChi) : null,
    QUAN_SAT_DANG_DI: form.child_quanSatDangDi ? Number(form.child_quanSatDangDi) : null,
    EmployeeCode_CoXuongThanKinh: "1",
    EmployeeCodeDoctor_CoXuongThanKinh: "Nghia",
    PostingDate_CoXuongThanKinh: nowVN(),
    // ── Kết luận ──────────────────────────────────────────────────────────
    Id_KetLuan: generateId(),
    BINH_THUONG: form.child_kl_binhThuong === "Có" ? 1 : 0,
    NGUY_CO_MAC_LAO: form.child_kl_nguyCoLao === "Có" ? 1 : 0,
    VAN_DE_SUC_KHOE: form.child_kl_vanDeSucKhoe === "Có" ? 1 : 0,
    KET_LUAN_BENH: (form.child_kl_icd10 || []).map((i) => i.value).join(",") || null,
    KET_LUAN_BENH_FULL: (form.child_kl_icd10 || []).map((i) => i.label).join("; ") || null,
    GHI_RO_VAN_DE_SUC_KHOE: form.child_kl_ghiRoVanDe || null,
    HEN_KHAM_LAN_SAU: form.child_kl_henKham ? Number(form.child_kl_henKham) : null,
    CHUYEN_CSKCB: form.child_kl_chuyenCSKCB ? Number(form.child_kl_chuyenCSKCB) : null,
    PHAN_LOAI_SK: form.child_kl_phanLoaiSK ? Number(form.child_kl_phanLoaiSK) : null,
    CAC_VAN_DE_SUC_KHOE: form.child_kl_cacVanDe || null,
    CAC_BENH_TAT_NEU_CO: form.child_kl_cacBenhTat || null,
    CKS_NGUOI_KET_LUAN: form.child_kl_cksNguoiKetLuan || null,
    CKS_BENH_VIEN: form.child_kl_cksBenhVien || null,
    EmployeeCode_KL: "1",
    EmployeeCodeDoctor_KL: "Nghia",
    PostingDate_KL: nowVN(),
  };
}

export async function saveChildTiepNhan(form, mauPhieu, id = null) {
  try {
    const resolvedId = id ?? generateId();
    const payload = toChildPayload(form, mauPhieu, resolvedId);
    console.log("[saveChildTiepNhan] payload:", payload);
    const result = await api.post("/add-update-tiep-nhan", payload);
    const TiepNhanId = result?.ID ?? resolvedId;
    await Swal.fire({
      icon: "success",
      title: "Lưu thành công",
      text: "Thông tin đã được lưu.",
      confirmButtonText: "OK",
      confirmButtonColor: "#16a34a",
    });
    return { ...result, TiepNhanId };
  } catch (error) {
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

export async function getDauHieuSinhTon(kskcdTiepNhanId) {
  const res = await api.get(`/get-dau-hieu-sinh-ton?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getDanhGiaPhatTrienTinhThanVanDong(kskcdTiepNhanId) {
  const res = await api.get(`/get-danh-gia-phat-trien-tinh-than-van-dong?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getDanhGiaTiemChung(kskcdTiepNhanId) {
  const res = await api.get(`/get-danh-gia-tiem-chung?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getToanTrang(kskcdTiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-toan-trang?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getDauCo(kskcdTiepNhanId) {
  const res = await api.get(`/get-kham-lam-sang-dau-co?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getBungCoQuanSinhDuc(kskcdTiepNhanId) {
  const res = await api.get(`/get-bung-co-quang-sinh-duc?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export async function getDanhGiaDinhDuong(kskcdTiepNhanId) {
  const res = await api.get(`/get-danh-gia-dinh-duong?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}

export const DG_VONG_DAU_REVERSE = { 1: "Bình thường", 2: "To", 3: "Nhỏ" };

export async function getCoXuongThanKinh(kskcdTiepNhanId) {
  const res = await api.get(`/get-co-xuong-than-kinh?KSKCD_TiepNhanId=${kskcdTiepNhanId}`);
  return (res.data ?? [])[0] ?? null;
}
