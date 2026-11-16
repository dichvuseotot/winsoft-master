import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getLoaiMauKSKList, getListTiepNhanTuHis, getTiepNhanCCCD } from '../../services'

const today = new Date().toISOString().slice(0, 10)

const SYNC_STATUS = {
  0: { label: 'Chưa đồng bộ', bg: '#dbeafe', color: '#1e40af' },
  1: { label: 'Đã đồng bộ',   bg: '#dcfce7', color: '#166534' },
}

const formatDate = (v) => {
  if (!v) return '—'
  const d = new Date(v)
  if (isNaN(d)) return v
  return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

export default function NhapDuLieuHIS() {
  const navigate = useNavigate()

  const [fSearch,   setFSearch]   = useState('')
  const [fFromDate, setFFromDate] = useState(today)
  const [fToDate,   setFToDate]   = useState(today)
  const [fBieuMau,  setFBieuMau]  = useState('')

  const [aSearch,   setASearch]   = useState('')
  const [aFromDate, setAFromDate] = useState(today)
  const [aToDate,   setAToDate]   = useState(today)
  const [aBieuMau,  setABieuMau]  = useState('')

  const [data,       setData]       = useState([])
  const [total,      setTotal]      = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page,       setPage]       = useState(1)
  const [perPage,    setPerPage]    = useState(20)
  const [loading,    setLoading]    = useState(false)
  const [bieuMauOptions, setBieuMauOptions] = useState([])

  useEffect(() => {
    getLoaiMauKSKList().then(setBieuMauOptions).catch(() => {})
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getListTiepNhanTuHis({
        fromDate: aFromDate,
        toDate:   aToDate,
        tdLoaimauKskid: aBieuMau || undefined,
        search:   aSearch,
        page,
        pageSize: perPage,
      })
      setData(res.items)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch { setData([]) } finally { setLoading(false) }
  }, [aFromDate, aToDate, aBieuMau, aSearch, page, perPage])

  useEffect(() => { fetchData() }, [fetchData])

  const handleFilter = () => {
    setASearch(fSearch); setAFromDate(fFromDate); setAToDate(fToDate); setABieuMau(fBieuMau)
    setPage(1)
  }
  const handleReset = () => {
    setFSearch(''); setFFromDate(today); setFToDate(today); setFBieuMau('')
    setASearch(''); setAFromDate(today); setAToDate(today); setABieuMau('')
    setPage(1)
  }

  const selectStyle = { width: '100%', height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }
  const inputStyle  = { ...selectStyle, cursor: 'text' }
  const labelStyle  = { fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.3rem', display: 'block' }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>Nhập dữ liệu từ HIS</div>
        <div style={{ fontSize: '.82rem', color: 'var(--gray-500)', marginTop: '.25rem' }}>Danh sách bệnh nhân tiếp nhận từ HIS đồng bộ lên web.</div>
      </div>

      <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '1rem' }}>Lọc</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '.875rem' }}>
          <div>
            <label style={labelStyle}>Từ ngày</label>
            <input type="date" style={inputStyle} value={fFromDate} onChange={e => setFFromDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Đến ngày</label>
            <input type="date" style={inputStyle} value={fToDate} onChange={e => setFToDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Biểu mẫu KSK</label>
            <select style={selectStyle} value={fBieuMau} onChange={e => setFBieuMau(e.target.value)}>
              <option value="">Tất cả biểu mẫu</option>
              {bieuMauOptions.map(b => <option key={b.Id} value={b.Id}>{b.Name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tìm kiếm</label>
            <input style={inputStyle} placeholder="Họ tên, CCCD..." value={fSearch} onChange={e => setFSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>
          <button onClick={handleReset} style={{ height: 36, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.83rem', cursor: 'pointer' }}>Đặt lại</button>
          <button onClick={handleFilter} style={{ height: 36, padding: '0 1.1rem', borderRadius: 'var(--radius-md)', border: 'none', background: '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.83rem', cursor: 'pointer' }}>Lọc</button>
        </div>
      </div>

      <div className="card-custom" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <span style={{ fontSize: '.83rem', color: 'var(--gray-600)' }}>Mỗi trang:</span>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
              style={{ height: 32, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', padding: '0 .5rem', fontSize: '.83rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none' }}>
              {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <span style={{ fontSize: '.82rem', color: 'var(--gray-500)', marginLeft: 'auto' }}>Tổng: <b>{total}</b> bệnh nhân</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                {[
                  { label: 'Thao tác',  w: 80,  center: true },
                  { label: 'STT',       w: 52,  center: true },
                  { label: 'Họ và tên' },
                  { label: 'Giới tính', w: 90,  center: true },
                  { label: 'Ngày sinh', w: 110, center: true },
                  { label: 'CCCD',      w: 140 },
                  { label: 'Biểu mẫu',  w: 60,  center: true },
                  { label: 'Đồng bộ',   w: 120, center: true },
                  { label: 'Thời điểm', w: 150 },
                ].map((h, i) => (
                  <th key={i} style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', width: h.w, textAlign: h.center ? 'center' : 'left' }}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Đang tải...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Không tìm thấy kết quả</td></tr>
              ) : data.map((r, i) => {
                const sync = SYNC_STATUS[r.IsSynchronize] ?? SYNC_STATUS[0]
                return (
                  <tr key={r.Id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <button title="Tạo hồ sơ" onClick={async () => {
                        const detail = await getTiepNhanCCCD({ soCCCD: r.SO_CCCD, maLK: r.MA_LK })
                        navigate(`/ho-so-ksk/tao-moi?mauPhieu=${r.td_loaimau_kskid}`, { state: { hisData: detail ?? r } })
                      }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem', padding: '0 .2rem' }}>
                        <i className="bi bi-eye" />
                      </button>
                    </td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center', fontSize: '.82rem', color: 'var(--gray-500)' }}>{(page - 1) * perPage + i + 1}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', fontWeight: 600, color: 'var(--gray-800)' }}>{r.HO_TEN}</td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center', fontSize: '.83rem', color: 'var(--gray-700)' }}>{r.GIOI_TINH === 1 ? 'Nam' : r.GIOI_TINH === 0 ? 'Nữ' : '—'}</td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center', fontSize: '.83rem', color: 'var(--gray-700)' }}>{r.NGAY_SINH || '—'}</td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.83rem', color: 'var(--gray-700)', fontFamily: 'monospace' }}>{r.SO_CCCD || '—'}</td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center', fontSize: '.83rem', color: 'var(--gray-700)' }}>{r.td_loaimau_kskid ?? '—'}</td>
                    <td style={{ padding: '.6rem .875rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '.75rem', fontWeight: 700, padding: '.2em .65em', borderRadius: 99, background: sync.bg, color: sync.color, whiteSpace: 'nowrap' }}>{sync.label}</span>
                    </td>
                    <td style={{ padding: '.6rem .875rem', fontSize: '.8rem', color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>{formatDate(r.PostingDate)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '.4rem', marginTop: '.875rem' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ height: 32, padding: '0 .75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: page === 1 ? 'var(--gray-300)' : 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.8rem', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>‹</button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
              return p <= totalPages ? (
                <button key={p} onClick={() => setPage(p)}
                  style={{ height: 32, minWidth: 32, padding: '0 .4rem', borderRadius: 'var(--radius-sm)', border: `1.5px solid ${p === page ? 'var(--primary)' : 'var(--gray-200)'}`, background: p === page ? 'var(--primary)' : 'var(--gray-100)', color: p === page ? '#fff' : 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.8rem', cursor: 'pointer' }}>
                  {p}
                </button>
              ) : null
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ height: 32, padding: '0 .75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: page === totalPages ? 'var(--gray-300)' : 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.8rem', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>›</button>
          </div>
        )}
      </div>
    </div>
  )
}
