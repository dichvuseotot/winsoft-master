import React, { useState } from "react";
import { labelStyle, inputStyle, inputStyleNoBackground, textareaStyle, helperStyle, Required, FieldGroup, SectionHeader, Card, Grid3, TabTitle, GD_ICD10_OPTIONS, SearchableSelect, subLabelStyle, SignatureBox, PHAN_LOAI_LS, PHAN_LOAI_SK } from "./formShared";

export function Tab1Content({ form, setForm }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <>
      <Card>
        <SectionHeader
          num="1"
          title="Thông tin Hành chính"
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
              maxLength={10}
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

export function Tab2Content({ form, setForm, subtitle = "Mã cơ sở khám bệnh, ngày và giờ khám sức khỏe" }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Card>
      <SectionHeader
        num="2"
        title="Thông tin chung về lần khám"
        subtitle={subtitle}
      />
      <Grid3>
        <FieldGroup label="Mã CSKCB" required>
          <input
            style={inputStyleNoBackground}
            className="field-readonly-dark"
            type="text"
            value={form.maCskcb}
            disabled
          />
        </FieldGroup>
        <FieldGroup label="Mã CSKCB theo chuẩn GLN" required>
          <input
            style={inputStyleNoBackground}
            className="field-readonly-dark"
            type="text"
            value={form.maCskcbGln}
            disabled
          />
        </FieldGroup>
        <FieldGroup label="Mã lần khám" helper="Giá trị được hệ thống quản lý theo CSYT.">
          <input
            style={inputStyleNoBackground}
            className="field-readonly-light"
            type="text"
            value={form.maLanKham}
            disabled
          />
        </FieldGroup>
      </Grid3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginTop: "1rem" }}>
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
      </div>
      {/* <div style={{ marginTop: "1rem" }}>
        <FieldGroup label="Lý do khám sức khỏe">
          <input
            style={inputStyle}
            type="text"
            value={form.lyDoKham}
            onChange={set("lyDoKham")}
          />
        </FieldGroup>
      </div> */}
    </Card>
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

export function Tab3Content({ form, setForm }) {
  const setRadio = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const left = TIEN_SU_BAN_THAN_ITEMS.slice(0, 11);
  const right = TIEN_SU_BAN_THAN_ITEMS.slice(11);

  return (
    <>
      <Card>
        <SectionHeader
          num="3"
          title="Tiền sử bệnh tật"
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
            {["Không", "Có"].map((val) => (
              <label
                key={val}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".35rem",
                  cursor: "pointer",
                  fontSize: ".85rem",
                  fontWeight: (form.gdChung || "Không") === val ? 600 : 400,
                  color: (form.gdChung || "Không") === val ? "var(--primary)" : "var(--gray-700)",
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
                {val}
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

export function Tab4Content({ form, setForm }) {
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
        title="Khám thể lực"
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
            style={inputStyleNoBackground}
            className="field-readonly-light"
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

export function Tab5Content({ form, setForm }) {
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
        title="Khám lâm sàng"
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

export function Tab6Content({ form, setForm }) {
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
        title="Cận lâm sàng"
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

          {(form.cls_coKhac || "Không") === "Có" && (
            <div style={{ marginTop: ".75rem" }}>
              <div style={{ fontSize: ".84rem", color: "var(--gray-700)", marginBottom: ".35rem" }}>
                104. Kết quả chi tiết
              </div>
              <input
                style={inputStyle}
                type="text"
                placeholder="Nhập kết quả chi tiết..."
                value={form.cls_ketQuaChiTiet || ""}
                onChange={set("cls_ketQuaChiTiet")}
              />
            </div>
          )}
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

export function Tab7Content({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <Card>
      <SectionHeader
        num="7"
        title="Kết luận & Chẩn đoán"
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
