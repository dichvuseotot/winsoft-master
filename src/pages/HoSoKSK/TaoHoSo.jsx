import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./TaoHoSo.css";
import { Tab1Content, Tab2Content, Tab3Content, Tab4Content, Tab5Content, Tab6Content, Tab7Content } from "./MauAdult";
import { Tab1ChildContent, Tab3ChildContent, Tab4ChildContent, Tab5ChildContent, Tab6ChildContent, Tab7ChildContent, Tab8ChildContent } from "./MauChild";
import { Tab1TeenContent, Tab2TeenContent, Tab3TeenContent, Tab5TeenContent } from "./MauTeen";
import { saveThongTinHanhChinh, getGioiTinhList, getMoiQuanHeList, getDanTocList, getTinhThanhList, getPhuongXaList, getDoiTuongList, getNguonChiTraList } from "../../services";

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

const SAMPLE_PATIENTS = [
  {
    soDinhDanh: "079201001234",
    hoTen: "Nguyễn Văn An",
    gioiTinh: "Nam",
    ngaySinh: "1985-03-15",
    ngheNghiep: "01 — Công nhân",
    dienThoai: "0901234567",
    tinhThanhPho: "79",
    phuongXa: "Phường Nhà Bè",
    danToc: "01",
  },
  {
    soDinhDanh: "079201005678",
    hoTen: "Trần Thị Bình",
    gioiTinh: "Nữ",
    ngaySinh: "1992-07-22",
    ngheNghiep: "05 — Viên chức",
    dienThoai: "0912345678",
    tinhThanhPho: "79",
    phuongXa: "Phường Nhà Bè",
    danToc: "01",
  },
  {
    soDinhDanh: "079201009012",
    hoTen: "Lê Hoàng Cường",
    gioiTinh: "Nam",
    ngaySinh: "1978-11-05",
    ngheNghiep: "02 — Nông dân",
    dienThoai: "0923456789",
    tinhThanhPho: "79",
    phuongXa: "Phường Nhà Bè",
    danToc: "01",
  },
];

const MAU_PHIEU_OPTIONS = [
  { id: 1, label: "Mẫu phiếu KSK và KSK định kỳ cho người đủ 18 tuổi trở lên (v1)" },
  { id: 2, label: "Mẫu phiếu KSK và KSK định kỳ cho người đủ 6 tuổi đến dưới 18 tuổi (v1)" },
  { id: 3, label: "Mẫu giấy KSK và KSK định kỳ cho Trẻ em dưới 06 tuổi (v1)" },
];

