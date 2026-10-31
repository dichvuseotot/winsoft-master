import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../services/api";

function generateId() {
  return Math.floor(Math.random() * 2147483647) + 1;
}


const EMPTY = {
  Id: 0,
  ApiBase_Url: "",
  Service_Type: "",
  Version: "",
  Receiver_Id: "",
  Sender_Id: "",
  Msg_type: "",
  Data_Type: "",
  Txn_Type: "",
  MaCSKCB: "",
  UserName: "",
  PassWord: "",
  Public_Key: "",
  Private_Key: "",
};

const inputStyle = {
  width: "100%",
  height: 36,
  border: "1.5px solid var(--gray-200)",
  borderRadius: "var(--radius-md)",
  padding: "0 .75rem",
  fontSize: ".875rem",
  fontFamily: "var(--font-body)",
  color: "var(--gray-800)",
  background: "var(--gray-100)",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  height: 80,
  padding: ".4rem .75rem",
  resize: "vertical",
  lineHeight: 1.5,
};

const labelStyle = {
  display: "block",
  fontSize: ".78rem",
  fontWeight: 600,
  color: "var(--gray-600)",
  marginBottom: ".3rem",
};

function Modal({ form, setForm, onClose, onSave, saving }) {
  const [showPw, setShowPw] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const fields = [
    { key: "ApiBase_Url",  label: "API Base URL",  type: "text",     col: "1 / -1" },
    { key: "Service_Type", label: "Service Type",  type: "text"  },
    { key: "Version",      label: "Version",       type: "text"  },
    { key: "Receiver_Id",  label: "Receiver ID",   type: "text"  },
    { key: "Sender_Id",    label: "Sender ID",     type: "text"  },
    { key: "Msg_type",     label: "Msg Type",      type: "text"  },
    { key: "Data_Type",    label: "Data Type",     type: "text"  },
    { key: "Txn_Type",     label: "Txn Type",      type: "text"  },
    { key: "MaCSKCB",      label: "Mã CSKCB",      type: "text"  },
    { key: "UserName",     label: "UserName",      type: "text"  },
    { key: "PassWord",     label: "Password",      type: "password" },
    { key: "Public_Key",   label: "Public Key",    type: "textarea", col: "1 / -1" },
    { key: "Private_Key",  label: "Private Key",   type: "textarea", col: "1 / -1" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 1050, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: 680, maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-xl)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--gray-200)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <i className="bi bi-plug-fill" style={{ color: "#2563eb", fontSize: "1rem" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--gray-900)" }}>
              {form.Id ? "Chỉnh sửa kết nối API" : "Thêm kết nối API"}
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--gray-400)", fontSize: "1.2rem", lineHeight: 1 }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem 1rem" }}>
            {fields.map((f) => (
              <div key={f.key} style={{ gridColumn: f.col }}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    style={textareaStyle}
                    value={form[f.key]}
                    onChange={set(f.key)}
                    placeholder={`Nhập ${f.label}`}
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--gray-200)")}
                  />
                ) : f.type === "password" ? (
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPw ? "text" : "password"}
                      style={{ ...inputStyle, paddingRight: "2.25rem" }}
                      value={form[f.key]}
                      onChange={set(f.key)}
                      placeholder="Nhập mật khẩu"
                      onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--gray-200)")}
                    />
                    <button type="button" onClick={() => setShowPw((v) => !v)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "var(--gray-400)", padding: 0, fontSize: ".85rem" }}>
                      <i className={`bi ${showPw ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    style={inputStyle}
                    value={form[f.key]}
                    onChange={set(f.key)}
                    placeholder={`Nhập ${f.label}`}
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--gray-200)")}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem", padding: "1rem 1.5rem", borderTop: "1px solid var(--gray-200)" }}>
          <button onClick={onClose} style={{ height: 38, padding: "0 1.1rem", border: "1.5px solid var(--gray-200)", background: "var(--gray-100)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: ".82rem", color: "var(--gray-700)", cursor: "pointer" }}>
            Hủy
          </button>
          <button onClick={onSave} disabled={saving} style={{ height: 38, padding: "0 1.25rem", background: saving ? "var(--gray-300)" : "#2563eb", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".82rem", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: ".4rem" }}>
            <i className={`bi ${saving ? "bi-arrow-repeat" : "bi-floppy-fill"}`} />
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}

const COLS = [
  { key: "ApiBase_Url",  label: "API Base URL",  flex: 2 },
  { key: "MaCSKCB",      label: "Mã CSKCB",      flex: 1 },
  { key: "UserName",     label: "UserName",      flex: 1 },
  { key: "PassWord",     label: "Password",      flex: 1 },
];

const thStyle = {
  padding: "10px 12px",
  background: "var(--gray-50)",
  borderBottom: "2px solid var(--gray-200)",
  fontSize: ".72rem",
  fontWeight: 700,
  color: "var(--gray-500)",
  letterSpacing: ".06em",
  textAlign: "left",
  whiteSpace: "nowrap",
  position: "sticky",
  top: 0,
  zIndex: 1,
};

const tdStyle = {
  padding: "9px 12px",
  borderBottom: "1px solid var(--gray-200)",
  fontSize: ".82rem",
  color: "var(--gray-700)",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
  maxWidth: 180,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function KetNoiAPI() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { form, isEdit }
  const [saving, setSaving] = useState(false);

  const loadData = () => {
    setLoading(true);
    api.get("/get-info-connect-api?Id=")
      .then((res) => { if (res?.success) setRows(res.data ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const openAdd = () => setModal({ form: { ...EMPTY }, isEdit: false });

  const openEdit = async (row) => {
    try {
      const res = await api.get(`/get-info-connect-api?Id=${row.Id}`);
      const detail = res?.data?.[0] ?? row;
      setModal({ form: { ...detail }, isEdit: true });
    } catch {
      setModal({ form: { ...row }, isEdit: true });
    }
  };

  const closeModal = () => setModal(null);


  const handleSave = async () => {
    if (!modal.form.ApiBase_Url) {
      Swal.fire({ icon: "warning", title: "Thiếu thông tin", text: "Vui lòng nhập API Base URL.", confirmButtonText: "OK", confirmButtonColor: "#d97706" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        Id:           modal.isEdit ? Number(modal.form.Id) : generateId(),
        ApiBase_Url:  modal.form.ApiBase_Url  || null,
        Service_Type: modal.form.Service_Type || null,
        Version:      modal.form.Version      || null,
        Receiver_Id:  modal.form.Receiver_Id  || null,
        Msg_type:     modal.form.Msg_type     || null,
        Data_Type:    modal.form.Data_Type    || null,
        Private_Key:  modal.form.Private_Key  || null,
        Public_Key:   modal.form.Public_Key   || null,
        UserName:     modal.form.UserName     || null,
        PassWord:     modal.form.PassWord     || null,
        Sender_Id:    modal.form.Sender_Id    || null,
        Txn_Type:     modal.form.Txn_Type     || null,
        MaCSKCB:      modal.form.MaCSKCB      || null,
      };
      const res = await api.post("/add-update-info-connect-api", payload);
      if (!res?.success) throw new Error(res?.message || "Lỗi không xác định");

      const saved = { ...modal.form, _localId: modal.form._localId ?? Date.now() };
      setRows((p) =>
        modal.isEdit
          ? p.map((r) => (r._localId === saved._localId ? saved : r))
          : [...p, saved]
      );
      await Swal.fire({ icon: "success", title: "Lưu thành công", text: res.message, confirmButtonText: "OK", confirmButtonColor: "#16a34a" });
      closeModal();
      loadData();
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Lưu thất bại", text: err?.message || "Đã xảy ra lỗi.", confirmButtonText: "Đóng", confirmButtonColor: "#dc2626" });
    }
    setSaving(false);
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
            <i className="bi bi-plug-fill" style={{ color: "#2563eb", fontSize: "1.1rem" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--gray-900)" }}>
              Kết nối API
            </span>
          </div>
          <div style={{ fontSize: ".8rem", color: "var(--gray-400)", marginTop: 3 }}>
            Quản lý thông tin kết nối API liên thông dữ liệu y tế
          </div>
        </div>
        <button
          onClick={openAdd}
          style={{ height: 38, padding: "0 1.1rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: ".4rem" }}
        >
          <i className="bi bi-plus-lg" />
          Thêm mới
        </button>
      </div>

      {/* Table */}
      <div className="card-custom" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: 50 }} />
              {COLS.map((c) => <col key={c.key} style={{ width: `${c.flex * 20}%` }} />)}
              <col style={{ width: 100 }} />
            </colgroup>
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: "center" }}>#</th>
                {COLS.map((c) => (
                  <th key={c.key} style={{ ...thStyle }}>{c.label.toUpperCase()}</th>
                ))}
                <th style={{ ...thStyle, textAlign: "center" }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={COLS.length + 2} style={{ padding: "2.5rem", textAlign: "center", color: "var(--gray-400)", fontSize: ".875rem" }}>
                    <i className="bi bi-arrow-repeat" style={{ fontSize: "1.5rem", display: "block", marginBottom: ".5rem" }} />
                    Đang tải...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={COLS.length + 2} style={{ padding: "2.5rem", textAlign: "center", color: "var(--gray-400)", fontSize: ".875rem" }}>
                    <i className="bi bi-inbox" style={{ fontSize: "1.5rem", display: "block", marginBottom: ".5rem" }} />
                    Chưa có dữ liệu. Bấm <strong>Thêm mới</strong> để thêm kết nối API.
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr key={row.Id ?? row._localId ?? idx} style={{ background: idx % 2 === 0 ? "#fff" : "var(--gray-50)" }}>
                    <td style={{ ...tdStyle, textAlign: "center", color: "var(--gray-400)", fontSize: ".78rem" }}>{idx + 1}</td>
                    {COLS.map((c) => (
                      <td key={c.key} style={tdStyle} title={row[c.key] || ""}>
                        {c.key === "PassWord"
                          ? (row[c.key] ? "••••••••" : <span style={{ color: "var(--gray-300)" }}>—</span>)
                          : c.key === "Public_Key" || c.key === "Private_Key"
                          ? row[c.key]
                            ? <span style={{ color: "#2563eb", fontSize: ".78rem" }}>Đã cấu hình</span>
                            : <span style={{ color: "var(--gray-300)" }}>—</span>
                          : row[c.key] || <span style={{ color: "var(--gray-300)" }}>—</span>
                        }
                      </td>
                    ))}
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <button onClick={() => openEdit(row)} style={{ height: 28, width: 28, border: "1.5px solid #bfdbfe", background: "#eff6ff", borderRadius: 6, cursor: "pointer", color: "#2563eb", fontSize: ".8rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                        <i className="bi bi-pencil-fill" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          form={modal.form}
          setForm={(fn) => setModal((p) => ({ ...p, form: typeof fn === "function" ? fn(p.form) : fn }))}
          onClose={closeModal}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
