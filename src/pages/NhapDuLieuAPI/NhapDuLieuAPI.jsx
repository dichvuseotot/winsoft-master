import { useState } from 'react'

const TRANG_THAI_LIST  = ['Tất cả trạng thái', 'Thành công', 'Thất bại', 'Đang xử lý', 'Chờ xử lý']
const MA_PHAN_HOI_LIST = ['Tất cả trạng thái', '200 OK', '400 Bad Request', '401 Unauthorized', '404 Not Found', '500 Internal Server Error']
const BIEU_MAU_LIST    = ['Tất cả trạng thái', 'Biểu mẫu KSK toàn dân', 'Biểu mẫu KSK trẻ em', 'Biểu mẫu KSK học sinh', 'Biểu mẫu KSK người cao tuổi']

const MOCK_DATA = [
  { id: 1, hoTen: 'Nguyễn Văn An',  bieuMau: 'Biểu mẫu KSK toàn dân',       trangThai: 'Thành công', maPhanHoi: '200 OK',                    thoiDiem: '24/08/2026 14:32' },
  { id: 2, hoTen: 'Trần Thị Bình',  bieuMau: 'Biểu mẫu KSK trẻ em',         trangThai: 'Thất bại',   maPhanHoi: '400 Bad Request',           thoiDiem: '24/08/2026 13:15' },
  { id: 3, hoTen: 'Lê Minh Công',   bieuMau: 'Biểu mẫu KSK toàn dân',       trangThai: 'Thành công', maPhanHoi: '200 OK',                    thoiDiem: '23/08/2026 16:48' },
  { id: 4, hoTen: 'Phạm Thị Duyên', bieuMau: 'Biểu mẫu KSK học sinh',       trangThai: 'Thất bại',   maPhanHoi: '500 Internal Server Error', thoiDiem: '23/08/2026 11:20' },
  { id: 5, hoTen: 'Hoàng Văn Đức',  bieuMau: 'Biểu mẫu KSK người cao tuổi', trangThai: 'Thành công', maPhanHoi: '200 OK',                    thoiDiem: '22/08/2026 09:05' },
  { id: 6, hoTen: 'Vũ Thị Lan',     bieuMau: 'Biểu mẫu KSK toàn dân',       trangThai: 'Đang xử lý', maPhanHoi: '—',                        thoiDiem: '22/08/2026 08:44' },
  { id: 7, hoTen: 'Đặng Minh Tuấn', bieuMau: 'Biểu mẫu KSK trẻ em',         trangThai: 'Thành công', maPhanHoi: '200 OK',                    thoiDiem: '21/08/2026 15:30' },
  { id: 8, hoTen: 'Ngô Thị Hà',     bieuMau: 'Biểu mẫu KSK học sinh',       trangThai: 'Thất bại',   maPhanHoi: '401 Unauthorized',          thoiDiem: '20/08/2026 10:12' },
]

const STATUS_STYLE = {
  'Thành công': { bg: '#dcfce7', color: '#166534' },
  'Thất bại':   { bg: '#fee2e2', color: '#991b1b' },
  'Đang xử lý': { bg: '#dbeafe', color: '#1e40af' },
  'Chờ xử lý':  { bg: '#fef9c3', color: '#854d0e' },
}
const MA_STYLE = {
  '200 OK':                    { color: '#166534', bg: '#dcfce7' },
  '400 Bad Request':           { color: '#92400e', bg: '#fef3c7' },
  '401 Unauthorized':          { color: '#92400e', bg: '#fef3c7' },
  '404 Not Found':             { color: '#92400e', bg: '#fef3c7' },
  '500 Internal Server Error': { color: '#991b1b', bg: '#fee2e2' },
}

