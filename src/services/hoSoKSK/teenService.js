import { api } from "../api";

const BASE = "/ho-so-ksk/teen";

/**
 * Lấy danh sách hồ sơ KSK thanh thiếu niên (6 – dưới 18 tuổi)
 * @param {{ page?: number, size?: number, keyword?: string }} params
 */
export function getTeenList(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}?${qs}`);
}

/**
 * Lấy chi tiết một hồ sơ
 * @param {string|number} id
 */
export function getTeenById(id) {
  return api.get(`${BASE}/${id}`);
}

/**
 * Tạo mới hồ sơ KSK thanh thiếu niên
 * @param {object} form — dữ liệu từ TaoHoSo form state
 */
export function createTeen(form) {
  return api.post(BASE, toTeenPayload(form));
}

/**
 * Cập nhật hồ sơ
 * @param {string|number} id
 * @param {object} form
 */
export function updateTeen(id, form) {
  return api.put(`${BASE}/${id}`, toTeenPayload(form));
}

/**
 * Xoá hồ sơ
 * @param {string|number} id
 */
export function deleteTeen(id) {
  return api.delete(`${BASE}/${id}`);
}

// ---------------------------------------------------------------------------
// Mapping form state → API payload
// ---------------------------------------------------------------------------
function toTeenPayload(form) {
  return {
    mauPhieu: 2,
    thongTinHanhChinh: {
      soDinhDanh: form.soDinhDanh,
      hoTen: form.hoTen,
      gioiTinh: form.gioiTinh,
      ngaySinh: form.ngaySinh,
      ngayCap: form.ngayCap,
      noiCap: form.noiCap,
      danToc: form.danToc,
      nhomMau: form.nhomMau,
      dienThoai: form.dienThoai,
      doiTuongKham: form.doiTuongKham,
      nguonChiTra: form.nguonChiTra,
      tinhThanhPho: form.tinhThanhPho,
      phuongXa: form.phuongXa,
      soNha: form.soNha,
      hoTenGiamHo: form.teen_hoTenGiamHo,
      maGiamHo: form.teen_maGiamHo,
      dienThoaiGiamHo: form.teen_dienThoaiGiamHo,
      lyDoKham: form.lyDoKham,
    },
    thongTinLanKham: {
      maCskcb: form.maCskcb,
      ngayKham: form.ngayKham,
      gioKham: form.gioKham,
      loaiHinhKham: form.loaiHinhKham,
    },
    tienSuBenh: {
      gdBenhBamSinh: form.teen_gdBenhBamSinh,
      gdICD10: form.teen_gdICD10,
      sanKhoa: form.teen_sanKhoa,
      tiemChung: buildTiemChung(form),
      benhBamSinhManTinh: form.teen_benhBamSinhManTinh,
      benhBamSinhICD10: form.teen_benhBamSinhICD10,
      dangDieuTri: form.teen_dangDieuTri,
      benhDieuTri: form.teen_benhDieuTri,
      thuocDangSD: form.teen_thuocDangSD,
    },
  };
}

function buildTiemChung(form) {
  const VACCINES = ["bcg", "bachHauHoGaUonVan", "soi", "baiLiet", "viemNaoNhatBan", "viemGanB"];
  const result = VACCINES.map((id) => ({
    vacxin: id,
    tinhTrang: form[`teen_tc_${id}`] ?? "Không rõ",
  }));
  const extra = (form.teen_tc_extra ?? []).map((v) => ({
    vacxin: v.label,
    tinhTrang: v.status,
  }));
  return [...result, ...extra];
}
