import React, { useState } from "react";
import { inputStyle, inputStyleNoBackground, FieldGroup, SectionHeader, Card, Grid3, SearchableSelect, SearchableSingleSelect, subLabelStyle, SignatureBox, } from "./formShared";

export function Tab1TeenContent({ form, setForm, viewOnly = false, gioiTinhOptions = [], danTocOptions = [], tinhThanhOptions = [], phuongXaOptions = [], doiTuongOptions = [], nguonChiTraOptions = [], loaiHinhKCBOptions = [], errors = {} }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
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
            <input style={{ ...inputStyle, border: err("soDinhDanh") }} type="text" inputMode="numeric" maxLength={12} value={form.soDinhDanh} onChange={(e) => setForm((p) => ({ ...p, soDinhDanh: e.target.value.replace(/\D/g, "").slice(0, 12) }))} placeholder="Nhập đủ 12 số CCCD/ÐĐCN..." />
          </FieldGroup>
          <FieldGroup label="Họ tên" required>
            <input style={{ ...inputStyle, border: err("hoTen") }} type="text" value={form.hoTen} onChange={set("hoTen")} />
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
            <input style={{ ...inputStyle, border: err("ngaySinh") }} type="date" max="9999-12-31" value={form.ngaySinh} onChange={set("ngaySinh")} />
          </FieldGroup>
          <FieldGroup label="Ngày cấp">
            <input style={inputStyle} type="date" max="9999-12-31" value={form.ngayCap} onChange={set("ngayCap")} />
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
              error={errors.danToc}
            />
          </FieldGroup>
          <FieldGroup label="Đối tượng khám định kỳ" required>
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
            <input style={inputStyle} type="text" inputMode="numeric" maxLength={10} value={form.dienThoai} onChange={(e) => setForm((p) => ({ ...p, dienThoai: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="Nhập đúng 10 số điện thoại (0...)" />
          </FieldGroup>
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
            <input style={{ ...inputStyle, border: err("soNha") }} type="text" value={form.soNha} onChange={set("soNha")} />
          </FieldGroup>
          <FieldGroup label="Họ và tên bố, mẹ hoặc người giám hộ">
            <input style={inputStyle} type="text" value={form.hoTenNguoiDiCung || ""} onChange={set("hoTenNguoiDiCung")} />
          </FieldGroup>

          <FieldGroup label="Mã định danh (CCCD) của bố, mẹ hoặc người giám hộ">
            <input style={inputStyle} type="text" inputMode="numeric" maxLength={12} value={form.soDinhDanhGiamHo || ""} onChange={(e) => setForm((p) => ({ ...p, soDinhDanhGiamHo: e.target.value.replace(/\D/g, "").slice(0, 12) }))} placeholder="Nhập đủ 12 số CCCD/ÐĐCN..." />
          </FieldGroup>
          <FieldGroup label="Điện thoại">
            <input style={inputStyle} type="text" inputMode="numeric" maxLength={10} value={form.soDienThoaiGiamHo || ""} onChange={(e) => setForm((p) => ({ ...p, soDienThoaiGiamHo: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="Nhập đúng 10 số điện thoại (0...)" />
          </FieldGroup>
          <FieldGroup label="Lý do khám sức khỏe" required>
            <input style={{ ...inputStyle, border: err("lyDoKham") }} type="text" value={form.lyDoKham} onChange={set("lyDoKham")} />
          </FieldGroup>
        </Grid3>
      </Card>
    </>
  );
}

export function Tab2TeenContent({ form, setForm, loaiHinhKCBOptions = [] }) {
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
          <SearchableSingleSelect
            options={loaiHinhKCBOptions.map((o) => ({ value: o.Id, label: o.TenLoaiHinhKCB }))}
            value={form.loaiHinhKham}
            onChange={(val) => setForm((p) => ({ ...p, loaiHinhKham: val }))}
            placeholder="—Chọn loại hình—"
          />
        </FieldGroup>
      </div>
    </Card>
  );
}


export function Tab3TeenContent({ form, setForm, loadIcd10, giadinhCats = [], tiemChungCats = [], sanKhoaCats = [], banthanCats = [], dieuTriCats = [] }) {
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const TC_EXTRA_FIELDS = ["TIEM_CHUNG_CAC_LOAI_KHAC", "TEN_TIEM_CHUNG_CAC_LOAI_KHAC"];
  const tcExtraCat  = tiemChungCats.find((c) => c.Field_AX === "TIEM_CHUNG_CAC_LOAI_KHAC");
  const tcExtraOpts = tcExtraCat?.Option ? JSON.parse(tcExtraCat.Option) : [];

  const extraVaccines = form.teen_tc_extra || [];
  const addExtraVaccine = () =>
    setForm((prev) => ({ ...prev, teen_tc_extra: [...(prev.teen_tc_extra || []), { id: Date.now(), label: "", status: String(tcExtraOpts[0]?.id ?? "") }] }));
  const updateExtraVaccine = (id, field, val) =>
    setForm((prev) => ({
      ...prev,
      teen_tc_extra: (prev.teen_tc_extra || []).map((v) => (v.id === id ? { ...v, [field]: val } : v)),
    }));
  const removeExtraVaccine = (id) =>
    setForm((prev) => ({ ...prev, teen_tc_extra: (prev.teen_tc_extra || []).filter((v) => v.id !== id) }));

  const gdParent  = giadinhCats.find((c) => c.ParentId === null);
  const gdChild   = giadinhCats.find((c) => c.ParentId !== null && c.ParentId === gdParent?.td_cauhoiid);
  const gdOptions = gdParent?.Option ? JSON.parse(gdParent.Option) : [{ id: 0, name: "Không" }, { id: 1, name: "Có" }];
  const gdQuestion = gdParent?.CauHoi || "Có ai trong gia đình mắc bệnh bẩm sinh hoặc bệnh truyền nhiễm không?";
  const gdSelectedId = String(form[gdParent?.Field_AX] ?? gdOptions[0]?.id ?? "0");
  const gdChildVisible = gdChild && gdSelectedId !== "0";
  const gdChildLoai = (gdChild?.LoaiNhap || "").trim();

  const btParent      = banthanCats.find((c) => c.ParentId === null);
  const btChild       = banthanCats.find((c) => c.ParentId !== null);
  const btOpts        = btParent?.Option ? JSON.parse(btParent.Option) : [];
  const btSelectedId  = form[btParent?.Field_AX] ?? String(btOpts[0]?.id ?? "0");
  const btShowChild   = String(btSelectedId) !== "0";

  const skRadio   = sanKhoaCats.find((c) => c.LoaiNhap === "Radio");
  const skSelect  = sanKhoaCats.find((c) => c.LoaiNhap === "Select");
  const skMulti   = sanKhoaCats.find((c) => c.LoaiNhap === "MultiSelect");
  const skRadioOpts   = skRadio?.Option ? JSON.parse(skRadio.Option) : [];
  const skSelectOpts  = skSelect?.Option ? JSON.parse(skSelect.Option) : [];
  const skDefaultId    = skRadioOpts.find((o) => o.name === "Có")?.id ?? 1;
  const skSelectedId   = form[skRadio?.Field_AX] ?? String(skDefaultId);
  const skShowChildren = String(skSelectedId) === "0";

  const tcRegularCats  = tiemChungCats.filter((c) => !TC_EXTRA_FIELDS.includes(c.Field_AX));

  const tcRadioGroup = (cat) => {
    const opts = cat.Option ? JSON.parse(cat.Option) : [];
    const key = cat.Field_AX;
    return (
      <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
        {opts.map((opt) => (
          <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
            <input type="radio" name={key} checked={form[key] === String(opt.id)} onChange={() => radioSet(key, String(opt.id))} style={{ accentColor: "#2563eb" }} />
            {opt.name}
          </label>
        ))}
      </div>
    );
  };

  return (
    <>
      <Card>
        <SectionHeader num="3" title="Tiền sử bệnh tật" subtitle="" />

        {/* 1. Tiền sử gia đình */}
        <div style={subLabelStyle}>1. Tiền sử gia đình:</div>
        <div style={{ padding: "1rem", background: "var(--gray-50)", border: "1px solid var(--gray-200)", borderRadius: 8, marginBottom: "1.25rem" }}>
          <p style={{ fontSize: ".84rem", color: "var(--gray-700)", marginBottom: ".75rem", lineHeight: 1.5 }}>{gdQuestion}</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {gdOptions.map((opt) => (
              <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".35rem", cursor: "pointer", fontSize: ".85rem", fontWeight: gdSelectedId === String(opt.id) ? 600 : 400, color: gdSelectedId === String(opt.id) ? "var(--primary)" : "var(--gray-700)" }}>
                <input type="radio" name={gdParent?.Field_AX} value={String(opt.id)} checked={gdSelectedId === String(opt.id)} onChange={() => radioSet(gdParent?.Field_AX, String(opt.id))} style={{ accentColor: "#2563eb", width: 15, height: 15 }} />
                {opt.name}
              </label>
            ))}
          </div>
          {gdChildVisible && (
            <div style={{ marginTop: ".75rem" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: ".35rem" }}>
                {gdChild.CauHoi}
                {gdChildLoai.startsWith("MultiSelect") && <span style={{ fontWeight: 400, color: "var(--gray-400)", marginLeft: ".3rem" }}>(Mã bệnh ICD-10)</span>}
              </div>
              {gdChildLoai.startsWith("MultiSelect") && (
                <SearchableSelect loadOptions={loadIcd10} value={form[gdChild.Field_AX] || []} onChange={(val) => setForm((prev) => ({ ...prev, [gdChild.Field_AX]: val }))} />
              )}
              {gdChildLoai === "Radio" && (() => {
                const gdChildOpts = gdChild.Option ? JSON.parse(gdChild.Option) : [];
                const gdChildVal = String(form[gdChild.Field_AX] ?? gdChildOpts[0]?.id ?? "0");
                return (
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    {gdChildOpts.map((opt) => (
                      <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                        <input type="radio" name={gdChild.Field_AX} checked={gdChildVal === String(opt.id)} onChange={() => radioSet(gdChild.Field_AX, String(opt.id))} style={{ accentColor: "#2563eb" }} />
                        {opt.name}
                      </label>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* 2. Tiền sử bản thân */}
        <div style={subLabelStyle}>2. Tiền sử bản thân:</div>

        {/* a) Sản khoa */}
        {skRadio && (
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>a) {skRadio.CauHoi}:</div>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              {skRadioOpts.slice().reverse().map((opt) => (
                <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                  <input type="radio" name={skRadio.Field_AX} checked={String(skSelectedId) === String(opt.id)} onChange={() => radioSet(skRadio.Field_AX, String(opt.id))} style={{ accentColor: "#2563eb" }} />
                  {opt.name}
                </label>
              ))}
            </div>
            {skShowChildren && skSelect && (
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: ".5rem", flexWrap: "wrap" }}>
                {skSelectOpts.map((opt) => (
                  <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                    <input type="radio" name={skSelect.Field_AX} checked={form[skSelect.Field_AX] === String(opt.id)} onChange={() => radioSet(skSelect.Field_AX, String(opt.id))} style={{ accentColor: "#2563eb" }} />
                    {opt.name}
                  </label>
                ))}
              </div>
            )}
            {skShowChildren && skMulti && (
              <div style={{ marginTop: ".75rem" }}>
                <div style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--gray-700)", marginBottom: ".35rem" }}>{skMulti.CauHoi}</div>
                <SearchableSelect loadOptions={loadIcd10} value={form[skMulti.Field_AX] || []} onChange={(val) => setForm((prev) => ({ ...prev, [skMulti.Field_AX]: val }))} />
              </div>
            )}
          </div>
        )}

        {/* b) Tiêm chủng */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>b) Tiêm chủng:</div>
          <div style={{ border: "1px solid var(--gray-200)", borderRadius: 8, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--gray-50)", padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
              <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Loại vắc xin</span>
              <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Tình trạng tiêm/uống vắc xin</span>
            </div>
            {tcRegularCats.map((cat) => (
              <div key={cat.td_cauhoiid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".65rem 1rem", borderBottom: "1px solid var(--gray-100)" }}>
                <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>{cat.CauHoi}</span>
                {tcRadioGroup(cat)}
              </div>
            ))}
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
                      {tcExtraOpts.map((opt) => (
                        <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                          <input type="radio" name={`teen_tc_extra_${vac.id}`} checked={vac.status === String(opt.id)} onChange={() => updateExtraVaccine(vac.id, "status", String(opt.id))} style={{ accentColor: "#2563eb" }} />
                          {opt.name}
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
        {btParent && (
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>c) Tiền sử bệnh/tật (các bệnh bẩm sinh và mãn tính):</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>{btParent.CauHoi}</span>
              <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
                {btOpts.map((opt) => (
                  <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                    <input type="radio" name={btParent.Field_AX} checked={String(btSelectedId) === String(opt.id)} onChange={() => radioSet(btParent.Field_AX, String(opt.id))} style={{ accentColor: "#2563eb" }} />
                    {opt.name}
                  </label>
                ))}
              </div>
            </div>
            {btShowChild && btChild && (
              <div style={{ marginTop: ".75rem" }}>
                <div style={{ fontSize: ".8rem", color: "var(--gray-500)", marginBottom: ".35rem" }}>{btChild.CauHoi}</div>
                <SearchableSelect loadOptions={loadIcd10} value={form[btChild.Field_AX] || []} onChange={(val) => setForm((prev) => ({ ...prev, [btChild.Field_AX]: val }))} />
              </div>
            )}
          </div>
        )}

        {/* d) Đang điều trị */}
        {(() => {
          const dtParent = dieuTriCats.find((c) => c.ParentId === null);
          if (!dtParent) return null;
          const dtOpts = dtParent.Option ? (() => { try { return JSON.parse(dtParent.Option); } catch { return []; } })() : [];
          const dtChildren = dieuTriCats.filter((c) => c.ParentId === dtParent.td_cauhoiid).sort((a, b) => a.TT - b.TT);
          const dtVal = String(form[dtParent.Field_AX] ?? "0");
          const dtShowChildren = dtVal === String(dtParent.ParentValue || dtChildren[0]?.ParentValue || "1");
          return (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--gray-600)", marginBottom: ".5rem" }}>d) {dtParent.CauHoi}</div>
                <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
                  {dtOpts.map((opt) => (
                    <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: ".3rem", cursor: "pointer", fontSize: ".85rem" }}>
                      <input type="radio" name={dtParent.Field_AX} checked={dtVal === String(opt.id)} onChange={() => radioSet(dtParent.Field_AX, String(opt.id))} style={{ accentColor: "#2563eb" }} />
                      {opt.name}
                    </label>
                  ))}
                </div>
              </div>
              {dtShowChildren && dtChildren.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: ".75rem" }}>
                  {dtChildren.map((child) => (
                    <FieldGroup key={child.td_cauhoiid} label={child.CauHoi}>
                      <input style={inputStyle} type="text" value={form[child.Field_AX] || ""} onChange={(e) => setForm((prev) => ({ ...prev, [child.Field_AX]: e.target.value }))} />
                    </FieldGroup>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </Card>
    </>
  );
}

function TeenNhiRow({ label, fk, form, setForm }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", padding: "1rem 0", borderBottom: "1px solid var(--gray-100)", alignItems: "start" }}>
      <div>
        <div style={{ fontSize: ".84rem", color: "var(--gray-700)", fontWeight: 500, marginBottom: ".5rem" }}>{label}</div>
        <input style={inputStyle} type="text" value={form[fk] || ""} onChange={(e) => setForm((p) => ({ ...p, [fk]: e.target.value }))} />
      </div>
      <SignatureBox id={fk} value={form[`${fk}_ckdt`]} onChange={(v) => setForm((p) => ({ ...p, [`${fk}_ckdt`]: v }))} />
    </div>
  );
}

const THI_LUC = ["10/10","9/10","8/10","7/10","6/10","5/10","4/10","3/10","2/10","1/10"];

export function Tab5TeenContent({ form, setForm }) {
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const sectionStyle = { marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--gray-100)" };
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: ".75rem" };

  return (
    <Card>
      <SectionHeader num="5" title="Khám lâm sàng" subtitle="Nhi khoa và các chuyên khoa" />

      <div style={subLabelStyle}>1. Khám Nhi khoa</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", marginBottom: ".25rem" }}>
        <div />
        <div style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--gray-700)", textAlign: "center" }}>Họ tên và chữ ký của bác sĩ</div>
      </div>
      <TeenNhiRow label="a, Tuần hoàn" fk="teen_nk_a" form={form} setForm={setForm} />
      <TeenNhiRow label="b, Hô hấp" fk="teen_nk_b" form={form} setForm={setForm} />
      <TeenNhiRow label="c, Tiêu hóa" fk="teen_nk_c" form={form} setForm={setForm} />
      <TeenNhiRow label="d, Thận - Tiết niệu - Sinh dục" fk="teen_nk_d" form={form} setForm={setForm} />
      <TeenNhiRow label="e, Thần kinh" fk="teen_nk_g" form={form} setForm={setForm} />
      <TeenNhiRow label="f, Tâm thần" fk="teen_nk_h" form={form} setForm={setForm} />
      <TeenNhiRow label="g, Lâm sàng khác" fk="teen_nk_lsk" form={form} setForm={setForm} />

      {/* ── 2. Khám Chuyên khoa ── */}
      <div style={{ ...subLabelStyle, marginTop: "1.5rem" }}>2. Khám Chuyên khoa</div>

      {/* 2.1 Mắt */}
      <div style={sectionStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>
          <div>
            <div style={{ ...subLabelStyle, fontSize: ".8rem", marginBottom: ".75rem" }}>2.1. Khám Mắt</div>
            <div style={grid2}>
              <FieldGroup label="Kết quả khám thị lực không kính (mắt phải)">
                <select style={inputStyle} value={form.teen_mat_khongKinhPhai || ""} onChange={set("teen_mat_khongKinhPhai")}>
                  <option value="">— Chọn —</option>
                  {THI_LUC.map((o) => <option key={o}>{o}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Kết quả khám thị lực không kính (mắt trái)">
                <select style={inputStyle} value={form.teen_mat_khongKinhTrai || ""} onChange={set("teen_mat_khongKinhTrai")}>
                  <option value="">— Chọn —</option>
                  {THI_LUC.map((o) => <option key={o}>{o}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Kết quả khám thị lực có kính (mắt phải)">
                <select style={inputStyle} value={form.teen_mat_coKinhPhai || ""} onChange={set("teen_mat_coKinhPhai")}>
                  <option value="">— Chọn —</option>
                  {THI_LUC.map((o) => <option key={o}>{o}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Kết quả khám thị lực có kính (mắt trái)">
                <select style={inputStyle} value={form.teen_mat_coKinhTrai || ""} onChange={set("teen_mat_coKinhTrai")}>
                  <option value="">— Chọn —</option>
                  {THI_LUC.map((o) => <option key={o}>{o}</option>)}
                </select>
              </FieldGroup>
            </div>
            <FieldGroup label="Các bệnh về mắt (nếu có)">
              <input style={inputStyle} type="text" value={form.teen_mat_benh || ""} onChange={set("teen_mat_benh")} />
            </FieldGroup>
          </div>
          <SignatureBox id="teen_mat_ck" value={form.teen_mat_ckdt} onChange={(v) => setForm((p) => ({ ...p, teen_mat_ckdt: v }))} />
        </div>
      </div>

      {/* 2.2 Tai Mũi Họng */}
      <div style={sectionStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>
          <div>
            <div style={{ ...subLabelStyle, fontSize: ".8rem", marginBottom: ".75rem" }}>2.2. Khám Tai Mũi Họng</div>
            <div style={grid2}>
              <FieldGroup label="Kết quả khám thính lực tai trái (nói thường)">
                <input style={inputStyle} type="text" value={form.teen_tmh_taiTraiThuong || ""} onChange={set("teen_tmh_taiTraiThuong")} />
              </FieldGroup>
              <FieldGroup label="Kết quả khám thính lực tai trái (nói thầm)">
                <input style={inputStyle} type="text" value={form.teen_tmh_taiTraiTham || ""} onChange={set("teen_tmh_taiTraiTham")} />
              </FieldGroup>
              <FieldGroup label="Kết quả khám thính lực tai phải (nói thường)">
                <input style={inputStyle} type="text" value={form.teen_tmh_taiPhaiThuong || ""} onChange={set("teen_tmh_taiPhaiThuong")} />
              </FieldGroup>
              <FieldGroup label="Kết quả khám thính lực tai phải (nói thầm)">
                <input style={inputStyle} type="text" value={form.teen_tmh_taiPhaiTham || ""} onChange={set("teen_tmh_taiPhaiTham")} />
              </FieldGroup>
            </div>
            <FieldGroup label="Các bệnh về tai mũi họng (nếu có)">
              <input style={inputStyle} type="text" value={form.teen_tmh_benh || ""} onChange={set("teen_tmh_benh")} />
            </FieldGroup>
          </div>
          <SignatureBox id="teen_tmh_ck" value={form.teen_tmh_ckdt} onChange={(v) => setForm((p) => ({ ...p, teen_tmh_ckdt: v }))} />
        </div>
      </div>

      {/* 2.3 Răng Hàm Mặt */}
      <div style={sectionStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>
          <div>
            <div style={{ ...subLabelStyle, fontSize: ".8rem", marginBottom: ".75rem" }}>2.3. Khám Răng Hàm Mặt</div>
            <div style={grid2}>
              <FieldGroup label="Kết quả khám hàm trên">
                <input style={inputStyle} type="text" value={form.teen_rhm_hamTren || ""} onChange={set("teen_rhm_hamTren")} />
              </FieldGroup>
              <FieldGroup label="Kết quả khám hàm dưới">
                <input style={inputStyle} type="text" value={form.teen_rhm_hamDuoi || ""} onChange={set("teen_rhm_hamDuoi")} />
              </FieldGroup>
            </div>
            <FieldGroup label="Các bệnh về răng-hàm-mặt (nếu có)">
              <input style={inputStyle} type="text" value={form.teen_rhm_benh || ""} onChange={set("teen_rhm_benh")} />
            </FieldGroup>
          </div>
          <SignatureBox id="teen_rhm_ck" value={form.teen_rhm_ckdt} onChange={(v) => setForm((p) => ({ ...p, teen_rhm_ckdt: v }))} />
        </div>
      </div>

    </Card>
  );
}