export default function NhapDuLieuAPI() {
  const [fHoTen,     setFHoTen]     = useState('')
  const [fTrangThai, setFTrangThai] = useState('Tất cả trạng thái')
  const [fMaPhanHoi, setFMaPhanHoi] = useState('Tất cả trạng thái')
  const [fBieuMau,   setFBieuMau]   = useState('Tất cả trạng thái')
  const [aHoTen,     setAHoTen]     = useState('')
  const [aTrangThai, setATrangThai] = useState('Tất cả trạng thái')
  const [aMaPhanHoi, setAMaPhanHoi] = useState('Tất cả trạng thái')
  const [aBieuMau,   setABieuMau]   = useState('Tất cả trạng thái')
  const [perPage,    setPerPage]    = useState(10)
  const [selected,   setSelected]   = useState([])

  const filtered = MOCK_DATA.filter(r => {
    if (aHoTen     && !r.hoTen.toLowerCase().includes(aHoTen.toLowerCase())) return false
    if (aTrangThai !== 'Tất cả trạng thái' && r.trangThai !== aTrangThai)    return false
    if (aMaPhanHoi !== 'Tất cả trạng thái' && r.maPhanHoi !== aMaPhanHoi)    return false
    if (aBieuMau   !== 'Tất cả trạng thái' && r.bieuMau   !== aBieuMau)      return false
    return true
  })
  const displayed  = filtered.slice(0, perPage)
  const allChecked = displayed.length > 0 && displayed.every(r => selected.includes(r.id))
  const toggleAll  = () => setSelected(allChecked ? [] : displayed.map(r => r.id))
  const toggleOne  = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const handleReset  = () => {
    setFHoTen(''); setFTrangThai('Tất cả trạng thái'); setFMaPhanHoi('Tất cả trạng thái'); setFBieuMau('Tất cả trạng thái')
    setAHoTen(''); setATrangThai('Tất cả trạng thái'); setAMaPhanHoi('Tất cả trạng thái'); setABieuMau('Tất cả trạng thái')
  }
  const handleFilter = () => { setAHoTen(fHoTen); setATrangThai(fTrangThai); setAMaPhanHoi(fMaPhanHoi); setABieuMau(fBieuMau) }

  const selectStyle = { width: '100%', height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }
  const inputStyle  = { ...selectStyle, cursor: 'text' }
  const labelStyle  = { fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.3rem', display: 'block' }

  return (
    <div>
            <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>Nhập dữ liệu từ API</div>
        <div style={{ fontSize: '.82rem', color: 'var(--gray-500)', marginTop: '.25rem' }}>
          Theo dõi request/response đồng bộ dữ liệu qua API push trong phạm vi truy cập.
        </div>
      </div>

            <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '1rem' }}>Lọc</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '.875rem' }}>
          <div>
            <label style={labelStyle}>Họ và tên</label>
            <input style={inputStyle} placeholder="Nhập họ và tên..." value={fHoTen} onChange={e => setFHoTen(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>
          <div>
            <label style={labelStyle}>Trạng thái</label>
            <select style={selectStyle} value={fTrangThai} onChange={e => setFTrangThai(e.target.value)}>
              {TRANG_THAI_LIST.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Mã phản hồi</label>
            <select style={selectStyle} value={fMaPhanHoi} onChange={e => setFMaPhanHoi(e.target.value)}>
              {MA_PHAN_HOI_LIST.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Biểu mẫu KSK</label>
            <select style={selectStyle} value={fBieuMau} onChange={e => setFBieuMau(e.target.value)}>
              {BIEU_MAU_LIST.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <span style={{ fontSize: '.83rem', color: 'var(--gray-600)' }}>Mỗi trang:</span>
            <select value={perPage} onChange={e => setPerPage(Number(e.target.value))}
              style={{ height: 32, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', padding: '0 .5rem', fontSize: '.83rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }}>
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button disabled={selected.length === 0}
            style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: selected.length > 0 ? '#dc2626' : 'var(--gray-200)', color: selected.length > 0 ? '#fff' : 'var(--gray-400)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '.35rem', transition: 'all .15s' }}>
            <i className="bi bi-trash3-fill" /> Xóa các yêu cầu đã chọn
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                {[
                  { label: 'Thao tác',     w: 80, center: true },
                  { label: <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} />, w: 40, center: true },
                  { label: 'Họ và tên',    sort: true },
                  { label: 'Biểu mẫu KSK', sort: true },
                  { label: 'Trạng thái',   sort: true },
                  { label: 'Mã phản hồi',  sort: true },
                  { label: 'Thời điểm tạo',sort: true },
                ].map((h, i) => (
                  <th key={i} style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', width: h.w, textAlign: h.center ? 'center' : 'left' }}>
                    {h.label}{h.sort && <i className="bi bi-chevron-expand ms-1" style={{ opacity: .4 }} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Không tìm thấy kết quả</td></tr>
              ) : displayed.map((r, i) => {
                const st = STATUS_STYLE[r.trangThai] || {}
                const ms = MA_STYLE[r.maPhanHoi]     || {}
                const checked = selected.includes(r.id)
                return (
                  <tr key={r.id} className={checked ? 'row-checked' : ''} style={{ background: checked ? 'var(--primary-bg)' : 'transparent', borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <button title="Xem chi tiết" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem', padding: '0 .25rem' }}><i className="bi bi-eye" /></button>
                      <button title="Thử lại" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontSize: '1rem', padding: '0 .25rem' }}><i className="bi bi-arrow-clockwise" /></button>
                    </td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleOne(r.id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', fontWeight: 600, color: 'var(--gray-800)' }}>{r.hoTen}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)' }}>{r.bieuMau}</td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      <span style={{ background: st.bg, color: st.color, fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 99, whiteSpace: 'nowrap' }}>{r.trangThai}</span>
                    </td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      {r.maPhanHoi === '—'
                        ? <span style={{ color: 'var(--gray-300)' }}>—</span>
                        : <span style={{ background: ms.bg, color: ms.color, fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 6, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{r.maPhanHoi}</span>
                      }
                    </td>
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
    </div>
  )
}
