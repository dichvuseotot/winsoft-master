import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TRANG_THAI_LIST = ['Tất cả trạng thái', 'Đang xử lý', 'Hoàn thành', 'Thất bại', 'Chờ xử lý']
const BIEU_MAU_LIST   = ['Tất cả trạng thái', 'Biểu mẫu KSK toàn dân', 'Biểu mẫu KSK trẻ em', 'Biểu mẫu KSK học sinh', 'Biểu mẫu KSK người cao tuổi']

const MOCK_EXPORTS = [
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', bieuMau: 'Biểu mẫu KSK toàn dân',      dinhDang: 'Excel (.xlsx)', trangThai: 'Hoàn thành', tienDo: 100, thoiDiem: '24/08/2026 14:32' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', bieuMau: 'Biểu mẫu KSK trẻ em',        dinhDang: 'Excel (.xlsx)', trangThai: 'Thất bại',   tienDo: 30,  thoiDiem: '23/08/2026 09:15' },
  { id: 'c3d4e5f6-a7b8-9012-cdef-123456789012', bieuMau: 'Biểu mẫu KSK học sinh',      dinhDang: 'PDF (.pdf)',    trangThai: 'Hoàn thành', tienDo: 100, thoiDiem: '22/08/2026 16:48' },
  { id: 'd4e5f6a7-b8c9-0123-defa-234567890123', bieuMau: 'Biểu mẫu KSK người cao tuổi',dinhDang: 'Excel (.xlsx)', trangThai: 'Đang xử lý', tienDo: 55,  thoiDiem: '21/08/2026 11:20' },
  { id: 'e5f6a7b8-c9d0-1234-efab-345678901234', bieuMau: 'Biểu mẫu KSK toàn dân',      dinhDang: 'CSV (.csv)',    trangThai: 'Hoàn thành', tienDo: 100, thoiDiem: '18/08/2026 08:05' },
]

const STATUS_STYLE = {
  'Hoàn thành': { bg: '#dcfce7', color: '#166534' },
  'Thất bại':   { bg: '#fee2e2', color: '#991b1b' },
  'Đang xử lý': { bg: '#dbeafe', color: '#1e40af' },
  'Chờ xử lý':  { bg: '#fef9c3', color: '#854d0e' },
}

