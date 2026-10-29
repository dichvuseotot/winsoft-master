import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getThongTinHanhChinhList } from '../../services'

const TODAY = new Date().toISOString().slice(0, 10)

const MAU_PHIEU_OPTIONS = [
  { value: '',  label: '-- Tất cả --' },
  { value: 1,   label: 'KSK ≥ 18 tuổi' },
  { value: 2,   label: 'KSK 6 đến dưới 18 tuổi' },
  { value: 3,   label: 'KSK dưới 6 tuổi' },
]

const MAU_PHIEU_LABEL = { 1: 'KSK ≥ 18 tuổi', 2: 'KSK 6-18 tuổi', 3: 'KSK < 6 tuổi' }

const TRANG_THAI_LIEN_THONG = [
  { key: 'da-dong-bo',   label: 'Đã đồng bộ',           sub: 'Đã tiếp nhận',  bg: '#f0fdf4', border: '#86efac', iconBg: '#16a34a', icon: 'bi-check-circle-fill',        textColor: '#15803d' },
  { key: 'chua-dong-bo', label: 'Chưa đồng bộ dữ liệu', sub: 'Chờ liên thông',bg: '#eff6ff', border: '#93c5fd', iconBg: '#2563eb', icon: 'bi-arrow-repeat',              textColor: '#1d4ed8' },
  { key: 'dong-bo-loi',  label: 'Đồng bộ lỗi',          sub: 'Cần xử lý',     bg: '#fff1f2', border: '#fca5a5', iconBg: '#dc2626', icon: 'bi-exclamation-triangle-fill', textColor: '#dc2626' },
  { key: 'dang-dong-bo', label: 'Đang đồng bộ',          sub: 'Đang gửi',      bg: '#fffbeb', border: '#fcd34d', iconBg: '#d97706', icon: 'bi-arrow-clockwise',           textColor: '#b45309' },
]

const STATUS_LABEL = {
  'da-dong-bo':   { label: 'Đã đồng bộ',   bg: '#dcfce7', color: '#166534' },
  'chua-dong-bo': { label: 'Chưa đồng bộ', bg: '#dbeafe', color: '#1e40af' },
  'dong-bo-loi':  { label: 'Đồng bộ lỗi',  bg: '#fee2e2', color: '#991b1b' },
  'dang-dong-bo': { label: 'Đang đồng bộ', bg: '#fef9c3', color: '#854d0e' },
}

