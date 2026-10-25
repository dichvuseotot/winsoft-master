import { api } from "../api";

const BASE = "/ho-so-ksk/adult";

/**
 * Lấy danh sách hồ sơ KSK người lớn (≥ 18 tuổi)
 * @param {{ page?: number, size?: number, keyword?: string }} params
 */
export function getAdultList(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`${BASE}?${qs}`);
}

/**
 * Lấy chi tiết một hồ sơ
 * @param {string|number} id
 */
export function getAdultById(id) {
  return api.get(`${BASE}/${id}`);
}

/**
 * Tạo mới hồ sơ KSK người lớn
 * @param {object} form — dữ liệu từ TaoHoSo form state
 */
export function createAdult(form) {
  return api.post(BASE, toAdultPayload(form));
}

/**
 * Cập nhật hồ sơ
 * @param {string|number} id
 * @param {object} form
 */
export function updateAdult(id, form) {
  return api.put(`${BASE}/${id}`, toAdultPayload(form));
}

/**
 * Xoá hồ sơ
 * @param {string|number} id
 */
export function deleteAdult(id) {
  return api.delete(`${BASE}/${id}`);
}

// ---------------------------------------------------------------------------
// Mapping form state → API payload
// ---------------------------------------------------------------------------
function toAdultPayload(form) {
  return {
    mauPhieu: 1,
    thongTinHanhChinh: {
      soDinhDanh: form.soDinhDanh,
      hoTen: form.hoTen,
      gioiTinh: form.gioiTinh,
      ngaySinh: form.ngaySinh,
      ngayCap: form.ngayCap,
      noiCap: form.noiCap,
      danToc: form.danToc,
      nhomMau: form.nhomMau,
      ngheNghiep: form.ngheNghiep,
      noiCongTac: form.noiCongTac,
      dienThoai: form.dienThoai,
      doiTuongKham: form.doiTuongKham,
      nguonChiTra: form.nguonChiTra,
      tinhThanhPho: form.tinhThanhPho,
      phuongXa: form.phuongXa,
      soNha: form.soNha,
      lyDoKham: form.lyDoKham,
    },
    thongTinLanKham: {
      maCskcb: form.maCskcb,
      maCskcbGln: form.maCskcbGln,
      maLanKham: form.maLanKham,
      ngayKham: form.ngayKham,
      gioKham: form.gioKham,
    },
    tienSuBenh: {
      gdICD10: form.gdICD10,
      dieuTriICD10: form.dieuTriICD10,
      thuocDangSD: form.thuocDangSD,
    },
  };
}
