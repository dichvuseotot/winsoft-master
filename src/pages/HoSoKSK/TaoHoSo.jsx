import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TODAY = new Date().toISOString().slice(0, 10);

const TABS = [
  { id: 1, label: "1. Thông tin Hành chính", badge: 18 },
  { id: 2, label: "2. Thông tin lần khám", badge: 5 },
  { id: 3, label: "3. Tiền sử bệnh tật", badge: 31 },
  { id: 4, label: "4. Khám thể lực", badge: 6 },
  { id: 5, label: "5. Khám lâm sàng", badge: 52 },
  { id: 6, label: "6. Cận lâm sàng", badge: 9 },
  { id: 7, label: "7. Kết luận & Chẩn đoán", badge: 5 },
];

const SAMPLE_PATIENTS = [
  {
    soDinhDanh: "079201001234",
    hoTen: "Nguyễn Văn An",
    gioiTinh: "Nam",
    ngaySinh: "1985-03-15",
    ngheNghiep: "01 — Công nhân",
    dienThoai: "0901234567",
    tinhThanhPho: "79 — Thành phố Hồ Chí Minh",
    phuongXa: "Phường Nhà Bè",
    danToc: "01 — Kinh",
  },
  {
    soDinhDanh: "079201005678",
    hoTen: "Trần Thị Bình",
    gioiTinh: "Nữ",
    ngaySinh: "1992-07-22",
    ngheNghiep: "05 — Viên chức",
    dienThoai: "0912345678",
    tinhThanhPho: "79 — Thành phố Hồ Chí Minh",
    phuongXa: "Phường Nhà Bè",
    danToc: "01 — Kinh",
  },
  {
    soDinhDanh: "079201009012",
    hoTen: "Lê Hoàng Cường",
    gioiTinh: "Nam",
    ngaySinh: "1978-11-05",
    ngheNghiep: "02 — Nông dân",
    dienThoai: "0923456789",
    tinhThanhPho: "79 — Thành phố Hồ Chí Minh",
    phuongXa: "Phường Nhà Bè",
    danToc: "01 — Kinh",
  },
];

const MAU_PHIEU_OPTIONS = [
  "Mẫu phiếu KSK và KSK định kỳ cho người đủ 18 tuổi trở lên (v1)",
  "Mẫu phiếu KSK trẻ em dưới 18 tuổi (v1)",
];

const labelStyle = {
  fontSize: ".78rem",
  fontWeight: 600,
  color: "var(--gray-700)",
  marginBottom: ".3rem",
  display: "block",
};

const inputStyle = {
  width: "100%",
  height: "38px",
  border: "1.5px solid var(--gray-200)",
  borderRadius: "var(--radius-md)",
  padding: "0 .75rem",
  fontSize: ".85rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
  background: "var(--gray-100)",
};

const textareaStyle = {
  width: "100%",
  border: "1.5px solid var(--gray-200)",
  borderRadius: "var(--radius-md)",
  padding: ".5rem .75rem",
  fontSize: ".85rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
  resize: "vertical",
};

const helperStyle = {
  fontSize: ".72rem",
  color: "var(--gray-500, #6b7280)",
  marginTop: ".25rem",
};

const Required = () => (
  <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>
);

function FieldGroup({ label, required, children, helper }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>
        {label}
        {required && <Required />}
      </label>
      {children}
      {helper && <span style={helperStyle}>{helper}</span>}
    </div>
  );
}

