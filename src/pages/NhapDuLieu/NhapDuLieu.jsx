import { useCallback, useEffect, useRef, useState } from 'react'
import { getLoaiMauKSKList, importExcelFile, getListImportFileExcel } from '../../services'

function ImportModal({ onClose, mauPhieuOptions = [] }) {
  const fileRef   = useRef(null)
  const [bieuMau, setBieuMau] = useState('')
  const [file,    setFile]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [result,  setResult]  = useState(null)

  const canSubmit = bieuMau && file && !loading && !result

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true)
    setError('')
    try {
      const res = await importExcelFile({ file, tdLoaimauKskid: bieuMau })
      const data = res?.data ?? res
      setResult({
        thanhCong: data?.thanhCong ?? 0,
        thatBai:   data?.thatBai   ?? 0,
        total:     data?.total     ?? 0,
        message:   data?.message   || data?.GhiChu || '',
      })
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || 'Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 560, boxShadow: 'var(--shadow-xl)' }}>

                <div style={{ padding: '1.75rem 1.75rem 1.25rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gray-900)', marginBottom: '.875rem' }}>
            Import data theo mẫu
          </div>

                    <ul style={{ margin: '0 0 1.25rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
            {[
              'Định dạng: XLSX, XLSM; dung lượng tối đa 50 MB.',
              'Tối đa 50,000 dòng dữ liệu sheet chính.',
              <>Điền đúng mã biểu mẫu, <code style={{ fontSize: '.8rem', background: 'var(--gray-100)', padding: '.1em .35em', borderRadius: 4 }}>MA_CSKCB</code> và <code style={{ fontSize: '.8rem', background: 'var(--gray-100)', padding: '.1em .35em', borderRadius: 4 }}>MA_GTIN_CSKCB</code>; không dùng công thức, liên kết ngoài hoặc macro để tạo giá trị dữ liệu.</>,
            ].map((t, i) => (
              <li key={i} style={{ fontSize: '.83rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>{t}</li>
            ))}
          </ul>

                    <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '.4rem' }}>
              Biểu mẫu <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              value={bieuMau}
              onChange={e => setBieuMau(e.target.value)}
              style={{ width: '100%', height: 44, borderRadius: 'var(--radius-md)', border: `1.5px solid ${bieuMau ? 'var(--primary)' : 'var(--gray-200)'}`, padding: '0 .875rem', fontSize: '.88rem', fontFamily: 'var(--font-body)', color: bieuMau ? 'var(--gray-800)' : 'var(--gray-400)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }}
            >
              <option value="">Chọn mẫu import</option>
              {mauPhieuOptions.map(o => <option key={o.Id} value={o.Id}>{o.Name}</option>)}
            </select>
          </div>

                    <button style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '.45rem .875rem', fontSize: '.83rem', fontWeight: 600, color: '#92400e', cursor: 'pointer', marginBottom: '1.25rem' }}>
            <i className="bi bi-folder-fill" style={{ color: '#f59e0b' }} />
            Tải bộ tệp mẫu Excel Import
            <i className="bi bi-box-arrow-up-right" style={{ fontSize: '.75rem' }} />
          </button>

                    <div style={{ marginBottom: '.5rem' }}>
            <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '.4rem' }}>
              Tệp XLSX/XLSM <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                onClick={() => fileRef.current?.click()}
                style={{ height: 44, padding: '0 1.1rem', background: 'var(--primary)', color: '#fff', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', flexShrink: 0 }}
              >
                Chọn tệp
              </button>
              <span style={{ flex: 1, padding: '0 .875rem', fontSize: '.83rem', color: file ? 'var(--gray-800)' : 'var(--gray-400)' }}>
                {file ? file.name : 'Không có tệp nào được chọn'}
              </span>
              {file && (
                <button onClick={() => { setFile(null); fileRef.current.value = '' }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: '0 .75rem', fontSize: '1rem' }}>
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".xlsx,.xlsm" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0] || null)} />
          </div>
        </div>

                {error && (
          <div style={{ margin: '0 1.75rem .75rem', padding: '.6rem .875rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', fontSize: '.82rem', color: '#991b1b' }}>
            {error}
          </div>
        )}
        {result && (
          <div style={{ margin: '0 1.75rem .75rem', padding: '.75rem 1rem', background: result.thatBai > 0 ? '#fffbeb' : '#f0fdf4', border: `1px solid ${result.thatBai > 0 ? '#fde68a' : '#86efac'}`, borderRadius: 'var(--radius-md)', fontSize: '.83rem', color: result.thatBai > 0 ? '#92400e' : '#166534' }}>
            <div style={{ fontWeight: 700, marginBottom: '.35rem' }}>{result.message}</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Tổng: <b>{result.total}</b></span>
              <span style={{ color: '#16a34a' }}>Thành công: <b>{result.thanhCong}</b></span>
              {result.thatBai > 0 && <span style={{ color: '#dc2626' }}>Thất bại: <b>{result.thatBai}</b></span>}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.625rem', padding: '1rem 1.75rem', borderTop: '1px solid var(--gray-100)' }}>
          {!result && (
            <button onClick={onClose} disabled={loading} style={{ height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
              HỦY
            </button>
          )}
          {result ? (
            <button onClick={onClose} style={{ height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--gray-900)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: 'pointer' }}>
              ĐÓNG
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{ height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', background: canSubmit ? 'var(--gray-900)' : 'var(--gray-300)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'background .15s', display: 'flex', alignItems: 'center', gap: '.4rem' }}
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              TẠO BẢN XEM TRƯỚC
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const today = new Date().toISOString().slice(0, 10)

const TRANG_THAI_OPTIONS = [
  { value: '-1', label: 'Tất cả trạng thái' },
  { value: '1',  label: 'Thành công' },
  { value: '0',  label: 'Thất bại' },
]

const STATUS_MAP = {
  1: { label: 'Thành công', bg: '#dcfce7', color: '#166534' },
  0: { label: 'Thất bại',   bg: '#fee2e2', color: '#991b1b' },
}

function formatDateTime(str) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return str
  const pad = n => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function ZipModal({ selectedCount, onClose }) {
  const [scope,    setScope]    = useState('filter')   
  const [fileType, setFileType] = useState('all')      

  const RadioCard = ({ value, current, onChange, title, titleColor, desc }) => {
    const active = current === value
    return (
      <div
        onClick={() => onChange(value)}
        style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          border: `2px solid ${active ? 'var(--primary)' : 'var(--gray-200)'}`,
          borderRadius: 'var(--radius-md)', padding: '.875rem 1rem',
          cursor: 'pointer', marginBottom: '.5rem', transition: 'border-color .15s',
          background: active ? 'var(--primary-bg)' : '#fff',
        }}
      >
        <div style={{
          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${active ? 'var(--primary)' : 'var(--gray-300)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }} />}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.88rem', color: titleColor || 'var(--gray-900)' }}>{title}</div>
          <div style={{ fontSize: '.78rem', color: 'var(--gray-500)', marginTop: 2 }}>{desc}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 540, boxShadow: 'var(--shadow-xl)', maxHeight: '90vh', overflowY: 'auto' }}>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid var(--gray-100)' }}>
          <div style={{ display: 'flex', gap: '.875rem', alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="bi bi-file-earmark-zip-fill" style={{ fontSize: '1.3rem', color: '#1d4ed8' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>Tải gói tệp kết quả Import (.ZIP)</div>
              <div style={{ fontSize: '.78rem', color: 'var(--gray-500)', marginTop: 2 }}>Gom các tệp Excel hợp lệ và tệp lỗi để tải về máy</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: '1.2rem', padding: 0, lineHeight: 1 }}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

                <div style={{ padding: '1.25rem 1.5rem' }}>

                    <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '.75rem' }}>
            1. Phạm vi tải tệp
          </div>
          <RadioCard
            value="checked" current={scope} onChange={setScope}
            title="Đã chọn qua checkbox"
            desc={`Số lượng: ${selectedCount} đợt`}
          />
          <RadioCard
            value="filter" current={scope} onChange={setScope}
            title="Theo bộ lọc hiện tại"
            desc="Tất cả đợt trong phạm vi"
          />

                    <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-500)', margin: '1.25rem 0 .75rem' }}>
            2. Loại tệp kết quả cần tải
          </div>
          <RadioCard
            value="all" current={fileType} onChange={setFileType}
            title="Tất cả tệp (Hợp lệ & Lỗi)"
            desc="Gồm cả file _hop_le.xlsx và _loi.xlsx"
          />
          <RadioCard
            value="loi" current={fileType} onChange={setFileType}
            title="Chỉ tải file Lỗi / Sửa lỗi"
            titleColor="#f97316"
            desc="Chỉ lấy các tệp _loi.xlsx để sửa chữa và nạp lại"
          />
          <RadioCard
            value="hop_le" current={fileType} onChange={setFileType}
            title="Chỉ tải file Hợp lệ"
            titleColor="#16a34a"
            desc="Chỉ lấy các tệp _hop_le.xlsx đã đạt chuẩn"
          />

                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '.875rem 1rem', marginTop: '1rem', display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
            <i className="bi bi-info-circle-fill" style={{ color: '#3b82f6', flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: '.8rem', color: '#1e40af' }}>
              <div style={{ fontWeight: 700, marginBottom: '.35rem' }}>Quy tắc đóng gói tệp:</div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                <li>Các đợt import đã bị xóa hoặc tệp không tồn tại sẽ được tự động bỏ qua.</li>
                <li>Tệp nén .ZIP sẽ tự động phân loại thư mục theo cơ sở y tế khi có nhiều cơ sở.</li>
              </ul>
            </div>
          </div>
        </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', borderTop: '1px solid var(--gray-100)' }}>
          <button onClick={onClose} style={{ height: 38, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
            Hủy
          </button>
          <button style={{ height: 38, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <i className="bi bi-download" />Tải xuống (.ZIP)
          </button>
        </div>
      </div>
    </div>
  )
}

export default function NhapDuLieu() {
  const [mauPhieuOptions, setMauPhieuOptions] = useState([])
  const [fBieuMau,   setFBieuMau]   = useState('')
  const [fTrangThai, setFTrangThai] = useState('-1')
  const [fFile,      setFFile]      = useState('')
  const [fFromDate,  setFFromDate]  = useState(today)
  const [fToDate,    setFToDate]    = useState(today)

  const [aBieuMau,   setABieuMau]   = useState('')
  const [aTrangThai, setATrangThai] = useState('-1')
  const [aFile,      setAFile]      = useState('')
  const [aFromDate,  setAFromDate]  = useState(today)
  const [aToDate,    setAToDate]    = useState(today)

  const [imports,     setImports]     = useState([])
  const [loadingList, setLoadingList] = useState(false)
  const [total,       setTotal]       = useState(0)
  const [totalPages,  setTotalPages]  = useState(1)
  const [page,        setPage]        = useState(1)
  const [perPage,     setPerPage]     = useState(10)
  const [selected,    setSelected]    = useState([])
  const [zipOpen,     setZipOpen]     = useState(false)
  const [importOpen,  setImportOpen]  = useState(false)

  useEffect(() => {
    getLoaiMauKSKList().then(setMauPhieuOptions).catch(() => {})
  }, [])

  const fetchImports = useCallback(async () => {
    setLoadingList(true)
    try {
      const res = await getListImportFileExcel({
        fromDate: aFromDate, toDate: aToDate,
        tdLoaimauKskid: aBieuMau, isSuccess: Number(aTrangThai),
        search: aFile, page, pageSize: perPage,
      })
      setImports(res.items)
      setTotal(res.total)
      setTotalPages(res.totalPages)
      setSelected([])
    } catch {}
    finally { setLoadingList(false) }
  }, [aFromDate, aToDate, aBieuMau, aTrangThai, aFile, page, perPage])

  useEffect(() => { fetchImports() }, [fetchImports])

  const allChecked = imports.length > 0 && imports.every(r => selected.includes(r.Id))
  const toggleAll  = () => setSelected(allChecked ? [] : imports.map(r => r.Id))
  const toggleOne  = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const handleReset = () => {
    setFBieuMau(''); setFTrangThai('-1'); setFFile(''); setFFromDate(today); setFToDate(today)
    setPage(1)
    setABieuMau(''); setATrangThai('-1'); setAFile(''); setAFromDate(today); setAToDate(today)
  }
  const handleFilter = () => {
    setPage(1)
    setABieuMau(fBieuMau); setATrangThai(fTrangThai); setAFile(fFile)
    setAFromDate(fFromDate); setAToDate(fToDate)
  }

  const handleCloseImport = () => { setImportOpen(false); fetchImports() }

  const mauMap = Object.fromEntries(mauPhieuOptions.map(o => [String(o.Id), o.Name]))

  const selectStyle = {
    height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)',
    padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)',
    color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none', width: '100%',
  }
  const inputStyle = { ...selectStyle, cursor: 'text' }
  const labelStyle = { fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.3rem', display: 'block' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>Nhập dữ liệu sức khỏe</div>
        <button
          onClick={() => setImportOpen(true)}
          style={{ height: 40, padding: '0 1.1rem', borderRadius: 'var(--radius-md)', border: 'none', background: '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem' }}
        >
          <i className="bi bi-file-earmark-excel-fill" /> Import Excel
        </button>
      </div>

      <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '1rem' }}>Lọc</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Từ ngày</label>
            <input type="date" style={inputStyle} value={fFromDate} onChange={e => setFFromDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Đến ngày</label>
            <input type="date" style={inputStyle} value={fToDate} onChange={e => setFToDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Biểu mẫu</label>
            <select style={selectStyle} value={fBieuMau} onChange={e => setFBieuMau(e.target.value)}>
              <option value="">Tất cả</option>
              {mauPhieuOptions.map(o => <option key={o.Id} value={o.Id}>{o.Name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Trạng thái</label>
            <select style={selectStyle} value={fTrangThai} onChange={e => setFTrangThai(e.target.value)}>
              {TRANG_THAI_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tệp XLSX/XLSM</label>
            <input style={inputStyle} placeholder="Tệp XLSX/XLSM" value={fFile} onChange={e => setFFile(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>
          <button onClick={handleReset} style={{ height: 36, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.83rem', cursor: 'pointer' }}>
            Đặt lại
          </button>
          <button onClick={handleFilter} style={{ height: 36, padding: '0 1.1rem', borderRadius: 'var(--radius-md)', border: 'none', background: '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.83rem', cursor: 'pointer' }}>
            Lọc
          </button>
        </div>
      </div>

      <div className="card-custom" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <span style={{ fontSize: '.83rem', color: 'var(--gray-600)' }}>Mỗi trang:</span>
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
              style={{ height: 32, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', padding: '0 .5rem', fontSize: '.83rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }}
            >
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button
            onClick={() => setZipOpen(true)}
            style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: '#2563eb', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.35rem' }}
          >
            <i className="bi bi-file-zip-fill" /> Tải gói file kết quả (.ZIP)
          </button>
          <button
            disabled={selected.length === 0}
            style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: selected.length > 0 ? '#dc2626' : 'var(--gray-200)', color: selected.length > 0 ? '#fff' : 'var(--gray-400)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '.35rem', transition: 'all .15s' }}
          >
            <i className="bi bi-trash3-fill" /> Xóa các tệp import đã chọn
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                {[
                  { label: 'Thao tác', w: 80 },
                  { label: <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} />, w: 40 },
                  { label: 'Tệp XLSX/XLSM', sort: true },
                  { label: 'Biểu mẫu', sort: true },
                  { label: 'Trạng thái', sort: true },
                  { label: 'Tiến độ xử lý' },
                  { label: 'Ghi chú' },
                  { label: 'Thời điểm tạo', sort: true },
                ].map((h, i) => (
                  <th key={i} style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', width: h.w, textAlign: i <= 1 ? 'center' : 'left' }}>
                    {h.label}{h.sort && <i className="bi bi-chevron-expand ms-1" style={{ opacity: .4 }} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingList ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}><span className="spinner-border spinner-border-sm me-2" />Đang tải...</td></tr>
              ) : imports.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Không tìm thấy kết quả</td></tr>
              ) : imports.map(r => {
                const st = STATUS_MAP[r.IsSuccess] || { label: '—', bg: 'var(--gray-100)', color: 'var(--gray-500)' }
                const tienDo = r.IsSuccess === 1 ? 100 : 0
                const checked = selected.includes(r.Id)
                return (
                  <tr key={r.Id} className={checked ? 'row-checked' : ''} style={{ background: checked ? 'var(--primary-bg)' : 'transparent', borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <button title="Xem chi tiết" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem', padding: '0 .25rem' }}><i className="bi bi-eye" /></button>
                      <button title="Tải xuống" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontSize: '1rem', padding: '0 .25rem' }}><i className="bi bi-download" /></button>
                    </td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleOne(r.Id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-800)', fontWeight: 500 }}>
                      <i className="bi bi-file-earmark-excel-fill me-1" style={{ color: '#16a34a' }} />{r.TenFile}
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)' }}>{mauMap[String(r.td_loaimau_kskid)] || r.td_loaimau_kskid}</td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      <span style={{ background: st.bg, color: st.color, fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 99, whiteSpace: 'nowrap' }}>{st.label}</span>
                    </td>
                    <td style={{ padding: '.6rem .875rem', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <div style={{ flex: 1, height: 6, background: 'var(--gray-100)', borderRadius: 99 }}>
                          <div style={{ width: `${tienDo}%`, height: '100%', background: tienDo === 100 ? '#16a34a' : '#dc2626', borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', flexShrink: 0 }}>{tienDo}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.78rem', color: '#dc2626' }}>{r.GhiChu || <span style={{ color: 'var(--gray-300)' }}>—</span>}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.8rem', color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>{formatDateTime(r.CreatedAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div style={{ marginTop: '.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '.78rem', color: 'var(--gray-400)' }}>Trang {page} / {totalPages} &nbsp;·&nbsp; Tổng {total} kết quả</div>
            <div style={{ display: 'flex', gap: '.35rem' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{ height: 30, padding: '0 .75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: page <= 1 ? 'var(--gray-300)' : 'var(--gray-700)', fontSize: '.78rem', cursor: page <= 1 ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600 }}>‹ Trước</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} style={{ height: 30, padding: '0 .75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: page >= totalPages ? 'var(--gray-300)' : 'var(--gray-700)', fontSize: '.78rem', cursor: page >= totalPages ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Sau ›</button>
            </div>
          </div>
        )}
      </div>

      {importOpen && <ImportModal onClose={handleCloseImport} mauPhieuOptions={mauPhieuOptions} />}
      {zipOpen && <ZipModal selectedCount={selected.length} onClose={() => setZipOpen(false)} />}
    </div>
  )
}