export default function HoSoKSK() {
  const navigate = useNavigate()
  const [fHoTen,      setFHoTen]    = useState('')
  const [fCCCD,       setFCCCD]     = useState('')
  const [fTu,         setFTu]       = useState(TODAY)
  const [fDen,        setFDen]      = useState(TODAY)
  const [fMauPhieu,   setFMauPhieu] = useState('')
  const [quickFilter, setQuickFilter] = useState('')
  const [perPage,     setPerPage]   = useState(20)
  const [page,        setPage]      = useState(1)
  const [selected,    setSelected]  = useState([])
  const [data,        setData]      = useState([])
  const [total,       setTotal]     = useState(0)
  const [totalPages,  setTotalPages]= useState(1)
  const [loading,     setLoading]   = useState(false)
  const [applied,     setApplied]   = useState({ fromDate: TODAY, toDate: TODAY, mauPhieu: undefined, search: '' })

  const fetchData = async (params) => {
    setLoading(true)
    try {
      const res = await getThongTinHanhChinhList(params)
      setData(res.items)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData({ fromDate: TODAY, toDate: TODAY, page: 1, pageSize: perPage })
  }, [])

  const handleFilter = () => {
    const params = { fromDate: fTu, toDate: fDen, mauPhieu: fMauPhieu || undefined, search: fHoTen || fCCCD || '', page: 1, pageSize: perPage }
    setApplied({ fromDate: fTu, toDate: fDen, mauPhieu: fMauPhieu || undefined, search: fHoTen || fCCCD || '' })
    setPage(1)
    fetchData(params)
  }

  const handleReset = () => {
    setFHoTen(''); setFCCCD(''); setFTu(TODAY); setFDen(TODAY); setFMauPhieu(''); setQuickFilter(''); setPage(1)
    const params = { fromDate: TODAY, toDate: TODAY, page: 1, pageSize: perPage }
    setApplied({ fromDate: TODAY, toDate: TODAY, mauPhieu: undefined, search: '' })
    fetchData(params)
  }

  const goToPage = (p) => {
    setPage(p)
    fetchData({ ...applied, page: p, pageSize: perPage })
  }

  const toTrangThai = (r) => r.IsSynchronize === 1 ? 'da-dong-bo' : 'chua-dong-bo'

  const filtered = data.filter(r => {
    if (quickFilter && toTrangThai(r) !== quickFilter) return false
    return true
  })

  const displayed  = filtered
  const allChecked = displayed.length > 0 && displayed.every(r => selected.includes(r.Id))
  const toggleAll  = () => setSelected(allChecked ? [] : displayed.map(r => r.Id))
  const toggleOne  = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const counts = {
    'da-dong-bo':   data.filter(r => toTrangThai(r) === 'da-dong-bo').length,
    'chua-dong-bo': data.filter(r => toTrangThai(r) === 'chua-dong-bo').length,
    'dong-bo-loi':  0,
    'dang-dong-bo': 0,
  }

  const selectStyle = { width: '100%', height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }
  const inputStyle  = { ...selectStyle, cursor: 'text' }
  const labelStyle  = { fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.3rem', display: 'block' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>Hồ sơ KSK</div>
        <button onClick={() => navigate('/ho-so-ksk/tao-moi')} style={{ height: 38, padding: '0 1.1rem', borderRadius: 'var(--radius-md)', border: 'none', background: '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          <i className="bi bi-plus-lg" /> Tạo
        </button>
      </div>

      <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '.875rem' }}>Lọc</div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.07em', textTransform: 'uppercase' }}>
              <i className="bi bi-cloud-arrow-up-fill" style={{ color: '#16a34a' }} /> Trạng thái liên thông
            </div>
            <div style={{ fontSize: '.75rem', color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '.3rem' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
              Nhấn vào ô để lọc nhanh
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.75rem' }}>
            {TRANG_THAI_LIEN_THONG.map(s => {
              const active = quickFilter === s.key
              return (
                <div
                  key={s.key}
                  onClick={() => setQuickFilter(active ? '' : s.key)}
                  style={{ background: s.bg, border: `1.5px solid ${active ? s.iconBg : s.border}`, borderRadius: 'var(--radius-md)', padding: '.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all .15s', boxShadow: active ? `0 0 0 2px ${s.iconBg}40` : 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`bi ${s.icon}`} style={{ color: '#fff', fontSize: '.9rem' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.82rem', color: s.textColor }}>{s.label}</div>
                      <div style={{ fontSize: '.72rem', color: s.textColor, opacity: .75 }}>{s.sub}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: s.textColor }}>{counts[s.key]}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '.875rem' }}>
          <div>
            <label style={labelStyle}>Họ tên</label>
            <input style={inputStyle} placeholder="Nhập họ và tên..." value={fHoTen} onChange={e => setFHoTen(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>
          <div>
            <label style={labelStyle}>CCCD/Mã định danh</label>
            <input style={inputStyle} placeholder="Nhập CCCD hoặc Mã định danh..." value={fCCCD} onChange={e => setFCCCD(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>
          <div>
            <label style={labelStyle}>Ngày vào khám (Từ)</label>
            <input type="date" style={inputStyle} value={fTu} onChange={e => setFTu(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Ngày vào khám (Đến)</label>
            <input type="date" style={inputStyle} value={fDen} onChange={e => setFDen(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Mẫu phiếu</label>
            <select style={selectStyle} value={fMauPhieu} onChange={e => setFMauPhieu(e.target.value)}>
              {MAU_PHIEU_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
            <select value={perPage} onChange={e => { const n = Number(e.target.value); setPerPage(n); setPage(1); fetchData({ ...applied, page: 1, pageSize: n }) }}
              style={{ height: 32, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', padding: '0 .5rem', fontSize: '.83rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }}>
              {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: '#2563eb', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
            <i className="bi bi-cloud-arrow-up-fill" /> Đẩy liên thông đã chọn
          </button>
          <button style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: '#0891b2', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
            <i className="bi bi-file-earmark-excel-fill" /> Xuất Excel dữ liệu
          </button>
          <button disabled={selected.length === 0}
            style={{ height: 34, padding: '0 .875rem', borderRadius: 'var(--radius-sm)', border: 'none', background: selected.length > 0 ? '#dc2626' : 'var(--gray-200)', color: selected.length > 0 ? '#fff' : 'var(--gray-400)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.78rem', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '.35rem', transition: 'all .15s' }}>
            <i className="bi bi-trash3-fill" /> Xóa các hồ sơ đã chọn
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                {[
                  { label: 'Thao tác', w: 80, center: true },
                  { label: <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} />, w: 40, center: true },
                  { label: 'Họ tên', sort: true },
                  { label: 'CCCD/Mã định danh', sort: true },
                  { label: 'Mẫu phiếu', sort: true },
                  { label: 'Ngày khám', sort: true },
                  { label: 'Trạng thái liên thông', sort: true },
                  { label: 'Ghi chú' },
                  { label: 'Ngày tạo', sort: true },
                ].map((h, i) => (
                  <th key={i} style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', width: h.w, textAlign: h.center ? 'center' : 'left' }}>
                    {h.label}{h.sort && <i className="bi bi-chevron-expand ms-1" style={{ opacity: .4 }} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Đang tải...</td></tr>
              ) : displayed.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Không tìm thấy kết quả</td></tr>
              ) : displayed.map((r) => {
                const st = STATUS_LABEL[toTrangThai(r)]
                const checked = selected.includes(r.Id)
                return (
                  <tr key={r.Id} className={checked ? 'row-checked' : ''} style={{ background: checked ? 'var(--primary-bg)' : 'transparent', borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <button title="Xem chi tiết" onClick={() => navigate(`/ho-so-ksk/tao-moi?id=${r.Id}&mauPhieu=${r.td_loaimau_kskid}&mode=view`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem', padding: '0 .2rem' }}><i className="bi bi-eye" /></button>
                      <button title="Chỉnh sửa" onClick={() => navigate(`/ho-so-ksk/tao-moi?id=${r.Id}&mauPhieu=${r.td_loaimau_kskid}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', fontSize: '1rem', padding: '0 .2rem' }}><i className="bi bi-pencil" /></button>
                    </td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleOne(r.Id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', fontWeight: 600, color: 'var(--gray-800)' }}>{r.HO_TEN}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-600)', fontFamily: 'monospace' }}>{r.SO_CCCD}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)' }}>{MAU_PHIEU_LABEL[r.td_loaimau_kskid] ?? r.td_loaimau_kskid}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{r.NGAY_VAO}</td>
                    <td style={{ padding: '.6rem .875rem' }}>
                      <span style={{ background: st.bg, color: st.color, fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 99, whiteSpace: 'nowrap' }}>{st.label}</span>
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.82rem', color: 'var(--gray-400)' }}>—</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{r.PostingDate ? new Date(r.PostingDate).toLocaleString('vi-VN') : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div style={{ marginTop: '.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
            <div style={{ fontSize: '.78rem', color: 'var(--gray-400)' }}>
              Trang {page} / {totalPages} — Tổng {total} kết quả
            </div>
            <div style={{ display: 'flex', gap: '.35rem' }}>
              <button
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                style={{ height: 30, padding: '0 .75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: page <= 1 ? 'var(--gray-300)' : 'var(--gray-700)', fontSize: '.8rem', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
              >‹ Trước</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push('...')
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) => p === '...'
                  ? <span key={`e${i}`} style={{ padding: '0 .3rem', fontSize: '.8rem', color: 'var(--gray-400)' }}>…</span>
                  : <button key={p} onClick={() => goToPage(p)} style={{ height: 30, minWidth: 30, padding: '0 .5rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid', borderColor: p === page ? '#2563eb' : 'var(--gray-200)', background: p === page ? '#2563eb' : 'var(--gray-100)', color: p === page ? '#fff' : 'var(--gray-700)', fontSize: '.8rem', fontWeight: p === page ? 700 : 400, cursor: 'pointer' }}>{p}</button>
                )}
              <button
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
                style={{ height: 30, padding: '0 .75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: page >= totalPages ? 'var(--gray-300)' : 'var(--gray-700)', fontSize: '.8rem', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
              >Sau ›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
