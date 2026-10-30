import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import "./TaoHoSo.css";
import { Tab1Content, Tab2Content, Tab3Content, Tab4Content, Tab5Content, Tab6Content, Tab7Content, CLS_DINH_KY_DATA } from "./MauAdult";
import { Tab1ChildContent, Tab3ChildContent, Tab4ChildContent, Tab5ChildContent, Tab6ChildContent, Tab7ChildContent, Tab8ChildContent } from "./MauChild";
import { Tab1TeenContent, Tab2TeenContent, Tab3TeenContent, Tab5TeenContent } from "./MauTeen";
import { saveAdultTiepNhan, getThongTinHanhChinhById, getThongTinHanhChinhList, getKhamTheLuc, getKhamNoiKhoa, getNgoaiKhoa, getDaLieu, getSanPhuKhoa, getKhamMat, getKhamTMH, getKhamRHM, getCLS, getTienSuBenh, getKetLuan, getGioiTinhList, getMoiQuanHeList, getDanTocList, getTinhThanhList, getPhuongXaList, getDoiTuongList, getNguonChiTraList, getPhanLoaiSucKhoeList, getLoaiHinhKCBList, getICD10List, getLoaiMauKSKList, getCareerList } from "../../services";
import { todayVN, daysAgoVN, timeNowVN } from "../../utils/date";

