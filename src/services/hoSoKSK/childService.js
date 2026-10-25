import { api } from "../api";

const BASE = "/ho-so-ksk/child";

/**
 * Lấy danh sách hồ sơ KSK trẻ em (dưới 6 tuổi)
 * @param {{ page?: number, size?: number, keyword?: string }} params
 */
export function getChildList(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}?${qs}`);
}

/**
 * Lấy chi tiết một hồ sơ
 * @param {string|number} id
 */
export function getChildById(id) {
  return api.get(`${BASE}/${id}`);
}

/**
 * Tạo mới hồ sơ KSK trẻ em
 * @param {object} form — dữ liệu từ TaoHoSo form state
 */
export function createChild(form) {
  return api.post(BASE, toChildPayload(form));
}

/**
 * Cập nhật hồ sơ
 * @param {string|number} id
 * @param {object} form
 */
export function updateChild(id, form) {
  return api.put(`${BASE}/${id}`, toChildPayload(form));
}

/**
 * Xoá hồ sơ
 * @param {string|number} id
 */
export function deleteChild(id) {
  return api.delete(`${BASE}/${id}`);
}

// ---------------------------------------------------------------------------
// Mapping form state → API payload
// ---------------------------------------------------------------------------
function toChildPayload(form) {
  return {
    mauPhieu: 3,
    thongTinHanhChinh: {
      hoTen: form.hoTen,
      soDinhDanh: form.soDinhDanh,
      ngaySinh: form.ngaySinh,
      gioiTinh: form.gioiTinh,
      danToc: form.danToc,
      sinhNon: form.sinhNon,
      tuanThaiKhiSinh: form.tuanThaiKhiSinh,
      nhomMau: form.nhomMau,
      doiTuongKham: form.doiTuongKham,
      nguonChiTra: form.nguonChiTra,
      tinhThanhPho: form.tinhThanhPho,
      phuongXa: form.phuongXa,
      soNha: form.soNha,
      hoTenNguoiDiCung: form.hoTenNguoiDiCung,
      moiQuanHe: form.moiQuanHe,
      dienThoai: form.dienThoai,
      soDinhDanhGiamHo: form.soDinhDanhGiamHo,
      loaiHinhKham: form.loaiHinhKham,
    },
    tienSu: {
      banThan: form.tienSuBanThan,
      banThanICD10: form.tienSuBanThanICD10,
      giaDinh: form.tienSuGiaDinh,
      giaDinhICD10: form.tienSuGiaDinhICD10,
      tiepXucLao: form.tienSuLao,
    },
  };
}
