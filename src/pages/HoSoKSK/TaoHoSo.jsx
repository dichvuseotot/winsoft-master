import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import "./TaoHoSo.css";
import { Tab1Content, Tab2Content, Tab3Content, Tab4Content, Tab5Content, Tab6Content, Tab7Content, CLS_DINH_KY_DATA } from "./MauAdult";
import { Tab1ChildContent, Tab3ChildContent, Tab4ChildContent, Tab5ChildContent, Tab6ChildContent, Tab7ChildContent, Tab8ChildContent } from "./MauChild";
import { Tab1TeenContent, Tab2TeenContent, Tab3TeenContent, Tab5TeenContent } from "./MauTeen";
import { saveAdultTiepNhan, saveTeenTiepNhan, saveChildTiepNhan, getTeenTheLuc, getTeenNhiKhoa, getTeenMat, getTeenTMH, getTeenRHM, getThongTinHanhChinhById, getThongTinHanhChinhList, getKhamTheLuc, getKhamNoiKhoa, getNgoaiKhoa, getDaLieu, getSanPhuKhoa, getKhamMat, getKhamTMH, getKhamRHM, getCLS, getTienSuBenh, getKetLuan, getGioiTinhList, getMoiQuanHeList, getDanTocList, getTinhThanhList, getPhuongXaList, getDoiTuongList, getNguonChiTraList, getPhanLoaiSucKhoeList, getLoaiHinhKCBList, getICD10List, getLoaiMauKSKList, getCareerList, getTienSuBenhCategories } from "../../services";
import { todayVN, timeNowVN } from "../../utils/date";
import { api } from "../../services/api";

const TODAY = todayVN();

const parseYYYYMMDD = (v) => {
  if (!v) return "";
  const s = String(v).replace(/\D/g, "");
  if (s.length === 8) return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  return s;
};

const TABS = [
  { id: 1, label: "1. Thông tin Hành chính" },
  { id: 2, label: "2. Thông tin lần khám" },
  { id: 3, label: "3. Tiền sử bệnh tật" },
  { id: 4, label: "4. Khám thể lực" },
  { id: 5, label: "5. Khám lâm sàng" },
  { id: 6, label: "6. Cận lâm sàng" },
  { id: 7, label: "7. Kết luận & Chẩn đoán" },
];

const TABS_CHILD = [
  { id: 1, label: "1. Thông tin Hành chính" },
  { id: 2, label: "2. Thông tin lần khám" },
  { id: 3, label: "3. Dấu hiệu sinh tồn" },
  { id: 4, label: "4. Dinh dưỡng" },
  { id: 5, label: "5. Tinh thần - vận động" },
  { id: 6, label: "6. Tiêm chủng" },
  { id: 7, label: "7. Khám lâm sàng" },
  { id: 8, label: "8. Kết luận và tư vấn" },
];

const TABS_TEEN = [
  { id: 1, label: "1. Thông tin Hành chính" },
  { id: 2, label: "2. Thông tin lần khám" },
  { id: 3, label: "3. Tiền sử bệnh tật" },
  { id: 4, label: "4. Khám thể lực" },
  { id: 5, label: "5. Khám lâm sàng" },
  { id: 6, label: "6. Cận lâm sàng" },
  { id: 7, label: "7. Kết luận" },
];