const TODAY = todayVN();

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
  const sevenDaysAgo = daysAgoVN(7);
  const [fromDate, setFromDate] = useState(sevenDaysAgo);
  const [toDate, setToDate] = useState(today);

  const thStyle = { padding: ".5rem 1rem", textAlign: "left", fontWeight: 600, color: "var(--gray-500)", whiteSpace: "nowrap", borderBottom: "2px solid var(--gray-200)", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".04em", background: "var(--gray-50)" };
  const tdStyle = { padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-100)", color: "var(--gray-600)", whiteSpace: "nowrap", fontSize: ".83rem" };

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
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", background: "#fff", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", padding: ".4rem .75rem" }}>
            <i className="bi bi-search" style={{ color: "var(--gray-400)", fontSize: ".85rem" }} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên hoặc số định danh..."
              style={{ border: "none", outline: "none", boxShadow: "none", background: "transparent", fontSize: ".875rem", width: "100%", color: "var(--gray-800)" }}
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
                    style={{ cursor: "pointer", background: i % 2 === 0 ? "#fff" : "var(--gray-50)", transition: "background .12s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-bg)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "var(--gray-50)")}
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

function mapTSBToForm(tsb) {
  if (!tsb) return {};
  const bit = (v) => v === true || v === 1 ? "Có" : "Không";
  return {
    gdChung:        tsb.TSGD_MAC_BENH === true || tsb.TSGD_MAC_BENH === 1 ? "Có" : "Không",
    gdICD10:        tsb.TSGD_MA_BENH_FULL ? tsb.TSGD_MA_BENH_FULL.split(";").filter(Boolean) : [],
    bt_0:           bit(tsb.TSBT_BENH_TRONG_5_NAM_QUA),
    bt_1:           bit(tsb.TSBT_BENH_THAN_KINH),
    bt_2:           bit(tsb.TSBT_BENH_MAT),
    bt_3:           bit(tsb.TSBT_BENH_TAI),
    bt_4:           bit(tsb.TSBT_BENH_TIM),
    bt_5:           bit(tsb.TSBT_PHAU_THUAT_TIM),
    bt_6:           bit(tsb.TSBT_TANG_HUYET_AP),
    bt_7:           bit(tsb.TSBT_KHO_THO),
    bt_8:           bit(tsb.TSBT_BENH_PHOI),
    bt_9:           bit(tsb.TSBT_BENH_THAN),
    bt_10:          bit(tsb.TSBT_NGHIEN_RUOU),
    bt_11:          bit(tsb.TSBT_DAI_THAO_DUONG),
    bt_12:          bit(tsb.TSBT_BENH_TAM_THAN),
    bt_13:          bit(tsb.TSBT_MAT_Y_THUC),
    bt_14:          bit(tsb.TSBT_NGAT),
    bt_15:          bit(tsb.TSBT_BENH_TIEU_HOA),
    bt_16:          bit(tsb.TSBT_ROI_LOAN_GIAC_NGU),
    bt_17:          bit(tsb.TSBT_TAI_BIEN),
    bt_18:          bit(tsb.TSBT_BENH_COT_SONG),
    bt_19:          bit(tsb.TSBT_RUOU_THUONG_XUYEN),
    bt_20:          bit(tsb.TSBT_MA_TUY),
    bt_21:          bit(tsb.TSBT_BENH_KHAC),
    benhKhacChiTiet: tsb.TSBT_MA_BENH_KHAC_FULL ? tsb.TSBT_MA_BENH_KHAC_FULL.split(";").filter(Boolean) : [],
    dangDieuTri:    (tsb.TSBT_DANG_DIEU_TRI_BENH === true || tsb.TSBT_DANG_DIEU_TRI_BENH === 1) ? "Có" : "Không",
    dieuTriICD10:   tsb.BENH_DANG_DIEU_TRI ? tsb.BENH_DANG_DIEU_TRI.split(";").filter(Boolean) : [],
    thuocDangSD:    tsb.TSBT_TEN_THUOC_LIEU_LUONG || "",
  };
}

function mapCLSToForm(clsItems) {
  const find = (chiSo) => clsItems.find((i) => i.TEN_CHI_SO === chiSo);
  const r = (chiSo) => find(chiSo)?.GIA_TRI ?? null;
  const id = (chiSo) => find(chiSo)?.Id ?? null;
  const khac = clsItems.find((i) => i.TEN_DICH_VU === "Cận lâm sàng khác");

  const dkCodes = new Set(CLS_DINH_KY_DATA.map((d) => d.code));
  const clsDynamic = clsItems
    .filter((i) => dkCodes.has(i.TEN_CHI_SO))
    .map((i) => {
      const meta = CLS_DINH_KY_DATA.find((d) => d.code === i.TEN_CHI_SO);
      return {
        _key:        `${i.TEN_CHI_SO}_${i.Id ?? Date.now()}`,
        _existingId: i.Id ?? null,
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
    cls_huyetHoc:          r("Tổng phân tích tế bào máu ngoại vi"),
    cls_huyetHoc_id:       id("Tổng phân tích tế bào máu ngoại vi"),
    cls_duongMau:          r("Đường máu"),
    cls_duongMau_id:       id("Đường máu"),
    cls_ure:               r("Urê"),
    cls_ure_id:            id("Urê"),
    cls_creatinin:         r("Creatinin"),
    cls_creatinin_id:      id("Creatinin"),
    cls_asat:              r("ASAT"),
    cls_asat_id:           id("ASAT"),
    cls_alat:              r("ALAT"),
    cls_alat_id:           id("ALAT"),
    cls_nuocTieu:          r("Tổng phân tích nước tiểu"),
    cls_nuocTieu_id:       id("Tổng phân tích nước tiểu"),
    cls_nuocTieuKhac:      r("Khác"),
    cls_nuocTieuKhac_id:   id("Khác"),
    cls_cdha:              r("XQ tim phổi thẳng"),
    cls_cdha_id:           id("XQ tim phổi thẳng"),
    cls_sieuAm:            r("Siêu âm"),
    cls_sieuAm_id:         id("Siêu âm"),
    cls_coKhac:            khac ? "Có" : "",
    cls_ketQuaChiTiet:     khac?.GIA_TRI ?? null,
    cls_ketQuaChiTiet_id:  khac?.Id ?? null,
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
  const sectionRefs = useRef([]);
  const tabBarRef = useRef(null);
  const isScrollingTo = useRef(false);

  const [form, setForm] = useState({
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
    dieuTriICD10: [],
    clsDynamic: [],
    thuocDangSD: "",
  });

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
  }, []);

  const loadIcd10Options = async (search, page = 1) => {
    return getICD10List({ search, page, pageSize: 20 });
  };

  useEffect(() => {
    if (!editId) return;
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
        ngayCap: p.NGAYCAP_CCCD ? p.NGAYCAP_CCCD : prev.ngayCap,
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
        // Khám thể lực
        chieuCao: tl?.CHIEU_CAO ?? prev.chieuCao,
        canNang: tl?.CAN_NANG ?? prev.canNang,
        mach: tl?.MACH ?? prev.mach,
        huyetAp: tl?.HUYET_AP ?? prev.huyetAp,
        phanLoaiTheLuc: tl?.KHAM_THE_LUC_PL ?? prev.phanLoaiTheLuc,
        // Nội khoa
        nk_a: nk?.NOI_KHOA_TUAN_HOAN ?? prev.nk_a,
        nk_a_pl: nk?.NOI_KHOA_TUAN_HOAN_PL ?? prev.nk_a_pl,
        nk_b: nk?.NOI_KHOA_HO_HAP ?? prev.nk_b,
        nk_b_pl: nk?.NOI_KHOA_HO_HAP_PL ?? prev.nk_b_pl,
        nk_c: nk?.NOI_KHOA_TIEU_HOA ?? prev.nk_c,
        nk_c_pl: nk?.NOI_KHOA_TIEU_HOA_PL ?? prev.nk_c_pl,
        nk_d: nk?.NOI_KHOA_THAN_TN_SD ?? prev.nk_d,
        nk_d_pl: nk?.NOI_KHOA_THAN_TN_SD_PL ?? prev.nk_d_pl,
        nk_e: nk?.NOI_KHOA_NOI_TIET ?? prev.nk_e,
        nk_e_pl: nk?.NOI_KHOA_NOI_TIET_PL ?? prev.nk_e_pl,
        nk_f: nk?.NOI_KHOA_CO_XUONG_KHOP ?? prev.nk_f,
        nk_f_pl: nk?.NOI_KHOA_CO_XUONG_KHOP_PL ?? prev.nk_f_pl,
        nk_g: nk?.NOI_KHOA_THAN_KINH ?? prev.nk_g,
        nk_g_pl: nk?.NOI_KHOA_THAN_KINH_PL ?? prev.nk_g_pl,
        nk_h: nk?.NOI_KHOA_TAM_THAN ?? prev.nk_h,
        nk_h_pl: nk?.NOI_KHOA_TAM_THAN_PL ?? prev.nk_h_pl,
        // Ngoại khoa
        ngk: ngk?.KET_QUA_KHAM_NGOAI_KHOA ?? prev.ngk,
        ngk_pl: ngk?.KHAM_NGOAI_KHOA_PL ?? prev.ngk_pl,
        // Da liễu
        dl: dl?.KET_QUA_KHAM_DA_LIEU ?? prev.dl,
        dl_pl: dl?.KHAM_DA_LIEU_PL ?? prev.dl_pl,
        // Sản phụ khoa
        spk: spk?.KET_QUA_KHAM_SAN_PHU_KHOA ?? prev.spk,
        spk_pl: spk?.KHAM_SAN_PHU_KHOA_PL ?? prev.spk_pl,
        // Mắt
        mat_kk_phai: mat?.KHONG_KINH_MAT_PHAI ?? prev.mat_kk_phai,
        mat_kk_trai: mat?.KHONG_KINH_MAT_TRAI ?? prev.mat_kk_trai,
        mat_ck_phai: mat?.CO_KINH_MAT_PHAI   ?? prev.mat_ck_phai,
        mat_ck_trai: mat?.CO_KINH_MAT_TRAI   ?? prev.mat_ck_trai,
        mat_benh:    mat?.BENH_KHAC_MAT      ?? prev.mat_benh,
        mat_pl:      mat?.KHAM_MAT_PL        ?? prev.mat_pl,
        // Tai Mũi Họng
        tmh_tt_trai: tmh?.TAI_TRAI_NOI_THUONG  ?? prev.tmh_tt_trai,
        tmh_th_trai: tmh?.TAI_TRAI_NOI_THAM    ?? prev.tmh_th_trai,
        tmh_tt_phai: tmh?.TAI_PHAI_NOI_THUONG  ?? prev.tmh_tt_phai,
        tmh_th_phai: tmh?.TAI_PHAI_NOI_THAM    ?? prev.tmh_th_phai,
        tmh_benh:    tmh?.BENH_TAI_MUI_HONG    ?? prev.tmh_benh,
        tmh_pl:      tmh?.KHAM_TAI_MUI_HONG_PL ?? prev.tmh_pl,
        // Răng Hàm Mặt
        rhm_hamTren: rhm?.HAM_TREN              ?? prev.rhm_hamTren,
        rhm_hamDuoi: rhm?.HAM_DUOI              ?? prev.rhm_hamDuoi,
        rhm_ketQua:  rhm?.BENH_RANG_HAM_MAT     ?? prev.rhm_ketQua,
        rhm_benh:    rhm?.BENH_KHAC_RANG_HAM_MAT ?? prev.rhm_benh,
        rhm_pl:      rhm?.KHAM_RANG_HAM_MAT_PL  ?? prev.rhm_pl,
        ...(clsItems.length > 0 && mapCLSToForm(clsItems)),
        ...(tsb && mapTSBToForm(tsb)),
        // Kết luận
        kl_icd10:     kl?.KET_LUAN_BENH_FULL ? kl.KET_LUAN_BENH_FULL.split(";").filter(Boolean) : prev.kl_icd10,
        kl_tinhTrang: kl?.GHI_RO_VAN_DE_SUC_KHOE ?? prev.kl_tinhTrang,
        kl_phanLoai:  kl?.PHAN_LOAI_SK ?? prev.kl_phanLoai,
      }));
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
    setForm((prev) => ({ ...prev, phuongXa: "" }));
    if (!form.tinhThanhPho) { setPhuongXaOptions([]); return; }
    getPhuongXaList(form.tinhThanhPho).then((data) => setPhuongXaOptions(data)).catch(() => {});
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

            {!viewOnly && (
              <button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  try {
                    const result = await saveAdultTiepNhan(form, mauPhieu, tiepNhanId || null);
                    if (result?.TiepNhanId) setTiepNhanId(result.TiepNhanId);
                  } catch {
                    // handled inside service
                  } finally {
                    setSaving(false);
                  }
                }}
                style={{
                  height: "36px",
                  padding: "0 1.1rem",
                  background: saving ? "#86efac" : "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-md, 8px)",
                  fontWeight: 600,
                  fontSize: ".85rem",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                }}
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            )}

            {viewOnly ? (
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
            ) : (
              <>
                <button
                  onClick={() => setShowPatientPicker(true)}
                  title="Chọn bệnh nhân"
                  style={{
                    height: "36px",
                    width: "36px",
                    padding: 0,
                    background: "var(--primary, #0067AC)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--radius-md, 8px)",
                    fontSize: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className="bi bi-person-lines-fill" />
                </button>
              </>
            )}
          </div>
        </div>

        <div
          ref={tabBarRef}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: ".375rem",
            overflowX: "auto",
            padding: ".625rem 1.5rem",
            paddingBottom: ".375rem",
            background: "var(--gray-100)",
            borderBottom: "1px solid var(--gray-100, #f3f4f6)",
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
            ? <Tab1ChildContent form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} moiQuanHeOptions={moiQuanHeOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} loadIcd10={loadIcd10Options} />
            : isTeen
            ? <Tab1TeenContent form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} />
            : <Tab1Content form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} ngheNghiepOptions={ngheNghiepOptions} />
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
            ? <Tab3ChildContent form={form} setForm={setForm} />
            : isTeen
            ? <Tab3TeenContent form={form} setForm={setForm} loadIcd10={loadIcd10Options} />
            : <Tab3Content form={form} setForm={setForm} loadIcd10={loadIcd10Options} />
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
            ? <Tab5ChildContent form={form} setForm={setForm} />
            : isTeen
            ? <Tab5TeenContent form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
            : <Tab5Content form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[5] = el)}>
          {isChild
            ? <Tab6ChildContent form={form} setForm={setForm} />
            : <Tab6Content form={form} setForm={setForm} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[6] = el)}>
          {isChild
            ? <Tab7ChildContent form={form} setForm={setForm} tiepNhanId={tiepNhanId} />
            : <Tab7Content form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} loadIcd10={loadIcd10Options} />
          }
        </div>
        {isChild && (
          <div ref={(el) => (sectionRefs.current[7] = el)}>
            <Tab8ChildContent form={form} setForm={setForm} />
          </div>
        )}
      </div>

      {showPatientPicker && (
        <PatientPickerModal
          mauPhieu={mauPhieu}
          gioiTinhOptions={gioiTinhOptions}
          onClose={() => setShowPatientPicker(false)}
          onSelect={(p) => {
            setForm((prev) => ({
              ...prev,
              soDinhDanh: p.SO_CCCD || prev.soDinhDanh,
              hoTen: p.HO_TEN || prev.hoTen,
              gioiTinh: p.GIOI_TINH ?? prev.gioiTinh,
              ngaySinh: p.NGAY_SINH ? p.NGAY_SINH.slice(0, 10) : prev.ngaySinh,
              ngheNghiep: p.MA_NGHE_NGHIEP || prev.ngheNghiep,
              noiCongTac: p.NOI_LAM_VIEC_HOC_TAP || prev.noiCongTac,
              dienThoai: p.DIEN_THOAI || prev.dienThoai,
              tinhThanhPho: p.MATINH_CU_TRU || prev.tinhThanhPho,
              phuongXa: p.MAXA_CU_TRU || prev.phuongXa,
              danToc: p.MA_DAN_TOC || prev.danToc,
              noiCap: p.NOICAP_CCCD || prev.noiCap,
              nhomMau: p.NHOM_MAU || prev.nhomMau,
              sinhNon: p.SINH_NON ?? prev.sinhNon,
              tuanThaiKhiSinh: p.TUAN_THAI || prev.tuanThaiKhiSinh,
              soNha: p.DIA_CHI || prev.soNha,
              hoTenNguoiDiCung: p.HO_TEN_NGUOI_DI_CUNG || prev.hoTenNguoiDiCung,
              soDinhDanhGiamHo: p.SO_CCCD_NGUOI_DI_CUNG || prev.soDinhDanhGiamHo,
              moiQuanHe: p.MOI_QUAN_HE_VOI_TRE ?? prev.moiQuanHe,
              dienThoaiNguoiDiCung: p.DIEN_THOAI_NGUOI_DI_CUNG || prev.dienThoaiNguoiDiCung,
              lyDoKham: p.LY_DO_VV || prev.lyDoKham,
              doiTuongKham: p.DOI_TUONG || prev.doiTuongKham,
              nguonChiTra: p.NGUON_CHI_TRA ?? prev.nguonChiTra,
              loaiHinhKham: p.MA_LOAI_KCB || prev.loaiHinhKham,
              ngayKham: p.NGAY_VAO ? p.NGAY_VAO.slice(0, 10) : prev.ngayKham,
              maLanKham: p.MA_LK || prev.maLanKham,
            }));
            const pid = p.Id ?? p.KSKCD_TiepNhanId ?? null;
            setTiepNhanId(pid);
            if (pid) {
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
                  ...(tl && {
                    chieuCao: tl.CHIEU_CAO ?? prev.chieuCao,
                    canNang: tl.CAN_NANG ?? prev.canNang,
                    mach: tl.MACH ?? prev.mach,
                    huyetAp: tl.HUYET_AP ?? prev.huyetAp,
                    phanLoaiTheLuc: tl.KHAM_THE_LUC_PL ?? prev.phanLoaiTheLuc,
                  }),
                  ...(nk && {
                    nk_a: nk.NOI_KHOA_TUAN_HOAN ?? prev.nk_a,
                    nk_a_pl: nk.NOI_KHOA_TUAN_HOAN_PL ?? prev.nk_a_pl,
                    nk_b: nk.NOI_KHOA_HO_HAP ?? prev.nk_b,
                    nk_b_pl: nk.NOI_KHOA_HO_HAP_PL ?? prev.nk_b_pl,
                    nk_c: nk.NOI_KHOA_TIEU_HOA ?? prev.nk_c,
                    nk_c_pl: nk.NOI_KHOA_TIEU_HOA_PL ?? prev.nk_c_pl,
                    nk_d: nk.NOI_KHOA_THAN_TN_SD ?? prev.nk_d,
                    nk_d_pl: nk.NOI_KHOA_THAN_TN_SD_PL ?? prev.nk_d_pl,
                    nk_e: nk.NOI_KHOA_NOI_TIET ?? prev.nk_e,
                    nk_e_pl: nk.NOI_KHOA_NOI_TIET_PL ?? prev.nk_e_pl,
                    nk_f: nk.NOI_KHOA_CO_XUONG_KHOP ?? prev.nk_f,
                    nk_f_pl: nk.NOI_KHOA_CO_XUONG_KHOP_PL ?? prev.nk_f_pl,
                    nk_g: nk.NOI_KHOA_THAN_KINH ?? prev.nk_g,
                    nk_g_pl: nk.NOI_KHOA_THAN_KINH_PL ?? prev.nk_g_pl,
                    nk_h: nk.NOI_KHOA_TAM_THAN ?? prev.nk_h,
                    nk_h_pl: nk.NOI_KHOA_TAM_THAN_PL ?? prev.nk_h_pl,
                  }),
                  ...(ngk && {
                    ngk: ngk.KET_QUA_KHAM_NGOAI_KHOA ?? prev.ngk,
                    ngk_pl: ngk.KHAM_NGOAI_KHOA_PL ?? prev.ngk_pl,
                  }),
                  ...(dl && {
                    dl: dl.KET_QUA_KHAM_DA_LIEU ?? prev.dl,
                    dl_pl: dl.KHAM_DA_LIEU_PL ?? prev.dl_pl,
                  }),
                  ...(spk && {
                    spk: spk.KET_QUA_KHAM_SAN_PHU_KHOA ?? prev.spk,
                    spk_pl: spk.KHAM_SAN_PHU_KHOA_PL ?? prev.spk_pl,
                  }),
                  ...(mat && {
                    mat_kk_phai: mat.KHONG_KINH_MAT_PHAI ?? prev.mat_kk_phai,
                    mat_kk_trai: mat.KHONG_KINH_MAT_TRAI ?? prev.mat_kk_trai,
                    mat_ck_phai: mat.CO_KINH_MAT_PHAI   ?? prev.mat_ck_phai,
                    mat_ck_trai: mat.CO_KINH_MAT_TRAI   ?? prev.mat_ck_trai,
                    mat_benh:    mat.BENH_KHAC_MAT      ?? prev.mat_benh,
                    mat_pl:      mat.KHAM_MAT_PL        ?? prev.mat_pl,
                  }),
                  ...(tmh && {
                    tmh_tt_trai: tmh.TAI_TRAI_NOI_THUONG  ?? prev.tmh_tt_trai,
                    tmh_th_trai: tmh.TAI_TRAI_NOI_THAM    ?? prev.tmh_th_trai,
                    tmh_tt_phai: tmh.TAI_PHAI_NOI_THUONG  ?? prev.tmh_tt_phai,
                    tmh_th_phai: tmh.TAI_PHAI_NOI_THAM    ?? prev.tmh_th_phai,
                    tmh_benh:    tmh.BENH_TAI_MUI_HONG    ?? prev.tmh_benh,
                    tmh_pl:      tmh.KHAM_TAI_MUI_HONG_PL ?? prev.tmh_pl,
                  }),
                  ...(rhm && {
                    rhm_hamTren: rhm.HAM_TREN               ?? prev.rhm_hamTren,
                    rhm_hamDuoi: rhm.HAM_DUOI               ?? prev.rhm_hamDuoi,
                    rhm_ketQua:  rhm.BENH_RANG_HAM_MAT      ?? prev.rhm_ketQua,
                    rhm_benh:    rhm.BENH_KHAC_RANG_HAM_MAT ?? prev.rhm_benh,
                    rhm_pl:      rhm.KHAM_RANG_HAM_MAT_PL   ?? prev.rhm_pl,
                  }),
                  ...(clsItems.length > 0 && mapCLSToForm(clsItems)),
                  ...(tsb && mapTSBToForm(tsb)),
                  // Kết luận
                  kl_icd10:     kl?.KET_LUAN_BENH_FULL ? kl.KET_LUAN_BENH_FULL.split(";").filter(Boolean) : prev.kl_icd10,
                  kl_tinhTrang: kl?.GHI_RO_VAN_DE_SUC_KHOE ?? prev.kl_tinhTrang,
                  kl_phanLoai:  kl?.PHAN_LOAI_SK ?? prev.kl_phanLoai,
                }));
              });
            }
            setShowPatientPicker(false);
          }}
        />
      )}
    </div>
  );
}
