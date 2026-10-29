import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import "./TaoHoSo.css";
import { Tab1Content, Tab2Content, Tab3Content, Tab4Content, Tab5Content, Tab6Content, Tab7Content } from "./MauAdult";
import { Tab1ChildContent, Tab3ChildContent, Tab4ChildContent, Tab5ChildContent, Tab6ChildContent, Tab7ChildContent, Tab8ChildContent } from "./MauChild";
import { Tab1TeenContent, Tab2TeenContent, Tab3TeenContent, Tab5TeenContent } from "./MauTeen";
import { saveThongTinHanhChinh, getThongTinHanhChinhById, getGioiTinhList, getMoiQuanHeList, getDanTocList, getTinhThanhList, getPhuongXaList, getDoiTuongList, getNguonChiTraList, getThongTinHanhChinhList, getPhanLoaiSucKhoeList, getLoaiHinhKCBList, getICD10List } from "../../services";

const TODAY = new Date().toISOString().slice(0, 10);

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


const MAU_PHIEU_OPTIONS = [
  { id: 1, label: "Mẫu phiếu KSK và KSK định kỳ cho người đủ 18 tuổi trở lên (v1)" },
  { id: 2, label: "Mẫu phiếu KSK và KSK định kỳ cho người đủ 6 tuổi đến dưới 18 tuổi (v1)" },
  { id: 3, label: "Mẫu giấy KSK và KSK định kỳ cho Trẻ em dưới 06 tuổi (v1)" },
];