function PatientPickerModal({ onClose, onSelect, mauPhieu, gioiTinhOptions = [] }) {
  const [q, setQ] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const today = todayVN();
const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const thStyle = { padding: ".5rem 1rem", textAlign: "left", fontWeight: 600, color: "var(--gray-500)", whiteSpace: "nowrap", borderBottom: "2px solid var(--gray-200)", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".04em", background: "var(--gray-100)" };
  const tdStyle = { padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)", color: "var(--gray-700)", whiteSpace: "nowrap", fontSize: ".83rem" };

  const fetchPatients = (fd, td, p) => {
    setLoading(true);
    getThongTinHanhChinhList({ fromDate: fd, toDate: td, mauPhieu, page: p, pageSize: PAGE_SIZE })
      .then(({ items, total: t, totalPages: tp }) => {
        setPatients(items);
        setTotal(t);
        setTotalPages(tp);
      })
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients(fromDate, toDate, 1);
  }, [mauPhieu]);

  const filtered = patients.filter(
    (p) =>
      (p.HO_TEN || "").toLowerCase().includes(q.toLowerCase()) ||
      (p.SO_CCCD || "").includes(q),
  );
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--gray-100)",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: 960,
          boxShadow: "var(--shadow-xl)",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--gray-200)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bi bi-person-lines-fill" style={{ color: "var(--primary)", fontSize: "1.1rem" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--gray-900)" }}>
              Danh sách bệnh nhân
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--gray-400)", fontSize: "1.2rem", lineHeight: 1, padding: "0 .25rem" }}>×</button>
        </div>

        {/* Date filter */}
        <div style={{ padding: ".625rem 1.25rem", borderBottom: "1px solid var(--gray-200)", display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap", flexShrink: 0 }}>
          <span style={{ fontSize: ".8rem", color: "var(--gray-500)", whiteSpace: "nowrap" }}>Từ ngày</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ height: 32, border: "1px solid var(--gray-200)", borderRadius: 6, padding: "0 .5rem", fontSize: ".8rem", background: "#fff", color: "var(--gray-800)", outline: "none" }}
          />
          <span style={{ fontSize: ".8rem", color: "var(--gray-500)", whiteSpace: "nowrap" }}>đến</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ height: 32, border: "1px solid var(--gray-200)", borderRadius: 6, padding: "0 .5rem", fontSize: ".8rem", background: "#fff", color: "var(--gray-800)", outline: "none" }}
          />
          <button
            onClick={() => { setPage(1); fetchPatients(fromDate, toDate, 1); }}
            style={{ height: 32, padding: "0 .875rem", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 6, fontSize: ".8rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Tìm
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: ".625rem 1.25rem", borderBottom: "1px solid var(--gray-200)", flexShrink: 0 }}>
          <div className="modal-search-wrapper" style={{ display: "flex", alignItems: "center", gap: ".5rem", border: "1.5px solid var(--gray-200)", borderRadius: "var(--radius-md)", padding: ".4rem .75rem" }}>
            <i className="bi bi-search" style={{ color: "var(--gray-400)", fontSize: ".85rem" }} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên hoặc số định danh..."
              style={{ border: "none", outline: "none", boxShadow: "none", background: "transparent", fontSize: ".875rem", width: "100%", color: "var(--gray-700)" }}
            />
          </div>
        </div>

        {/* Table content */}
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--gray-400)", fontSize: ".875rem" }}>
              <i className="bi bi-arrow-repeat" style={{ fontSize: "1.4rem", display: "block", marginBottom: ".5rem", opacity: .5 }} />
              Đang tải...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--gray-400)", fontSize: ".875rem" }}>
              <i className="bi bi-inbox" style={{ fontSize: "1.6rem", display: "block", marginBottom: ".5rem", opacity: .4 }} />
              Không tìm thấy bệnh nhân
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Họ tên</th>
                  <th style={thStyle}>Giới tính</th>
                  <th style={thStyle}>Ngày sinh</th>
                  <th style={thStyle}>Số CCCD</th>
                  <th style={thStyle}>Thời gian tạo</th>
                  <th style={thStyle}>Lý do khám</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.Id}
                    onClick={async () => {
                      const detail = await getThongTinHanhChinhById(p.Id).catch(() => null);
                      onSelect(detail ?? p);
                      onClose();
                    }}
                    style={{ cursor: "pointer", background: "var(--gray-100)", transition: "background .12s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gray-200)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gray-100)")}
                  >
                    <td style={{ ...tdStyle, color: "var(--gray-400)", width: 36, textAlign: "center" }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td style={{ ...tdStyle, color: "var(--gray-900)", fontWeight: 600 }}>{p.HO_TEN}</td>
                    <td style={tdStyle}>
                      <span style={{ padding: ".15em .55em", borderRadius: 99, fontSize: ".75rem", fontWeight: 600, background: p.GIOI_TINH === 0 ? "#dbeafe" : "#fce7f3", color: p.GIOI_TINH === 0 ? "#1d4ed8" : "#be185d" }}>
                        {gioiTinhOptions.find((g) => g.Id === p.GIOI_TINH)?.TenGioiTinh ?? ""}
                      </span>
                    </td>
                    <td style={tdStyle}>{p.NGAY_SINH ? p.NGAY_SINH.slice(0, 10) : "—"}</td>
                    <td style={{ ...tdStyle, fontFamily: "monospace", letterSpacing: ".03em" }}>{p.SO_CCCD || "—"}</td>
                    <td style={tdStyle}>{p.PostingDate ? new Date(p.PostingDate.replace('Z', '')).toLocaleString('vi-VN') : p.NGAY_VAO ?? '—'}</td>
                    <td style={{ ...tdStyle, color: "var(--gray-400)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.LY_DO_VV || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer: total + pagination */}
        <div style={{ padding: ".625rem 1.25rem", borderTop: "1px solid var(--gray-200)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, flexWrap: "wrap", gap: ".5rem" }}>
          <span style={{ fontSize: ".78rem", color: "var(--gray-500)" }}>Tổng: {total} bản ghi</span>
          {totalPages > 1 && (
            <div style={{ display: "flex", gap: ".375rem", alignItems: "center", flexWrap: "wrap" }}>
              <button
                disabled={page <= 1}
                onClick={() => { const p = page - 1; setPage(p); fetchPatients(fromDate, toDate, p); }}
                style={{ height: 28, padding: "0 .625rem", border: "1px solid var(--gray-200)", borderRadius: 6, background: page <= 1 ? "var(--gray-100)" : "#fff", color: page <= 1 ? "var(--gray-400)" : "var(--gray-700)", cursor: page <= 1 ? "default" : "pointer", fontSize: ".8rem" }}
              >‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => { setPage(pg); fetchPatients(fromDate, toDate, pg); }}
                  style={{ height: 28, minWidth: 28, padding: "0 .4rem", border: "1px solid var(--gray-200)", borderRadius: 6, background: pg === page ? "var(--primary)" : "#fff", color: pg === page ? "#fff" : "var(--gray-700)", cursor: "pointer", fontSize: ".8rem", fontWeight: pg === page ? 700 : 400 }}
                >{pg}</button>
              ))}
              <button
                disabled={page >= totalPages}
                onClick={() => { const p = page + 1; setPage(p); fetchPatients(fromDate, toDate, p); }}
                style={{ height: 28, padding: "0 .625rem", border: "1px solid var(--gray-200)", borderRadius: 6, background: page >= totalPages ? "var(--gray-100)" : "#fff", color: page >= totalPages ? "var(--gray-400)" : "var(--gray-700)", cursor: page >= totalPages ? "default" : "pointer", fontSize: ".8rem" }}
              >›</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function resolveIcd10InTSB(cats) {
  if (!cats || !cats.length) return {};
  const result = {};
  for (const cat of cats) {
    const loai = (cat.LoaiNhap || "").trim();
    if (!loai.startsWith("MultiSelect")) continue;
    const codes = (cat.GiaTri || "").split(";").filter(Boolean);
    if (!codes.length) continue;
    const labels = await Promise.all(
      codes.map((code) =>
        getICD10List({ search: code, pageSize: 5 })
          .then(({ items }) => items.find((i) => i.startsWith(code + " -") || i.startsWith(code + " ")) || code)
          .catch(() => code)
      )
    );
    result[cat.Field_AX] = labels;
  }
  return result;
}

function mapTSBToForm(cats) {
  if (!cats || !cats.length) return {};
  const result = {};

  // Reconstruct extra vaccine array từ 2 field đặc biệt
  const extraStatusCat = cats.find((c) => c.Field_AX === "TIEM_CHUNG_CAC_LOAI_KHAC");
  const extraNameCat   = cats.find((c) => c.Field_AX === "TEN_TIEM_CHUNG_CAC_LOAI_KHAC");
  if (extraStatusCat?.GiaTri || extraNameCat?.GiaTri) {
    const statuses = (extraStatusCat?.GiaTri || "").split(";").filter(Boolean);
    const labels   = (extraNameCat?.GiaTri   || "").split(";").filter(Boolean);
    const len = Math.max(statuses.length, labels.length);
    result.teen_tc_extra = Array.from({ length: len }, (_, i) => ({
      id:     Date.now() + i,
      label:  labels[i]   || "",
      status: statuses[i] || "",
    }));
  }

  for (const cat of cats) {
    const key = cat.Field_AX;
    if (!key) continue;
    if (key === "TIEM_CHUNG_CAC_LOAI_KHAC" || key === "TEN_TIEM_CHUNG_CAC_LOAI_KHAC") continue;
    const loai = (cat.LoaiNhap || "").trim();
    const giaTri = cat.GiaTri || "";
    if (loai.startsWith("MultiSelect")) {
      result[key] = giaTri ? giaTri.split(";").filter(Boolean) : [];
    } else {
      result[key] = giaTri;
    }
  }
  return result;
}

function mapCLSToForm(clsItems) {
  const itemId = (i) => i.Id ?? i.ID_CLS ?? null;
  const byCode = (maChiSo) => clsItems.find((i) => i.MA_CHI_SO === maChiSo);
  const r = (maChiSo) => byCode(maChiSo)?.GIA_TRI ?? null;
  const id = (maChiSo) => itemId(byCode(maChiSo) ?? {});
  const khac = byCode("CS011");

  const dkCodes = new Set(CLS_DINH_KY_DATA.map((d) => d.code));
  const seen = new Set();
  const uniqueDkItems = clsItems
    .filter((i) => dkCodes.has(i.TEN_CHI_SO))
    .reduceRight((acc, i) => {
      if (!seen.has(i.TEN_CHI_SO)) { seen.add(i.TEN_CHI_SO); acc.unshift(i); }
      return acc;
    }, []);
  const clsDynamic = uniqueDkItems.map((i) => {
      const meta = CLS_DINH_KY_DATA.find((d) => d.code === i.TEN_CHI_SO);
      return {
        _key:        `${i.TEN_CHI_SO}_${itemId(i) ?? Date.now()}`,
        _existingId: itemId(i),
        code:        i.TEN_CHI_SO,
        name:        meta?.name ?? i.TEN_DICH_VU,
        unit:        meta?.unit ?? "",
        g1:          meta?.g1 ?? "",
        g2:          meta?.g2 ?? "",
        g3:          meta?.g3 ?? "",
        donViDo:     i.DON_VI_DO ?? meta?.unit ?? "",
        giaTri:      i.GIA_TRI ?? "",
        moTa:        i.MO_TA ?? "",
        ketLuan:     i.KET_LUAN ?? "",
      };
    });

  return {
    cls_huyetHoc:          r("CS001"),
    cls_huyetHoc_id:       id("CS001"),
    cls_duongMau:          r("CS002"),
    cls_duongMau_id:       id("CS002"),
    cls_ure:               r("CS003"),
    cls_ure_id:            id("CS003"),
    cls_creatinin:         r("CS004"),
    cls_creatinin_id:      id("CS004"),
    cls_asat:              r("CS005"),
    cls_asat_id:           id("CS005"),
    cls_alat:              r("CS006"),
    cls_alat_id:           id("CS006"),
    cls_nuocTieu:          r("CS007"),
    cls_nuocTieu_id:       id("CS007"),
    cls_nuocTieuKhac:      r("CS008"),
    cls_nuocTieuKhac_id:   id("CS008"),
    cls_cdha:              r("CS009"),
    cls_cdha_id:           id("CS009"),
    cls_sieuAm:            r("CS010"),
    cls_sieuAm_id:         id("CS010"),
    cls_coKhac:            khac ? "Có" : "",
    cls_ketQuaChiTiet:     khac?.GIA_TRI ?? null,
    cls_ketQuaChiTiet_id:  khac ? itemId(khac) : null,
    cls_sig:               khac?.CKDT_KET_QUA_CLS ?? null,
    clsDynamic,
  };
}

export default function TaoHoSo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const editMauPhieu = searchParams.get("mauPhieu");
  const viewOnly = searchParams.get("mode") === "view";
  const [activeTab, setActiveTab] = useState(1);
  const [mauPhieu, setMauPhieu] = useState(() => {
    if (editMauPhieu) return Number(editMauPhieu);
    const saved = localStorage.getItem("taoHoSo_mauPhieu");
    return saved ? Number(saved) : 3;
  });
  const [showPatientPicker, setShowPatientPicker] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
  const [tiepNhanId, setTiepNhanId] = useState(editId || null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [gioiTinhOptions, setGioiTinhOptions] = useState([]);
  const [moiQuanHeOptions, setMoiQuanHeOptions] = useState([]);
  const [danTocOptions, setDanTocOptions] = useState([]);
  const [doiTuongOptions, setDoiTuongOptions] = useState([]);
  const [nguonChiTraOptions, setNguonChiTraOptions] = useState([]);
  const [tinhThanhOptions, setTinhThanhOptions] = useState([]);
  const [phuongXaOptions, setPhuongXaOptions] = useState([]);
  const [phanLoaiSucKhoeOptions, setPhanLoaiSucKhoeOptions] = useState([]);
  const [loaiHinhKCBOptions, setLoaiHinhKCBOptions] = useState([]);
  const [mauPhieuOptions, setMauPhieuOptions] = useState([]);
  const [ngheNghiepOptions, setNgheNghiepOptions] = useState([]);
  const [tienSuCategories, setTienSuCategories] = useState([]);
  const sectionRefs = useRef([]);
  const tabBarRef = useRef(null);
  const isScrollingTo = useRef(false);

  const INITIAL_FORM = {
    soDinhDanh: "",
    hoTen: "",
    gioiTinh: "",
    ngaySinh: "",
    ngayCap: "",
    noiCap: "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
    danToc: "01",
    doiTuongKham: "",
    nhomMau: "",
    nguonChiTra: "",
    tinhThanhPho: "79",
    phuongXa: "",
    soNha: "",
    ngheNghiep: "",
    noiCongTac: "",
    dienThoai: "",
    lyDoKham: "Khám sức khỏe định kỳ",
    loaiHinhKham: "",
    maCskcb: "75407",
    maCskcbGln: "0752636875407",
    maLanKham: "",
    ngayKham: TODAY,
    gioKham: timeNowVN(),
    gdICD10: [],
    kl_icd10: [],
    TSBT_MA_BENH: [],
    TSBT_MA_BENH_THAI_SAN: [],
    TSBT_TEN_THUOC_LIEU_LUONG: "",
    TSBT_TEN_THUOC_THAI_SAN: "",
    clsDynamic: [],
  };
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    getGioiTinhList().then((data) => setGioiTinhOptions(data)).catch(() => {});
    getMoiQuanHeList().then((data) => setMoiQuanHeOptions(data)).catch(() => {});
    getDanTocList().then((data) => setDanTocOptions(data)).catch(() => {});
    getDoiTuongList().then((data) => setDoiTuongOptions(data)).catch(() => {});
    getNguonChiTraList().then((data) => setNguonChiTraOptions(data)).catch(() => {});
    getTinhThanhList().then((data) => setTinhThanhOptions(data)).catch(() => {});
    getPhanLoaiSucKhoeList().then((data) => setPhanLoaiSucKhoeOptions(data)).catch(() => {});
    getLoaiHinhKCBList().then((data) => setLoaiHinhKCBOptions(data)).catch(() => {});
    getLoaiMauKSKList().then((data) => setMauPhieuOptions(data)).catch(() => {});
    getCareerList().then((data) => setNgheNghiepOptions(data)).catch(() => {});
    getTienSuBenhCategories().then((data) => setTienSuCategories(data)).catch(() => {});
  }, []);

  const loadIcd10Options = async (search, page = 1) => {
    return getICD10List({ search, page, pageSize: 20 });
  };

  // ── Load dữ liệu chỉnh sửa: Adult ────────────────────────────────────────
  useEffect(() => {
    if (!editId || mauPhieu === 2) return;
    Promise.all([
      getThongTinHanhChinhById(editId).catch(() => null),
      getKhamTheLuc(editId).catch(() => null),
      getKhamNoiKhoa(editId).catch(() => null),
      getNgoaiKhoa(editId).catch(() => null),
      getDaLieu(editId).catch(() => null),
      getSanPhuKhoa(editId).catch(() => null),
      getKhamMat(editId).catch(() => null),
      getKhamTMH(editId).catch(() => null),
      getKhamRHM(editId).catch(() => null),
      getCLS(editId).catch(() => []),
      getTienSuBenh(editId).catch(() => null),
      getKetLuan(editId).catch(() => null),
    ]).then(([p, tl, nk, ngk, dl, spk, mat, tmh, rhm, clsItems, tsb, kl]) => {
      if (!p) return;
      setForm((prev) => ({
        ...prev,
        soDinhDanh: p.SO_CCCD || prev.soDinhDanh,
        hoTen: p.HO_TEN || prev.hoTen,
        gioiTinh: p.GIOI_TINH ?? prev.gioiTinh,
        ngaySinh: p.NGAY_SINH ? p.NGAY_SINH : prev.ngaySinh,
        ngayCap: p.NGAYCAP_CCCD ? parseYYYYMMDD(p.NGAYCAP_CCCD) : prev.ngayCap,
        noiCap: p.NOICAP_CCCD || prev.noiCap,
        danToc: p.MA_DAN_TOC || prev.danToc,
        nhomMau: p.NHOM_MAU || prev.nhomMau,
        soNha: p.DIA_CHI || prev.soNha,
        tinhThanhPho: p.MATINH_CU_TRU || prev.tinhThanhPho,
        phuongXa: p.MAXA_CU_TRU || prev.phuongXa,
        ngheNghiep: p.MA_NGHE_NGHIEP || prev.ngheNghiep,
        noiCongTac: p.NOI_LAM_VIEC_HOC_TAP || prev.noiCongTac,
        dienThoai: p.DIEN_THOAI || prev.dienThoai,
        lyDoKham: p.LY_DO_VV || prev.lyDoKham,
        doiTuongKham: p.DOI_TUONG || prev.doiTuongKham,
        nguonChiTra: p.NGUON_CHI_TRA ?? prev.nguonChiTra,
        loaiHinhKham: p.MA_LOAI_KCB || prev.loaiHinhKham,
        ngayKham: p.NGAY_VAO ? p.NGAY_VAO : prev.ngayKham,
        maLanKham: p.MA_LK || prev.maLanKham,
        hoTenNguoiDiCung: p.HO_TEN_NGUOI_DI_CUNG || prev.hoTenNguoiDiCung,
        soDinhDanhGiamHo: p.SO_CCCD_NGUOI_DI_CUNG || prev.soDinhDanhGiamHo,
        moiQuanHe: p.MOI_QUAN_HE_VOI_TRE ?? prev.moiQuanHe,
        dienThoaiNguoiDiCung: p.DIEN_THOAI_NGUOI_DI_CUNG || prev.dienThoaiNguoiDiCung,
        // Thể lực
        chieuCao: tl?.CHIEU_CAO ?? prev.chieuCao,
        canNang: tl?.CAN_NANG ?? prev.canNang,
        mach: tl?.MACH ?? prev.mach,
        huyetAp: tl?.HUYET_AP ?? prev.huyetAp,
        phanLoaiTheLuc: tl?.KHAM_THE_LUC_PL ?? prev.phanLoaiTheLuc,
        // Nội khoa
        nk_a: nk?.NOI_KHOA_TUAN_HOAN ?? prev.nk_a,
        nk_a_pl: nk?.NOI_KHOA_TUAN_HOAN_PL ?? prev.nk_a_pl,
        nk_a_ckdt: nk?.CKDT_NOI_KHOA_TUAN_HOAN ?? prev.nk_a_ckdt,
        nk_b: nk?.NOI_KHOA_HO_HAP ?? prev.nk_b,
        nk_b_ckdt: nk?.CKDT_NOI_KHOA_HO_HAP ?? prev.nk_b_ckdt,
        nk_b_pl: nk?.NOI_KHOA_HO_HAP_PL ?? prev.nk_b_pl,
        nk_c: nk?.NOI_KHOA_TIEU_HOA ?? prev.nk_c,
        nk_c_ckdt: nk?.CKDT_NOI_KHOA_TIEU_HOA ?? prev.nk_c_ckdt,
        nk_c_pl: nk?.NOI_KHOA_TIEU_HOA_PL ?? prev.nk_c_pl,
        nk_d: nk?.NOI_KHOA_THAN_TN_SD ?? prev.nk_d,
        nk_d_ckdt: nk?.CKDT_NOI_KHOA_THAN_TN_SD ?? prev.nk_d_ckdt,
        nk_d_pl: nk?.NOI_KHOA_THAN_TN_SD_PL ?? prev.nk_d_pl,
        nk_e: nk?.NOI_KHOA_NOI_TIET ?? prev.nk_e,
        nk_e_ckdt: nk?.CKDT_NOI_KHOA_NOI_TIET ?? prev.nk_e_ckdt,
        nk_e_pl: nk?.NOI_KHOA_NOI_TIET_PL ?? prev.nk_e_pl,
        nk_f: nk?.NOI_KHOA_CO_XUONG_KHOP ?? prev.nk_f,
        nk_f_ckdt: nk?.CKDT_NOI_KHOA_CO_XUONG_KHOP ?? prev.nk_f_ckdt,
        nk_f_pl: nk?.NOI_KHOA_CO_XUONG_KHOP_PL ?? prev.nk_f_pl,
        nk_g: nk?.NOI_KHOA_THAN_KINH ?? prev.nk_g,
        nk_g_ckdt: nk?.CKDT_NOI_KHOA_THAN_KINH ?? prev.nk_g_ckdt,
        nk_g_pl: nk?.NOI_KHOA_THAN_KINH_PL ?? prev.nk_g_pl,
        nk_h: nk?.NOI_KHOA_TAM_THAN ?? prev.nk_h,
        nk_h_ckdt: nk?.CKDT_NOI_KHOA_TAM_THAN ?? prev.nk_h_ckdt,
        nk_h_pl: nk?.NOI_KHOA_TAM_THAN_PL ?? prev.nk_h_pl,
        // Ngoại khoa
        ngk: ngk?.KET_QUA_KHAM_NGOAI_KHOA ?? prev.ngk,
        ngk_ckdt: ngk?.CKDT_KHAM_NGOAI_KHOA ?? prev.ngk_ckdt,
        ngk_pl: ngk?.KHAM_NGOAI_KHOA_PL ?? prev.ngk_pl,
        // Da liễu
        dl: dl?.KET_QUA_KHAM_DA_LIEU ?? prev.dl,
        dl_ckdt: dl?.CKDT_KHAM_DA_LIEU ?? prev.dl_ckdt,
        dl_pl: dl?.KHAM_DA_LIEU_PL ?? prev.dl_pl,
        // Sản phụ khoa
        spk: spk?.KET_QUA_KHAM_SAN_PHU_KHOA ?? prev.spk,
        spk_ckdt: spk?.CKDT_KHAM_SAN_PHU_KHOA ?? prev.spk_ckdt,
        spk_pl: spk?.KHAM_SAN_PHU_KHOA_PL ?? prev.spk_pl,
        // Mắt
        mat_kk_phai: mat?.KHONG_KINH_MAT_PHAI ?? prev.mat_kk_phai,
        mat_kk_trai: mat?.KHONG_KINH_MAT_TRAI ?? prev.mat_kk_trai,
        mat_ck_phai: mat?.CO_KINH_MAT_PHAI   ?? prev.mat_ck_phai,
        mat_ck_trai: mat?.CO_KINH_MAT_TRAI   ?? prev.mat_ck_trai,
        mat_benh:    mat?.BENH_KHAC_MAT      ?? prev.mat_benh,
        mat_ckdt:    mat?.CKDT_KHAM_MAT      ?? prev.mat_ckdt,
        mat_pl:      mat?.KHAM_MAT_PL        ?? prev.mat_pl,
        // Tai Mũi Họng
        tmh_tt_trai: tmh?.TAI_TRAI_NOI_THUONG  ?? prev.tmh_tt_trai,
        tmh_th_trai: tmh?.TAI_TRAI_NOI_THAM    ?? prev.tmh_th_trai,
        tmh_tt_phai: tmh?.TAI_PHAI_NOI_THUONG  ?? prev.tmh_tt_phai,
        tmh_th_phai: tmh?.TAI_PHAI_NOI_THAM    ?? prev.tmh_th_phai,
        tmh_benh:    tmh?.BENH_TAI_MUI_HONG    ?? prev.tmh_benh,
        tmh_ckdt:    tmh?.CKDT_KHAM_TAI_MUI_HONG ?? prev.tmh_ckdt,
        tmh_pl:      tmh?.KHAM_TAI_MUI_HONG_PL ?? prev.tmh_pl,
        // Răng Hàm Mặt
        rhm_hamTren: rhm?.HAM_TREN              ?? prev.rhm_hamTren,
        rhm_hamDuoi: rhm?.HAM_DUOI              ?? prev.rhm_hamDuoi,
        rhm_ketQua:  rhm?.BENH_RANG_HAM_MAT     ?? prev.rhm_ketQua,
        rhm_benh:    rhm?.BENH_KHAC_RANG_HAM_MAT ?? prev.rhm_benh,
        rhm_ckdt:    rhm?.CKDT_KHAM_RANG_HAM_MAT ?? prev.rhm_ckdt,
        rhm_pl:      rhm?.KHAM_RANG_HAM_MAT_PL  ?? prev.rhm_pl,
        // CLS
        ...(clsItems.length > 0 && mapCLSToForm(clsItems)),
        ...(tsb && mapTSBToForm(tsb)),
        // Kết luận
        kl_icd10:     kl?.KET_LUAN_BENH_FULL ? kl.KET_LUAN_BENH_FULL.split(";").filter(Boolean) : prev.kl_icd10,
        kl_tinhTrang: kl?.GHI_RO_VAN_DE_SUC_KHOE ?? prev.kl_tinhTrang,
        kl_phanLoai:  kl?.PHAN_LOAI_SK  ?? prev.kl_phanLoai,
        kl_bacsi:     kl?.CKS_NGUOI_KET_LUAN ?? prev.kl_bacsi,
        kl_cskcb:     kl?.CKS_BENH_VIEN      ?? prev.kl_cskcb,
      }));
      if (tsb) resolveIcd10InTSB(tsb).then((resolved) => { if (Object.keys(resolved).length) setForm((prev) => ({ ...prev, ...resolved })); });
    });
  }, [editId]);

  // ── Load dữ liệu chỉnh sửa: Teen ──────────────────────────────────────────
  useEffect(() => {
    if (!editId || mauPhieu !== 2) return;
    Promise.all([
      getThongTinHanhChinhById(editId).catch(() => null),
      getTeenTheLuc(editId).catch(() => null),
      getTeenNhiKhoa(editId).catch(() => null),
      getTeenMat(editId).catch(() => null),
      getTeenTMH(editId).catch(() => null),
      getTeenRHM(editId).catch(() => null),
      getCLS(editId).catch(() => []),
      getKetLuan(editId).catch(() => null),
      getTienSuBenh(editId).catch(() => null),
    ]).then(([p, tl, nk, mat, tmh, rhm, clsItems, kl, tsb]) => {
      if (!p) return;
      setForm((prev) => ({
        ...prev,
        soDinhDanh: p.SO_CCCD || prev.soDinhDanh,
        hoTen: p.HO_TEN || prev.hoTen,
        gioiTinh: p.GIOI_TINH ?? prev.gioiTinh,
        ngaySinh: p.NGAY_SINH ? p.NGAY_SINH : prev.ngaySinh,
        ngayCap: p.NGAYCAP_CCCD ? parseYYYYMMDD(p.NGAYCAP_CCCD) : prev.ngayCap,
        noiCap: p.NOICAP_CCCD || prev.noiCap,
        danToc: p.MA_DAN_TOC || prev.danToc,
        nhomMau: p.NHOM_MAU || prev.nhomMau,
        soNha: p.DIA_CHI || prev.soNha,
        tinhThanhPho: p.MATINH_CU_TRU || prev.tinhThanhPho,
        phuongXa: p.MAXA_CU_TRU || prev.phuongXa,
        dienThoai: p.DIEN_THOAI || prev.dienThoai,
        lyDoKham: p.LY_DO_VV || prev.lyDoKham,
        doiTuongKham: p.DOI_TUONG || prev.doiTuongKham,
        nguonChiTra: p.NGUON_CHI_TRA ?? prev.nguonChiTra,
        loaiHinhKham: p.MA_LOAI_KCB || prev.loaiHinhKham,
        ngayKham: p.NGAY_VAO ? p.NGAY_VAO : prev.ngayKham,
        maLanKham: p.MA_LK || prev.maLanKham,
        hoTenNguoiDiCung: p.HO_TEN_NGUOI_DI_CUNG || prev.hoTenNguoiDiCung,
        soDinhDanhGiamHo: p.SO_CCCD_NGUOI_DI_CUNG || prev.soDinhDanhGiamHo,
        soDienThoaiGiamHo: p.DIEN_THOAI_NGUOI_DI_CUNG || prev.soDienThoaiGiamHo,
        // Thể lực
        chieuCao:       tl?.CHIEU_CAO        ?? prev.chieuCao,
        canNang:        tl?.CAN_NANG         ?? prev.canNang,
        mach:           tl?.MACH             ?? prev.mach,
        huyetAp:        tl?.HUYET_AP         ?? prev.huyetAp,
        phanLoaiTheLuc: tl?.KHAM_THE_LUC_PL  ?? prev.phanLoaiTheLuc,
        // Nhi khoa
        teen_nk_a:       nk?.NHI_KHOA_TUAN_HOAN       ?? prev.teen_nk_a,
        teen_nk_a_ckdt:  nk?.CKDT_NHI_KHOA_TUAN_HOAN  ?? prev.teen_nk_a_ckdt,
        teen_nk_b:       nk?.NHI_KHOA_HO_HAP           ?? prev.teen_nk_b,
        teen_nk_b_ckdt:  nk?.CKDT_NHI_KHOA_HO_HAP      ?? prev.teen_nk_b_ckdt,
        teen_nk_c:       nk?.NHI_KHOA_TIEU_HOA         ?? prev.teen_nk_c,
        teen_nk_c_ckdt:  nk?.CKDT_NHI_KHOA_TIEU_HOA    ?? prev.teen_nk_c_ckdt,
        teen_nk_d:       nk?.NHI_KHOA_THAN_TN_SD       ?? prev.teen_nk_d,
        teen_nk_d_ckdt:  nk?.CKDT_NHI_KHOA_THAN_TN_SD  ?? prev.teen_nk_d_ckdt,
        teen_nk_g:       nk?.NHI_KHOA_THAN_KINH        ?? prev.teen_nk_g,
        teen_nk_g_ckdt:  nk?.CKDT_NHI_KHOA_THAN_KINH   ?? prev.teen_nk_g_ckdt,
        teen_nk_h:       nk?.NHI_KHOA_TAM_THAN         ?? prev.teen_nk_h,
        teen_nk_h_ckdt:  nk?.CKDT_NHI_KHOA_TAM_THAN    ?? prev.teen_nk_h_ckdt,
        teen_nk_lsk:     nk?.NHI_KHOA_LAM_SANG_KHAC    ?? prev.teen_nk_lsk,
        teen_nk_lsk_ckdt: nk?.CKDT_NHI_KHOA_LAM_SANG_KHAC ?? prev.teen_nk_lsk_ckdt,
        // Mắt
        teen_mat_khongKinhPhai: mat?.KHONG_KINH_MAT_PHAI ?? prev.teen_mat_khongKinhPhai,
        teen_mat_khongKinhTrai: mat?.KHONG_KINH_MAT_TRAI ?? prev.teen_mat_khongKinhTrai,
        teen_mat_coKinhPhai:    mat?.CO_KINH_MAT_PHAI    ?? prev.teen_mat_coKinhPhai,
        teen_mat_coKinhTrai:    mat?.CO_KINH_MAT_TRAI    ?? prev.teen_mat_coKinhTrai,
        teen_mat_benh:          mat?.BENH_KHAC_MAT       ?? prev.teen_mat_benh,
        teen_mat_ckdt:          mat?.CKDT_KHAM_MAT       ?? prev.teen_mat_ckdt,
        // Tai Mũi Họng
        teen_tmh_taiTraiThuong: tmh?.TAI_TRAI_NOI_THUONG    ?? prev.teen_tmh_taiTraiThuong,
        teen_tmh_taiTraiTham:   tmh?.TAI_TRAI_NOI_THAM      ?? prev.teen_tmh_taiTraiTham,
        teen_tmh_taiPhaiThuong: tmh?.TAI_PHAI_NOI_THUONG    ?? prev.teen_tmh_taiPhaiThuong,
        teen_tmh_taiPhaiTham:   tmh?.TAI_PHAI_NOI_THAM      ?? prev.teen_tmh_taiPhaiTham,
        teen_tmh_benh:          tmh?.BENH_TAI_MUI_HONG      ?? prev.teen_tmh_benh,
        teen_tmh_ckdt:          tmh?.CKDT_KHAM_TAI_MUI_HONG ?? prev.teen_tmh_ckdt,
        // Răng Hàm Mặt
        teen_rhm_hamTren: rhm?.HAM_TREN              ?? prev.teen_rhm_hamTren,
        teen_rhm_hamDuoi: rhm?.HAM_DUOI              ?? prev.teen_rhm_hamDuoi,
        teen_rhm_benh:    rhm?.BENH_KHAC_RANG_HAM_MAT ?? prev.teen_rhm_benh,
        teen_rhm_ckdt:    rhm?.CKDT_KHAM_RANG_HAM_MAT ?? prev.teen_rhm_ckdt,
        // CLS
        ...(clsItems.length > 0 && mapCLSToForm(clsItems)),
        // Tiền sử bệnh
        ...(tsb && mapTSBToForm(tsb)),
        // Kết luận
        kl_icd10:     kl?.KET_LUAN_BENH_FULL ? kl.KET_LUAN_BENH_FULL.split(";").filter(Boolean) : prev.kl_icd10,
        kl_tinhTrang: kl?.GHI_RO_VAN_DE_SUC_KHOE ?? prev.kl_tinhTrang,
        kl_phanLoai:  kl?.PHAN_LOAI_SK  ?? prev.kl_phanLoai,
        kl_bacsi:     kl?.CKS_NGUOI_KET_LUAN ?? prev.kl_bacsi,
        kl_cskcb:     kl?.CKS_BENH_VIEN      ?? prev.kl_cskcb,
      }));
      if (tsb) resolveIcd10InTSB(tsb).then((resolved) => { if (Object.keys(resolved).length) setForm((prev) => ({ ...prev, ...resolved })); });
    });
  }, [editId]);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingTo.current) {
            setActiveTab(i + 1);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, [mauPhieu]);

  useEffect(() => {
    if (!tabBarRef.current) return;
    const btn = tabBarRef.current.querySelector(`[data-tab="${activeTab}"]`);
    if (btn)
      btn.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
  }, [activeTab]);

  useEffect(() => {
    if (!form.tinhThanhPho) { setPhuongXaOptions([]); return; }
    getPhuongXaList(form.tinhThanhPho).then((data) => {
      setPhuongXaOptions(data);
      setForm((prev) => {
        const exists = data.some((p) => p.MaPhuongXa === prev.phuongXa);
        return exists ? prev : { ...prev, phuongXa: "" };
      });
    }).catch(() => {});
  }, [form.tinhThanhPho]);

  const isChild = mauPhieu === 1;
  const isTeen = mauPhieu === 2;

  const scrollToSection = (tabId) => {
    const el = sectionRefs.current[tabId - 1];
    if (!el) return;
    isScrollingTo.current = true;
    setActiveTab(tabId);
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      isScrollingTo.current = false;
    }, 800);
  };

  return (
    <div
      className="tao-ho-so"
      style={{
        minHeight: "100vh",
        background: "var(--gray-50, #f9fafb)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "var(--gray-100)",
          borderBottom: "1px solid var(--gray-100, #f3f4f6)",
          boxShadow: "0 1px 6px rgba(0,0,0,.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: ".875rem 1.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/ho-so-ksk")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "var(--radius-md, 8px)",
              display: "flex",
              alignItems: "center",
              color: "var(--gray-700, #374151)",
              flexShrink: 0,
            }}
            title="Quay lại"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--gray-900, #111827)",
                  whiteSpace: "nowrap",
                }}
              >
                Nhập tay hồ sơ khám sức khỏe
              </span>
              <span
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  fontSize: ".72rem",
                  fontWeight: 600,
                  padding: ".2em .6em",
                  borderRadius: 99,
                  border: "1px solid #bfdbfe",
                  whiteSpace: "nowrap",
                }}
              >
                {isChild ? "KSK_DUOI_6 (Dưới 6) · v1" : isTeen ? "KSK_6_DEN_DUOI_18 (6 đến dưới 18) · v1" : "KSK_TREN_18 (Trên 18) · v1"}
              </span>
            </div>
            <div
              style={{
                fontSize: ".78rem",
                color: "var(--gray-500, #6b7280)",
                marginTop: ".15rem",
              }}
            >
              CSYT: 75407 — Vui lòng chọn
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".625rem",
              flexShrink: 0,
              flexWrap: "wrap",
            }}
          >
            <label
              style={{
                fontSize: ".78rem",
                fontWeight: 600,
                color: "var(--gray-700, #374151)",
                whiteSpace: "nowrap",
              }}
            >
              Chọn mẫu:
            </label>
            <select
              value={mauPhieu}
              disabled={viewOnly}
              onChange={(e) => {
                const val = Number(e.target.value);
                localStorage.setItem("taoHoSo_mauPhieu", val);
                setMauPhieu(val);
                setErrors({});
                setForm({ ...INITIAL_FORM, ngayKham: todayVN(), gioKham: timeNowVN() });
                setTiepNhanId(null);
              }}
              style={{
                height: "36px",
                border: "1.5px solid var(--gray-200, #e5e7eb)",
                borderRadius: "var(--radius-md, 8px)",
                padding: "0 .625rem",
                fontSize: ".8rem",
                outline: "none",
                maxWidth: "260px",
                fontFamily: "var(--font-body)",
                background: "var(--gray-100)",
                color: "var(--gray-800, #1f2937)",
              }}
            >
              {mauPhieuOptions.map((opt) => (
                <option key={opt.Id} value={opt.Id}>
                  {opt.Name}
                </option>
              ))}
            </select>


            {viewOnly && (
              <button
                onClick={() => window.print()}
                style={{
                  height: "36px",
                  padding: "0 1.1rem",
                  background: "var(--primary, #0067AC)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-md, 8px)",
                  fontWeight: 600,
                  fontSize: ".85rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                }}
              >
                <i className="bi bi-printer-fill" /> In phiếu khám
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", background: "var(--gray-100)", borderBottom: "1px solid var(--gray-100, #f3f4f6)" }}>
          <div
            ref={tabBarRef}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: ".375rem",
              overflowX: "auto",
              flex: 1,
              padding: ".625rem 1.5rem",
              paddingBottom: ".375rem",
              scrollbarWidth: "thin",
              scrollbarColor: "var(--gray-400) transparent",
            }}
          >
            {(isChild ? TABS_CHILD : isTeen ? TABS_TEEN : TABS).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  style={{
                    flexShrink: 0,
                    height: "34px",
                    padding: "0 .875rem",
                    borderRadius: 99,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: ".8rem",
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? "#2563eb" : "var(--gray-100, #f3f4f6)",
                    color: isActive ? "#fff" : "var(--gray-700, #374151)",
                    display: "flex",
                    alignItems: "center",
                    gap: ".3rem",
                    transition: "background .15s, color .15s",
                  }}
                >
                  {tab.icon && <i className={tab.icon} style={{ fontSize: ".85rem" }} />}
                  {tab.label}
                  {tab.badge && (
                    <span
                      style={{
                        marginLeft: ".2rem",
                        fontSize: ".7rem",
                        padding: ".1em .45em",
                        borderRadius: 99,
                        background: isActive ? "rgba(255,255,255,.28)" : "var(--gray-300, #d1d5db)",
                        color: isActive ? "#fff" : "var(--gray-600, #4b5563)",
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {!viewOnly && (
            <div style={{ flexShrink: 0, padding: ".5rem 1rem .375rem", display: "flex", gap: ".4rem" }}>
              <button
                onClick={() => setShowPatientPicker(true)}
                title="Chọn bệnh nhân"
                style={{
                  width: "34px",
                  height: "34px",
                  padding: 0,
                  background: "var(--primary, #0067AC)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: ".95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-person-lines-fill" />
              </button>
              <button
                disabled={saving}
                title={saving ? "Đang lưu..." : "Lưu hồ sơ"}
                onClick={async () => {
                  const commonRequired = {
                    soDinhDanh:   !form.soDinhDanh,
                    hoTen:        !form.hoTen,
                    gioiTinh:     !form.gioiTinh,
                    ngaySinh:     !form.ngaySinh,
                    danToc:       !form.danToc,
                    tinhThanhPho: !form.tinhThanhPho,
                    phuongXa:     !form.phuongXa,
                    soNha:        !form.soNha,
                    doiTuongKham: !form.doiTuongKham,
                    nguonChiTra:  !form.nguonChiTra,
                    lyDoKham:     !form.lyDoKham,
                    loaiHinhKham: !form.loaiHinhKham,
                  };
                  const newErrors = isTeen || isChild
                    ? { ...commonRequired, loaiHinhKham: false }
                    : { ...commonRequired, ngheNghiep: !form.ngheNghiep };
                  setErrors(newErrors);
                  if (Object.values(newErrors).some(Boolean)) return;
                  setSaving(true);
                  try {
                    if (!isChild) {
                      const toDelete = (form.clsDynamic || []).filter((i) => i._toDelete && i._existingId);
                      const toResave = (form.clsDynamic || []).filter((i) => !i._toDelete && i._existingId && i.giaTri);
                      await Promise.all([...toDelete, ...toResave].map((i) => api.delete(`/delete-kham-can-lam-sang?Id=${i._existingId}`).catch(() => {})));
                    }
                    const cats = tienSuCategories.filter((c) => c.td_loaimau_kskid === mauPhieu);
                    if (isTeen) {
                      await saveTeenTiepNhan(form, mauPhieu, tiepNhanId || null, tienSuCategories.filter((c) => c.td_loaimau_kskid === 2));
                    } else if (isChild) {
                      await saveChildTiepNhan(form, mauPhieu, tiepNhanId || null, tienSuCategories.filter((c) => c.td_loaimau_kskid === mauPhieu));
                    } else {
                      await saveAdultTiepNhan(form, mauPhieu, tiepNhanId || null, cats);
                    }
                    setForm({ ...INITIAL_FORM, ngayKham: todayVN(), gioKham: timeNowVN() });
                    setTiepNhanId(null);
                    setErrors({});
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } catch (err) {
                    console.error("[Save error]", err);
                  } finally {
                    setSaving(false);
                  }
                }}
                style={{
                  width: "34px",
                  height: "34px",
                  padding: 0,
                  background: saving ? "#86efac" : "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: ".95rem",
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .15s",
                }}
              >
                {saving
                  ? <i className="bi bi-hourglass-split" style={{ animation: "spin 1s linear infinite" }} />
                  : <i className="bi bi-floppy-fill" />
                }
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "1.5rem",
          paddingBottom: "20vh",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          pointerEvents: viewOnly ? "none" : undefined,
          userSelect: viewOnly ? "none" : undefined,
          opacity: viewOnly ? 0.6 : undefined,
          filter: viewOnly ? "grayscale(30%)" : undefined,
        }}
      >
        <div ref={(el) => (sectionRefs.current[0] = el)}>
          {isChild
            ? <Tab1ChildContent form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} moiQuanHeOptions={moiQuanHeOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} loadIcd10={loadIcd10Options} tienSuCats={tienSuCategories.filter((c) => c.td_loaimau_kskid === 1).sort((a, b) => a.TT - b.TT)} errors={errors} />
            : isTeen
            ? <Tab1TeenContent form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} errors={errors} />
            : <Tab1Content form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} ngheNghiepOptions={ngheNghiepOptions} errors={errors} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[1] = el)}>
          {isTeen
            ? <Tab2TeenContent form={form} setForm={setForm} loaiHinhKCBOptions={loaiHinhKCBOptions} />
            : <Tab2Content form={form} setForm={setForm} subtitle={isChild ? "" : undefined} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[2] = el)}>
          {isChild
            ? <Tab3ChildContent form={form} setForm={setForm} tiepNhanId={tiepNhanId} />
            : isTeen
            ? <Tab3TeenContent form={form} setForm={setForm} loadIcd10={loadIcd10Options}
                giadinhCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 2 && c.td_loaimau_kskid === 2)}
                tiemChungCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 1 && c.td_loaimau_kskid === 2).sort((a, b) => a.TT - b.TT)}
                sanKhoaCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 3 && c.td_loaimau_kskid === 2).sort((a, b) => a.TT - b.TT)}
                banthanCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 4 && c.td_loaimau_kskid === 2).sort((a, b) => a.TT - b.TT)}
                dieuTriCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 5 && c.td_loaimau_kskid === 2).sort((a, b) => a.TT - b.TT)}
              />
            : <Tab3Content form={form} setForm={setForm} loadIcd10={loadIcd10Options}
                giadinhCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 2 && c.td_loaimau_kskid === mauPhieu)}
                banthanCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 1 && c.td_loaimau_kskid === mauPhieu).sort((a, b) => a.TT - b.TT)}
                khacCats={tienSuCategories.filter((c) => c.td_nhom_kskid === 4 && c.td_loaimau_kskid === mauPhieu).sort((a, b) => a.TT - b.TT)}
              />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[3] = el)}>
          {isChild
            ? <Tab4ChildContent form={form} setForm={setForm} tiepNhanId={tiepNhanId} />
            : <Tab4Content form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[4] = el)}>
          {isChild
            ? <Tab5ChildContent form={form} setForm={setForm} tiepNhanId={tiepNhanId} />
            : isTeen
            ? <Tab5TeenContent form={form} setForm={setForm} />
            : <Tab5Content form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[5] = el)}>
          {isChild
            ? <Tab6ChildContent form={form} setForm={setForm} tiepNhanId={tiepNhanId} />
            : <Tab6Content form={form} setForm={setForm} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[6] = el)}>
          {isChild
            ? <Tab7ChildContent form={form} setForm={setForm} tiepNhanId={tiepNhanId} />
            : <Tab7Content form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} loadIcd10={loadIcd10Options} errors={errors} />
          }
        </div>
        {isChild && (
          <div ref={(el) => (sectionRefs.current[7] = el)}>
            <Tab8ChildContent form={form} setForm={setForm} loadIcd10={loadIcd10Options} tiepNhanId={tiepNhanId} />
          </div>
        )}
      </div>

      {showPatientPicker && (
        <PatientPickerModal

          mauPhieu={mauPhieu}
          gioiTinhOptions={gioiTinhOptions}
          onClose={() => setShowPatientPicker(false)}
          onSelect={(p) => {
            setForm(() => ({
              ...INITIAL_FORM,
              soDinhDanh: p.SO_CCCD || "",
              hoTen: p.HO_TEN || "",
              gioiTinh: p.GIOI_TINH ?? "",
              ngaySinh: p.NGAY_SINH ? p.NGAY_SINH.slice(0, 10) : "",
              ngheNghiep: p.MA_NGHE_NGHIEP || "",
              noiCongTac: p.NOI_LAM_VIEC_HOC_TAP || "",
              dienThoai: p.DIEN_THOAI || "",
              tinhThanhPho: p.MATINH_CU_TRU || "79",
              phuongXa: p.MAXA_CU_TRU || "",
              danToc: p.MA_DAN_TOC || "01",
              ngayCap: p.NGAYCAP_CCCD ? parseYYYYMMDD(p.NGAYCAP_CCCD) : "",
              noiCap: p.NOICAP_CCCD || "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
              nhomMau: p.NHOM_MAU || "",
              sinhNon: p.SINH_NON ?? "",
              tuanThaiKhiSinh: p.TUAN_THAI || "",
              soNha: p.DIA_CHI || "",
              hoTenNguoiDiCung: p.HO_TEN_NGUOI_DI_CUNG || "",
              soDinhDanhGiamHo: p.SO_CCCD_NGUOI_DI_CUNG || "",
              moiQuanHe: p.MOI_QUAN_HE_VOI_TRE ?? "",
              dienThoaiNguoiDiCung: p.DIEN_THOAI_NGUOI_DI_CUNG || "",
              soDienThoaiGiamHo: p.DIEN_THOAI_NGUOI_DI_CUNG || "",
              lyDoKham: p.LY_DO_VV || "Khám sức khỏe định kỳ",
              doiTuongKham: p.DOI_TUONG || "",
              nguonChiTra: p.NGUON_CHI_TRA ?? "",
              loaiHinhKham: p.MA_LOAI_KCB || "",
              ngayKham: p.NGAY_VAO ? p.NGAY_VAO.slice(0, 10) : TODAY,
              maLanKham: p.MA_LK || "",
            }));
            setErrors({});
            const pid = p.Id ?? p.KSKCD_TiepNhanId ?? null;
            setTiepNhanId(pid);
            if (pid) {
              if (isTeen) {
                Promise.all([
                  getTeenTheLuc(pid).catch(() => null),
                  getTeenNhiKhoa(pid).catch(() => null),
                  getTeenMat(pid).catch(() => null),
                  getTeenTMH(pid).catch(() => null),
                  getTeenRHM(pid).catch(() => null),
                  getCLS(pid).catch(() => []),
                  getKetLuan(pid).catch(() => null),
                  getTienSuBenh(pid).catch(() => null),
                ]).then(([tl, nk, mat, tmh, rhm, clsItems, kl, tsb]) => {
                  setForm((prev) => ({
                    ...prev,
                    chieuCao:       tl?.CHIEU_CAO       ?? null,
                    canNang:        tl?.CAN_NANG        ?? null,
                    mach:           tl?.MACH            ?? null,
                    huyetAp:        tl?.HUYET_AP        ?? null,
                    phanLoaiTheLuc: tl?.KHAM_THE_LUC_PL ?? null,
                    teen_nk_a:        nk?.NHI_KHOA_TUAN_HOAN          ?? null,
                    teen_nk_a_ckdt:   nk?.CKDT_NHI_KHOA_TUAN_HOAN     ?? null,
                    teen_nk_b:        nk?.NHI_KHOA_HO_HAP              ?? null,
                    teen_nk_b_ckdt:   nk?.CKDT_NHI_KHOA_HO_HAP         ?? null,
                    teen_nk_c:        nk?.NHI_KHOA_TIEU_HOA            ?? null,
                    teen_nk_c_ckdt:   nk?.CKDT_NHI_KHOA_TIEU_HOA       ?? null,
                    teen_nk_d:        nk?.NHI_KHOA_THAN_TN_SD          ?? null,
                    teen_nk_d_ckdt:   nk?.CKDT_NHI_KHOA_THAN_TN_SD     ?? null,
                    teen_nk_g:        nk?.NHI_KHOA_THAN_KINH           ?? null,
                    teen_nk_g_ckdt:   nk?.CKDT_NHI_KHOA_THAN_KINH      ?? null,
                    teen_nk_h:        nk?.NHI_KHOA_TAM_THAN            ?? null,
                    teen_nk_h_ckdt:   nk?.CKDT_NHI_KHOA_TAM_THAN       ?? null,
                    teen_nk_lsk:      nk?.NHI_KHOA_LAM_SANG_KHAC       ?? null,
                    teen_nk_lsk_ckdt: nk?.CKDT_NHI_KHOA_LAM_SANG_KHAC  ?? null,
                    teen_mat_khongKinhPhai: mat?.KHONG_KINH_MAT_PHAI ?? null,
                    teen_mat_khongKinhTrai: mat?.KHONG_KINH_MAT_TRAI ?? null,
                    teen_mat_coKinhPhai:    mat?.CO_KINH_MAT_PHAI    ?? null,
                    teen_mat_coKinhTrai:    mat?.CO_KINH_MAT_TRAI    ?? null,
                    teen_mat_benh:          mat?.BENH_KHAC_MAT       ?? null,
                    teen_mat_ckdt:          mat?.CKDT_KHAM_MAT       ?? null,
                    teen_tmh_taiTraiThuong: tmh?.TAI_TRAI_NOI_THUONG    ?? null,
                    teen_tmh_taiTraiTham:   tmh?.TAI_TRAI_NOI_THAM      ?? null,
                    teen_tmh_taiPhaiThuong: tmh?.TAI_PHAI_NOI_THUONG    ?? null,
                    teen_tmh_taiPhaiTham:   tmh?.TAI_PHAI_NOI_THAM      ?? null,
                    teen_tmh_benh:          tmh?.BENH_TAI_MUI_HONG      ?? null,
                    teen_tmh_ckdt:          tmh?.CKDT_KHAM_TAI_MUI_HONG ?? null,
                    teen_rhm_hamTren: rhm?.HAM_TREN               ?? null,
                    teen_rhm_hamDuoi: rhm?.HAM_DUOI               ?? null,
                    teen_rhm_benh:    rhm?.BENH_KHAC_RANG_HAM_MAT ?? null,
                    teen_rhm_ckdt:    rhm?.CKDT_KHAM_RANG_HAM_MAT ?? null,
                    // CLS
                    ...(clsItems.length > 0 && mapCLSToForm(clsItems)),
                    // Tiền sử bệnh
                    ...(tsb ? mapTSBToForm(tsb) : {}),
                    // Kết luận
                    kl_icd10:     kl?.KET_LUAN_BENH_FULL ? kl.KET_LUAN_BENH_FULL.split(";").filter(Boolean) : null,
                    kl_tinhTrang: kl?.GHI_RO_VAN_DE_SUC_KHOE ?? null,
                    kl_phanLoai:  kl?.PHAN_LOAI_SK  ?? null,
                    kl_bacsi:     kl?.CKS_NGUOI_KET_LUAN ?? null,
                    kl_cskcb:     kl?.CKS_BENH_VIEN      ?? null,
                  }));
                  if (tsb) resolveIcd10InTSB(tsb).then((resolved) => { if (Object.keys(resolved).length) setForm((prev) => ({ ...prev, ...resolved })); });
                });
              } else {
                Promise.all([
                  getKhamTheLuc(pid).catch(() => null),
                  getKhamNoiKhoa(pid).catch(() => null),
                  getNgoaiKhoa(pid).catch(() => null),
                  getDaLieu(pid).catch(() => null),
                  getSanPhuKhoa(pid).catch(() => null),
                  getKhamMat(pid).catch(() => null),
                  getKhamTMH(pid).catch(() => null),
                  getKhamRHM(pid).catch(() => null),
                  getCLS(pid).catch(() => []),
                  getTienSuBenh(pid).catch(() => null),
                  getKetLuan(pid).catch(() => null),
                ]).then(([tl, nk, ngk, dl, spk, mat, tmh, rhm, clsItems, tsb, kl]) => {
                  setForm((prev) => ({
                    ...prev,
                    chieuCao: tl?.CHIEU_CAO ?? null,
                    canNang: tl?.CAN_NANG ?? null,
                    mach: tl?.MACH ?? null,
                    huyetAp: tl?.HUYET_AP ?? null,
                    phanLoaiTheLuc: tl?.KHAM_THE_LUC_PL ?? null,
                    nk_a: nk?.NOI_KHOA_TUAN_HOAN ?? null,
                    nk_a_pl: nk?.NOI_KHOA_TUAN_HOAN_PL ?? null,
                    nk_a_ckdt: nk?.CKDT_NOI_KHOA_TUAN_HOAN ?? null,
                    nk_b: nk?.NOI_KHOA_HO_HAP ?? null,
                    nk_b_ckdt: nk?.CKDT_NOI_KHOA_HO_HAP ?? null,
                    nk_b_pl: nk?.NOI_KHOA_HO_HAP_PL ?? null,
                    nk_c: nk?.NOI_KHOA_TIEU_HOA ?? null,
                    nk_c_ckdt: nk?.CKDT_NOI_KHOA_TIEU_HOA ?? null,
                    nk_c_pl: nk?.NOI_KHOA_TIEU_HOA_PL ?? null,
                    nk_d: nk?.NOI_KHOA_THAN_TN_SD ?? null,
                    nk_d_ckdt: nk?.CKDT_NOI_KHOA_THAN_TN_SD ?? null,
                    nk_d_pl: nk?.NOI_KHOA_THAN_TN_SD_PL ?? null,
                    nk_e: nk?.NOI_KHOA_NOI_TIET ?? null,
                    nk_e_ckdt: nk?.CKDT_NOI_KHOA_NOI_TIET ?? null,
                    nk_e_pl: nk?.NOI_KHOA_NOI_TIET_PL ?? null,
                    nk_f: nk?.NOI_KHOA_CO_XUONG_KHOP ?? null,
                    nk_f_ckdt: nk?.CKDT_NOI_KHOA_CO_XUONG_KHOP ?? null,
                    nk_f_pl: nk?.NOI_KHOA_CO_XUONG_KHOP_PL ?? null,
                    nk_g: nk?.NOI_KHOA_THAN_KINH ?? null,
                    nk_g_ckdt: nk?.CKDT_NOI_KHOA_THAN_KINH ?? null,
                    nk_g_pl: nk?.NOI_KHOA_THAN_KINH_PL ?? null,
                    nk_h: nk?.NOI_KHOA_TAM_THAN ?? null,
                    nk_h_ckdt: nk?.CKDT_NOI_KHOA_TAM_THAN ?? null,
                    nk_h_pl: nk?.NOI_KHOA_TAM_THAN_PL ?? null,
                    ngk: ngk?.KET_QUA_KHAM_NGOAI_KHOA ?? null,
                    ngk_ckdt: ngk?.CKDT_KHAM_NGOAI_KHOA ?? null,
                    ngk_pl: ngk?.KHAM_NGOAI_KHOA_PL ?? null,
                    dl: dl?.KET_QUA_KHAM_DA_LIEU ?? null,
                    dl_ckdt: dl?.CKDT_KHAM_DA_LIEU ?? null,
                    dl_pl: dl?.KHAM_DA_LIEU_PL ?? null,
                    spk: spk?.KET_QUA_KHAM_SAN_PHU_KHOA ?? null,
                    spk_ckdt: spk?.CKDT_KHAM_SAN_PHU_KHOA ?? null,
                    spk_pl: spk?.KHAM_SAN_PHU_KHOA_PL ?? null,
                    mat_kk_phai: mat?.KHONG_KINH_MAT_PHAI ?? null,
                    mat_kk_trai: mat?.KHONG_KINH_MAT_TRAI ?? null,
                    mat_ck_phai: mat?.CO_KINH_MAT_PHAI   ?? null,
                    mat_ck_trai: mat?.CO_KINH_MAT_TRAI   ?? null,
                    mat_benh:    mat?.BENH_KHAC_MAT      ?? null,
                    mat_ckdt:    mat?.CKDT_KHAM_MAT      ?? null,
                    mat_pl:      mat?.KHAM_MAT_PL        ?? null,
                    tmh_tt_trai: tmh?.TAI_TRAI_NOI_THUONG  ?? null,
                    tmh_th_trai: tmh?.TAI_TRAI_NOI_THAM    ?? null,
                    tmh_tt_phai: tmh?.TAI_PHAI_NOI_THUONG  ?? null,
                    tmh_th_phai: tmh?.TAI_PHAI_NOI_THAM    ?? null,
                    tmh_benh:    tmh?.BENH_TAI_MUI_HONG    ?? null,
                    tmh_ckdt:    tmh?.CKDT_KHAM_TAI_MUI_HONG ?? null,
                    tmh_pl:      tmh?.KHAM_TAI_MUI_HONG_PL ?? null,
                    rhm_hamTren: rhm?.HAM_TREN               ?? null,
                    rhm_hamDuoi: rhm?.HAM_DUOI               ?? null,
                    rhm_ketQua:  rhm?.BENH_RANG_HAM_MAT      ?? null,
                    rhm_benh:    rhm?.BENH_KHAC_RANG_HAM_MAT ?? null,
                    rhm_ckdt:    rhm?.CKDT_KHAM_RANG_HAM_MAT ?? null,
                    rhm_pl:      rhm?.KHAM_RANG_HAM_MAT_PL   ?? null,
                    ...(clsItems.length > 0 ? mapCLSToForm(clsItems) : { clsDynamic: [] }),
                    ...(tsb ? mapTSBToForm(tsb) : {}),
                    kl_icd10:     kl?.KET_LUAN_BENH_FULL ? kl.KET_LUAN_BENH_FULL.split(";").filter(Boolean) : [],
                    kl_tinhTrang: kl?.GHI_RO_VAN_DE_SUC_KHOE ?? null,
                    kl_phanLoai:  kl?.PHAN_LOAI_SK  ?? null,
                    kl_bacsi:     kl?.CKS_NGUOI_KET_LUAN ?? null,
                    kl_cskcb:     kl?.CKS_BENH_VIEN      ?? null,
                  }));
                  if (tsb) resolveIcd10InTSB(tsb).then((resolved) => { if (Object.keys(resolved).length) setForm((prev) => ({ ...prev, ...resolved })); });
                });
              }
            }
            setShowPatientPicker(false);
          }}
        />
      )}
    </div>
  );
}