function SectionHeader({ num, title, subtitle }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".75rem",
        alignItems: "flex-start",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#2563eb",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: ".95rem",
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <div>
        <div
          style={{
            color: "#2563eb",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.3,
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: ".78rem",
              color: "var(--gray-500, #6b7280)",
              marginTop: ".2rem",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      className="card-custom"
      style={{
        background: "var(--gray-100)",
        borderRadius: "var(--radius-md, 10px)",
        padding: "1.5rem",
        marginBottom: "1.25rem",
        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
      }}
    >
      {children}
    </div>
  );
}

function Grid3({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function TabTitle({ num, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".625rem",
        marginBottom: "1rem",
        paddingBottom: ".625rem",
        borderBottom: "2px solid #2563eb",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#2563eb",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: ".85rem",
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "#1e40af",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Tab1Content({ form, setForm }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <>
      <Card>
        <SectionHeader
          num="1"
          title="1. Thông tin Hành chính"
          subtitle="Thông tin định danh người bệnh, nơi ở và thông tin quản lý cơ sở khám chữa bệnh"
        />

        <Grid3>
          <FieldGroup label="Số định danh cá nhân" required>
            <input
              style={inputStyle}
              type="text"
              value={form.soDinhDanh}
              onChange={set("soDinhDanh")}
              placeholder="Nhập đủ 12 số CCCD/ÐĐCN..."
            />
          </FieldGroup>

          <FieldGroup label="Họ tên" required>
            <input
              style={inputStyle}
              type="text"
              value={form.hoTen}
              onChange={set("hoTen")}
            />
          </FieldGroup>

          <FieldGroup label="Giới tính" required>
            <select
              style={inputStyle}
              value={form.gioiTinh}
              onChange={set("gioiTinh")}
            >
              <option value="">—Chọn—</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Ngày sinh" required>
            <input
              style={inputStyle}
              type="date"
              value={form.ngaySinh}
              onChange={set("ngaySinh")}
            />
          </FieldGroup>

          <FieldGroup label="Ngày cấp">
            <input
              style={inputStyle}
              type="date"
              value={form.ngayCap}
              onChange={set("ngayCap")}
            />
          </FieldGroup>

          <FieldGroup label="Nơi cấp">
            <input
              style={inputStyle}
              type="text"
              value={form.noiCap}
              onChange={set("noiCap")}
            />
          </FieldGroup>

          <FieldGroup label="Dân tộc" required>
            <select
              style={inputStyle}
              value={form.danToc}
              onChange={set("danToc")}
            >
              <option value="01 — Kinh">01 — Kinh</option>
              <option value="02 — Tày">02 — Tày</option>
              <option value="03 — Thái">03 — Thái</option>
              <option value="04 — Mường">04 — Mường</option>
              <option value="05 — Khmer">05 — Khmer</option>
            </select>
          </FieldGroup>
                    <FieldGroup label="Điện thoại">
            <input
              style={inputStyle}
              type="text"
              value={form.dienThoai}
              onChange={set("dienThoai")}
              placeholder="Nhập đúng 10 số điện thoại (0...)"
            />
          </FieldGroup>
          <div/>
          <FieldGroup label="Nghề nghiệp" required>
            <select
              style={inputStyle}
              value={form.ngheNghiep}
              onChange={set("ngheNghiep")}
            >
              <option value="">Chọn hoặc tìm kiếm nghề nghiệp...</option>
              <option value="Công nhân">Công nhân</option>
              <option value="Nông dân">Nông dân</option>
              <option value="Học sinh/Sinh viên">Học sinh/Sinh viên</option>
              <option value="Hưu trí">Hưu trí</option>
              <option value="Tự do">Tự do</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Nơi công tác hiện tại">
            <input
              style={inputStyle}
              type="text"
              value={form.noiCongTac}
              onChange={set("noiCongTac")}
            />
          </FieldGroup>


          <div/>
          <FieldGroup label="Tỉnh/Thành phố" required>
            <select
              style={inputStyle}
              value={form.tinhThanhPho}
              onChange={set("tinhThanhPho")}
            >
              <option value="79 — Thành phố Hồ Chí Minh">
                79 — Thành phố Hồ Chí Minh
              </option>
            </select>
          </FieldGroup>

          <FieldGroup label="Phường/Xã" required>
            <select
              style={inputStyle}
              value={form.phuongXa}
              onChange={set("phuongXa")}
            >
              <option value="">Chọn hoặc tìm kiếm Phường/Xã...</option>
              <option value="Phường Nhà Bè">Phường Nhà Bè</option>
              <option value="Phường Phước Kiển">Phường Phước Kiển</option>
              <option value="Phường Phú Xuân">Phường Phú Xuân</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Số nhà/thôn/xóm" required>
            <textarea
              style={{ ...textareaStyle, height: "auto" }}
              rows={2}
              value={form.soNha}
              onChange={set("soNha")}
            />
          </FieldGroup>

          <FieldGroup label="Nhóm máu">
            <select
              style={inputStyle}
              value={form.nhomMau}
              onChange={set("nhomMau")}
            >
              <option value="">—Chọn—</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Đối tượng khám" required>
            <select
              style={inputStyle}
              value={form.doiTuongKham}
              onChange={set("doiTuongKham")}
            >
              <option value="">Chọn hoặc tìm kiếm đối tượng...</option>
              <option value="Người lớn">Người lớn</option>
              <option value="Trẻ em">Trẻ em</option>
              <option value="Người cao tuổi">Người cao tuổi</option>
              <option value="Học sinh">Học sinh</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Nguồn chi trả" required>
            <select
              style={inputStyle}
              value={form.nguonChiTra}
              onChange={set("nguonChiTra")}
            >
              <option value="">Chọn hoặc tìm kiếm nguồn chi trả...</option>
              <option value="BHYT">BHYT</option>
              <option value="Ngân sách NN">Ngân sách NN</option>
              <option value="Tự chi trả">Tự chi trả</option>
              <option value="Khác">Khác</option>
            </select>
          </FieldGroup>



          <FieldGroup label="Lý do khám sức khỏe" required>
            <input
              style={inputStyle}
              type="text"
              value={form.lyDoKham}
              onChange={set("lyDoKham")}
            />
          </FieldGroup>

          <FieldGroup label="Loại hình khám bệnh, chữa bệnh" required>
            <select
              style={inputStyle}
              value={form.loaiHinhKham}
              onChange={set("loaiHinhKham")}
            >
              <option value="">Chọn hoặc tìm kiếm...</option>
              <option value="Khám ngoại trú">Khám ngoại trú</option>
              <option value="Khám tại nhà">Khám tại nhà</option>
              <option value="Khám tập trung">Khám tập trung</option>
            </select>
          </FieldGroup>

          <div />
        </Grid3>
      </Card>
    </>
  );
}

function Tab2Content({ form, setForm }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Card>
      <SectionHeader
        num="2"
        title="Thông tin lần khám"
        subtitle="Thời gian khám, mã lượt khám và lý do khám sức khỏe"
      />
      <Grid3>
        <FieldGroup
          label="Mã CSKCB"
          helper="Giá trị được hệ thống quản lý theo CSYT."
        >
          <input
            style={inputStyle}
            type="text"
            value={form.maCskcb}
            onChange={set("maCskcb")}
          />
        </FieldGroup>
        <FieldGroup label="Mã CSKCB theo chuẩn GLN" required>
          <input
            style={inputStyle}
            type="text"
            value={form.maCskcbGln}
            onChange={set("maCskcbGln")}
          />
        </FieldGroup>
        <FieldGroup label="Ngày khám sức khỏe" required>
          <input
            style={inputStyle}
            type="date"
            value={form.ngayKham}
            onChange={set("ngayKham")}
          />
        </FieldGroup>
        <FieldGroup label="Giờ khám">
          <input
            style={inputStyle}
            type="time"
            value={form.gioKham}
            onChange={set("gioKham")}
          />
        </FieldGroup>
        <div />
        <div />
      </Grid3>
    </Card>
  );
}

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
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              background: "var(--gray-50)",
              border: "1px solid var(--gray-200)",
              borderRadius: "var(--radius-md)",
              padding: ".4rem .75rem",
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

function RadioKhongCo({ name, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
      {["Không", "Có"].map((opt) => (
        <label
          key={opt}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".35rem",
            cursor: "pointer",
            fontSize: ".85rem",
            fontWeight: value === opt ? 600 : 400,
            color:
              value === opt ? "var(--primary)" : "var(--gray-700, #374151)",
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{ accentColor: "#2563eb", width: 15, height: 15 }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

const GD_ICD10_OPTIONS = [
  "I10 - Tăng huyết áp nguyên phát",
  "E11 - Đái tháo đường type 2",
  "J45 - Hen phế quản",
  "I21 - Nhồi máu cơ tim cấp",
  "C34 - Ung thư phổi",
  "G40 - Động kinh",
  "N18 - Bệnh thận mạn tính",
  "F32 - Giai đoạn trầm cảm",
  "Z82.5 - Tiền sử gia đình về bệnh tăng huyết áp",
  "Z83.3 - Tiền sử gia đình về đái tháo đường",
];

function SearchableSelect({
  value = [],
  onChange,
  placeholder = "Chọn hoặc tìm kiếm danh mục ICD-10...",
  options,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(q.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const toggle = (o) => {
    if (value.includes(o)) onChange(value.filter((v) => v !== o));
    else onChange([...value, o]);
  };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <div
        style={{
          minHeight: 38,
          border: "1.5px solid var(--gray-200)",
          borderRadius: 6,
          padding: ".3rem .5rem .3rem .5rem",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: ".3rem",
          cursor: "pointer",
          background: "var(--gray-100)",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {value.length === 0 ? (
          <span
            style={{
              fontSize: ".84rem",
              color: "var(--gray-400)",
              padding: "0 .25rem",
            }}
          >
            {placeholder}
          </span>
        ) : (
          value.map((v) => (
            <span
              key={v}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".3rem",
                background: "var(--primary-bg)",
                border: "1px solid var(--primary-light)",
                borderRadius: 4,
                padding: ".15rem .5rem",
                fontSize: ".78rem",
                fontWeight: 500,
                color: "var(--primary)",
              }}
            >
              {v}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
                style={{
                  cursor: "pointer",
                  lineHeight: 1,
                  fontSize: ".9rem",
                  opacity: 0.7,
                }}
              >
                ×
              </span>
            </span>
          ))
        )}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: ".35rem",
            paddingLeft: ".25rem",
            flexShrink: 0,
          }}
        >
          {value.length > 0 && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
              }}
              style={{
                fontSize: ".85rem",
                color: "var(--gray-400)",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </span>
          )}
          <i
            className={`bi bi-chevron-${open ? "up" : "down"}`}
            style={{ fontSize: ".7rem", color: "var(--gray-400)" }}
          />
        </div>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--gray-100)",
            border: "1.5px solid var(--gray-200)",
            borderRadius: 6,
            zIndex: 200,
            boxShadow: "var(--shadow-lg)",
            maxHeight: 280,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: ".5rem",
              borderBottom: "1px solid var(--gray-200)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                background: "var(--gray-50)",
                border: "1px solid var(--gray-200)",
                borderRadius: 4,
                padding: ".35rem .6rem",
              }}
            >
              <i
                className="bi bi-search"
                style={{ color: "var(--gray-400)", fontSize: ".8rem" }}
              />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm kiếm"
                onClick={(e) => e.stopPropagation()}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: ".83rem",
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
                  padding: ".75rem 1rem",
                  fontSize: ".82rem",
                  color: "var(--gray-400)",
                }}
              >
                Không tìm thấy
              </div>
            ) : (
              filtered.map((o) => {
                const selected = value.includes(o);
                return (
                  <div
                    key={o}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(o);
                    }}
                    style={{
                      padding: ".55rem 1rem",
                      fontSize: ".83rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                      color: selected ? "var(--primary)" : "var(--gray-700)",
                      background: selected
                        ? "var(--primary-bg)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!selected)
                        e.currentTarget.style.background = "var(--gray-50)";
                    }}
                    onMouseLeave={(e) => {
                      if (!selected)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <i
                      className={`bi ${selected ? "bi-check-square-fill" : "bi-square"}`}
                      style={{
                        fontSize: ".8rem",
                        color: selected ? "var(--primary)" : "var(--gray-300)",
                        flexShrink: 0,
                      }}
                    />
                    {o}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const TIEN_SU_BAN_THAN_ITEMS = [
  "Có bệnh hay bị thương trong 5 năm qua",
  "Có bệnh thần kinh hay bị thương ở đầu",
  "Bệnh mắt hoặc giảm thị lực (trừ trường hợp đeo kính thuốc)",
  "Bệnh ở tai, giảm sức nghe hoặc thăng bằng",
  "Bệnh ở tim, hoặc nhồi máu cơ tim, các bệnh tim mạch khác",
  "Phẫu thuật can thiệp tim - mạch (thay van, bắc cầu nối, tạo hình mạch, máy tạo nhịp, đặt stent mạch, ghép tim)",
  "Tăng huyết áp",
  "Khó thở",
  "Bệnh phổi, hen, khí phế thủng, viêm phế quản mạn tính",
  "Bệnh thận, lọc máu",
  "Nghiện rượu, bia",
  "Đái tháo đường hoặc kiểm soát tăng đường huyết",
  "Bệnh tâm thần",
  "Mất ý thức, rối loạn ý thức",
  "Ngất, chóng mặt",
  "Bệnh tiêu hóa",
  "Rối loạn giấc ngủ, ngừng thở khi ngủ, ngủ rũ ban ngày, ngáy to",
  "Tai biến mạch máu não hoặc liệt",
  "Bệnh hoặc tổn thương cột sống",
  "SD rượu thường xuyên, liên tục",
  "SD ma túy và chất gây nghiện",
  "Bệnh khác",
];

const subLabelStyle = {
  color: "#2563eb",
  fontWeight: 700,
  fontSize: ".78rem",
  textTransform: "uppercase",
  letterSpacing: ".04em",
  marginBottom: ".75rem",
};

const tblHeaderStyle = {
  display: "grid",
  gridTemplateColumns: "36px 1fr 96px",
  padding: ".4rem .75rem",
  background: "var(--gray-50)",
  borderBottom: "1px solid var(--gray-200)",
  fontSize: ".7rem",
  fontWeight: 700,
  color: "var(--gray-500)",
  textTransform: "uppercase",
  letterSpacing: ".05em",
};

function BanThanTable({ items, startIdx, form, setRadio }) {
  return (
    <div
      style={{
        border: "1px solid var(--gray-200)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={tblHeaderStyle}>
        <span>STT</span>
        <span>TIỀN SỬ BỆNH LÝ</span>
        <span style={{ textAlign: "right" }}>CHỌN</span>
      </div>
      {items.map((item, i) => {
        const key = `bt_${startIdx + i}`;
        return (
          <div
            key={key}
            style={{
              display: "grid",
              gridTemplateColumns: "36px 1fr 96px",
              padding: ".5rem .75rem",
              borderBottom:
                i < items.length - 1 ? "1px solid var(--gray-100)" : "none",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: ".78rem", color: "var(--gray-400)" }}>
              {startIdx + i + 1}
            </span>
            <span
              style={{
                fontSize: ".83rem",
                color: "var(--gray-800)",
                lineHeight: 1.4,
              }}
            >
              {item}
            </span>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <RadioKhongCo
                name={key}
                value={form[key] || "Không"}
                onChange={setRadio(key)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Tab3Content({ form, setForm }) {
  const setRadio = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const left = TIEN_SU_BAN_THAN_ITEMS.slice(0, 11);
  const right = TIEN_SU_BAN_THAN_ITEMS.slice(11);

  return (
    <>
      <Card>
        <SectionHeader
          num="3"
          title="3. Tiền sử bệnh tật"
          subtitle="Tiền sử gia đình và các yếu tố sức khỏe/bệnh lý của bản thân"
        />

        <div style={subLabelStyle}>1. Tiền sử gia đình:</div>
        <div
          style={{
            padding: "1rem",
            background: "var(--gray-50)",
            border: "1px solid var(--gray-200)",
            borderRadius: 8,
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: ".84rem",
              color: "var(--gray-700)",
              marginBottom: ".75rem",
              lineHeight: 1.5,
            }}
          >
            Có ai trong gia đình mắc một trong các bệnh: truyền nhiễm, tim mạch,
            đái tháo đường, lao, hen phế quản, ung thư, động kinh, rối loạn tâm
            thần không?
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              ["Không", "a, Không"],
              ["Có", "b, Có"],
            ].map(([val, lbl]) => (
              <label
                key={val}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".35rem",
                  cursor: "pointer",
                  fontSize: ".85rem",
                  fontWeight: (form.gdChung || "Không") === val ? 600 : 400,
                  color:
                    (form.gdChung || "Không") === val
                      ? "var(--primary)"
                      : "var(--gray-700)",
                }}
              >
                <input
                  type="radio"
                  name="gdChung"
                  value={val}
                  checked={(form.gdChung || "Không") === val}
                  onChange={() => setRadio("gdChung")(val)}
                  style={{ accentColor: "#2563eb", width: 15, height: 15 }}
                />
                {lbl}
              </label>
            ))}
          </div>
          {(form.gdChung || "Không") === "Có" && (
            <div style={{ marginTop: ".75rem" }}>
              <div
                style={{
                  fontSize: ".8rem",
                  fontWeight: 600,
                  color: "var(--gray-700)",
                  marginBottom: ".35rem",
                }}
              >
                Tiền sử bệnh, tật của gia đình
                <span
                  style={{
                    fontWeight: 400,
                    color: "var(--gray-400)",
                    marginLeft: ".3rem",
                  }}
                >
                  (Mã bệnh ICD-10)
                </span>
              </div>
              <SearchableSelect
                options={GD_ICD10_OPTIONS}
                value={form.gdICD10}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, gdICD10: val }))
                }
              />
            </div>
          )}
        </div>

        <div style={subLabelStyle}>2. Tiền sử bản thân:</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <BanThanTable
            items={left}
            startIdx={0}
            form={form}
            setRadio={setRadio}
          />
          <BanThanTable
            items={right}
            startIdx={11}
            form={form}
            setRadio={setRadio}
          />
        </div>
      </Card>

      <Card>
        <div style={subLabelStyle}>3. Các câu hỏi khác (nếu có):</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span style={{ fontSize: ".84rem", color: "var(--gray-700)" }}>
            a. Hiện tại có đang điều trị bệnh gì không?
          </span>
          <RadioKhongCo
            name="dangDieuTri"
            value={form.dangDieuTri || "Không"}
            onChange={setRadio("dangDieuTri")}
          />
        </div>
        {(form.dangDieuTri || "Không") === "Có" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: ".875rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: ".8rem",
                  fontWeight: 600,
                  color: "var(--gray-700)",
                  marginBottom: ".35rem",
                }}
              >
                Tên bệnh đang điều trị
                <span
                  style={{
                    fontWeight: 400,
                    color: "var(--gray-400)",
                    marginLeft: ".3rem",
                  }}
                >
                  (Mã bệnh ICD-10)
                </span>
              </div>
              <SearchableSelect
                options={GD_ICD10_OPTIONS}
                value={form.dieuTriICD10 || []}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, dieuTriICD10: val }))
                }
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: ".8rem",
                  fontWeight: 600,
                  color: "var(--gray-700)",
                  marginBottom: ".35rem",
                }}
              >
                Thuốc đang SD và liều lượng
              </div>
              <input
                style={{
                  ...inputStyle,
                  width: "100%",
                  boxSizing: "border-box",
                }}
                placeholder="Nhập tên thuốc và liều lượng..."
                value={form.thuocDangSD || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, thuocDangSD: e.target.value }))
                }
              />
            </div>
          </div>
        )}
      </Card>
    </>
  );
}

