import React, { useState } from "react";
import { labelStyle, inputStyle, inputStyleNoBackground, textareaStyle, helperStyle, Required, FieldGroup, SectionHeader, Card, Grid3, TabTitle, GD_ICD10_OPTIONS, SearchableSelect, SearchableSingleSelect, subLabelStyle, SignatureBox, PHAN_LOAI_LS, PHAN_LOAI_SK } from "./formShared";

export function Tab1TeenContent({ form, setForm, gioiTinhOptions = [], danTocOptions = [], tinhThanhOptions = [], phuongXaOptions = [], doiTuongOptions = [], nguonChiTraOptions = [] }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

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
            <input style={inputStyle} type="text" value={form.soDinhDanh} onChange={set("soDinhDanh")} placeholder="Nhập đủ 12 số CCCD/ÐĐCN..." />
          </FieldGroup>
          <FieldGroup label="Họ tên" required>
            <input style={inputStyle} type="text" value={form.hoTen} onChange={set("hoTen")} />
          </FieldGroup>
          <FieldGroup label="Giới tính" required>
            <select style={inputStyle} value={form.gioiTinh} onChange={set("gioiTinh")}>
              <option value="">—Chọn—</option>
              {gioiTinhOptions.map((g) => (
                <option key={g.Id} value={g.Id}>{g.TenGioiTinh}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Ngày sinh" required>
            <input style={inputStyle} type="date" value={form.ngaySinh} onChange={set("ngaySinh")} />
          </FieldGroup>
          <FieldGroup label="Ngày cấp">
            <input style={inputStyle} type="date" value={form.ngayCap} onChange={set("ngayCap")} />
          </FieldGroup>
          <FieldGroup label="Nơi cấp">
            <input style={inputStyle} type="text" value={form.noiCap} onChange={set("noiCap")} />
          </FieldGroup>

          <FieldGroup label="Dân tộc" required>
            <SearchableSingleSelect
              value={form.danToc}
              onChange={(val) => set("danToc")({ target: { value: val } })}
              options={danTocOptions.map((d) => ({ value: d.MaDanToc, label: d.TenDanToc }))}
              placeholder="—Chọn dân tộc—"
            />
          </FieldGroup>
          <FieldGroup label="Đối tượng khám định kỳ" required>
            <SearchableSingleSelect
              value={form.doiTuongKham}
              onChange={(val) => set("doiTuongKham")({ target: { value: val } })}
              options={doiTuongOptions.map((d) => ({ value: d.Id, label: d.Name }))}
              placeholder="—Chọn đối tượng—"
            />
          </FieldGroup>
          <FieldGroup label="Nguồn chi trả" required>
            <SearchableSingleSelect
              value={form.nguonChiTra}
              onChange={(val) => set("nguonChiTra")({ target: { value: val } })}
              options={nguonChiTraOptions.map((n) => ({ value: n.Id, label: n.Name }))}
              placeholder="—Chọn nguồn chi trả—"
            />
          </FieldGroup>

          <FieldGroup label="Nhóm máu">
            <select style={inputStyle} value={form.nhomMau} onChange={set("nhomMau")}>
              <option value="">— Chọn —</option>
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
          <FieldGroup label="Điện thoại">
            <input style={inputStyle} type="text" value={form.dienThoai} onChange={set("dienThoai")} placeholder="Nhập đúng 10 số điện thoại (0...)" maxLength={10} />
          </FieldGroup>
          <FieldGroup label="Tỉnh/Thành phố" required>
            <SearchableSingleSelect
              value={form.tinhThanhPho}
              onChange={(val) => set("tinhThanhPho")({ target: { value: val } })}
              options={tinhThanhOptions.map((t) => ({ value: t.MaTinh, label: t.TenTinh }))}
              placeholder="—Chọn tỉnh/thành phố—"
            />
          </FieldGroup>

          <FieldGroup label="Phường/Xã" required>
            <SearchableSingleSelect
              value={form.phuongXa}
              onChange={(val) => set("phuongXa")({ target: { value: val } })}
              options={phuongXaOptions.map((p) => ({ value: p.MaPhuongXa, label: p.TenPhuongXa }))}
              placeholder="—Chọn phường/xã—"
            />
          </FieldGroup>
          <FieldGroup label="Số nhà/thôn/xóm" required>
            <input style={inputStyle} type="text" value={form.soNha} onChange={set("soNha")} />
          </FieldGroup>
          <FieldGroup label="Họ và tên bố, mẹ hoặc người giám hộ">
            <input style={inputStyle} type="text" value={form.hoTenNguoiDiCung || ""} onChange={set("hoTenNguoiDiCung")} />
          </FieldGroup>

          <FieldGroup label="Mã định danh (CCCD) của bố, mẹ hoặc người giám hộ">
            <input style={inputStyle} type="text" value={form.soDinhDanhGiamHo || ""} onChange={set("soDinhDanhGiamHo")} placeholder="Nhập đủ 12 số CCCD/ÐĐCN..." />
          </FieldGroup>
          <FieldGroup label="Điện thoại">
            <input style={inputStyle} type="text" value={form.soDienThoaiGiamHo || ""} onChange={set("soDienThoaiGiamHo")} placeholder="Nhập đúng 10 số điện thoại (0...)" maxLength={10} />
          </FieldGroup>
          <FieldGroup label="Lý do khám sức khỏe" required>
            <input style={inputStyle} type="text" value={form.lyDoKham} onChange={set("lyDoKham")} />
          </FieldGroup>
        </Grid3>
      </Card>
    </>
  );
}

export function Tab2TeenContent({ form, setForm }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Card>
      <SectionHeader num="2" title="Thông tin chung về lần khám" subtitle="Mã cơ sở khám bệnh, ngày giờ và loại hình khám" />
      <Grid3>
        <FieldGroup label="Mã CSKCB" required>
          <input style={inputStyleNoBackground} className="field-readonly-dark" type="text" value={form.maCskcb} disabled />
        </FieldGroup>
        <FieldGroup label="Mã CSKCB theo chuẩn GLN" required>
          <input style={inputStyleNoBackground} className="field-readonly-dark" type="text" value={form.maCskcbGln} disabled />
        </FieldGroup>
        <FieldGroup label="Mã lần khám" helper="Giá trị được hệ thống quản lý theo CSYT.">
          <input style={inputStyleNoBackground} className="field-readonly-light" type="text" value={form.maLanKham} disabled />
        </FieldGroup>
      </Grid3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
        <FieldGroup label="Ngày khám sức khỏe" required>
          <input style={inputStyle} type="date" value={form.ngayKham} onChange={set("ngayKham")} />
        </FieldGroup>
        <FieldGroup label="Giờ khám">
          <input style={inputStyle} type="time" value={form.gioKham} onChange={set("gioKham")} />
        </FieldGroup>
        <FieldGroup label="Loại hình khám bệnh" required>
          <select style={inputStyle} value={form.loaiHinhKham} onChange={set("loaiHinhKham")}>
            <option value="">—Chọn—</option>
            <option value="Khám ngoại trú">Khám ngoại trú</option>
            <option value="Khám tại nhà">Khám tại nhà</option>
            <option value="Khám tập trung">Khám tập trung</option>
          </select>
        </FieldGroup>
      </div>
    </Card>
  );
}

export const TEEN_VACCINES = [
  { id: "bcg", label: "BCG" },
  { id: "bachHauHoGaUonVan", label: "Bạch hầu-Ho gà-Uốn ván" },
  { id: "soi", label: "Sởi" },
  { id: "baiLiet", label: "Bại liệt" },
  { id: "viemNaoNhatBan", label: "Viêm não Nhật Bản B" },
  { id: "viemGanB", label: "Viêm gan B" },
];

export function Tab3TeenContent({ form, setForm }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const extraVaccines = form.teen_tc_extra || [];
  const addExtraVaccine = () =>
    setForm((prev) => ({ ...prev, teen_tc_extra: [...(prev.teen_tc_extra || []), { id: Date.now(), label: "", status: "Không rõ" }] }));
  const updateExtraVaccine = (id, field, val) =>
    setForm((prev) => ({
      ...prev,
      teen_tc_extra: (prev.teen_tc_extra || []).map((v) => (v.id === id ? { ...v, [field]: val } : v)),
    }));
  const removeExtraVaccine = (id) =>
    setForm((prev) => ({ ...prev, teen_tc_extra: (prev.teen_tc_extra || []).filter((v) => v.id !== id) }));

  const inlineQRow = (question, radioName, defaultVal) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
      <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>{question}</span>
      <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
        {["Không", "Có"].map((opt) => (
          <label key={opt} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
            <input type="radio" name={radioName} checked={(form[radioName] || defaultVal) === opt} onChange={() => radioSet(radioName, opt)} style={{ accentColor: "#2563eb" }} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  const tcRadioGroup = (key) => (
    <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
      {["Có", "Không", "Không rõ"].map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
          <input type="radio" name={key} checked={(form[key] ?? "Không rõ") === opt} onChange={() => radioSet(key, opt)} style={{ accentColor: "#2563eb" }} />
          {opt}
        </label>
      ))}
    </div>
  );

  return (
    <>
      <Card>
        <SectionHeader num="3" title="Tiền sử bệnh tật" subtitle="" />

        {/* 1. Tiền sử gia đình */}
        <div style={subLabelStyle}>1. Tiền sử gia đình:</div>
        <div style={{ marginBottom: "1.25rem" }}>
          {inlineQRow("Có ai trong gia đình mắc bệnh bẩm sinh hoặc bệnh truyền nhiễm không?", "teen_gdBenhBamSinh", "Không")}
          {(form.teen_gdBenhBamSinh || "Không") === "Có" && (
            <div style={{ marginTop: ".75rem" }}>
              <div style={{ fontSize: ".8rem", color: "var(--gray-500)", marginBottom: ".35rem" }}>Tiền sử bệnh, tật gia đình</div>
              <SearchableSelect options={GD_ICD10_OPTIONS} value={form.teen_gdICD10 || []} onChange={(val) => setForm((prev) => ({ ...prev, teen_gdICD10: val }))} />
            </div>
          )}
        </div>

        {/* 2. Tiền sử bản thân */}
        <div style={subLabelStyle}>2. Tiền sử bản thân:</div>

        {/* a) Sản khoa */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>a) Sản khoa:</div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {["Bình thường", "Không bình thường"].map((opt) => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                <input type="radio" name="teen_sanKhoa" checked={(form.teen_sanKhoa || "Bình thường") === opt} onChange={() => radioSet("teen_sanKhoa", opt)} style={{ accentColor: "#2563eb" }} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* b) Tiêm chủng */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>b) Tiêm chủng:</div>
          <div style={{ border: "1px solid var(--gray-200)", borderRadius: 8, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--gray-50)", padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
              <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Loại vắc xin</span>
              <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Tình trạng tiêm/uống vắc xin</span>
            </div>
            {/* Fixed vaccines */}
            {TEEN_VACCINES.map((vac) => {
              const key = `teen_tc_${vac.id}`;
              return (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".65rem 1rem", borderBottom: "1px solid var(--gray-100)" }}>
                  <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>{vac.label}</span>
                  {tcRadioGroup(key)}
                </div>
              );
            })}
            {/* Loại vắc xin khác divider row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".6rem 1rem", background: "var(--gray-50)", borderBottom: extraVaccines.length > 0 ? "1px solid var(--gray-200)" : "none" }}>
              <span style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)" }}>Loại vắc xin khác</span>
              <div style={{ display: "flex", gap: ".4rem" }}>
                <button type="button" onClick={addExtraVaccine} title="Thêm dòng" style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--primary)", background: "var(--primary)", color: "#fff", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</button>
              </div>
            </div>
            {/* Extra vaccine rows */}
            {extraVaccines.length > 0 && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 260px 60px", background: "var(--gray-50)", padding: ".5rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
                  <span style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--gray-600)" }}>Tên vắc xin</span>
                  <span style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--gray-600)", textAlign: "center" }}>Tình trạng tiêm/uống vắc xin</span>
                  <span style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--gray-600)", textAlign: "center" }}>Thao tác</span>
                </div>
                {extraVaccines.map((vac) => (
                  <div key={vac.id} style={{ display: "grid", gridTemplateColumns: "1fr 260px 60px", padding: ".5rem 1rem", borderBottom: "1px solid var(--gray-100)", alignItems: "center", gap: ".75rem" }}>
                    <input style={{ ...inputStyle, margin: 0 }} type="text" placeholder="Tên vắc xin..." value={vac.label} onChange={(e) => updateExtraVaccine(vac.id, "label", e.target.value)} />
                    <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center" }}>
                      {["Có", "Không", "Không rõ"].map((opt) => (
                        <label key={opt} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                          <input type="radio" name={`teen_tc_extra_${vac.id}`} checked={vac.status === opt} onChange={() => updateExtraVaccine(vac.id, "status", opt)} style={{ accentColor: "#2563eb" }} />
                          {opt}
                        </label>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button type="button" onClick={() => removeExtraVaccine(vac.id)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #ef4444", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>−</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* c) Bệnh bẩm sinh / mãn tính */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>c) Tiền sử bệnh/tật (các bệnh bẩm sinh và mãn tính):</div>
          {inlineQRow("Bản thân có đang mắc các bệnh bẩm sinh và mãn tính không?", "teen_benhBamSinhManTinh", "Không")}
          {(form.teen_benhBamSinhManTinh || "Không") === "Có" && (
            <div style={{ marginTop: ".75rem" }}>
              <div style={{ fontSize: ".8rem", color: "var(--gray-500)", marginBottom: ".35rem" }}>Tên bệnh (Có thể chọn nhiều mẫu)</div>
              <SearchableSelect options={GD_ICD10_OPTIONS} value={form.teen_benhBamSinhICD10 || []} onChange={(val) => setForm((prev) => ({ ...prev, teen_benhBamSinhICD10: val }))} />
            </div>
          )}
        </div>

        {/* d) Đang điều trị */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>d) Hiện tại có đang điều trị bệnh gì không?</div>
          {inlineQRow("Hiện tại có đang điều trị bệnh gì không?", "teen_dangDieuTri", "Không")}
          {(form.teen_dangDieuTri || "Không") === "Có" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: ".75rem" }}>
              <FieldGroup label="Bệnh đang điều trị">
                <input style={inputStyle} type="text" placeholder="" value={form.teen_benhDieuTri || ""} onChange={set("teen_benhDieuTri")} />
              </FieldGroup>
              <FieldGroup label="Thuốc đang sử dụng">
                <input style={inputStyle} type="text" placeholder="" value={form.teen_thuocDangSD || ""} onChange={set("teen_thuocDangSD")} />
              </FieldGroup>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export function Tab5TeenContent({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const plSelect = (key) => (
    <select style={inputStyle} value={form[key] || "Loại II (Khỏe)"} onChange={set(key)}>
      {PHAN_LOAI_LS.map((o) => <option key={o}>{o}</option>)}
    </select>
  );

  const NhiRow = ({ label, fk }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", padding: "1rem 0", borderBottom: "1px solid var(--gray-100)", alignItems: "start" }}>
      <div>
        <div style={{ fontSize: ".84rem", color: "var(--gray-700)", fontWeight: 500, marginBottom: ".5rem" }}>{label}</div>
        <input style={inputStyle} type="text" value={form[fk] || ""} onChange={set(fk)} />
      </div>
      <SignatureBox id={fk} />
    </div>
  );

  const ChuyenKhoaRow = ({ secLabel, fk, label }) => (
    <div style={{ marginTop: "1.25rem" }}>
      <div style={subLabelStyle}>{secLabel}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>
        <div>
          <FieldGroup label={label}>
            <input style={inputStyle} type="text" value={form[fk] || ""} onChange={set(fk)} />
          </FieldGroup>
        </div>
        <SignatureBox id={fk} />
      </div>
    </div>
  );

  const THI_LUC = ["10/10","9/10","8/10","7/10","6/10","5/10","4/10","3/10","2/10","1/10"];

  return (
    <Card>
      <SectionHeader num="5" title="Khám lâm sàng" subtitle="Nhi khoa và các chuyên khoa" />

      <div style={subLabelStyle}>1. Khám Nhi khoa</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", marginBottom: ".25rem" }}>
        <div />
        <div style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--gray-700)", textAlign: "center" }}>Họ tên và chữ ký của bác sĩ</div>
      </div>
      <NhiRow label="a, Tuần hoàn" fk="teen_nk_a" />
      <NhiRow label="b, Hô hấp" fk="teen_nk_b" />
      <NhiRow label="c, Tiêu hóa" fk="teen_nk_c" />
      <NhiRow label="d, Thận - Tiết niệu - Sinh dục" fk="teen_nk_d" />
      <NhiRow label="e, Nội tiết" fk="teen_nk_e" />
      <NhiRow label="f, Cơ - xương - khớp" fk="teen_nk_f" />
      <NhiRow label="g, Thần kinh" fk="teen_nk_g" />
      <NhiRow label="h, Tâm thần" fk="teen_nk_h" />

      <ChuyenKhoaRow secLabel="2. Ngoại khoa" fk="teen_ngk" label="Kết quả khám ngoại khoa" />
      <ChuyenKhoaRow secLabel="3. Da liễu" fk="teen_dl" label="Kết quả khám da liễu" />
      <ChuyenKhoaRow secLabel="4. Sản phụ khoa" fk="teen_spk" label="Kết quả khám sản phụ khoa" />

      <div style={{ marginTop: "1.25rem" }}>
        <div style={subLabelStyle}>5. Khám mắt</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: ".6rem" }}>Kết quả khám thị lực:</div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: ".5rem 1rem", alignItems: "center", marginBottom: ".5rem" }}>
              <span />
              <label style={{ ...labelStyle, marginBottom: 0, textAlign: "center" }}>Trái</label>
              <label style={{ ...labelStyle, marginBottom: 0, textAlign: "center" }}>Phải</label>
              <label style={labelStyle}>Thị lực không kính</label>
              <select style={inputStyle} value={form.teen_mat_khongKinhTrai || ""} onChange={set("teen_mat_khongKinhTrai")}>
                <option value="">—</option>
                {THI_LUC.map((o) => <option key={o}>{o}</option>)}
              </select>
              <select style={inputStyle} value={form.teen_mat_khongKinhPhai || ""} onChange={set("teen_mat_khongKinhPhai")}>
                <option value="">—</option>
                {THI_LUC.map((o) => <option key={o}>{o}</option>)}
              </select>
              <label style={labelStyle}>Thị lực có kính</label>
              <select style={inputStyle} value={form.teen_mat_coKinhTrai || ""} onChange={set("teen_mat_coKinhTrai")}>
                <option value="">—</option>
                {THI_LUC.map((o) => <option key={o}>{o}</option>)}
              </select>
              <select style={inputStyle} value={form.teen_mat_coKinhPhai || ""} onChange={set("teen_mat_coKinhPhai")}>
                <option value="">—</option>
                {THI_LUC.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <SignatureBox id="teen_mat" />
        </div>
      </div>

      <ChuyenKhoaRow secLabel="6. Tai mũi họng" fk="teen_tmh" label="Kết quả khám tai mũi họng" />
      <ChuyenKhoaRow secLabel="7. Răng hàm mặt" fk="teen_rhm" label="Kết quả khám răng hàm mặt" />
    </Card>
  );
}
