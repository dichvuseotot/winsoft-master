import React, { useState, useEffect, useRef } from "react";

export const labelStyle = {
  fontSize: ".78rem",
  fontWeight: 600,
  color: "var(--gray-700)",
  marginBottom: ".3rem",
  display: "block",
};

export const inputStyle = {
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

const { background: _bg, ...inputStyleNoBackground } = inputStyle;
export { inputStyleNoBackground };

export const textareaStyle = {
  width: "100%",
  border: "1.5px solid var(--gray-200)",
  borderRadius: "var(--radius-md)",
  padding: ".5rem .75rem",
  fontSize: ".85rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
  resize: "vertical",
  background: "var(--gray-100)",
};

export const helperStyle = {
  fontSize: ".72rem",
  color: "var(--gray-500, #6b7280)",
  marginTop: ".25rem",
};

export const Required = () => (
  <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>
);

export function FieldGroup({ label, required, children, helper, style: outerStyle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...outerStyle }}>
      <label style={labelStyle}>
        {label}
        {required && <Required />}
      </label>
      {children}
      {helper && <span style={helperStyle}>{helper}</span>}
    </div>
  );
}

export function SectionHeader({ num, title, subtitle }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".75rem",
        alignItems: "center",
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

export function Card({ children }) {
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

export function Grid3({ children }) {
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

export function TabTitle({ num, label }) {
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

export function TabPlaceholder({ title }) {
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

export const GD_ICD10_OPTIONS = [
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

export function SearchableSelect({
  value = [],
  onChange,
  placeholder = "Chọn hoặc tìm kiếm danh mục ICD-10...",
  options,
  loadOptions,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const filtered = (options || []).filter((o) =>
    o.toLowerCase().includes(q.toLowerCase()),
  );

  const [asyncOptions, setAsyncOptions] = useState([]);
  const [loadingOpts, setLoadingOpts] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!loadOptions) return;
    const timer = setTimeout(() => {
      setLoadingOpts(true);
      setPage(1);
      loadOptions(q, 1).then(({ items, hasMore: more }) => {
        setAsyncOptions(items);
        setHasMore(more);
        setLoadingOpts(false);
      }).catch(() => setLoadingOpts(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [q, loadOptions]);

  const loadMore = () => {
    if (!loadOptions || loadingOpts || !hasMore) return;
    const nextPage = page + 1;
    setLoadingOpts(true);
    loadOptions(q, nextPage).then(({ items, hasMore: more }) => {
      setAsyncOptions((prev) => [...prev, ...items]);
      setHasMore(more);
      setPage(nextPage);
      setLoadingOpts(false);
    }).catch(() => setLoadingOpts(false));
  };

  const handleListScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) loadMore();
  };

  const displayOptions = loadOptions ? asyncOptions : filtered;

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
          <div style={{ overflowY: "auto", flex: 1 }} onScroll={handleListScroll}>
            {loadingOpts && asyncOptions.length === 0 ? (
              <div style={{ padding: ".75rem 1rem", fontSize: ".82rem", color: "var(--gray-400)" }}>Đang tải...</div>
            ) : displayOptions.length === 0 ? (
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
              <>
                {displayOptions.map((o) => {
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
                })}
                {loadingOpts && (
                  <div style={{ padding: ".5rem 1rem", fontSize: ".78rem", color: "var(--gray-400)", textAlign: "center" }}>Đang tải thêm...</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchableSingleSelect({ value = "", onChange, options = [], placeholder = "—Chọn—", loadOptions }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(q.toLowerCase()),
  );

  const selected = options.find((o) => String(o.value) === String(value));

  const [asyncOptions, setAsyncOptions] = useState([]);
  const [loadingOpts, setLoadingOpts] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!loadOptions) return;
    const timer = setTimeout(() => {
      setLoadingOpts(true);
      setPage(1);
      loadOptions(q, 1).then(({ items, hasMore: more }) => {
        setAsyncOptions(items);
        setHasMore(more);
        setLoadingOpts(false);
      }).catch(() => setLoadingOpts(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [q, loadOptions]);

  const loadMore = () => {
    if (!loadOptions || loadingOpts || !hasMore) return;
    const nextPage = page + 1;
    setLoadingOpts(true);
    loadOptions(q, nextPage).then(({ items, hasMore: more }) => {
      setAsyncOptions((prev) => [...prev, ...items]);
      setHasMore(more);
      setPage(nextPage);
      setLoadingOpts(false);
    }).catch(() => setLoadingOpts(false));
  };

  const handleListScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) loadMore();
  };

  const displayOptions = loadOptions ? asyncOptions.map((o) => ({ value: o, label: o })) : filtered;

  useEffect(() => {
    if (!open) { setQ(""); return; }
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          height: 38,
          border: "1.5px solid var(--gray-200)",
          borderRadius: 6,
          padding: "0 .625rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          background: "#fff",
          fontSize: ".875rem",
          color: (selected || (loadOptions && value)) ? "var(--gray-800)" : "var(--gray-400)",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected ? selected.label : (loadOptions && value) ? value : placeholder}
        </span>
        <i className={`bi bi-chevron-${open ? "up" : "down"}`} style={{ fontSize: ".75rem", color: "var(--gray-400)", flexShrink: 0, marginLeft: ".4rem" }} />
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "var(--gray-100)", border: "1px solid var(--gray-200)",
          borderRadius: 10, zIndex: 200,
          boxShadow: "0 8px 24px rgba(0,103,172,.13), 0 2px 6px rgba(0,0,0,.06)",
          overflow: "hidden",
        }}>
          <div style={{ padding: ".5rem .625rem", background: "var(--gray-200)", borderBottom: "1px solid var(--gray-200)" }}>
            <div className="dropdown-search-wrapper" style={{
              display: "flex", alignItems: "center", gap: ".5rem",
              background: "#fff", borderRadius: 6, padding: ".3rem .625rem",
              border: "1.5px solid var(--gray-300)", outline: "none",
            }}>
              <i className="bi bi-search" style={{ color: "#2563eb", fontSize: ".8rem", flexShrink: 0 }} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm kiếm..."
                style={{ border: "none", outline: "none", boxShadow: "none", background: "transparent", fontSize: ".84rem", width: "100%", color: "var(--gray-800)" }}
              />
              {q && (
                <i
                  className="bi bi-x"
                  onClick={() => setQ("")}
                  style={{ color: "var(--gray-400)", fontSize: ".9rem", cursor: "pointer", flexShrink: 0 }}
                />
              )}
            </div>
          </div>
          <div style={{ maxHeight: 224, overflowY: "auto" }} onScroll={handleListScroll}>
            {loadingOpts && asyncOptions.length === 0 ? (
              <div style={{ padding: "1rem", textAlign: "center", fontSize: ".84rem", color: "var(--gray-400)" }}>
                <i className="bi bi-hourglass-split" style={{ fontSize: "1.2rem", display: "block", marginBottom: ".25rem" }} />
                Đang tải...
              </div>
            ) : displayOptions.length === 0 ? (
              <div style={{ padding: "1rem", textAlign: "center", fontSize: ".84rem", color: "var(--gray-400)" }}>
                <i className="bi bi-inbox" style={{ fontSize: "1.2rem", display: "block", marginBottom: ".25rem" }} />
                Không tìm thấy
              </div>
            ) : (
              <>
                {displayOptions.map((o) => {
                  const isActive = String(o.value) === String(value);
                  return (
                    <div
                      key={o.value}
                      onClick={() => { onChange(o.value); setOpen(false); }}
                      style={{
                        padding: ".5rem .875rem", fontSize: ".84rem", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: ".5rem",
                        background: isActive ? "var(--primary-bg)" : "transparent",
                        color: isActive ? "#2563eb" : "var(--gray-800)",
                        fontWeight: isActive ? 600 : 400,
                        borderLeft: isActive ? "3px solid #2563eb" : "3px solid transparent",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--gray-200)"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      {isActive && <i className="bi bi-check2" style={{ fontSize: ".85rem", flexShrink: 0 }} />}
                      {o.label}
                    </div>
                  );
                })}
                {loadingOpts && (
                  <div style={{ padding: ".5rem 1rem", fontSize: ".78rem", color: "var(--gray-400)", textAlign: "center" }}>Đang tải thêm...</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const subLabelStyle = {
  color: "#2563eb",
  fontWeight: 700,
  fontSize: ".78rem",
  textTransform: "uppercase",
  letterSpacing: ".04em",
  marginBottom: ".75rem",
};

export function SignatureBox({ id }) {
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