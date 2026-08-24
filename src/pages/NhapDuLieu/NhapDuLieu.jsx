import { useRef, useState } from 'react' 

function ImportModal({ onClose }) {
  const fileRef   = useRef(null)
  const [bieuMau, setBieuMau] = useState('')
  const [file,    setFile]    = useState(null)

  const canSubmit = bieuMau && file

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
              {BIEU_MAU_LIST.map(b => <option key={b} value={b}>{b}</option>)}
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.625rem', padding: '1rem 1.75rem', borderTop: '1px solid var(--gray-100)' }}>
          <button onClick={onClose} style={{ height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
            HỦY
          </button>
          <button
            disabled={!canSubmit}
            style={{ height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', background: canSubmit ? 'var(--gray-900)' : 'var(--gray-300)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'background .15s' }}
          >
            TẠO BẢN XEM TRƯỚC
          </button>
        </div>
      </div>
    </div>
  )
}

const BIEU_MAU_LIST = ['Biểu mẫu KSK toàn dân', 'Biểu mẫu KSK trẻ em', 'Biểu mẫu KSK học sinh', 'Biểu mẫu KSK người cao tuổi']
const TRANG_THAI_LIST = ['Tất cả trạng thái', 'Đang xử lý', 'Hoàn thành', 'Thất bại', 'Chờ xử lý']

const MOCK_IMPORTS = [
  { id: 1, file: 'KSK_toan_dan_T8_2026.xlsx',     bieuMau: 'Biểu mẫu KSK toàn dân',      trangThai: 'Hoàn thành', tienDo: 100, lyDo: '',                            thoiDiem: '24/08/2026 14:32' },
  { id: 2, file: 'KSK_tre_em_Q2_2026.xlsx',       bieuMau: 'Biểu mẫu KSK trẻ em',        trangThai: 'Thất bại',   tienDo: 45,  lyDo: 'Sai định dạng cột CCCD',      thoiDiem: '23/08/2026 09:15' },
  { id: 3, file: 'KSK_hoc_sinh_2026.xlsm',        bieuMau: 'Biểu mẫu KSK học sinh',      trangThai: 'Hoàn thành', tienDo: 100, lyDo: '',                            thoiDiem: '22/08/2026 16:48' },
  { id: 4, file: 'KSK_nguoi_cao_tuoi_T7.xlsx',    bieuMau: 'Biểu mẫu KSK người cao tuổi',trangThai: 'Đang xử lý', tienDo: 67,  lyDo: '',                            thoiDiem: '21/08/2026 11:20' },
  { id: 5, file: 'KSK_toan_dan_T7_2026.xlsx',     bieuMau: 'Biểu mẫu KSK toàn dân',      trangThai: 'Hoàn thành', tienDo: 100, lyDo: '',                            thoiDiem: '18/08/2026 08:05' },
  { id: 6, file: 'import_backup_20260815.xlsx',   bieuMau: 'Biểu mẫu KSK toàn dân',      trangThai: 'Thất bại',   tienDo: 10,  lyDo: 'File không đúng mẫu quy định',thoiDiem: '15/08/2026 13:44' },
]

const STATUS_STYLE = {
  'Hoàn thành': { bg: '#dcfce7', color: '#166534' },
  'Thất bại':   { bg: '#fee2e2', color: '#991b1b' },
  'Đang xử lý': { bg: '#dbeafe', color: '#1e40af' },
  'Chờ xử lý':  { bg: '#fef9c3', color: '#854d0e' },
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
  const [fBieuMau,   setFBieuMau]   = useState('')
  const [fTrangThai, setFTrangThai] = useState('Tất cả trạng thái')
  const [fFile,      setFFile]      = useState('')

  const [aBieuMau,   setABieuMau]   = useState('')
  const [aTrangThai, setATrangThai] = useState('Tất cả trạng thái')
  const [aFile,      setAFile]      = useState('')

  const [perPage,   setPerPage]   = useState(10)
  const [selected,  setSelected]  = useState([])
  const [zipOpen,    setZipOpen]    = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [importing,  setImporting]  = useState(false)

  const filtered = MOCK_IMPORTS.filter(r => {
    if (aBieuMau   && r.bieuMau !== aBieuMau) return false
    if (aTrangThai !== 'Tất cả trạng thái' && r.trangThai !== aTrangThai) return false
    if (aFile      && !r.file.toLowerCase().includes(aFile.toLowerCase())) return false
    return true
  })

  const displayed = filtered.slice(0, perPage)

  const allChecked = displayed.length > 0 && displayed.every(r => selected.includes(r.id))
  const toggleAll  = () => setSelected(allChecked ? [] : displayed.map(r => r.id))
  const toggleOne  = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const handleReset = () => { setFBieuMau(''); setFTrangThai('Tất cả trạng thái'); setFFile(''); setABieuMau(''); setATrangThai('Tất cả trạng thái'); setAFile('') }
  const handleFilter = () => { setABieuMau(fBieuMau); setATrangThai(fTrangThai); setAFile(fFile) }

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
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>Nhập dữ liệu sức khỏe</div>
        </div>
        <button
          onClick={() => setImportOpen(true)}
          disabled={importing}
          style={{ height: 40, padding: '0 1.1rem', borderRadius: 'var(--radius-md)', border: 'none', background: '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem' }}
        >
          {importing ? <><span className="spinner-border spinner-border-sm" /> Đang nhập...</> : <><i className="bi bi-file-earmark-excel-fill" /> Import Excel</>}
        </button>
      </div>

            <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '1rem' }}>Lọc</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Biểu mẫu</label>
            <select style={selectStyle} value={fBieuMau} onChange={e => setFBieuMau(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {BIEU_MAU_LIST.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Trạng thái</label>
            <select style={selectStyle} value={fTrangThai} onChange={e => setFTrangThai(e.target.value)}>
              {TRANG_THAI_LIST.map(t => <option key={t} value={t}>{t}</option>)}
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
              onChange={e => setPerPage(Number(e.target.value))}
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
                  { label: 'Lý do thất bại' },
                  { label: 'Thời điểm tạo', sort: true },
                ].map((h, i) => (
                  <th key={i} style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', width: h.w, textAlign: i <= 1 ? 'center' : 'left' }}>
                    {h.label}{h.sort && <i className="bi bi-chevron-expand ms-1" style={{ opacity: .4 }} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>
                    Không tìm thấy kết quả
                  </td>
                </tr>
              ) : displayed.map((r, i) => {
                const st = STATUS_STYLE[r.trangThai] || {}
                const checked = selected.includes(r.id)
                return (
                  <tr key={r.id} className={checked ? 'row-checked' : ''} style={{ background: checked ? 'var(--primary-bg)' : 'transparent', borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <button title="Xem chi tiết" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem', padding: '0 .25rem' }}>
                        <i className="bi bi-eye" />
                      </button>
                      <button title="Tải xuống" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontSize: '1rem', padding: '0 .25rem' }}>
                        <i className="bi bi-download" />
                      </button>
                    </td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleOne(r.id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-800)', fontWeight: 500 }}>
                      <i className="bi bi-file-earmark-excel-fill me-1" style={{ color: '#16a34a' }} />{r.file}
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)' }}>{r.bieuMau}</td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      <span style={{ background: st.bg, color: st.color, fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 99, whiteSpace: 'nowrap' }}>
                        {r.trangThai}
                      </span>
                    </td>
                    <td style={{ padding: '.6rem .875rem', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <div style={{ flex: 1, height: 6, background: 'var(--gray-100)', borderRadius: 99 }}>
                          <div style={{ width: `${r.tienDo}%`, height: '100%', background: r.tienDo === 100 ? '#16a34a' : r.trangThai === 'Thất bại' ? '#dc2626' : '#2563eb', borderRadius: 99, transition: 'width .4s' }} />
                        </div>
                        <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', flexShrink: 0 }}>{r.tienDo}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.78rem', color: '#dc2626' }}>{r.lyDo || <span style={{ color: 'var(--gray-300)' }}>—</span>}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.8rem', color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>{r.thoiDiem}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

                {filtered.length > 0 && (
          <div style={{ marginTop: '.875rem', fontSize: '.78rem', color: 'var(--gray-400)', textAlign: 'right' }}>
            Hiển thị {displayed.length} / {filtered.length} kết quả
          </div>
        )}
      </div>

            {importOpen && <ImportModal onClose={() => setImportOpen(false)} />}

            {zipOpen && <ZipModal selectedCount={selected.length} onClose={() => setZipOpen(false)} />}
    </div>
  )
}
