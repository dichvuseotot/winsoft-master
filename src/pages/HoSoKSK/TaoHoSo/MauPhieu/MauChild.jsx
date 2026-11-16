import React, { useEffect } from "react";
import { getBungCoQuanSinhDuc, getCoXuongThanKinh, getDanhGiaDinhDuong, getDauHieuSinhTon, getDanhGiaPhatTrienTinhThanVanDong, getDanhGiaTiemChung, getToanTrang, getDauCo, DG_VONG_DAU_REVERSE, getMat, getTai, getMuiHong, getMiengRang, getHoHap, getTimMach, getKetLuan, getICD10List } from "../../../../services";
import { labelStyle, inputStyle, inputStyleNoBackground, textareaStyle, helperStyle, Required, FieldGroup, SectionHeader, Card, Grid3, TabTitle, SearchableSelect, SearchableSingleSelect, subLabelStyle, SignatureBox, } from "../../formShared";

export function Tab1ChildContent({ form, setForm, viewOnly = false, gioiTinhOptions = [], moiQuanHeOptions = [], danTocOptions = [], tinhThanhOptions = [], phuongXaOptions = [], doiTuongOptions = [], nguonChiTraOptions = [], loaiHinhKCBOptions = [], nhomMauOptions = [], tienSuCats = [], loadIcd10 = null, errors = {} }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const radioSet = (key, val) =>
    setForm((prev) => ({ ...prev, [key]: val }));
  const err = (key) => errors[key] ? "1.5px solid #ef4444" : "1.5px solid var(--gray-200)";

  const radioStyle = { display: "flex", alignItems: "center", gap: ".4rem", cursor: "pointer", fontSize: ".85rem", color: "var(--gray-700)" };

  return (
    <>
      <Card>
        <SectionHeader
          num="1"
          title="Thông tin Hành chính"
          subtitle="Thông tin định danh người bệnh, nơi ở và thông tin quản lý cơ sở khám chữa bệnh"
        />

        <Grid3>
          <FieldGroup label="1. Họ và tên" required style={{ gridColumn: "span 2" }}>
            <input style={{ ...inputStyle, border: err("hoTen") }} type="text" value={form.hoTen} onChange={set("hoTen")} placeholder="Nhập họ và tên" />
          </FieldGroup>
          <FieldGroup label="Số định danh cá nhân" required>
            <input style={{ ...inputStyle, border: err("soDinhDanh") }} type="text" inputMode="numeric" maxLength={12} value={form.soDinhDanh} onChange={(e) => setForm((p) => ({ ...p, soDinhDanh: e.target.value.replace(/\D/g, "").slice(0, 12) }))} placeholder="Nhập số CCCD" />
          </FieldGroup>

          <FieldGroup label="2. Ngày sinh" required>
            <input style={{ ...inputStyle, border: err("ngaySinh") }} type="date" max="9999-12-31" value={form.ngaySinh} onChange={set("ngaySinh")} />
          </FieldGroup>
          <FieldGroup label="3. Giới tính" required>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", height: "38px", border: errors.gioiTinh ? "1.5px solid #ef4444" : undefined, borderRadius: errors.gioiTinh ? 6 : undefined, padding: errors.gioiTinh ? "0 .5rem" : undefined }}>
              {gioiTinhOptions.map((g) => (
                <label key={g.Id} style={radioStyle}>
                  <input type="radio" name="child_gt" checked={form.gioiTinh === g.Id} onChange={() => radioSet("gioiTinh", g.Id)} /> {g.TenGioiTinh}
                </label>
              ))}
            </div>
          </FieldGroup>
          <FieldGroup label="4. Dân tộc" required>
            <SearchableSingleSelect
              value={form.danToc}
              onChange={(val) => set("danToc")({ target: { value: val } })}
              options={danTocOptions.map((d) => ({ value: d.MaDanToc, label: d.TenDanToc }))}
              placeholder="—Chọn dân tộc—"
              error={errors.danToc}
            />
          </FieldGroup>

          <FieldGroup label="5. Sinh non">
            <select style={inputStyle} value={form.sinhNon ?? ""} onChange={(e) => setForm((prev) => ({ ...prev, sinhNon: e.target.value === "" ? "" : Number(e.target.value) }))}>
              <option value="">—Chọn—</option>
              <option value={0}>Không</option>
              <option value={1}>Có</option>
            </select>
          </FieldGroup>
          <FieldGroup label="6. Tuần thai khi sinh">
            <select style={inputStyle} value={form.tuanThaiKhiSinh || ""} onChange={set("tuanThaiKhiSinh")}>
              <option value="">Chọn tuần thai</option>
              {Array.from({ length: 22 }, (_, i) => 22 + i).map((w) => (
                <option key={w} value={w}>{w} tuần</option>
              ))}
            </select>
          </FieldGroup>
          <FieldGroup label="7. Nhóm máu">
            <select style={inputStyle} value={form.nhomMau} onChange={set("nhomMau")}>
              <option value="">Chọn nhóm máu</option>
              {nhomMauOptions.map((o) => (
                <option key={o.Id} value={o.Id}>{o.TenNhomMau}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="8. Đối tượng" required>
            <SearchableSingleSelect
              value={form.doiTuongKham}
              onChange={(val) => set("doiTuongKham")({ target: { value: val } })}
              options={doiTuongOptions.map((d) => ({ value: d.Id, label: d.Name }))}
              placeholder="—Chọn đối tượng—"
              error={errors.doiTuongKham}
            />
          </FieldGroup>
          <FieldGroup label="9. Nguồn chi trả" required>
            <SearchableSingleSelect
              value={form.nguonChiTra}
              onChange={(val) => set("nguonChiTra")({ target: { value: val } })}
              options={nguonChiTraOptions.map((n) => ({ value: n.Id, label: n.Name }))}
              placeholder="—Chọn nguồn chi trả—"
              error={errors.nguonChiTra}
            />
          </FieldGroup>
          <div />
        </Grid3>

        <div style={{ margin: ".25rem 0 .75rem", fontSize: ".8rem", fontWeight: 700, color: "var(--gray-600)" }}>
          11. Nơi ở hiện tại:
        </div>

        <Grid3>
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
            <input style={{ ...inputStyle, border: err("soNha") }} type="text" value={form.soNha} onChange={set("soNha")} placeholder="Nhập địa chỉ" />
          </FieldGroup>

          <FieldGroup label="12. Họ tên người đi cùng trẻ" required style={{ gridColumn: "span 2" }}>
            <input style={{ ...inputStyle, border: err("hoTenNguoiDiCung") }} type="text" value={form.hoTenNguoiDiCung || ""} onChange={set("hoTenNguoiDiCung")} placeholder="Nhập họ tên người đi cùng" />
          </FieldGroup>

          <FieldGroup label="13. Mối quan hệ với trẻ" required>
            <select style={{ ...inputStyle, border: err("moiQuanHe") }} value={form.moiQuanHe || ""} onChange={set("moiQuanHe")}>
              <option value="">Chọn mối quan hệ</option>
              {moiQuanHeOptions.map((m) => (
                <option key={m.Id} value={m.Id}>{m.TenMoiQuanHe}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="14. Điện thoại">
            <input style={inputStyle} type="text" inputMode="numeric" maxLength={10} value={form.dienThoaiNguoiDiCung || ""} onChange={(e) => setForm((p) => ({ ...p, dienThoaiNguoiDiCung: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="Nhập số điện thoại" />
          </FieldGroup>

          <FieldGroup label="15. Số định danh người giám hộ" required>
            <input style={{ ...inputStyle, border: err("soDinhDanhGiamHo") }} type="text" inputMode="numeric" maxLength={12} value={form.soDinhDanhGiamHo || ""} onChange={(e) => setForm((p) => ({ ...p, soDinhDanhGiamHo: e.target.value.replace(/\D/g, "").slice(0, 12) }))} placeholder="Nhập số CCCD người giám hộ" />
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
        </Grid3>

        <div style={{ margin: ".25rem 0 .75rem", fontSize: ".8rem", fontWeight: 700, color: "var(--gray-600)" }}>
          18. Tiền sử:
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {tienSuCats.filter((c) => c.ParentId === null).map((cat) => {
            const opts = (() => { try { return JSON.parse(cat.Option || "[]"); } catch { return []; } })();
            const children = tienSuCats.filter((c) => c.ParentId === cat.td_cauhoiid);
            const val = String(form[cat.Field_AX] ?? "0");
            const showChild = children.length > 0 && val === String(children[0]?.ParentValue ?? "");
            return (
              <div key={cat.td_cauhoiid} style={{ display: "grid", gridTemplateColumns: showChild ? "220px auto 1fr" : "220px auto", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontSize: ".85rem", color: "var(--gray-700)", fontWeight: 500 }}>{cat.CauHoi}</span>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {opts.map((opt) => (
                    <label key={opt.id} style={radioStyle}>
                      <input type="radio" name={cat.Field_AX} checked={val === String(opt.id)} onChange={() => radioSet(cat.Field_AX, String(opt.id))} />
                      {opt.name}
                    </label>
                  ))}
                </div>
                {showChild && (
                  <SearchableSelect
                    value={form[children[0].Field_AX] || []}
                    onChange={(vals) => setForm((prev) => ({ ...prev, [children[0].Field_AX]: vals }))}
                    loadOptions={loadIcd10}
                    placeholder="Nhập mã hoặc tên bệnh ICD-10..."
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export function Tab3ChildContent({ form, setForm, tiepNhanId }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  useEffect(() => {
    if (!tiepNhanId) return;
    getDauHieuSinhTon(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_nhietDo: d.NHIET_DO ?? prev.child_nhietDo,
        child_danhGiaNhietDo: d.DGDHST_NHIET_DO ?? prev.child_danhGiaNhietDo,
        child_mach: d.MACH ?? prev.child_mach,
        child_danhGiaMach: d.DGDHST_MACH ?? prev.child_danhGiaMach,
        child_nhipTho: d.NHIP_THO ?? prev.child_nhipTho,
        child_danhGiaNhipTho: d.DGDHST_NHIP_THO ?? prev.child_danhGiaNhipTho,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "160px 1fr 160px 280px",
    gap: "1rem",
    alignItems: "center",
    padding: ".75rem 0",
    borderBottom: "1px solid var(--gray-100)",
  };
  const labelStyle2 = { fontSize: ".875rem", fontWeight: 500, color: "var(--gray-700)" };
  const radioRowStyle = { display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" };
  const radioOptStyle = { display: "flex", alignItems: "center", gap: ".35rem", fontSize: ".85rem", color: "var(--gray-700)", cursor: "pointer" };
  const assessLabelStyle = { fontSize: ".875rem", fontWeight: 700, color: "var(--gray-800)", whiteSpace: "nowrap" };

  const rows = [
    {
      label: "Nhiệt độ (°C)", key: "child_nhietDo", placeholder: "VD: 36.8", type: "number",
      assessKey: "child_danhGiaNhietDo", assessLabel: "Đánh giá nhiệt độ",
      options: ["Bình thường", "Sốt", "Hạ thân nhiệt"],
    },
    {
      label: "Mạch (lần/phút)", key: "child_mach", placeholder: "VD: 90", type: "number",
      assessKey: "child_danhGiaMach", assessLabel: "Đánh giá mạch",
      options: ["Bình thường", "Nhanh"],
    },
    {
      label: "Nhịp thở (lần/phút)", key: "child_nhipTho", placeholder: "VD: 20", type: "number",
      assessKey: "child_danhGiaNhipTho", assessLabel: "Đánh giá nhịp thở",
      options: ["Bình thường", "Thở nhanh", "Thở chậm"],
    },
  ];

  return (
    <Card>
      <SectionHeader num="3" title="Đánh giá dấu hiệu sinh tồn" subtitle="Mạch, nhiệt độ, nhịp thở, huyết áp và SpO2" />
      <div>
        {rows.map((r) => (
          <div key={r.key} style={rowStyle}>
            <span style={labelStyle2}>{r.label}</span>
            <input
              style={inputStyle}
              type={r.type || "text"}
              value={form[r.key] || ""}
              onChange={set(r.key)}
              placeholder={r.placeholder}
            />
            <span style={assessLabelStyle}>{r.assessLabel}</span>
            <div style={radioRowStyle}>
              {r.options.map((opt, idx) => (
                <label key={opt} style={radioOptStyle}>
                  <input
                    type="radio"
                    name={r.assessKey}
                    checked={Number(form[r.assessKey]) === idx}
                    onChange={() => radioSet(r.assessKey, idx)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Tab4ChildContent({ form, setForm, tiepNhanId }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const checkSet = (key) => setForm((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    if (!tiepNhanId) return;
    getDanhGiaDinhDuong(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_chieuDai: d.CHIEU_DAI ?? prev.child_chieuDai,
        child_chieuDaiSD: d.CHIEU_DAI_TUOI_SD ?? prev.child_chieuDaiSD,
        child_canNang: d.CAN_NANG ?? prev.child_canNang,
        child_canNangSD: d.CAN_NANG_TUOI_SD ?? prev.child_canNangSD,
        child_vongDau: d.VONG_DAU ?? prev.child_vongDau,
        child_danhGiaVongDau: DG_VONG_DAU_REVERSE[d.DG_VONG_DAU] ?? prev.child_danhGiaVongDau,
        child_chuViVongCanhTay: d.CHU_VI_VONG_CANH_TAY ?? prev.child_chuViVongCanhTay,
        child_phuDinhDuong: !!d.PHU_DINH_DUONG,
        child_thieuMau: !!d.DGDD_THIEU_MAU,
        child_coiXuong: !!d.DGDD_COI_XUONG,
        child_suyDinhDuong: !!d.SUY_DINH_DUONG,
        child_thuaCan: !!d.THUA_CAN_BEO_PHI,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  const TINH_TRANG = [
    { key: "child_phuDinhDuong", label: "Phù dinh dưỡng" },
    { key: "child_thieuMau", label: "Dấu hiệu thiếu máu" },
    { key: "child_coiXuong", label: "Dấu hiệu còi xương" },
    { key: "child_suyDinhDuong", label: "Suy dinh dưỡng" },
    { key: "child_thuaCan", label: "Thừa cân/béo phì" },
  ];

  return (
    <Card>
      <SectionHeader num="4" title="Đánh giá dinh dưỡng" subtitle="Chiều cao, cân nặng, BMI và phân loại dinh dưỡng theo tuổi" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem .75rem", marginBottom: "1.5rem" }}>
        <FieldGroup label="Chiều dài (cm)">
          <input style={inputStyle} type="number" value={form.child_chieuDai || ""} onChange={set("child_chieuDai")} placeholder="Nhập chiều dài" />
        </FieldGroup>
        <FieldGroup label="Chiều dài/Tuổi (SD)">
          <input style={inputStyle} type="number" value={form.child_chieuDaiSD || ""} onChange={set("child_chieuDaiSD")} placeholder="Nhập SD" />
        </FieldGroup>

        <FieldGroup label="Cân nặng (kg)">
          <input style={inputStyle} type="number" value={form.child_canNang || ""} onChange={set("child_canNang")} placeholder="Nhập cân nặng" />
        </FieldGroup>
        <FieldGroup label="Cân nặng/Tuổi (SD)">
          <input style={inputStyle} type="text" value={form.child_canNangSD || ""} onChange={set("child_canNangSD")} placeholder="Nhập SD" />
        </FieldGroup>

        <FieldGroup label="Vòng đầu (cm)">
          <input style={inputStyle} type="number" value={form.child_vongDau || ""} onChange={set("child_vongDau")} placeholder="Nhập vòng đầu" />
        </FieldGroup>
        <FieldGroup label="Đánh giá vòng đầu">
          <select style={inputStyle} value={form.child_danhGiaVongDau || ""} onChange={set("child_danhGiaVongDau")}>
            <option value="">Chọn đánh giá vòng đầu</option>
            <option value="Bình thường">Bình thường</option>
            <option value="To">To</option>
            <option value="Nhỏ">Nhỏ</option>
          </select>
        </FieldGroup>

        <FieldGroup label="Chu vi vòng cánh tay (mm)">
          <input style={inputStyle} type="number" value={form.child_chuViVongCanhTay || ""} onChange={set("child_chuViVongCanhTay")} placeholder="Nhập chu vi" />
        </FieldGroup>
        <div />
      </div>

      <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", background: "var(--gray-50)", padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Tình trạng dinh dưỡng</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Có</span>
        </div>
        {TINH_TRANG.map((item) => (
          <div key={item.key} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: ".65rem 1rem", borderBottom: "1px solid var(--gray-100)", alignItems: "center" }}>
            <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>- {item.label}</span>
            <input type="checkbox" checked={!!form[item.key]} onChange={() => checkSet(item.key)} style={{ width: 16, height: 16, cursor: "pointer" }} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Tab5ChildContent({ form, setForm, tiepNhanId }) {
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  useEffect(() => {
    if (!tiepNhanId) return;
    getDanhGiaPhatTrienTinhThanVanDong(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_phatTrienTinhThan: d.PT_TTBT_THEO_DO_TUOI === 1 ? "Có" : "Không",
        child_phatTrienVanDong: d.PT_VDBT_THEO_DO_TUOI === 1 ? "Có" : "Không",
        child_nguyCoBo: d.NGUY_CO_TU_KY === 1 ? "Có" : "Không",
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  const ITEMS = [
    { key: "child_phatTrienTinhThan", label: "Phát triển tinh thần bình thường của trẻ theo độ tuổi" },
    { key: "child_phatTrienVanDong", label: "Phát triển vận động bình thường của trẻ theo độ tuổi" },
    { key: "child_nguyCoBo", label: "Trẻ có nguy cơ tự kỷ (với trẻ từ 16–30 tháng tuổi)" },
  ];

  return (
    <Card>
      <SectionHeader num="5" title="Đánh giá phát triển tinh thần - vận động" subtitle="Các mốc phát triển tâm thần, ngôn ngữ và vận động theo độ tuổi" />
      <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", background: "var(--gray-50)", padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Hành vi và năng lực trẻ theo độ tuổi</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)", textAlign: "center" }}>Có</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)", textAlign: "center" }}>Không</span>
        </div>
        {ITEMS.map((item) => {
          const val = form[item.key] ?? "Không";
          return (
            <div key={item.key} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", padding: ".65rem 1rem", borderBottom: "1px solid var(--gray-100)", alignItems: "center" }}>
              <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>- {item.label}</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="radio" name={item.key} checked={val === "Có"} onChange={() => radioSet(item.key, "Có")} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--primary)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="radio" name={item.key} checked={val === "Không"} onChange={() => radioSet(item.key, "Không")} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#ef4444" }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function Tab6ChildContent({ form, setForm, tiepNhanId }) {
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  useEffect(() => {
    if (!tiepNhanId) return;
    getDanhGiaTiemChung(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_tc_lao: d.TIEM_CHUNG_BCG_SS === 1 ? "Có" : "Không",
        child_tc_viemGanB: d.TIEM_CHUNG_VGB_SS_MUI1 === 1 ? "Có" : "Không",
        child_tc_dayDu: d.TIEM_CHUNG_DAY_DU_THEO_DO_TUOI === 1 ? "Có" : "Không",
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  const ITEMS = [
    { key: "child_tc_lao", label: "Lao (sơ sinh)" },
    { key: "child_tc_viemGanB", label: "Viêm gan B mũi 1 (sơ sinh)" },
    { key: "child_tc_dayDu", label: "Tiêm chủng đầy đủ các loại vắc xin theo độ tuổi" },
  ];

  return (
    <Card>
      <SectionHeader num="6" title="Đánh giá tiêm chủng" subtitle="Tình trạng tiêm chủng các loại vắc xin theo chương trình tiêm chủng mở rộng" />
      <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", background: "var(--gray-50)", padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Kiểm tra sổ tiêm chủng</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)", textAlign: "center" }}>Có</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)", textAlign: "center" }}>Không</span>
        </div>
        {ITEMS.map((item) => {
          const val = form[item.key] ?? "Không";
          return (
            <div key={item.key} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", padding: ".65rem 1rem", borderBottom: "1px solid var(--gray-100)", alignItems: "center" }}>
              <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>- {item.label}</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="radio" name={item.key} checked={val === "Có"} onChange={() => radioSet(item.key, "Có")} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--primary)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="radio" name={item.key} checked={val === "Không"} onChange={() => radioSet(item.key, "Không")} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#ef4444" }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function Tab7ChildContent({ form, setForm, tiepNhanId }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  useEffect(() => {
    if (!tiepNhanId) return;
    getToanTrang(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_mauSacDa: d.MAU_SAC_DA ?? prev.child_mauSacDa,
        child_longBanTay: d.LONG_BAN_TAY ?? prev.child_longBanTay,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getDauCo(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_thop: d.THOP ?? prev.child_thop,
        child_hinhDangDau: d.HINH_DANG_DAU ?? prev.child_hinhDangDau,
        child_vanDongCo: d.VAN_DONG_CO ?? prev.child_vanDongCo,
        child_khoiBatThuongDauCo: d.KHOI_BAT_THUONG_DAU_CO ?? prev.child_khoiBatThuongDauCo,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getBungCoQuanSinhDuc(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_hinhDangBung: d.HINH_DANG_BUNG_RON ?? prev.child_hinhDangBung,
        child_ganLachTo: d.GAN_LACH_TO ?? prev.child_ganLachTo,
        child_khoiBatThuong: d.KHOI_BAT_THUONG ?? prev.child_khoiBatThuong,
        child_loHauMon: d.LO_HAU_MON ?? prev.child_loHauMon,
        child_coQuanSinhDuc: d.CO_QUAN_SINH_DUC_NGOAI ?? prev.child_coQuanSinhDuc,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getCoXuongThanKinh(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_vanDongKhongDoiXung: d.VAN_DONG_KHONG_DOI_XUNG ?? prev.child_vanDongKhongDoiXung,
        child_phanXaBu: d.PHAN_XA_BU ?? prev.child_phanXaBu,
        child_phanXaNam: d.PHAN_XA_NAM ?? prev.child_phanXaNam,
        child_phanXaMoro: d.PHAN_XA_MORO ?? prev.child_phanXaMoro,
        child_truongLucCo: d.TRUONG_LUC_CO ?? prev.child_truongLucCo,
        child_khopHang: d.KHOP_HANG ?? prev.child_khopHang,
        child_phanXaCo: d.PHAN_XA_CO ?? prev.child_phanXaCo,
        child_kiemTraLung: d.KIEM_TRA_LUNG_COT_SONG ?? prev.child_kiemTraLung,
        child_khamTuChi: d.TU_CHI_KHOP ?? prev.child_khamTuChi,
        child_quanSatDangDi: d.QUAN_SAT_DANG_DI ?? prev.child_quanSatDangDi,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getMat(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_viTriHaiMat: d.VI_TRI_HAI_MAT ?? prev.child_viTriHaiMat,
        child_miMatKetMac: d.MI_MAT_KET_MAC ?? prev.child_miMatKetMac,
        child_lacMat: d.LAC_MAT ?? prev.child_lacMat,
        child_dongTu: d.DONG_TU ?? prev.child_dongTu,
        child_khongKinhMatPhai: d.KHONG_KINH_MAT_PHAI ?? prev.child_khongKinhMatPhai,
        child_khongKinhMatTrai: d.KHONG_KINH_MAT_TRAI ?? prev.child_khongKinhMatTrai,
        child_coKinhMatPhai: d.CO_KINH_MAT_PHAI ?? prev.child_coKinhMatPhai,
        child_coKinhMatTrai: d.CO_KINH_MAT_TRAI ?? prev.child_coKinhMatTrai,
        child_benhKhacMat: d.BENH_KHAC_MAT ?? prev.child_benhKhacMat,
        child_khamMatPL: d.KHAM_MAT_PL ?? prev.child_khamMatPL,
        child_ckdtKhamMat: d.CKDT_KHAM_MAT ?? prev.child_ckdtKhamMat,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getTai(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_taiMangNhi: d.TAI_MANG_NHI ?? prev.child_taiMangNhi,
        child_dapUngAmThanh: d.DAP_UNG_AM_THANH ?? prev.child_dapUngAmThanh,
        child_khoiSungSauTai: d.KHOI_SUNG_SAU_TAI ?? prev.child_khoiSungSauTai,
        child_chayMuNuocTai: d.CHAY_MU_NUOC_TAI ?? prev.child_chayMuNuocTai,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getMuiHong(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_hinhDangMui: d.HINH_DANG_MUI ?? prev.child_hinhDangMui,
        child_chayNuocMui: d.CHAY_NUOC_MUI ?? prev.child_chayNuocMui,
        child_nghetMui: d.NGHET_MUI ?? prev.child_nghetMui,
        child_hong: d.HONG ?? prev.child_hong,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getMiengRang(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_hinhDangMieng: d.HINH_DANG_MIENG ?? prev.child_hinhDangMieng,
        child_rangSuaSoSinh: d.RANG_SUA_SO_SINH ?? prev.child_rangSuaSoSinh,
        child_hinhDangLuoi: d.HINH_DANG_LUOI ?? prev.child_hinhDangLuoi,
        child_dinhThangLuoi: d.DINH_THANG_LUOI ?? prev.child_dinhThangLuoi,
        child_namMieng: d.NAM_MIENG ?? prev.child_namMieng,
        child_camNhoTutVeSau: d.CAM_NHO_TUT_VE_SAU ?? prev.child_camNhoTutVeSau,
        child_sauMangBamLo: d.SAU_MANG_BAM_LO ?? prev.child_sauMangBamLo,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getHoHap(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_nhipThoKhongDeu: d.NHIP_THO_KHONG_DEU ?? prev.child_nhipThoKhongDeu,
        child_thoRutLomLongNguc: d.THO_RUT_LOM_LONG_NGUC ?? prev.child_thoRutLomLongNguc,
        child_tiengThoBatThuong: d.TIENG_THO_BAT_THUONG ?? prev.child_tiengThoBatThuong,
        child_suyHoHap: d.SUY_HO_HAP ?? prev.child_suyHoHap,
        child_nghePhoi: d.NGHE_PHOI ?? prev.child_nghePhoi,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  useEffect(() => {
    if (!tiepNhanId) return;
    getTimMach(tiepNhanId).then((d) => {
      if (!d) return;
      setForm((prev) => ({
        ...prev,
        child_viTriMomTim: d.VI_TRI_MOM_TIM ?? prev.child_viTriMomTim,
        child_machNgoaiVi: d.MACH_NGOAI_VI ?? prev.child_machNgoaiVi,
        child_tiengTim: d.TIENG_TIM ?? prev.child_tiengTim,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  const Sel = ({ k, label }) => (
    <FieldGroup label={label}>
      <select style={inputStyle} value={form[k] ?? ""} onChange={set(k)}>
        <option value="">— Chọn —</option>
        <option value={0}>Không bình thường</option>
        <option value={1}>Bình thường</option>
      </select>
    </FieldGroup>
  );

  return (
    <Card>
      <SectionHeader num="7" title="Khám lâm sàng" subtitle="Nhi khoa, Ngoại khoa, Da liễu, Mắt, TMH, RHM" />

      <div style={{ ...subLabelStyle, marginBottom: ".75rem" }}>1. Toàn trạng</div>
      <Grid3>
        <FieldGroup label="Màu sắc da">
          <select style={inputStyle} value={form.child_mauSacDa ?? ""} onChange={set("child_mauSacDa")}>
            <option value="">— Chọn —</option>
            <option value={1}>Hồng hào</option>
            <option value={2}>Nhợt</option>
            <option value={3}>Tím</option>
            <option value={4}>Vàng</option>
            <option value={5}>Sạm da</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Lòng bàn tay">
          <select style={inputStyle} value={form.child_longBanTay ?? ""} onChange={set("child_longBanTay")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường (không nhợt)</option>
            <option value={0}>Không bình thường (nhợt)</option>
          </select>
        </FieldGroup>
        <div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.1. Khám đầu - cổ</div>
      <Grid3>
        <FieldGroup label="Thóp (trẻ nhỏ còn thóp)">
          <select style={inputStyle} value={form.child_thop ?? ""} onChange={set("child_thop")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Rộng</option>
            <option value={3}>Hẹp</option>
            <option value={4}>Thóp phồng</option>
          </select>
        </FieldGroup>
        <Sel k="child_hinhDangDau" label="Kích thước và hình dạng đầu" />
        <Sel k="child_vanDongCo" label="Vận động cổ" />
        <FieldGroup label="Khối bất thường">
          <select style={inputStyle} value={form.child_khoiBatThuongDauCo ?? ""} onChange={set("child_khoiBatThuongDauCo")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.2. Khám mắt</div>
      <Grid3>
        <FieldGroup label="Vị trí 2 mắt">
          <select style={inputStyle} value={form.child_viTriHaiMat ?? ""} onChange={set("child_viTriHaiMat")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Hai mắt xa nhau</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Mí mắt và kết mạc">
          <select style={inputStyle} value={form.child_miMatKetMac ?? ""} onChange={set("child_miMatKetMac")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Sưng/đỏ</option>
            <option value={3}>Chảy ghèn/mủ</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Lác mắt">
          <select style={inputStyle} value={form.child_lacMat ?? ""} onChange={set("child_lacMat")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Đồng tử (kích thước, phản xạ)">
          <select style={inputStyle} value={form.child_dongTu ?? ""} onChange={set("child_dongTu")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.3. Khám tai</div>
      <Grid3>
        <FieldGroup label="Tai và màng nhĩ">
          <select style={inputStyle} value={form.child_taiMangNhi ?? ""} onChange={set("child_taiMangNhi")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Đáp ứng với âm thanh">
          <select style={inputStyle} value={form.child_dapUngAmThanh ?? ""} onChange={set("child_dapUngAmThanh")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Có khối sưng sau tai">
          <select style={inputStyle} value={form.child_khoiSungSauTai ?? ""} onChange={set("child_khoiSungSauTai")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Dấu hiệu chảy mủ, nước tai">
          <select style={inputStyle} value={form.child_chayMuNuocTai ?? ""} onChange={set("child_chayMuNuocTai")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.4. Khám mũi - họng</div>
      <Grid3>
        <FieldGroup label="Hình dạng mũi">
          <select style={inputStyle} value={form.child_hinhDangMui ?? ""} onChange={set("child_hinhDangMui")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Mũi to, dày</option>
            <option value={3}>Bất sản xương mũi</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Chảy nước mũi">
          <select style={inputStyle} value={form.child_chayNuocMui ?? ""} onChange={set("child_chayNuocMui")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Nghẹt mũi">
          <select style={inputStyle} value={form.child_nghetMui ?? ""} onChange={set("child_nghetMui")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Họng">
          <select style={inputStyle} value={form.child_hong ?? ""} onChange={set("child_hong")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.5. Khám miệng, răng (với trẻ đã có răng)</div>
      <Grid3>
        <FieldGroup label="Hình dạng miệng">
          <select style={inputStyle} value={form.child_hinhDangMieng ?? ""} onChange={set("child_hinhDangMieng")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Sứt môi, chẻ vòm</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Răng sữa sơ sinh">
          <select style={inputStyle} value={form.child_rangSuaSoSinh ?? ""} onChange={set("child_rangSuaSoSinh")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Hình dạng lưỡi">
          <select style={inputStyle} value={form.child_hinhDangLuoi ?? ""} onChange={set("child_hinhDangLuoi")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Lưỡi to bè</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Dính thắng lưỡi">
          <select style={inputStyle} value={form.child_dinhThangLuoi ?? ""} onChange={set("child_dinhThangLuoi")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Nấm miệng">
          <select style={inputStyle} value={form.child_namMieng ?? ""} onChange={set("child_namMieng")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Cằm nhỏ, tụt về sau">
          <select style={inputStyle} value={form.child_camNhoTutVeSau ?? ""} onChange={set("child_camNhoTutVeSau")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Vết sâu, mảng bám, lỗ trên răng">
          <select style={inputStyle} value={form.child_sauMangBamLo ?? ""} onChange={set("child_sauMangBamLo")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>3. Hô hấp</div>
      <Grid3>
        <FieldGroup label="Nhịp thở không đều">
          <select style={inputStyle} value={form.child_nhipThoKhongDeu ?? ""} onChange={set("child_nhipThoKhongDeu")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Thở rút lõm lồng ngực">
          <select style={inputStyle} value={form.child_thoRutLomLongNguc ?? ""} onChange={set("child_thoRutLomLongNguc")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Tiếng thở bất thường">
          <select style={inputStyle} value={form.child_tiengThoBatThuong ?? ""} onChange={set("child_tiengThoBatThuong")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Dấu hiệu suy hô hấp">
          <select style={inputStyle} value={form.child_suyHoHap ?? ""} onChange={set("child_suyHoHap")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Nghe phổi">
          <select style={inputStyle} value={form.child_nghePhoi ?? ""} onChange={set("child_nghePhoi")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>4. Tim mạch</div>
      <Grid3>
        <FieldGroup label="Vị trí mỏm tim">
          <select style={inputStyle} value={form.child_viTriMomTim ?? ""} onChange={set("child_viTriMomTim")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Mạch ngoại vi (mạch quay-bẹn)">
          <select style={inputStyle} value={form.child_machNgoaiVi ?? ""} onChange={set("child_machNgoaiVi")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bắt rõ</option>
            <option value={2}>Mạch nhẹ</option>
            <option value={3}>Không bắt được</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Nghe tim (loạn nhịp, tiếng thổi)">
          <select style={inputStyle} value={form.child_tiengTim ?? ""} onChange={set("child_tiengTim")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>5. Bụng và cơ quan sinh dục</div>
      <Grid3>
        <FieldGroup label="Hình dáng bụng, rốn">
          <select style={inputStyle} value={form.child_hinhDangBung ?? ""} onChange={set("child_hinhDangBung")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Gan, lách to">
          <select style={inputStyle} value={form.child_ganLachTo ?? ""} onChange={set("child_ganLachTo")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Khối bất thường">
          <select style={inputStyle} value={form.child_khoiBatThuong ?? ""} onChange={set("child_khoiBatThuong")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Lỗ hậu môn">
          <select style={inputStyle} value={form.child_loHauMon ?? ""} onChange={set("child_loHauMon")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Cơ quan sinh dục ngoài">
          <select style={inputStyle} value={form.child_coQuanSinhDuc ?? ""} onChange={set("child_coQuanSinhDuc")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>6. Cơ xương và thần kinh</div>
      <Grid3>
        <FieldGroup label="Vận động không đối xứng">
          <select style={inputStyle} value={form.child_vanDongKhongDoiXung ?? ""} onChange={set("child_vanDongKhongDoiXung")}>
            <option value="">— Chọn —</option>
            <option value={1}>Có</option>
            <option value={0}>Không</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Phản xạ bú">
          <select style={inputStyle} value={form.child_phanXaBu ?? ""} onChange={set("child_phanXaBu")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={0}>Không có</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Phản xạ nắm">
          <select style={inputStyle} value={form.child_phanXaNam ?? ""} onChange={set("child_phanXaNam")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={0}>Không có</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Phản xạ Moro">
          <select style={inputStyle} value={form.child_phanXaMoro ?? ""} onChange={set("child_phanXaMoro")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={0}>Không có</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Trương lực cơ">
          <select style={inputStyle} value={form.child_truongLucCo ?? ""} onChange={set("child_truongLucCo")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={2}>Tăng</option>
            <option value={0}>Giảm</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Khớp háng">
          <select style={inputStyle} value={form.child_khopHang ?? ""} onChange={set("child_khopHang")}>
            <option value="">— Chọn —</option>
            <option value={1}>Bình thường</option>
            <option value={0}>Trật khớp háng</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Phản xạ cơ">
          <select style={inputStyle} value={form.child_phanXaCo ?? ""} onChange={set("child_phanXaCo")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Kiểm tra lưng, cột sống">
          <select style={inputStyle} value={form.child_kiemTraLung ?? ""} onChange={set("child_kiemTraLung")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Khám tứ chi và khớp">
          <select style={inputStyle} value={form.child_khamTuChi ?? ""} onChange={set("child_khamTuChi")}>
            <option value="">— Chọn —</option>
            <option value={0}>Không bình thường</option>
            <option value={1}>Bình thường</option>
          </select>
        </FieldGroup>
        <Sel k="child_quanSatDangDi" label="Quan sát dáng đi" />
        <div /><div />
      </Grid3>
    </Card>
  );
}

export function Tab8ChildContent({ form, setForm, loadIcd10, tiepNhanId }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  useEffect(() => {
    if (!tiepNhanId) return;
    getKetLuan(tiepNhanId).then(async (d) => {
      if (!d) return;
      let icd10Items = [];
      if (d.KET_LUAN_BENH) {
        const codes = d.KET_LUAN_BENH.split(",").map((c) => c.trim()).filter(Boolean);
        const results = await Promise.all(
          codes.map((code) => getICD10List({ search: code, pageSize: 5 })
            .then(({ items }) => items.find((i) => i.startsWith(code)) || code)
            .catch(() => code)
          )
        );
        icd10Items = results;
      }
      setForm((prev) => ({
        ...prev,
        child_kl_binhThuong: d.BINH_THUONG === 1 ? "Có" : "Không",
        child_kl_nguyCoLao: d.NGUY_CO_MAC_LAO === 1 ? "Có" : "Không",
        child_kl_vanDeSucKhoe: d.VAN_DE_SUC_KHOE === 1 ? "Có" : "Không",
        child_kl_icd10: icd10Items.length > 0 ? icd10Items : prev.child_kl_icd10,
        child_kl_ghiRoVanDe: d.GHI_RO_VAN_DE_SUC_KHOE ?? prev.child_kl_ghiRoVanDe,
        child_kl_henKham: d.HEN_KHAM_LAN_SAU != null ? Number(d.HEN_KHAM_LAN_SAU) : prev.child_kl_henKham,
        child_kl_chuyenCSKCB: d.CHUYEN_CSKCB != null ? Number(d.CHUYEN_CSKCB) : prev.child_kl_chuyenCSKCB,
        child_kl_phanLoaiSK: d.PHAN_LOAI_SK ?? prev.child_kl_phanLoaiSK,
        child_kl_cacVanDe: d.CAC_VAN_DE_SUC_KHOE ?? prev.child_kl_cacVanDe,
        child_kl_cacBenhTat: d.CAC_BENH_TAT_NEU_CO ?? prev.child_kl_cacBenhTat,
        child_kl_cksNguoiKetLuan: d.CKS_NGUOI_KET_LUAN ?? prev.child_kl_cksNguoiKetLuan,
        child_kl_cksBenhVien: d.CKS_BENH_VIEN ?? prev.child_kl_cksBenhVien,
      }));
    }).catch(() => {});
  }, [tiepNhanId]);

  const setKetLuan = (key, val) => {
    setForm((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "child_kl_binhThuong") next.child_kl_vanDeSucKhoe = val === "Có" ? "Không" : "Có";
      if (key === "child_kl_vanDeSucKhoe") next.child_kl_binhThuong = val === "Có" ? "Không" : "Có";
      return next;
    });
  };

  const showVanDe = (form.child_kl_vanDeSucKhoe ?? "Không") === "Có";

  const ITEMS = [
    { key: "child_kl_binhThuong", label: "Bình thường" },
    { key: "child_kl_nguyCoLao", label: "Có nguy cơ mắc lao (tiền sử tiếp xúc)" },
    { key: "child_kl_vanDeSucKhoe", label: "Có vấn đề về sức khỏe" },
  ];

  return (
    <Card>
      <SectionHeader num="8" title="Kết luận và tư vấn" subtitle="Phân loại sức khỏe tổng quát, tư vấn dinh dưỡng và xác nhận chữ ký bác sĩ" />
      <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", background: "var(--gray-50)", padding: ".6rem 1rem", borderBottom: "1px solid var(--gray-200)" }}>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)" }}>Kết luận</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)", textAlign: "center" }}>Có</span>
          <span style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--gray-700)", textAlign: "center" }}>Không</span>
        </div>
        {ITEMS.map((item) => {
          const val = form[item.key] ?? "Không";
          return (
            <div key={item.key} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", padding: ".65rem 1rem", borderBottom: "1px solid var(--gray-100)", alignItems: "center" }}>
              <span style={{ fontSize: ".85rem", color: "var(--gray-700)" }}>{item.label}</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="radio" name={item.key} checked={val === "Có"} onChange={() => setKetLuan(item.key, "Có")} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--primary)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="radio" name={item.key} checked={val === "Không"} onChange={() => setKetLuan(item.key, "Không")} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#ef4444" }} />
              </div>
            </div>
          );
        })}
      </div>

      {showVanDe && (
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FieldGroup label="Ghi rõ vấn đề sức khỏe">
            <input style={inputStyle} type="text" value={form.child_kl_ghiRoVanDe || ""} onChange={set("child_kl_ghiRoVanDe")} />
          </FieldGroup>
          <FieldGroup label="Kết luận bệnh (Mã ICD-10)">
            <SearchableSelect
              value={form.child_kl_icd10 || []}
              onChange={(val) => setForm((p) => ({ ...p, child_kl_icd10: val }))}
              loadOptions={loadIcd10}
              placeholder="Chọn hoặc tìm kiếm..."
            />
          </FieldGroup>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <FieldGroup label="Hẹn khám lần sau">
              <select style={inputStyle} value={form.child_kl_henKham ?? ""} onChange={(e) => setForm((p) => ({ ...p, child_kl_henKham: e.target.value === "" ? "" : Number(e.target.value) }))}>
                <option value="">— Chọn —</option>
                <option value={1}>Có</option>
                <option value={0}>Không</option>
              </select>
            </FieldGroup>
            <FieldGroup label="Chuyển CSKCB chuyên khoa">
              <select style={inputStyle} value={form.child_kl_chuyenCSKCB ?? ""} onChange={(e) => setForm((p) => ({ ...p, child_kl_chuyenCSKCB: e.target.value === "" ? "" : Number(e.target.value) }))}>
                <option value="">— Chọn —</option>
                <option value={1}>Có</option>
                <option value={0}>Không</option>
              </select>
            </FieldGroup>
          </div>
        </div>
      )}
    </Card>
  );
}
