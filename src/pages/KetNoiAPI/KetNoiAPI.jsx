import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../services/api";


const FIELDS = [
  { key: "ApiBase_Url",  label: "API Base URL",  type: "text",     note: "NVARCHAR(50)",  col: "1 / -1" },
  { key: "Service_Type", label: "Service Type",  type: "text",     note: "VARCHAR(5)"    },
  { key: "Version",      label: "Version",       type: "text",     note: "VARCHAR(25)"   },
  { key: "Receiver_Id",  label: "Receiver ID",   type: "text",     note: "VARCHAR(25)"   },
  { key: "Sender_Id",    label: "Sender ID",     type: "text",     note: "NVARCHAR(25)"  },
  { key: "Msg_type",     label: "Msg Type",      type: "text",     note: "VARCHAR(5)"    },
  { key: "Data_Type",    label: "Data Type",     type: "text",     note: "VARCHAR(25)"   },
  { key: "Txn_Type",     label: "Txn Type",      type: "text",     note: "VARCHAR(50)"   },
  { key: "MaCSKCB",      label: "Mã CSKCB",      type: "text",     note: "NVARCHAR(10)"  },
  { key: "UserName",     label: "UserName",      type: "text",     note: "NVARCHAR(50)"  },
  { key: "PassWord",     label: "Password",      type: "password", note: "NVARCHAR(50)"  },
  { key: "Public_Key",   label: "Public Key",    type: "textarea", note: "NVARCHAR(MAX)", col: "1 / -1" },
  { key: "Private_Key",  label: "Private Key",   type: "textarea", note: "NVARCHAR(MAX)", col: "1 / -1" },
];

const EMPTY = { Id: 0, ...Object.fromEntries(FIELDS.map((f) => [f.key, ""])) };

const inputStyle = {
  width: "100%", height: 38,
  border: "1.5px solid var(--gray-200)",
  borderRadius: "var(--radius-md)",
  padding: "0 .75rem",
  fontSize: ".875rem", fontFamily: "var(--font-body)",
  color: "var(--gray-800)", background: "var(--gray-100)",
  outline: "none", boxSizing: "border-box", transition: "border-color .18s",
};

const textareaStyle = {
  ...inputStyle, height: 90,
  padding: ".45rem .75rem", resize: "vertical", lineHeight: 1.5,
};

const labelStyle = {
  display: "block", fontSize: ".78rem", fontWeight: 600,
  color: "var(--gray-600)", marginBottom: ".3rem",
};

export default function KetNoiAPI() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    api.get("/get-info-connect-api?Id=1")
      .then((res) => {
        const data = res?.data?.[0];
        if (data) {
          setForm({
            Id:           data.Id           ?? 0,
            ApiBase_Url:  data.ApiBase_Url  ?? "",
            Service_Type: data.Service_Type ?? "",
            Version:      data.Version      ?? "",
            Receiver_Id:  data.Receiver_Id  ?? "",
            Sender_Id:    data.Sender_Id    ?? "",
            Msg_type:     data.Msg_type     ?? "",
            Data_Type:    data.Data_Type    ?? "",
            Txn_Type:     data.Txn_Type     ?? "",
            MaCSKCB:      data.MaCSKCB      ?? "",
            UserName:     data.UserName     ?? "",
            PassWord:     data.PassWord     ?? "",
            Public_Key:   data.Public_Key   ?? "",
            Private_Key:  data.Private_Key  ?? "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.ApiBase_Url) {
      Swal.fire({ icon: "warning", title: "Thiếu thông tin", text: "Vui lòng nhập API Base URL.", confirmButtonText: "OK", confirmButtonColor: "#d97706" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        Id:           1,
        ApiBase_Url:  form.ApiBase_Url  || null,
        Service_Type: form.Service_Type || null,
        Version:      form.Version      || null,
        Receiver_Id:  form.Receiver_Id  || null,
        Msg_type:     form.Msg_type     || null,
        Data_Type:    form.Data_Type    || null,
        Private_Key:  form.Private_Key  || null,
        Public_Key:   form.Public_Key   || null,
        UserName:     form.UserName     || null,
        PassWord:     form.PassWord     || null,
        Sender_Id:    form.Sender_Id    || null,
        Txn_Type:     form.Txn_Type     || null,
        MaCSKCB:      form.MaCSKCB      || null,
      };
      const res = await api.post("/add-update-info-connect-api", payload);
      if (!res?.success) throw new Error(res?.message || "Lỗi không xác định");
      await Swal.fire({ icon: "success", title: "Lưu thành công", text: res.message, confirmButtonText: "OK", confirmButtonColor: "#16a34a" });
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Lưu thất bại", text: err?.message || "Đã xảy ra lỗi.", confirmButtonText: "Đóng", confirmButtonColor: "#dc2626" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "var(--gray-400)", fontSize: ".9rem", gap: ".5rem" }}>
        <i className="bi bi-arrow-repeat" />
        Đang tải...
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: 860, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
            <i className="bi bi-plug-fill" style={{ color: "#2563eb", fontSize: "1.1rem" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--gray-900)" }}>
              Kết nối API
            </span>
          </div>
          <div style={{ fontSize: ".8rem", color: "var(--gray-400)", marginTop: 3 }}>
            Cấu hình thông tin kết nối API liên thông dữ liệu y tế
          </div>
        </div>
        <div style={{ display: "flex", gap: ".6rem" }}>
          <button
            onClick={() => setForm(EMPTY)}
            style={{ height: 38, padding: "0 1.1rem", border: "1.5px solid var(--gray-200)", background: "var(--gray-100)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: ".82rem", color: "var(--gray-700)", cursor: "pointer" }}
          >
            Nhập lại
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ height: 38, padding: "0 1.25rem", background: saving ? "var(--gray-300)" : "#2563eb", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".82rem", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: ".4rem" }}
          >
            <i className={`bi ${saving ? "bi-arrow-repeat" : "bi-floppy-fill"}`} />
            {saving ? "Đang lưu..." : "Lưu cấu hình"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="card-custom" style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem 1.25rem" }}>
          {FIELDS.map((f) => (
            <div key={f.key} style={{ gridColumn: f.col }}>
              <label style={labelStyle}>
                {f.label}
                <span style={{ marginLeft: ".4rem", fontSize: ".7rem", fontWeight: 500, color: "var(--gray-400)", fontFamily: "monospace" }}>
                  {f.note}
                </span>
              </label>
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
    </div>
  );
}