function PatientPickerModal({ onClose, onSelect, mauPhieu, gioiTinhOptions = [] }) {
  const [q, setQ] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
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
          maxWidth: 640,
          boxShadow: "var(--shadow-xl)",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--gray-200)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <i
              className="bi bi-person-lines-fill"
              style={{ color: "var(--primary)", fontSize: "1.1rem" }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--gray-900)",
              }}
            >
              Danh sách bệnh nhân
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "var(--gray-400)",
              fontSize: "1.2rem",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: ".625rem 1.5rem", borderBottom: "1px solid var(--gray-200)", display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
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
        <div
          style={{
            padding: ".75rem 1.5rem",
            borderBottom: "1px solid var(--gray-200)",
          }}
        >
          <div
            className="patient-search-wrapper"
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              background: "#fff",
              border: "1px solid var(--gray-200)",
              borderRadius: "var(--radius-md)",
              padding: ".4rem .75rem",
              transition: "border-color .15s, box-shadow .15s",
            }}
          >
            <i
              className="bi bi-search"
              style={{ color: "var(--gray-400)", fontSize: ".85rem" }}
            />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên hoặc số định danh..."
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "transparent",
                fontSize: ".875rem",
                width: "100%",
                color: "var(--gray-800)",
              }}
            />
          </div>
        </div>
        <div style={{ overflow: "auto", flex: 1, padding: "0 1rem 1rem" }}>
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
            <div style={{ borderRadius: 10, border: "1px solid var(--gray-200)", overflow: "auto", marginTop: ".75rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>ID</th>
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
                      <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: ".75rem", color: "var(--gray-400)" }}>{p.Id}</td>
                      <td style={{ ...tdStyle, color: "var(--gray-900)", fontWeight: 600 }}>{p.HO_TEN}</td>
                      <td style={tdStyle}>
                        <span style={{ padding: ".15em .55em", borderRadius: 99, fontSize: ".75rem", fontWeight: 600, background: p.GIOI_TINH === 0 ? "#dbeafe" : "#fce7f3", color: p.GIOI_TINH === 0 ? "#1d4ed8" : "#be185d" }}>
                          {gioiTinhOptions.find((g) => g.Id === p.GIOI_TINH)?.TenGioiTinh ?? ""}
                        </span>
                      </td>
                      <td style={tdStyle}>{p.NGAY_SINH}</td>
                      <td style={{ ...tdStyle, fontFamily: "monospace", letterSpacing: ".03em" }}>{p.SO_CCCD}</td>
                      <td style={tdStyle}>{p.PostingDate ? new Date(p.PostingDate).toLocaleString("vi-VN") : p.NGAY_VAO}</td>
                      <td style={{ ...tdStyle, color: "var(--gray-400)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis" }}>{p.LY_DO_VV || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div style={{ padding: ".625rem 1.5rem", borderTop: "1px solid var(--gray-200)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: ".78rem", color: "var(--gray-500)" }}>Tổng: {total} bản ghi</span>
            <div style={{ display: "flex", gap: ".375rem", alignItems: "center" }}>
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
          </div>
        )}
      </div>
    </div>
  );
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
    return saved ? Number(saved) : MAU_PHIEU_OPTIONS[0].id;
  });
  const [showPatientPicker, setShowPatientPicker] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
  const [patientSelected, setPatientSelected] = useState(!!(editId || viewOnly));
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
    gioKham: new Date().toTimeString().slice(0, 5),
    gdICD10: [],
    dieuTriICD10: [],
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
  }, []);

  const loadIcd10Options = async (search, page = 1) => {
    return getICD10List({ search, page, pageSize: 20 });
  };

  useEffect(() => {
    if (!editId) return;
    getThongTinHanhChinhById(editId).then((p) => {
      if (!p) return;
      setForm((prev) => ({
        ...prev,
        soDinhDanh: p.SO_CCCD || prev.soDinhDanh,
        hoTen: p.HO_TEN || prev.hoTen,
        gioiTinh: p.GIOI_TINH ?? prev.gioiTinh,
        ngaySinh: p.NGAY_SINH || prev.ngaySinh,
        ngayCap: p.NGAYCAP_CCCD || prev.ngayCap,
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
        ngayKham: p.NGAY_VAO || prev.ngayKham,
        maLanKham: p.MA_LK || prev.maLanKham,
        hoTenNguoiDiCung: p.HO_TEN_NGUOI_DI_CUNG || prev.hoTenNguoiDiCung,
        soDinhDanhGiamHo: p.SO_CCCD_NGUOI_DI_CUNG || prev.soDinhDanhGiamHo,
        moiQuanHe: p.MOI_QUAN_HE_VOI_TRE ?? prev.moiQuanHe,
        dienThoaiNguoiDiCung: p.DIEN_THOAI_NGUOI_DI_CUNG || prev.dienThoaiNguoiDiCung,
      }));
    }).catch(() => {});
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

  const isChild = mauPhieu === 3;
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
              {MAU_PHIEU_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>

            {!viewOnly && (
              <button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  try {
                    await saveThongTinHanhChinh(form, mauPhieu, editId || null);
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
                onClick={() => patientSelected || tab.id === 1 ? scrollToSection(tab.id) : null}
                style={{
                  flexShrink: 0,
                  height: "34px",
                  padding: "0 .875rem",
                  borderRadius: 99,
                  border: "none",
                  cursor: tab.id === 1 || patientSelected ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-body)",
                  fontSize: ".8rem",
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? "#2563eb" : "var(--gray-100, #f3f4f6)",
                  color: isActive ? "#fff" : tab.id > 1 && !patientSelected ? "var(--gray-300)" : "var(--gray-700, #374151)",
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                  transition: "background .15s, color .15s",
                  opacity: tab.id > 1 && !patientSelected ? 0.45 : 1,
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
            : <Tab1Content form={form} setForm={setForm} viewOnly={viewOnly} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} loaiHinhKCBOptions={loaiHinhKCBOptions} />
          }
        </div>
        <div
          style={!patientSelected ? { pointerEvents: "none", opacity: 0.4, filter: "grayscale(40%)", userSelect: "none" } : undefined}
        >
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
              ngaySinh: p.NGAY_SINH || prev.ngaySinh,
              ngheNghiep: p.MA_NGHE_NGHIEP || prev.ngheNghiep,
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
              ngayKham: p.NGAY_VAO || prev.ngayKham,
              maLanKham: p.MA_LK || prev.maLanKham,
            }));
            setTiepNhanId(p.Id ?? p.KSKCD_TiepNhanId ?? null);
            setPatientSelected(true);
            setShowPatientPicker(false);
          }}
        />
      )}
    </div>
  );
}