export default function XuatDuLieu() {
  const navigate = useNavigate()

  const [fMaTacVu,   setFMaTacVu]   = useState('')
  const [fTrangThai, setFTrangThai] = useState('Tất cả trạng thái')
  const [fBieuMau,   setFBieuMau]   = useState('Tất cả trạng thái')

  const [aMaTacVu,   setAMaTacVu]   = useState('')
  const [aTrangThai, setATrangThai] = useState('Tất cả trạng thái')
  const [aBieuMau,   setABieuMau]   = useState('Tất cả trạng thái')

  const [perPage,  setPerPage]  = useState(10)
  const [selected, setSelected] = useState([])

  const filtered = MOCK_EXPORTS.filter(r => {
    if (aMaTacVu   && !r.id.includes(aMaTacVu.toLowerCase())) return false
    if (aTrangThai !== 'Tất cả trạng thái' && r.trangThai !== aTrangThai) return false
    if (aBieuMau   !== 'Tất cả trạng thái' && r.bieuMau   !== aBieuMau)   return false
    return true
  })
  const displayed = filtered.slice(0, perPage)

  const allChecked = displayed.length > 0 && displayed.every(r => selected.includes(r.id))
  const toggleAll  = () => setSelected(allChecked ? [] : displayed.map(r => r.id))
  const toggleOne  = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const handleReset  = () => { setFMaTacVu(''); setFTrangThai('Tất cả trạng thái'); setFBieuMau('Tất cả trạng thái'); setAMaTacVu(''); setATrangThai('Tất cả trạng thái'); setABieuMau('Tất cả trạng thái') }
  const handleFilter = () => { setAMaTacVu(fMaTacVu); setATrangThai(fTrangThai); setABieuMau(fBieuMau) }

  const selectStyle = { width: '100%', height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }
  const inputStyle  = { ...selectStyle, cursor: 'text' }
  const labelStyle  = { fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.3rem', display: 'block' }

  return (
    <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>
          Xuất dữ liệu sức khỏe
        </div>
        <button
          onClick={() => navigate('/ho-so-ksk')}
          style={{ height: 38, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem' }}
        >
          <i className="bi bi-list-ul" /> Danh sách hồ sơ KSK
        </button>
      </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="bi bi-info-lg" style={{ color: '#fff', fontSize: '.95rem' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.88rem', color: '#14532d', marginBottom: '.25rem' }}>
              Hướng dẫn tạo tác vụ xuất mới
            </div>
            <div style={{ fontSize: '.82rem', color: '#166534', lineHeight: 1.5 }}>
              Trang này quản lý lịch sử các tệp đã xuất. Để tạo tác vụ xuất mới, vui lòng vào trang{' '}
              <strong>Hồ sơ khám sức khỏe</strong>, chọn các hồ sơ cần xuất và nhấn{' '}
              <strong>Xuất dữ liệu Excel</strong>.
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/ho-so-ksk')}
          style={{ height: 38, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.83rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          Đến trang Quản lý Hồ sơ <i className="bi bi-arrow-right" />
        </button>
      </div>

            <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '1rem' }}>Lọc</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Mã tác vụ</label>
            <input style={inputStyle} placeholder="Nhập mã tác vụ (UUID)..." value={fMaTacVu} onChange={e => setFMaTacVu(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>
          <div>
            <label style={labelStyle}>Trạng thái</label>
            <select style={selectStyle} value={fTrangThai} onChange={e => setFTrangThai(e.target.value)}>
              {TRANG_THAI_LIST.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <span style={{ fontSize: '.83rem', color: 'var(--gray-600)' }}>Mỗi trang:</span>
            <select
              value={perPage} onChange={e => setPerPage(Number(e.target.value))}
              style={{ height: 32, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', padding: '0 .5rem', fontSize: '.83rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }}
            >
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button
            disabled={selected.length === 0}
            style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: selected.length > 0 ? '#dc2626' : 'var(--gray-200)', color: selected.length > 0 ? '#fff' : 'var(--gray-400)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '.35rem', transition: 'all .15s' }}
          >
            <i className="bi bi-trash3-fill" /> Xóa các tác vụ xuất đã chọn
          </button>
        </div>

                <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                {[
                  { label: 'Thao tác',     w: 80, center: true },
                  { label: <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} />, w: 40, center: true },
                  { label: 'Mã tác vụ',    sort: true },
                  { label: 'Biểu mẫu KSK', sort: true },
                  { label: 'Định dạng tệp',sort: true },
                  { label: 'Trạng thái',   sort: true },
                  { label: 'Tiến độ xử lý',sort: true },
                  { label: 'Thời điểm tạo',sort: true },
                ].map((h, i) => (
                  <th key={i} style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', width: h.w, textAlign: h.center ? 'center' : 'left', cursor: h.sort ? 'pointer' : 'default' }}>
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
                const st      = STATUS_STYLE[r.trangThai] || {}
                const checked = selected.includes(r.id)
                const shortId = r.id.slice(0, 8) + '...'
                return (
                  <tr key={r.id} className={checked ? 'row-checked' : ''} style={{ background: checked ? 'var(--primary-bg)' : 'transparent', borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <button title="Tải xuống" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem', padding: '0 .25rem' }}>
                        <i className="bi bi-download" />
                      </button>
                      <button title="Xem chi tiết" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontSize: '1rem', padding: '0 .25rem' }}>
                        <i className="bi bi-eye" />
                      </button>
                    </td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleOne(r.id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      <span title={r.id} style={{ fontFamily: 'var(--font-display)', fontSize: '.78rem', color: 'var(--primary)', fontWeight: 600, cursor: 'default' }}>{shortId}</span>
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)' }}>{r.bieuMau}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)' }}>
                      <i className={`bi ${r.dinhDang.includes('xlsx') ? 'bi-file-earmark-excel-fill' : r.dinhDang.includes('pdf') ? 'bi-file-earmark-pdf-fill' : 'bi-filetype-csv'} me-1`}
                        style={{ color: r.dinhDang.includes('xlsx') ? '#16a34a' : r.dinhDang.includes('pdf') ? '#dc2626' : '#0067AC' }} />
                      {r.dinhDang}
                    </td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      <span style={{ background: st.bg, color: st.color, fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 99, whiteSpace: 'nowrap' }}>
                        {r.trangThai}
                      </span>
                    </td>
                    <td style={{ padding: '.6rem .875rem', minWidth: 130 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <div style={{ flex: 1, height: 6, background: 'var(--gray-100)', borderRadius: 99 }}>
                          <div style={{ width: `${r.tienDo}%`, height: '100%', background: r.tienDo === 100 ? '#16a34a' : r.trangThai === 'Thất bại' ? '#dc2626' : '#2563eb', borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', flexShrink: 0 }}>{r.tienDo}%</span>
                      </div>
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