function PatientPickerModal({ onClose, onSelect }) {
  const [q, setQ] = useState("");
  const filtered = SAMPLE_PATIENTS.filter(
    (p) =>
      p.hoTen.toLowerCase().includes(q.toLowerCase()) ||
      p.soDinhDanh.includes(q),
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
        <div style={{ overflowY: "auto", flex: 1 }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--gray-400)",
                fontSize: ".875rem",
              }}
            >
              Không tìm thấy bệnh nhân
            </div>
          ) : (
            filtered.map((p, i) => (
              <div
                key={i}
                onClick={() => {
                  onSelect(p);
                  onClose();
                }}
                style={{
                  padding: ".875rem 1.5rem",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--gray-100)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  transition: "background .12s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--primary-bg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--primary), var(--primary-deep))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: ".85rem",
                    flexShrink: 0,
                  }}
                >
                  {p.hoTen.split(" ").pop()[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".9rem",
                      color: "var(--gray-900)",
                    }}
                  >
                    {p.hoTen}
                  </div>
                  <div
                    style={{
                      fontSize: ".78rem",
                      color: "var(--gray-500)",
                      marginTop: 2,
                    }}
                  >
                    {p.gioiTinh} · {p.ngaySinh} · CCCD: {p.soDinhDanh}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: ".78rem",
                    color: "var(--gray-400)",
                    flexShrink: 0,
                  }}
                >
                  {p.ngheNghiep.split("—")[1]?.trim()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function TaoHoSo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [mauPhieu, setMauPhieu] = useState(() => {
    const saved = localStorage.getItem("taoHoSo_mauPhieu");
    return saved ? Number(saved) : MAU_PHIEU_OPTIONS[0].id;
  });
  const [showPatientPicker, setShowPatientPicker] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [gioiTinhOptions, setGioiTinhOptions] = useState([]);
  const [moiQuanHeOptions, setMoiQuanHeOptions] = useState([]);
  const [danTocOptions, setDanTocOptions] = useState([]);
  const [doiTuongOptions, setDoiTuongOptions] = useState([]);
  const [nguonChiTraOptions, setNguonChiTraOptions] = useState([]);
  const [tinhThanhOptions, setTinhThanhOptions] = useState([]);
  const [phuongXaOptions, setPhuongXaOptions] = useState([]);
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
  }, []);

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

            <button
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                try {
                  await saveThongTinHanhChinh(form, mauPhieu);
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

            <button
              onClick={() => navigate("/ho-so-ksk")}
              style={{
                height: "36px",
                padding: "0 1.1rem",
                background: "var(--gray-100)",
                color: "var(--gray-700, #374151)",
                border: "1.5px solid var(--gray-300, #d1d5db)",
                borderRadius: "var(--radius-md, 8px)",
                fontWeight: 600,
                fontSize: ".85rem",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
              }}
            >
              Quay lại
            </button>

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
        }}
      >
        <div ref={(el) => (sectionRefs.current[0] = el)}>
          {isChild
            ? <Tab1ChildContent form={form} setForm={setForm} gioiTinhOptions={gioiTinhOptions} moiQuanHeOptions={moiQuanHeOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} />
            : isTeen
            ? <Tab1TeenContent form={form} setForm={setForm} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} />
            : <Tab1Content form={form} setForm={setForm} gioiTinhOptions={gioiTinhOptions} danTocOptions={danTocOptions} tinhThanhOptions={tinhThanhOptions} phuongXaOptions={phuongXaOptions} doiTuongOptions={doiTuongOptions} nguonChiTraOptions={nguonChiTraOptions} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[1] = el)}>
          {isTeen
            ? <Tab2TeenContent form={form} setForm={setForm} />
            : <Tab2Content form={form} setForm={setForm} subtitle={isChild ? "" : undefined} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[2] = el)}>
          {isChild
            ? <Tab3ChildContent form={form} setForm={setForm} />
            : isTeen
            ? <Tab3TeenContent form={form} setForm={setForm} />
            : <Tab3Content form={form} setForm={setForm} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[3] = el)}>
          {isChild
            ? <Tab4ChildContent form={form} setForm={setForm} />
            : <Tab4Content form={form} setForm={setForm} />
          }
        </div>
        <div ref={(el) => (sectionRefs.current[4] = el)}>
          {isChild
            ? <Tab5ChildContent form={form} setForm={setForm} />
            : isTeen
            ? <Tab5TeenContent form={form} setForm={setForm} />
            : <Tab5Content form={form} setForm={setForm} />
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
            ? <Tab7ChildContent form={form} setForm={setForm} />
            : <Tab7Content form={form} setForm={setForm} />
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
          onClose={() => setShowPatientPicker(false)}
          onSelect={(p) => {
            setForm((prev) => ({
              ...prev,
              soDinhDanh: p.soDinhDanh || prev.soDinhDanh,
              hoTen: p.hoTen || prev.hoTen,
              gioiTinh: p.gioiTinh || prev.gioiTinh,
              ngaySinh: p.ngaySinh || prev.ngaySinh,
              ngheNghiep: p.ngheNghiep || prev.ngheNghiep,
              dienThoai: p.dienThoai || prev.dienThoai,
              tinhThanhPho: p.tinhThanhPho || prev.tinhThanhPho,
              phuongXa: p.phuongXa || prev.phuongXa,
              danToc: p.danToc || prev.danToc,
            }));
            setShowPatientPicker(false);
          }}
        />
      )}
    </div>
  );
}
