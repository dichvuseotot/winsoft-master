import React, { useState } from "react";
import { labelStyle, inputStyle, inputStyleNoBackground, textareaStyle, helperStyle, Required, FieldGroup, SectionHeader, Card, Grid3, TabTitle, SearchableSelect, SearchableSingleSelect, subLabelStyle, SignatureBox, } from "./formShared";

export function Tab1Content({ form, setForm, viewOnly = false, gioiTinhOptions = [], danTocOptions = [], tinhThanhOptions = [], phuongXaOptions = [], doiTuongOptions = [], nguonChiTraOptions = [], loaiHinhKCBOptions = [], ngheNghiepOptions = [], errors = {} }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const err = (key) => errors[key] ? "1.5px solid #ef4444" : "1.5px solid var(--gray-200)";

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
              style={{ ...inputStyle, border: err("soDinhDanh") }}
              type="text"
              inputMode="numeric"
              value={form.soDinhDanh}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 12);
                setForm((prev) => ({ ...prev, soDinhDanh: v }));
              }}
              placeholder="Nhập đủ 12 số CCCD/ÐĐCN..."
              maxLength={12}
            />
          </FieldGroup>

          <FieldGroup label="Họ tên" required>
            <input
              style={{ ...inputStyle, border: err("hoTen") }}
              type="text"
              value={form.hoTen}
              onChange={set("hoTen")}
            />
          </FieldGroup>

          <FieldGroup label="Giới tính" required>
            <select style={{ ...inputStyle, border: err("gioiTinh") }} value={form.gioiTinh} onChange={set("gioiTinh")}>
              <option value="">—Chọn—</option>
              {gioiTinhOptions.map((g) => (
                <option key={g.Id} value={g.Id}>{g.TenGioiTinh}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Ngày sinh" required>
            <input
              style={{ ...inputStyle, border: err("ngaySinh") }}
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
            <SearchableSingleSelect
              value={form.danToc}
              onChange={(val) => set("danToc")({ target: { value: val } })}
              options={danTocOptions.map((d) => ({ value: d.MaDanToc, label: d.TenDanToc }))}
              placeholder="—Chọn dân tộc—"
              error={errors.danToc}
            />
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
            <SearchableSingleSelect
              value={form.ngheNghiep}
              onChange={(val) => setForm((prev) => ({ ...prev, ngheNghiep: val }))}
              options={ngheNghiepOptions.map((o) => ({ value: String(o.CareerID), label: o.CareerName }))}
              placeholder="—Chọn nghề nghiệp—"
              error={errors.ngheNghiep}
            />
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
            <SearchableSingleSelect
              value={form.tinhThanhPho}
              onChange={(val) => set("tinhThanhPho")({ target: { value: val } })}
              options={tinhThanhOptions.map((t) => ({ value: t.MaTinh, label: t.TenTinh }))}
              placeholder="—Chọn tỉnh/thành phố—"
              error={errors.tinhThanhPho}
            />
          </FieldGroup>

          <FieldGroup label="Phường/Xã" required>
            <SearchableSingleSelect
              value={form.phuongXa}
              onChange={(val) => set("phuongXa")({ target: { value: val } })}
              options={phuongXaOptions.map((p) => ({ value: p.MaPhuongXa, label: p.TenPhuongXa }))}
              placeholder="—Chọn phường/xã—"
              error={errors.phuongXa}
            />
          </FieldGroup>

          <FieldGroup label="Số nhà/thôn/xóm" required>
            <textarea
              style={{ ...textareaStyle, height: "auto", border: err("soNha") }}
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
            <SearchableSingleSelect
              value={form.doiTuongKham}
              onChange={(val) => set("doiTuongKham")({ target: { value: val } })}
              options={doiTuongOptions.map((d) => ({ value: d.Id, label: d.Name }))}
              placeholder="—Chọn đối tượng—"
              error={errors.doiTuongKham}
            />
          </FieldGroup>
          <FieldGroup label="Nguồn chi trả" required>
            <SearchableSingleSelect
              value={form.nguonChiTra}
              onChange={(val) => set("nguonChiTra")({ target: { value: val } })}
              options={nguonChiTraOptions.map((n) => ({ value: n.Id, label: n.Name }))}
              placeholder="—Chọn nguồn chi trả—"
              error={errors.nguonChiTra}
            />
          </FieldGroup>



          <FieldGroup label="Lý do khám sức khỏe" required>
            <input
              style={{ ...inputStyle, border: err("lyDoKham") }}
              type="text"
              value={form.lyDoKham || ""}
              onChange={set("lyDoKham")}
            />
          </FieldGroup>

          <FieldGroup label="Loại hình khám bệnh, chữa bệnh" required>
            <SearchableSingleSelect
              options={loaiHinhKCBOptions.map((o) => ({ value: o.Id, label: o.TenLoaiHinhKCB }))}
              value={form.loaiHinhKham}
              onChange={(val) => setForm((p) => ({ ...p, loaiHinhKham: val }))}
              placeholder="—Chọn loại hình—"
              error={errors.loaiHinhKham}
            />
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

function BanThanTable({ items, startIdx, form, setRadio, setForm, loadIcd10 }) {
  return (
    <div
      style={{
        border: "1px solid var(--gray-200)",
        borderRadius: 8,
      }}
    >
      <div style={{ ...tblHeaderStyle, borderRadius: "8px 8px 0 0" }}>
        <span>STT</span>
        <span>TIỀN SỬ BỆNH LÝ</span>
        <span style={{ textAlign: "right" }}>CHỌN</span>
      </div>
      {items.map((item, i) => {
        const key = `bt_${startIdx + i}`;
        const isLast = i === items.length - 1;
        const isBenhKhac = key === "bt_21";
        return (
          <React.Fragment key={key}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "36px 1fr 96px",
                padding: ".5rem .75rem",
                borderBottom: (!isLast || (isBenhKhac && form.bt_21 === "Có")) ? "1px solid var(--gray-100)" : "none",
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
            {isBenhKhac && form.bt_21 === "Có" && (
              <div style={{ padding: ".5rem .75rem" }}>
                <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: ".35rem" }}>
                  Ghi rõ tên bệnh khác
                </div>
                <SearchableSelect
                  loadOptions={loadIcd10}
                  value={form.benhKhacChiTiet || []}
                  onChange={(val) => setForm((prev) => ({ ...prev, benhKhacChiTiet: val }))}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function Tab3Content({ form, setForm, loadIcd10 }) {
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
                loadOptions={loadIcd10}
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
          <div>
            <BanThanTable
              items={right}
              startIdx={11}
              form={form}
              setRadio={setRadio}
              setForm={setForm}
              loadIcd10={loadIcd10}
            />
          </div>
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
                loadOptions={loadIcd10}
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

export function Tab4Content({ form, setForm, phanLoaiSucKhoeOptions = [] }) {
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
            value={form.phanLoaiTheLuc || ""}
            onChange={set("phanLoaiTheLuc")}
          >
            <option value="">—Chọn—</option>
            {phanLoaiSucKhoeOptions.map((o) => (
              <option key={o.Id} value={o.Id}>{o.TenPhanLoaiSucKhoe}</option>
            ))}
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

function NK({ label, fk, form, setForm, phanLoaiSucKhoeOptions, ckdtKey }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  return (
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
        <div style={{ fontSize: ".84rem", color: "var(--gray-700)", fontWeight: 500, marginBottom: ".5rem" }}>
          {label}
        </div>
        <input style={{ ...inputStyle, marginBottom: ".5rem" }} type="text" value={form[fk] || ""} onChange={set(fk)} />
        <label style={{ ...labelStyle, marginTop: ".25rem" }}>Phân loại</label>
        <select style={inputStyle} value={form[`${fk}_pl`] || ""} onChange={set(`${fk}_pl`)}>
          <option value="">—Chọn—</option>
          {phanLoaiSucKhoeOptions.map((o) => (
            <option key={o.Id} value={o.Id}>{o.TenPhanLoaiSucKhoe}</option>
          ))}
        </select>
      </div>
      <SignatureBox id={fk} onChange={ckdtKey ? (v) => setForm((p) => ({ ...p, [ckdtKey]: v })) : undefined} />
    </div>
  );
}

function SimpleExam({ secLabel, resultLabel, fk, form, setForm, phanLoaiSucKhoeOptions }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  return (
    <div style={{ marginTop: "1.25rem" }}>
      <div style={subLabelStyle}>{secLabel}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>
        <div>
          <FieldGroup label={resultLabel}>
            <input style={inputStyle} type="text" value={form[fk] || ""} onChange={set(fk)} />
          </FieldGroup>
          <div style={{ marginTop: ".5rem" }}>
            <label style={labelStyle}>Phân loại</label>
            <select style={inputStyle} value={form[`${fk}_pl`] || ""} onChange={set(`${fk}_pl`)}>
              <option value="">—Chọn—</option>
              {phanLoaiSucKhoeOptions.map((o) => (
                <option key={o.Id} value={o.Id}>{o.TenPhanLoaiSucKhoe}</option>
              ))}
            </select>
          </div>
        </div>
        <SignatureBox id={fk} />
      </div>
    </div>
  );
}

export function Tab5Content({ form, setForm, phanLoaiSucKhoeOptions = [] }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const plSelect = (key) => (
    <select style={inputStyle} value={form[key] || ""} onChange={set(key)}>
      <option value="">—Chọn—</option>
      {phanLoaiSucKhoeOptions.map((o) => (
        <option key={o.Id} value={o.Id}>{o.TenPhanLoaiSucKhoe}</option>
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
      <NK label="a, Tuần hoàn" fk="nk_a" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} ckdtKey="nk_a_ckdt" />
      <NK label="b, Hô hấp" fk="nk_b" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
      <NK label="c, Tiêu hóa" fk="nk_c" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
      <NK label="d, Thận - Tiết niệu - Sinh dục" fk="nk_d" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
      <NK label="e, Nội tiết" fk="nk_e" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
      <NK label="f, Cơ - xương - khớp" fk="nk_f" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
      <NK label="g, Thần kinh" fk="nk_g" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />
      <NK label="h, Tâm thần" fk="nk_h" form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions} />

      <SimpleExam
        secLabel="2. Ngoại khoa"
        resultLabel="Kết quả khám ngoại khoa"
        fk="ngk"
        form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions}
      />

      <SimpleExam
        secLabel="3. Da liễu"
        resultLabel="Kết quả khám da liễu"
        fk="dl"
        form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions}
      />

      <SimpleExam
        secLabel="4. Sản phụ khoa"
        resultLabel="Kết quả khám sản phụ khoa"
        fk="spk"
        form={form} setForm={setForm} phanLoaiSucKhoeOptions={phanLoaiSucKhoeOptions}
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

export const CLS_DINH_KY_DATA = [
  { code: "H01", name: "Số lượng hồng cầu",                         unit: "x10¹²/lit", g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H02", name: "Huyết sắc tố",                              unit: "g/lit",      g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H03", name: "Hematocrit",                                 unit: "1/lit",      g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H04", name: "Thể tích trung bình hồng cầu (MCV)",        unit: "fl",         g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H05", name: "Lượng HST trung bình hồng cầu (MCH)",       unit: "pg",         g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H06", name: "Nồng độ HST trung bình hồng cầu (MCHC)",    unit: "g/l",        g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H07", name: "Độ phân tán của đường kính hồng cầu (RDW)", unit: "",           g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
  { code: "H08", name: "Hồng cầu lưới",                             unit: "%",          g1: "1. HUYẾT HỌC- TRUYỀN MÁU", g2: "1.1. TẾ BÀO MÁU NGOẠI VI", g3: "1.1.1. Hồng cầu" },
];

export function Tab6Content({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const setRadio = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const [clsDKSelected, setClsDKSelected] = useState("");

  const addDKItem = () => {
    const item = CLS_DINH_KY_DATA.find((d) => d.code === clsDKSelected);
    if (!item) return;
    setForm((prev) => ({
      ...prev,
      clsDynamic: [...(prev.clsDynamic || []), {
        _key: `${item.code}_${Date.now()}`,
        ...item,
        donViDo: item.unit,
        giaTri: "",
        moTa: "",
        ketLuan: "",
      }],
    }));
    setClsDKSelected("");
  };

  const updateDKItem = (key, field, value) =>
    setForm((prev) => ({
      ...prev,
      clsDynamic: (prev.clsDynamic || []).map((i) => i._key === key ? { ...i, [field]: value } : i),
    }));

  const removeDKItem = (key) =>
    setForm((prev) => ({ ...prev, clsDynamic: (prev.clsDynamic || []).filter((i) => i._key !== key) }));

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

      <div style={{ marginBottom: ".75rem" }}>
        {fieldLabel("102. Chẩn đoán hình ảnh (XQ tim phổi thẳng)")}
        <input
          style={{ ...inputStyle }}
          type="text"
          placeholder="Kết quả chẩn đoán hình ảnh..."
          value={form.cls_cdha || ""}
          onChange={set("cls_cdha")}
        />
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        {fieldLabel("102a. Siêu âm")}
        <input
          style={{ ...inputStyle }}
          type="text"
          placeholder="Kết quả siêu âm..."
          value={form.cls_sieuAm || ""}
          onChange={set("cls_sieuAm")}
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

      {/* ── Khám sức khoẻ định kỳ ── */}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--gray-100)" }}>
        {/* Search + Add bar */}
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: (form.clsDynamic || []).length ? "1.25rem" : 0 }}>
          <span style={{ fontSize: ".84rem", fontWeight: 600, color: "#2563eb", whiteSpace: "nowrap" }}>Khám sức khoẻ định kỳ</span>
          <div style={{ flex: 1 }}>
            <SearchableSingleSelect
              value={clsDKSelected}
              onChange={setClsDKSelected}
              options={CLS_DINH_KY_DATA.map((d) => ({ value: d.code, label: `${d.code} — ${d.name}` }))}
              placeholder="-- Chọn chỉ số --"
            />
          </div>
          <button
            onClick={addDKItem}
            disabled={!clsDKSelected}
            style={{ height: 38, padding: "0 1rem", whiteSpace: "nowrap", background: clsDKSelected ? "#2563eb" : "#bfdbfe", color: "#fff", border: "none", borderRadius: "var(--radius-md, 8px)", fontWeight: 600, fontSize: ".84rem", cursor: clsDKSelected ? "pointer" : "default", fontFamily: "var(--font-body)", flexShrink: 0 }}
          >
            + Thêm dịch vụ Cận lâm sàng
          </button>
        </div>

        {/* Grouped dynamic items */}
        {(() => {
          const items = form.clsDynamic || [];
          if (!items.length) return null;
          const g1List = [...new Set(items.map((i) => i.g1))];
          return g1List.map((g1) => {
            const g1Items = items.filter((i) => i.g1 === g1);
            const g2List = [...new Set(g1Items.map((i) => i.g2))];
            return (
              <div key={g1} style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: ".9rem", fontWeight: 700, color: "var(--gray-900)", paddingBottom: ".4rem", borderBottom: "2px solid #2563eb", marginBottom: ".75rem" }}>{g1}</div>
                {g2List.map((g2) => {
                  const g2Items = g1Items.filter((i) => i.g2 === g2);
                  const g3List = [...new Set(g2Items.map((i) => i.g3))];
                  return (
                    <div key={g2} style={{ marginBottom: ".75rem" }}>
                      <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".5rem" }}>{g2}</div>
                      {g3List.map((g3) => {
                        const g3Items = g2Items.filter((i) => i.g3 === g3);
                        return (
                          <div key={g3} style={{ marginBottom: ".5rem" }}>
                            <div style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: ".5rem" }}>{g3}</div>
                            {[...g3Items].reverse().map((item) => (
                              <div key={item._key} style={{ background: "var(--gray-50)", border: "1px solid var(--gray-200)", borderRadius: 8, padding: ".75rem", marginBottom: ".5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem" }}>
                                  <span style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-700)" }}>
                                    {item.code} - {item.name}{item.unit ? ` (${item.unit})` : ""}
                                  </span>
                                  <button onClick={() => removeDKItem(item._key)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray-400)", fontSize: "1.1rem", lineHeight: 1, padding: "0 .25rem" }}>×</button>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr 2fr", gap: "1.25rem" }}>
                                  <div>
                                    <div style={{ fontSize: ".75rem", color: "var(--gray-500)", marginBottom: ".25rem" }}>Giá trị</div>
                                    <input style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} placeholder="Nhập kết quả..." value={item.giaTri} onChange={(e) => updateDKItem(item._key, "giaTri", e.target.value)} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: ".75rem", color: "var(--gray-500)", marginBottom: ".25rem" }}>Đơn vị đo</div>
                                    <input style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} placeholder="Nhập đơn vị..." value={item.donViDo} onChange={(e) => updateDKItem(item._key, "donViDo", e.target.value)} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: ".75rem", color: "var(--gray-500)", marginBottom: ".25rem" }}>Mô tả</div>
                                    <textarea style={{ ...textareaStyle, minHeight: 58, width: "100%", boxSizing: "border-box" }} rows={2} placeholder="Nhập mô tả..." value={item.moTa} onChange={(e) => updateDKItem(item._key, "moTa", e.target.value)} />
                                  </div>
                                  <div>
                                    <div style={{ fontSize: ".75rem", color: "var(--gray-500)", marginBottom: ".25rem" }}>Kết luận</div>
                                    <textarea style={{ ...textareaStyle, minHeight: 58, width: "100%", boxSizing: "border-box" }} rows={2} placeholder="Nhập kết luận..." value={item.ketLuan} onChange={(e) => updateDKItem(item._key, "ketLuan", e.target.value)} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          });
        })()}

      </div>
    </Card>
  );
}


export function Tab7Content({ form, setForm, phanLoaiSucKhoeOptions = [], loadIcd10, errors = {} }) {
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
            <SearchableSelect
              loadOptions={loadIcd10}
              value={form.kl_icd10 || []}
              onChange={(val) => setForm((p) => ({ ...p, kl_icd10: val }))}
            />
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
              style={{ ...inputStyle, border: errors.kl_phanLoai ? "1.5px solid #ef4444" : undefined }}
              value={form.kl_phanLoai || ""}
              onChange={set("kl_phanLoai")}
            >
              <option value="">—Chọn—</option>
              {phanLoaiSucKhoeOptions.map((o) => (
                <option key={o.Id} value={o.Id}>
                  {o.TenPhanLoaiSucKhoe}
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