function Grid6({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function Tab4Content({ form, setForm }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const bmi =
    form.chieuCao && form.canNang
      ? (
          parseFloat(form.canNang) /
          Math.pow(parseFloat(form.chieuCao) / 100, 2)
        ).toFixed(1)
      : "";

  return (
    <Card>
      <SectionHeader
        num="4"
        title="4. Khám thể lực"
        subtitle="Chiều cao, cân nặng, BMI, mạch, huyết áp và phân loại thể lực"
      />
      <Grid6>
        <FieldGroup label="Chiều cao (cm)">
          <input
            style={inputStyle}
            type="number"
            min="50"
            max="250"
            value={form.chieuCao || ""}
            onChange={set("chieuCao")}
          />
        </FieldGroup>

        <FieldGroup label="Cân nặng (kg)">
          <input
            style={inputStyle}
            type="number"
            min="1"
            max="300"
            value={form.canNang || ""}
            onChange={set("canNang")}
          />
        </FieldGroup>

        <FieldGroup label="Chỉ số BMI">
          <input
            style={{ ...inputStyle, background: "var(--gray-50)" }}
            type="text"
            readOnly
            value={bmi}
          />
        </FieldGroup>

        <FieldGroup label="Mạch (lần/phút)">
          <input
            style={inputStyle}
            type="number"
            min="30"
            max="250"
            value={form.mach || ""}
            onChange={set("mach")}
          />
        </FieldGroup>

        <FieldGroup label="Huyết áp (mmHg)">
          <input
            style={inputStyle}
            type="text"
            placeholder="VD: 120/80"
            value={form.huyetAp || ""}
            onChange={set("huyetAp")}
          />
        </FieldGroup>

        <FieldGroup label="Phân loại thể lực">
          <select
            style={inputStyle}
            value={form.phanLoaiTheLuc || "Loại II (Khỏe)"}
            onChange={set("phanLoaiTheLuc")}
          >
            <option value="Loại I (Tốt)">Loại I (Tốt)</option>
            <option value="Loại II (Khỏe)">Loại II (Khỏe)</option>
            <option value="Loại III (Trung bình)">Loại III (Trung bình)</option>
            <option value="Loại IV (Yếu)">Loại IV (Yếu)</option>
            <option value="Loại V (Kém)">Loại V (Kém)</option>
          </select>
        </FieldGroup>
      </Grid6>
    </Card>
  );
}

function SignatureBox({ id }) {
  const canvasRef = useRef(null);
  const [tab, setTab] = useState("sign");
  const [fileName, setFileName] = useState("");
  const [hasSig, setHasSig] = useState(false);
  const drawing = useRef(false);
  const lastPos = useRef(null);

  const getXY = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
  };
  const onDown = (e) => {
    drawing.current = true;
    lastPos.current = getXY(e);
  };
  const onMove = (e) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getXY(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1a3faf";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.stroke();
    lastPos.current = pos;
    setHasSig(true);
  };
  const onUp = () => {
    drawing.current = false;
  };
  const clear = () => {
    const c = canvasRef.current;
    if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
    setHasSig(false);
  };

  return (
    <div
      style={{
        border: "1px solid var(--gray-200)",
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--gray-100)",
      }}
    >
      <div style={{ display: "flex" }}>
        {[
          ["sign", "✍️ Ký tên", "#2563eb"],
          ["upload", "📁 Upload", "#d97706"],
        ].map(([v, lbl, col]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            style={{
              flex: 1,
              padding: ".35rem .5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: ".75rem",
              fontWeight: 600,
              color: tab === v ? col : "var(--gray-400)",
              borderBottom:
                tab === v ? `2px solid ${col}` : "2px solid transparent",
            }}
          >
            {lbl}
          </button>
        ))}
      </div>

      {tab === "sign" && (
        <>
          <canvas
            ref={canvasRef}
            width={600}
            height={110}
            style={{
              display: "block",
              width: "100%",
              height: 110,
              cursor: "crosshair",
            }}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: ".25rem .6rem",
              background: "var(--gray-50)",
              borderTop: "1px solid var(--gray-100)",
            }}
          >
            <button
              onClick={clear}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: ".72rem",
                color: "var(--gray-700)",
                padding: 0,
              }}
            >
              Xóa nét
            </button>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
            >
              <span style={{ fontSize: ".72rem", color: "var(--gray-400)" }}>
                Bấm ra ngoài để hoàn thành
              </span>
              {hasSig && (
                <button
                  style={{
                    height: 26,
                    padding: "0 .6rem",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: ".72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Xong ✓
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {tab === "upload" && (
        <div style={{ padding: ".75rem 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <label
              htmlFor={`sig_${id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: ".35rem .9rem",
                background: "#1f2937",
                color: "#fff",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: ".82rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Chọn tệp
              <input
                id={`sig_${id}`}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
            </label>
            <span style={{ fontSize: ".82rem", color: "var(--gray-400)" }}>
              {fileName || "Không có tệp nào được chọn"}
            </span>
          </div>
          <div
            style={{ fontSize: ".72rem", color: "#2563eb", marginTop: ".4rem" }}
          >
            Tự động scale về 200px width.
          </div>
        </div>
      )}
    </div>
  );
}

const PHAN_LOAI_LS = [
  "Loại I (Tốt)",
  "Loại II (Khỏe)",
  "Loại III (Trung bình)",
  "Loại IV (Yếu)",
  "Loại V (Kém)",
];
const THI_LUC_OPT = [
  "10/10",
  "9/10",
  "8/10",
  "7/10",
  "6/10",
  "5/10",
  "4/10",
  "3/10",
  "2/10",
  "1/10",
  "< 1/10",
];

function Tab5Content({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const plSelect = (key) => (
    <select
      style={inputStyle}
      value={form[key] || "Loại II (Khỏe)"}
      onChange={set(key)}
    >
      {PHAN_LOAI_LS.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  const tlSelect = (key) => (
    <select style={inputStyle} value={form[key] || ""} onChange={set(key)}>
      <option value="">—</option>
      {THI_LUC_OPT.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  const NK = ({ label, fk }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: "1.25rem",
        padding: "1rem 0",
        borderBottom: "1px solid var(--gray-100)",
        alignItems: "start",
      }}
    >
      <div>
        <div
          style={{
            fontSize: ".84rem",
            color: "var(--gray-700)",
            fontWeight: 500,
            marginBottom: ".5rem",
          }}
        >
          {label}
        </div>
        <input
          style={{ ...inputStyle, marginBottom: ".5rem" }}
          type="text"
          value={form[fk] || ""}
          onChange={set(fk)}
        />
        <label style={{ ...labelStyle, marginTop: ".25rem" }}>Phân loại</label>
        {plSelect(`${fk}_pl`)}
      </div>
      <SignatureBox id={fk} />
    </div>
  );

  const SimpleExam = ({ secLabel, resultLabel, fk }) => (
    <div style={{ marginTop: "1.25rem" }}>
      <div style={subLabelStyle}>{secLabel}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "1.25rem",
          alignItems: "start",
        }}
      >
        <div>
          <FieldGroup label={resultLabel}>
            <input
              style={inputStyle}
              type="text"
              value={form[fk] || ""}
              onChange={set(fk)}
            />
          </FieldGroup>
          <div style={{ marginTop: ".5rem" }}>
            <label style={labelStyle}>Phân loại</label>
            {plSelect(`${fk}_pl`)}
          </div>
        </div>
        <SignatureBox id={fk} />
      </div>
    </div>
  );

  return (
    <Card>
      <SectionHeader
        num="5"
        title="5. Khám lâm sàng"
        subtitle="Nội khoa, Ngoại khoa, Da liễu, Sản phụ khoa, Mắt, TMH, RHM"
      />

      <div style={subLabelStyle}>1. Khám nội khoa</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "1.25rem",
          marginBottom: ".25rem",
        }}
      >
        <div />
        <div
          style={{
            fontSize: ".75rem",
            fontWeight: 600,
            color: "var(--gray-700)",
            textAlign: "center",
          }}
        >
          Họ tên và chữ ký của bác sĩ
        </div>
      </div>
      <NK label="a, Tuần hoàn" fk="nk_a" />
      <NK label="b, Hô hấp" fk="nk_b" />
      <NK label="c, Tiêu hóa" fk="nk_c" />
      <NK label="d, Thận - Tiết niệu - Sinh dục" fk="nk_d" />
      <NK label="e, Nội tiết" fk="nk_e" />
      <NK label="f, Cơ - xương - khớp" fk="nk_f" />
      <NK label="g, Thần kinh" fk="nk_g" />
      <NK label="h, Tâm thần" fk="nk_h" />

      <SimpleExam
        secLabel="2. Ngoại khoa"
        resultLabel="Kết quả khám ngoại khoa"
        fk="ngk"
      />

      <SimpleExam
        secLabel="3. Da liễu"
        resultLabel="Kết quả khám da liễu"
        fk="dl"
      />

      <SimpleExam
        secLabel="4. Sản phụ khoa"
        resultLabel="Kết quả khám sản phụ khoa"
        fk="spk"
      />

      <div style={{ marginTop: "1.25rem" }}>
        <div style={subLabelStyle}>5. Khám mắt</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".82rem",
                fontWeight: 600,
                color: "var(--gray-700)",
                marginBottom: ".6rem",
              }}
            >
              Kết quả khám thị lực:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 1fr",
                gap: ".5rem 1rem",
                alignItems: "center",
                marginBottom: ".5rem",
              }}
            >
              <span />
              <label
                style={{ ...labelStyle, marginBottom: 0, textAlign: "center" }}
              >
                Trái
              </label>
              <label
                style={{ ...labelStyle, marginBottom: 0, textAlign: "center" }}
              >
                Phải
              </label>
              <label
                style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}
              >
                Thị lực không kính:
              </label>
              {tlSelect("mat_kk_trai")}
              {tlSelect("mat_kk_phai")}
              <label
                style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}
              >
                Thị lực có kính:
              </label>
              {tlSelect("mat_ck_trai")}
              {tlSelect("mat_ck_phai")}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".75rem",
                marginTop: ".25rem",
              }}
            >
              <FieldGroup label="Các bệnh về mắt (nếu có)">
                <input
                  style={inputStyle}
                  type="text"
                  value={form.mat_benh || ""}
                  onChange={set("mat_benh")}
                />
              </FieldGroup>
              <FieldGroup label="Phân loại">{plSelect("mat_pl")}</FieldGroup>
            </div>
          </div>
          <SignatureBox id="mat" />
        </div>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <div style={subLabelStyle}>6. Tai - Mũi - Họng</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".82rem",
                fontWeight: 600,
                color: "var(--gray-700)",
                marginBottom: ".6rem",
              }}
            >
              Kết quả khám thính lực:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 1fr",
                gap: ".5rem 1rem",
                alignItems: "center",
                marginBottom: ".5rem",
              }}
            >
              <span />
              <label
                style={{ ...labelStyle, marginBottom: 0, textAlign: "center" }}
              >
                Tai trái
              </label>
              <label
                style={{ ...labelStyle, marginBottom: 0, textAlign: "center" }}
              >
                Tai phải
              </label>
              <label
                style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}
              >
                Thính lực nói thường (m):
              </label>
              <input
                style={inputStyle}
                type="number"
                value={form.tmh_tt_trai || ""}
                onChange={set("tmh_tt_trai")}
              />
              <input
                style={inputStyle}
                type="number"
                value={form.tmh_tt_phai || ""}
                onChange={set("tmh_tt_phai")}
              />
              <label
                style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}
              >
                Thính lực nói thầm (m):
              </label>
              <input
                style={inputStyle}
                type="number"
                value={form.tmh_th_trai || ""}
                onChange={set("tmh_th_trai")}
              />
              <input
                style={inputStyle}
                type="number"
                value={form.tmh_th_phai || ""}
                onChange={set("tmh_th_phai")}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".75rem",
                marginTop: ".25rem",
              }}
            >
              <FieldGroup label="Các bệnh về tai mũi họng (nếu có)">
                <input
                  style={inputStyle}
                  type="text"
                  value={form.tmh_benh || ""}
                  onChange={set("tmh_benh")}
                />
              </FieldGroup>
              <FieldGroup label="Phân loại">{plSelect("tmh_pl")}</FieldGroup>
            </div>
          </div>
          <SignatureBox id="tmh" />
        </div>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <div style={subLabelStyle}>7. Răng - Hàm - Mặt</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          <div>
            <FieldGroup label="Kết quả khám răng - hàm - mặt:">
              <input
                style={inputStyle}
                type="text"
                value={form.rhm_ketQua || ""}
                onChange={set("rhm_ketQua")}
              />
            </FieldGroup>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 1fr",
                gap: ".5rem 1rem",
                alignItems: "center",
                margin: ".5rem 0",
              }}
            >
              <label style={{ ...labelStyle, marginBottom: 0 }}>
                Kết quả khám hàm:
              </label>
              <FieldGroup label="Hàm trên">
                <input
                  style={inputStyle}
                  type="text"
                  value={form.rhm_hamTren || ""}
                  onChange={set("rhm_hamTren")}
                />
              </FieldGroup>
              <FieldGroup label="Hàm dưới">
                <input
                  style={inputStyle}
                  type="text"
                  value={form.rhm_hamDuoi || ""}
                  onChange={set("rhm_hamDuoi")}
                />
              </FieldGroup>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".75rem",
              }}
            >
              <FieldGroup label="Các bệnh về răng-hàm-mặt (nếu có)">
                <input
                  style={inputStyle}
                  type="text"
                  value={form.rhm_benh || ""}
                  onChange={set("rhm_benh")}
                />
              </FieldGroup>
              <FieldGroup label="Phân loại">{plSelect("rhm_pl")}</FieldGroup>
            </div>
          </div>
          <SignatureBox id="rhm" />
        </div>
      </div>
    </Card>
  );
}

const CLS_CHISO_OPTIONS = [
  "-- Chọn Chỉ Số --",
  "Điện tâm đồ (ECG)",
  "Siêu âm ổ bụng",
  "Siêu âm tim",
  "Đo loãng xương",
  "Xét nghiệm HIV",
  "Xét nghiệm viêm gan B (HBsAg)",
  "Xét nghiệm viêm gan C",
  "Tầm soát ung thư cổ tử cung (Pap smear)",
  "Tầm soát ung thư vú (Mammography)",
];

function Tab6Content({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const setRadio = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const inp = (key, placeholder = "Nhập kết quả...") => (
    <input
      style={inputStyle}
      type="text"
      placeholder={placeholder}
      value={form[key] || ""}
      onChange={set(key)}
    />
  );

  const secLabel = (text) => (
    <div style={{ ...subLabelStyle, marginBottom: ".75rem" }}>{text}</div>
  );

  const fieldLabel = (text) => (
    <div
      style={{
        fontSize: ".82rem",
        color: "var(--gray-700)",
        marginBottom: ".35rem",
      }}
    >
      {text}
    </div>
  );

  return (
    <Card>
      <SectionHeader
        num="6"
        title="6. Cận lâm sàng"
        subtitle="Xét nghiệm máu, nước tiểu, chẩn đoán hình ảnh và chỉ số cận lâm sàng"
      />

      {secLabel("A. Xét nghiệm máu")}

      <div style={{ marginBottom: ".75rem" }}>
        {fieldLabel("1. Huyết học: tổng phân tích tế bào máu ngoại vi")}
        {inp("cls_huyetHoc")}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: ".75rem",
          marginBottom: ".75rem",
        }}
      >
        <div>
          {fieldLabel("95. Đường máu (mmol/L)")}
          {inp("cls_duongMau")}
        </div>
        <div>
          {fieldLabel("96. Urê (mmol/L)")}
          {inp("cls_ure")}
        </div>
        <div>
          {fieldLabel("97. Creatinin (μmol/L)")}
          {inp("cls_creatinin")}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: ".75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          {fieldLabel("98. ASAT (U/L)")}
          {inp("cls_asat")}
        </div>
        <div>
          {fieldLabel("99. ALAT (U/L)")}
          {inp("cls_alat")}
        </div>
      </div>

      {secLabel("B. Xét nghiệm nước tiểu")}

      <div style={{ marginBottom: ".75rem" }}>
        {fieldLabel("100. Tổng phân tích nước tiểu (Bằng máy tự động)")}
        {inp("cls_nuocTieu")}
      </div>
      <div style={{ marginBottom: "1.25rem" }}>
        {fieldLabel("101. Khác")}
        {inp("cls_nuocTieuKhac", "Kết quả khác...")}
      </div>

      {secLabel("C. Chẩn đoán hình ảnh")}

      <div style={{ marginBottom: "1.25rem" }}>
        {fieldLabel("102. Chẩn đoán hình ảnh (XQ tim phổi thẳng)")}
        <input
          style={{ ...inputStyle }}
          type="text"
          placeholder="Kết quả chẩn đoán hình ảnh..."
          value={form.cls_cdha || ""}
          onChange={set("cls_cdha")}
        />
      </div>

      {secLabel("D. Kết quả khám cận lâm sàng khác")}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "1.25rem",
          alignItems: "start",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: ".84rem",
              color: "var(--gray-700)",
              marginBottom: ".5rem",
            }}
          >
            103. Có khám cận lâm sàng khác không?
          </div>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {["Không", "Có"].map((val) => (
              <label
                key={val}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".35rem",
                  cursor: "pointer",
                  fontSize: ".85rem",
                  fontWeight: (form.cls_coKhac || "Không") === val ? 600 : 400,
                  color:
                    (form.cls_coKhac || "Không") === val
                      ? "var(--primary)"
                      : "var(--gray-700)",
                }}
              >
                <input
                  type="radio"
                  name="cls_coKhac"
                  value={val}
                  checked={(form.cls_coKhac || "Không") === val}
                  onChange={() => setRadio("cls_coKhac")(val)}
                  style={{ accentColor: "#2563eb", width: 15, height: 15 }}
                />
                {val}
              </label>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: ".75rem",
              fontWeight: 600,
              color: "var(--gray-700)",
              textAlign: "center",
              marginBottom: ".35rem",
            }}
          >
            Họ tên và chữ ký của Bác sĩ
          </div>
          <SignatureBox id="cls_sig" />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".75rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--gray-100)",
        }}
      >
        <span
          style={{
            fontSize: ".84rem",
            fontWeight: 600,
            color: "#2563eb",
            whiteSpace: "nowrap",
          }}
        >
          Khám sức khoẻ định kỳ
        </span>
        <select
          value={form.cls_chiSo || ""}
          onChange={set("cls_chiSo")}
          style={{ ...inputStyle, flex: 1 }}
        >
          {CLS_CHISO_OPTIONS.map((o) => (
            <option key={o} value={o === "-- Chọn Chỉ Số --" ? "" : o}>
              {o}
            </option>
          ))}
        </select>
        <button
          style={{
            height: 38,
            padding: "0 1rem",
            whiteSpace: "nowrap",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md, 8px)",
            fontWeight: 600,
            fontSize: ".84rem",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            flexShrink: 0,
          }}
        >
          + Thêm dịch vụ Cận lâm sàng
        </button>
      </div>
    </Card>
  );
}

const ICD10_OPTIONS = [
  "Z00.0 - Khám sức khoẻ tổng quát",
  "Z00.1 - Kiểm tra sức khoẻ định kỳ trẻ em",
  "Z13 - Khám sàng lọc các bệnh và rối loạn khác",
  "Z82 - Tiền sử gia đình về một số bệnh nhất định",
  "I10 - Tăng huyết áp nguyên phát",
  "E11 - Đái tháo đường type 2",
  "J44 - Bệnh phổi tắc nghẽn mạn tính",
  "K29 - Viêm dạ dày và tá tràng",
  "M54 - Đau lưng",
];

const PHAN_LOAI_SK = [
  "Loại I - Tốt",
  "Loại II - Khoẻ",
  "Loại III - Trung bình",
  "Loại IV - Yếu",
  "Loại V - Kém",
];

function Tab7Content({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <Card>
      <SectionHeader
        num="7"
        title="7. Kết luận & Chẩn đoán"
        subtitle="Phân loại sức khỏe tổng quát, danh mục ICD-10 và xác nhận chữ ký bác sĩ"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        <div>
          <div style={{ ...subLabelStyle, marginBottom: ".75rem" }}>
            1. Tình trạng bệnh
          </div>

          <FieldGroup label="Chọn danh mục ICD-10">
            <select
              style={inputStyle}
              value={form.kl_icd10 || ""}
              onChange={set("kl_icd10")}
            >
              <option value="">Chọn hoặc tìm kiếm danh mục ICD-10...</option>
              {ICD10_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </FieldGroup>

          <div style={{ marginTop: ".75rem" }}>
            <textarea
              style={{ ...textareaStyle, minHeight: 90 }}
              placeholder="Nhập tình trạng sức khỏe..."
              value={form.kl_tinhTrang || ""}
              onChange={set("kl_tinhTrang")}
              rows={4}
            />
          </div>

          <div
            style={{
              ...subLabelStyle,
              marginTop: "1.25rem",
              marginBottom: ".75rem",
            }}
          >
            2. Phân loại sức khỏe
          </div>

          <FieldGroup label="Chọn phân loại sức khỏe" required>
            <select
              style={inputStyle}
              value={form.kl_phanLoai || "Loại II - Khoẻ"}
              onChange={set("kl_phanLoai")}
            >
              {PHAN_LOAI_SK.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </FieldGroup>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                marginBottom: ".25rem",
              }}
            >
              <span>✍️</span>
              <span
                style={{
                  fontSize: ".8rem",
                  fontWeight: 700,
                  color: "var(--gray-700)",
                }}
              >
                Chữ ký Bác sĩ kết luận
              </span>
            </div>
            <div
              style={{
                fontSize: ".78rem",
                color: "var(--gray-700)",
                marginBottom: ".4rem",
              }}
            >
              Người kết luận
            </div>
            <SignatureBox id="kl_bacsi" />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                marginBottom: ".25rem",
              }}
            >
              <span>🏛</span>
              <span
                style={{
                  fontSize: ".8rem",
                  fontWeight: 700,
                  color: "var(--gray-700)",
                }}
              >
                Chữ ký & con dấu Đại diện Cơ sở KCB
              </span>
            </div>
            <div
              style={{
                fontSize: ".78rem",
                color: "var(--gray-700)",
                marginBottom: ".4rem",
              }}
            >
              Đại diện Cơ sở y tế (Bệnh viện)
            </div>
            <SignatureBox id="kl_cskcb" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function TabPlaceholder({ title }) {
  return (
    <Card>
      <div
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
          color: "var(--gray-400, #9ca3af)",
        }}
      >
        <div
          style={{ fontWeight: 700, fontSize: "1rem", marginBottom: ".5rem" }}
        >
          {title}
        </div>
        <div style={{ fontSize: ".875rem" }}>Đang phát triển...</div>
      </div>
    </Card>
  );
}

export default function TaoHoSo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [mauPhieu, setMauPhieu] = useState(MAU_PHIEU_OPTIONS[0]);
  const [showPatientPicker, setShowPatientPicker] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
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
    danToc: "01 — Kinh",
    doiTuongKham: "",
    nhomMau: "",
    nguonChiTra: "",
    tinhThanhPho: "79 — Thành phố Hồ Chí Minh",
    phuongXa: "",
    soNha: "",
    ngheNghiep: "",
    noiCongTac: "",
    dienThoai: "",
    lyDoKham: "Khám sức khỏe định kỳ",
    loaiHinhKham: "",
    maCskcb: "75407",
    maCskcbGln: "0752636875407",
    ngayKham: TODAY,
    gioKham: "",
    gdICD10: [],
    dieuTriICD10: [],
    thuocDangSD: "",
  });

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
  }, []);

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
            gap: "1rem",
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
                KSK_TREN_18 (Trên 18) · v1
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
              onChange={(e) => setMauPhieu(e.target.value)}
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
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <button
              style={{
                height: "36px",
                padding: "0 1.1rem",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md, 8px)",
                fontWeight: 600,
                fontSize: ".85rem",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
              }}
            >
              Lưu
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
            gap: ".375rem",
            overflowX: "auto",
            padding: ".625rem 1.5rem",
            background: "var(--gray-100)",
            borderBottom: "1px solid var(--gray-100, #f3f4f6)",
            scrollbarWidth: "none",
          }}
        >
          {TABS.map((tab) => {
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
                  transition: "background .15s, color .15s",
                }}
              >
                {tab.label}
                <span
                  style={{
                    marginLeft: ".35rem",
                    fontSize: ".7rem",
                    padding: ".1em .45em",
                    borderRadius: 99,
                    background: isActive
                      ? "rgba(255,255,255,.28)"
                      : "var(--gray-300, #d1d5db)",
                    color: isActive ? "#fff" : "var(--gray-600, #4b5563)",
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <div ref={(el) => (sectionRefs.current[0] = el)}>
          <Tab1Content form={form} setForm={setForm} />
        </div>
        <div ref={(el) => (sectionRefs.current[1] = el)}>
          <Tab2Content form={form} setForm={setForm} />
        </div>
        <div ref={(el) => (sectionRefs.current[2] = el)}>
          <Tab3Content form={form} setForm={setForm} />
        </div>
        <div ref={(el) => (sectionRefs.current[3] = el)}>
          <Tab4Content form={form} setForm={setForm} />
        </div>
        <div ref={(el) => (sectionRefs.current[4] = el)}>
          <Tab5Content form={form} setForm={setForm} />
        </div>
        <div ref={(el) => (sectionRefs.current[5] = el)}>
          <Tab6Content form={form} setForm={setForm} />
        </div>
        <div ref={(el) => (sectionRefs.current[6] = el)}>
          <Tab7Content form={form} setForm={setForm} />
        </div>
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
