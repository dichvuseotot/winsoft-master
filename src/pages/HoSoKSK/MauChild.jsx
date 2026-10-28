import React, { useState } from "react";
import { labelStyle, inputStyle, inputStyleNoBackground, textareaStyle, helperStyle, Required, FieldGroup, SectionHeader, Card, Grid3, TabTitle, GD_ICD10_OPTIONS, SearchableSelect, SearchableSingleSelect, subLabelStyle, SignatureBox, PHAN_LOAI_LS, PHAN_LOAI_SK } from "./formShared";

export function Tab1ChildContent({ form, setForm, gioiTinhOptions = [], moiQuanHeOptions = [], danTocOptions = [], tinhThanhOptions = [], phuongXaOptions = [], doiTuongOptions = [], nguonChiTraOptions = [] }) {
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const radioSet = (key, val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

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
            <input style={inputStyle} type="text" value={form.hoTen} onChange={set("hoTen")} placeholder="Nhập họ và tên" />
          </FieldGroup>
          <FieldGroup label="Số định danh cá nhân">
            <input style={inputStyle} type="text" value={form.soDinhDanh} onChange={set("soDinhDanh")} placeholder="Nhập số CCCD" />
          </FieldGroup>

          <FieldGroup label="2. Ngày sinh" required>
            <input style={inputStyle} type="date" value={form.ngaySinh} onChange={set("ngaySinh")} />
          </FieldGroup>
          <FieldGroup label="3. Giới tính" required>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", height: "38px" }}>
              {gioiTinhOptions.map((g) => (
                <label key={g.Id} style={radioStyle}>
                  <input type="radio" name="child_gt" checked={form.gioiTinh === g.Id} onChange={() => radioSet("gioiTinh", g.Id)} /> {g.TenGioiTinh}
                </label>
              ))}
            </div>
          </FieldGroup>
          <FieldGroup label="4. Dân tộc">
            <SearchableSingleSelect
              value={form.danToc}
              onChange={(val) => set("danToc")({ target: { value: val } })}
              options={danTocOptions.map((d) => ({ value: d.MaDanToc, label: d.TenDanToc }))}
              placeholder="—Chọn dân tộc—"
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
                <option key={w} value={`${w} tuần`}>{w} tuần</option>
              ))}
            </select>
          </FieldGroup>
          <FieldGroup label="7. Nhóm máu">
            <select style={inputStyle} value={form.nhomMau} onChange={set("nhomMau")}>
              <option value="">Chọn nhóm máu</option>
              <option value="A+">A+</option><option value="A-">A-</option>
              <option value="B+">B+</option><option value="B-">B-</option>
              <option value="AB+">AB+</option><option value="AB-">AB-</option>
              <option value="O+">O+</option><option value="O-">O-</option>
            </select>
          </FieldGroup>

          <FieldGroup label="8. Đối tượng">
            <SearchableSingleSelect
              value={form.doiTuongKham}
              onChange={(val) => set("doiTuongKham")({ target: { value: val } })}
              options={doiTuongOptions.map((d) => ({ value: d.Id, label: d.Name }))}
              placeholder="—Chọn đối tượng—"
            />
          </FieldGroup>
          <FieldGroup label="9. Nguồn chi trả" required>
            <SearchableSingleSelect
              value={form.nguonChiTra}
              onChange={(val) => set("nguonChiTra")({ target: { value: val } })}
              options={nguonChiTraOptions.map((n) => ({ value: n.Id, label: n.Name }))}
              placeholder="—Chọn nguồn chi trả—"
            />
          </FieldGroup>
          <div />
        </Grid3>

        <div style={{ margin: ".25rem 0 .75rem", fontSize: ".8rem", fontWeight: 700, color: "var(--gray-600)" }}>
          11. Nơi ở hiện tại:
        </div>

        <Grid3>
          <FieldGroup label="Tỉnh/Thành phố">
            <SearchableSingleSelect
              value={form.tinhThanhPho}
              onChange={(val) => set("tinhThanhPho")({ target: { value: val } })}
              options={tinhThanhOptions.map((t) => ({ value: t.MaTinh, label: t.TenTinh }))}
              placeholder="—Chọn tỉnh/thành phố—"
            />
          </FieldGroup>

          <FieldGroup label="Phường/Xã">
            <SearchableSingleSelect
              value={form.phuongXa}
              onChange={(val) => set("phuongXa")({ target: { value: val } })}
              options={phuongXaOptions.map((p) => ({ value: p.MaPhuongXa, label: p.TenPhuongXa }))}
              placeholder="—Chọn phường/xã—"
            />
          </FieldGroup>

          <FieldGroup label="Số nhà/thôn/xóm">
            <input style={inputStyle} type="text" value={form.soNha} onChange={set("soNha")} placeholder="Nhập địa chỉ" />
          </FieldGroup>

          <FieldGroup label="12. Họ tên người đi cùng trẻ" required style={{ gridColumn: "span 2" }}>
            <input style={inputStyle} type="text" value={form.hoTenNguoiDiCung || ""} onChange={set("hoTenNguoiDiCung")} placeholder="Nhập họ tên người đi cùng" />
          </FieldGroup>

          <FieldGroup label="13. Mối quan hệ với trẻ">
            <select style={inputStyle} value={form.moiQuanHe || ""} onChange={set("moiQuanHe")}>
              <option value="">Chọn mối quan hệ</option>
              {moiQuanHeOptions.map((m) => (
                <option key={m.Id} value={m.Id}>{m.TenMoiQuanHe}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="14. Điện thoại">
            <input style={inputStyle} type="text" value={form.dienThoaiNguoiDiCung || ""} onChange={set("dienThoaiNguoiDiCung")} placeholder="Nhập số điện thoại" maxLength={10} />
          </FieldGroup>

          <FieldGroup label="15. Số định danh người giám hộ">
            <input style={inputStyle} type="text" value={form.soDinhDanhGiamHo || ""} onChange={set("soDinhDanhGiamHo")} placeholder="Nhập số CCCD người giám hộ" />
          </FieldGroup>

          <FieldGroup label="Loại hình khám bệnh, chữa bệnh">
            <select style={inputStyle} value={form.loaiHinhKham} onChange={set("loaiHinhKham")}>
              <option value="">Chọn loại hình khám bệnh, chữa bệnh</option>
              <option value="Khám ngoại trú">Khám ngoại trú</option>
              <option value="Khám tại nhà">Khám tại nhà</option>
              <option value="Khám tập trung">Khám tập trung</option>
            </select>
          </FieldGroup>
        </Grid3>

        <div style={{ margin: ".25rem 0 .75rem", fontSize: ".8rem", fontWeight: 700, color: "var(--gray-600)" }}>
          18. Tiền sử:
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {[
            { label: "Bản thân (ghi rõ tên bệnh nếu có)", key: "tienSuBanThan", icdKey: "tienSuBanThanICD10" },
            { label: "Gia đình (ghi rõ tên bệnh nếu có)", key: "tienSuGiaDinh", icdKey: "tienSuGiaDinhICD10" },
          ].map(({ label, key, icdKey }) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "220px auto 1fr", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: ".85rem", color: "var(--gray-700)", fontWeight: 500 }}>{label}</span>
              <div style={{ display: "flex", gap: "1rem" }}>
                <label style={radioStyle}>
                  <input type="radio" checked={!form[key] || form[key] === "Không"} onChange={() => radioSet(key, "Không")} />
                  Không
                </label>
                <label style={radioStyle}>
                  <input type="radio" checked={form[key] === "Có"} onChange={() => radioSet(key, "Có")} />
                  Có
                </label>
              </div>
              <select style={inputStyle} value={form[icdKey] || ""} onChange={set(icdKey)}>
                <option value="">Chọn DM ICD10</option>
                {GD_ICD10_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "220px auto", gap: "1rem", alignItems: "center" }}>
            <span style={{ fontSize: ".85rem", color: "var(--gray-700)", fontWeight: 500 }}>Tiền sử tiếp xúc với người bệnh lao</span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label style={radioStyle}>
                <input type="radio" checked={!form.tienSuLao || form.tienSuLao === "Không"} onChange={() => radioSet("tienSuLao", "Không")} />
                Không
              </label>
              <label style={radioStyle}>
                <input type="radio" checked={form.tienSuLao === "Có"} onChange={() => radioSet("tienSuLao", "Có")} />
                Có
              </label>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export function Tab3ChildContent({ form, setForm }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

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
              {r.options.map((opt) => (
                <label key={opt} style={radioOptStyle}>
                  <input
                    type="radio"
                    name={r.assessKey}
                    checked={form[r.assessKey] === opt}
                    onChange={() => radioSet(r.assessKey, opt)}
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

export function Tab4ChildContent({ form, setForm }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const checkSet = (key) => setForm((prev) => ({ ...prev, [key]: !prev[key] }));

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

export function Tab5ChildContent({ form, setForm }) {
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

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

export function Tab6ChildContent({ form, setForm }) {
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

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

export function Tab7ChildContent({ form, setForm }) {
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const Sel = ({ k, label }) => (
    <FieldGroup label={label}>
      <select style={inputStyle} value={form[k] || ""} onChange={set(k)}>
        <option value="">Chọn kết quả</option>
        <option value="Bình thường">Bình thường</option>
        <option value="Bất thường">Bất thường</option>
      </select>
    </FieldGroup>
  );

  return (
    <Card>
      <SectionHeader num="7" title="Khám lâm sàng" subtitle="Nhi khoa, Ngoại khoa, Da liễu, Mắt, TMH, RHM" />

      <div style={{ ...subLabelStyle, marginBottom: ".75rem" }}>1. Toàn trạng</div>
      <Grid3>
        <Sel k="cl_mauSacDa" label="Màu sắc da" />
        <Sel k="cl_longBanTay" label="Lòng bàn tay" />
        <div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.1. Khám đầu - cổ</div>
      <Grid3>
        <Sel k="cl_thop" label="Thóp (trẻ nhỏ còn thóp)" />
        <Sel k="cl_kichThuocDau" label="Kích thước và hình dạng đầu" />
        <Sel k="cl_vanDongCo" label="Vận động cổ" />
        <Sel k="cl_khoiBatThuongDau" label="Khối bất thường" />
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.2. Khám mắt</div>
      <Grid3>
        <Sel k="cl_viTri2Mat" label="Vị trí 2 mắt" />
        <Sel k="cl_miMat" label="Mí mắt và kết mạc" />
        <Sel k="cl_lacMat" label="Lác mắt" />
        <Sel k="cl_dongTu" label="Đồng tử (kích thước, phản xạ)" />
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.3. Khám tai</div>
      <Grid3>
        <Sel k="cl_taiMangNhi" label="Tai và màng nhĩ" />
        <Sel k="cl_dapUngAmThanh" label="Đáp ứng với âm thanh" />
        <Sel k="cl_khoiSungSauTai" label="Có khối sưng sau tai" />
        <Sel k="cl_chayMuNuocTai" label="Dấu hiệu chảy mủ, nước tai" />
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.4. Khám mũi - họng</div>
      <Grid3>
        <Sel k="cl_hinhDangMui" label="Hình dạng mũi" />
        <Sel k="cl_chayNuocMui" label="Chảy nước mũi" />
        <Sel k="cl_nghetMui" label="Nghẹt mũi" />
        <Sel k="cl_hong" label="Họng" />
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>2.5. Khám miệng, răng (với trẻ đã có răng)</div>
      <Grid3>
        <Sel k="cl_hinhDangMieng" label="Hình dạng miệng" />
        <Sel k="cl_rangSuaSoSinh" label="Răng sữa sơ sinh" />
        <Sel k="cl_hinhDangLuoi" label="Hình dạng lưỡi" />
        <Sel k="cl_dinhThangLuoi" label="Dính thắng lưỡi" />
        <Sel k="cl_namMieng" label="Nấm miệng" />
        <Sel k="cl_camNho" label="Cằm nhỏ, tụt về sau" />
        <Sel k="cl_vetSauRang" label="Vết sâu, mảng bám, lỗ trên răng" />
        <div /><div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>3. Hô hấp</div>
      <Grid3>
        <Sel k="cl_nhipThoKhongDeu" label="Nhịp thở không đều" />
        <Sel k="cl_thoRutLom" label="Thở rút lõm lồng ngực" />
        <Sel k="cl_tiengThoBatThuong" label="Tiếng thở bất thường" />
        <Sel k="cl_suuHoHap" label="Dấu hiệu suy hô hấp" />
        <Sel k="cl_nghePhoi" label="Nghe phổi" />
        <div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>4. Tim mạch</div>
      <Grid3>
        <Sel k="cl_viTriMomTim" label="Vị trí mỏm tim" />
        <Sel k="cl_machNgoaiVi" label="Mạch ngoại vi (mạch quay-bẹn)" />
        <Sel k="cl_ngheTim" label="Nghe tim (loạn nhịp, tiếng thổi)" />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>5. Bụng và cơ quan sinh dục</div>
      <Grid3>
        <Sel k="cl_hinhDangBung" label="Hình dáng bụng, rốn" />
        <Sel k="cl_ganLachTo" label="Gan, lách to" />
        <Sel k="cl_khoiBatThuongBung" label="Khối bất thường" />
        <Sel k="cl_loHauMon" label="Lỗ hậu môn" />
        <Sel k="cl_coQuanSinhDuc" label="Cơ quan sinh dục ngoài" />
        <div />
      </Grid3>

      <div style={{ ...subLabelStyle, margin: "1.25rem 0 .75rem" }}>6. Cơ xương và thần kinh</div>
      <Grid3>
        <Sel k="cl_vanDongKhongDoiXung" label="Vận động không đối xứng" />
        <Sel k="cl_phanXaBu" label="Phản xạ bú" />
        <Sel k="cl_phanXaNam" label="Phản xạ nắm" />
        <Sel k="cl_phanXaMoro" label="Phản xạ Moro" />
        <Sel k="cl_truongLucCo" label="Trương lực cơ" />
        <Sel k="cl_khopHang" label="Khớp háng" />
        <Sel k="cl_phanXaCo" label="Phản xạ cơ" />
        <Sel k="cl_kiemTraLung" label="Kiểm tra lưng, cột sống" />
        <Sel k="cl_khamTuChi" label="Khám tứ chi và khớp" />
        <Sel k="cl_quanSatDangDi" label="Quan sát dáng đi" />
        <div /><div />
      </Grid3>
    </Card>
  );
}

export function Tab8ChildContent({ form, setForm }) {
  const radioSet = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const ITEMS = [
    { key: "child_kl_binhThuong", label: "Bình thường" },
    { key: "child_kl_nguyCоLao", label: "Có nguy cơ mắc lao (tiền sử tiếp xúc)" },
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
