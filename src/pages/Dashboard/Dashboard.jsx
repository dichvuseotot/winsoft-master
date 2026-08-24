import { useEffect, useRef, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
  LineChart, Line, Legend,
} from 'recharts'
import './Dashboard.css'

const KIEU_LIST = [
  { value: 'nam',     label: 'Theo Năm' },
  { value: 'quy',     label: 'Theo Quý' },
  { value: 'thang',   label: 'Theo Tháng' },
  { value: 'khoang',  label: 'Khoảng thời gian' },
]
const YEARS   = Array.from({ length: 8 }, (_, i) => 2019 + i)
const QUARTERS = ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4']
const MONTHS  = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12']

function FilterBar() {
  const [kieu, setKieu]       = useState('nam')
  const [year, setYear]       = useState(new Date().getFullYear())
  const [quarter, setQuarter] = useState('Quý 1')
  const [month, setMonth]     = useState('Tháng 1')
  const [dateFrom, setFrom]   = useState('')
  const [dateTo, setTo]       = useState('')
  const [exportOpen, setExportOpen] = useState(false)
  const exportRef = useRef(null)

  useEffect(() => {
    if (!exportOpen) return
    const h = (e) => { if (exportRef.current && !exportRef.current.contains(e.target)) setExportOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [exportOpen])

  const selectStyle = {
    height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)',
    padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)',
    color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none',
    transition: 'border-color .18s',
  }
  const inputStyle = {
    ...selectStyle, padding: '0 .75rem',
  }
  const labelStyle = {
    fontSize: '.68rem', fontWeight: 700, fontFamily: 'var(--font-display)',
    color: 'var(--gray-500)', letterSpacing: '.07em', textTransform: 'uppercase',
    marginBottom: '.3rem', display: 'block',
  }

  return (
    <div className="card-custom" style={{ padding: '.875rem 1.25rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.75rem', flexWrap: 'wrap' }}>

                <div>
          <span style={labelStyle}>Kiểu thời gian</span>
          <select style={{ ...selectStyle, minWidth: 160 }} value={kieu} onChange={e => setKieu(e.target.value)}>
            {KIEU_LIST.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
          </select>
        </div>

                {kieu !== 'khoang' && (
          <div>
            <span style={labelStyle}>Chọn năm</span>
            <select style={{ ...selectStyle, minWidth: 120 }} value={year} onChange={e => setYear(+e.target.value)}>
              {YEARS.map(y => <option key={y} value={y}>Năm {y}</option>)}
            </select>
          </div>
        )}

                {kieu === 'quy' && (
          <div>
            <span style={labelStyle}>Chọn quý</span>
            <select style={{ ...selectStyle, minWidth: 110 }} value={quarter} onChange={e => setQuarter(e.target.value)}>
              {QUARTERS.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
        )}

                {kieu === 'thang' && (
          <div>
            <span style={labelStyle}>Chọn tháng</span>
            <select style={{ ...selectStyle, minWidth: 130 }} value={month} onChange={e => setMonth(e.target.value)}>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        )}

                {kieu === 'khoang' && (
          <>
            <div>
              <span style={labelStyle}>Từ ngày</span>
              <input type="date" style={{ ...inputStyle, minWidth: 140 }} value={dateFrom} onChange={e => setFrom(e.target.value)} />
            </div>
            <div>
              <span style={labelStyle}>Đến ngày</span>
              <input type="date" style={{ ...inputStyle, minWidth: 140 }} value={dateTo} onChange={e => setTo(e.target.value)} />
            </div>
          </>
        )}

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '.5rem', alignItems: 'flex-end' }}>
                    <button style={{
            height: 38, padding: '0 1.1rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem',
            boxShadow: '0 3px 10px rgba(16,185,129,.3)', transition: 'var(--trans-fast)',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <i className="bi bi-search" style={{ fontSize: '.8rem' }} />
            Tìm kiếm
          </button>

                    <div ref={exportRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setExportOpen(p => !p)}
              style={{
                height: 38, padding: '0 1rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-deep) 100%)',
                color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem',
                boxShadow: '0 3px 10px rgba(0,103,172,.3)', transition: 'var(--trans-fast)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <i className="bi bi-file-earmark-arrow-down" style={{ fontSize: '.85rem' }} />
              Xuất báo cáo
              <i className={`bi bi-chevron-${exportOpen ? 'up' : 'down'}`} style={{ fontSize: '.7rem', marginLeft: '.1rem' }} />
            </button>

            {exportOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                width: 240, background: 'var(--gray-100)',
                borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--gray-100)', overflow: 'hidden', zIndex: 300,
                animation: 'dropIn .15s ease',
              }}>
                {[
                  {
                    icon: 'bi-file-earmark-excel-fill', iconBg: '#e8f5e9', iconColor: '#1d6f42',
                    label: 'Xuất báo cáo Excel', badge: 'XLSX', badgeColor: '#1d6f42',
                    desc: 'Tải file Excel đầy đủ dữ liệu',
                  },
                  {
                    icon: 'bi-printer-fill', iconBg: '#e8f0fe', iconColor: '#1a56db',
                    label: 'In báo cáo (PDF)', badge: 'PDF', badgeColor: '#dc2626',
                    desc: 'In hoặc lưu trang thống kê',
                  },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setExportOpen(false)}
                    style={{
                      width: '100%', padding: '.875rem 1rem',
                      display: 'flex', alignItems: 'center', gap: '.75rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      borderBottom: i === 0 ? '1px solid var(--gray-100)' : 'none',
                      textAlign: 'left', transition: 'background .15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: item.iconBg, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <i className={`bi ${item.icon}`} style={{ color: item.iconColor, fontSize: '1.1rem' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: 2 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-800)' }}>
                          {item.label}
                        </span>
                        <span style={{
                          fontSize: '.65rem', fontWeight: 800, padding: '.1em .4em',
                          borderRadius: 4, background: item.badgeColor + '18',
                          color: item.badgeColor, letterSpacing: '.04em',
                        }}>{item.badge}</span>
                      </div>
                      <div style={{ fontSize: '.75rem', color: 'var(--gray-400)' }}>{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const STATS = [
  { color: 'blue',   icon: 'bi-clipboard2-pulse-fill', value: '12.400', label: 'Tổng lượt khám' },
  { color: 'green',  icon: 'bi-link-45deg',            value: '9.832',  label: 'Hồ sơ đã liên thông' },
  { color: 'orange', icon: 'bi-link',                  value: '2.568',  label: 'Hồ sơ chưa liên thông' },
  { color: 'purple', icon: 'bi-percent',               value: '79,3%',  label: 'Tỷ lệ liên thông' },
]

const DATA_THANG = [
  { name: 'Th1',  kham: 980  },
  { name: 'Th2',  kham: 1120 },
  { name: 'Th3',  kham: 870  },
  { name: 'Th4',  kham: 1340 },
  { name: 'Th5',  kham: 1560 },
  { name: 'Th6',  kham: 1280 },
  { name: 'Th7',  kham: 1090 },
  { name: 'Th8',  kham: 1430 },
  { name: 'Th9',  kham: 760  },
  { name: 'Th10', kham: 1200 },
  { name: 'Th11', kham: 940  },
  { name: 'Th12', kham: 830  },
]
const DATA_QUY = [
  { name: 'Quý 1', kham: 2970 },
  { name: 'Quý 2', kham: 4180 },
  { name: 'Quý 3', kham: 3280 },
  { name: 'Quý 4', kham: 2970 },
]

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--gray-100)', border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-md)', padding: '.65rem .875rem',
      boxShadow: 'var(--shadow-md)', fontSize: '.82rem',
    }}>
      <div style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: '.35rem' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: p.fill, flexShrink: 0 }} />
          <span style={{ color: 'var(--gray-600)' }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{p.value.toLocaleString('vi-VN')} lượt</span>
        </div>
      ))}
    </div>
  )
}

function LuotKhamChart() {
  const [view, setView] = useState('thang')
  const data = view === 'thang' ? DATA_THANG : DATA_QUY

  const btnBase = {
    padding: '.3rem .75rem', borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--gray-200)', fontFamily: 'var(--font-display)',
    fontWeight: 600, fontSize: '.78rem', cursor: 'pointer', transition: 'var(--trans-fast)',
  }
  const btnActive   = { ...btnBase, background: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }
  const btnInactive = { ...btnBase, background: 'var(--gray-100)', color: 'var(--gray-500)' }

  return (
    <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.95rem', color: 'var(--gray-900)' }}>
            1. Tổng số lượt khám theo thời gian
          </div>
          <div style={{ fontSize: '.78rem', color: 'var(--gray-500)', marginTop: 3 }}>
            Xu hướng số lượt khám theo kỳ được chọn
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.35rem', flexShrink: 0 }}>
          <button style={view === 'thang' ? btnActive : btnInactive} onClick={() => setView('thang')}>Theo tháng</button>
          <button style={view === 'quy'   ? btnActive : btnInactive} onClick={() => setView('quy')}>Theo quý</button>
        </div>
      </div>

            <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barCategoryGap="40%">
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--gray-100)" />
          <XAxis
            dataKey="name" tick={{ fontSize: 12, fill: 'var(--gray-500)', fontFamily: 'var(--font-body)' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--gray-400)', fontFamily: 'var(--font-body)' }}
            axisLine={false} tickLine={false}
            tickFormatter={v => v >= 1000 ? `${v/1000}K` : v}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(0,103,172,.05)', radius: 4 }} />
          <Bar dataKey="kham" name="Tổng lượt khám" fill="var(--primary)" radius={[4,4,0,0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function DonutLabel({ cx, cy, total }) {
  return (
    <>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--gray-500)" fontSize={12} fontFamily="var(--font-body)">Tổng lượt</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill="var(--gray-900)" fontSize={22} fontWeight={800} fontFamily="var(--font-display)">{total.toLocaleString('vi-VN')}</text>
    </>
  )
}

const DOI_TUONG_DATA = [
  { name: 'Người lớn',   value: 8400, color: '#0067AC' },
  { name: 'Trẻ em',      value: 2100, color: '#10b981' },
  { name: 'Người cao tuổi', value: 1900, color: '#f59e0b' },
]
const DOI_TUONG_TOTAL = DOI_TUONG_DATA.reduce((s, d) => s + d.value, 0)

function PhanBoDoiTuong() {
  const pct = (v) => ((v / DOI_TUONG_TOTAL) * 100).toFixed(1)
  return (
    <div className="card-custom" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '.875rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.92rem', color: 'var(--gray-900)' }}>
          3. Phân bố loại đối tượng
        </div>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 2 }}>
          Tổng {DOI_TUONG_TOTAL.toLocaleString('vi-VN')} lượt khám
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PieChart width={200} height={180}>
          <Pie data={DOI_TUONG_DATA} cx={100} cy={90} innerRadius={58} outerRadius={85}
            dataKey="value" startAngle={90} endAngle={-270} strokeWidth={2} stroke="#fff">
            {DOI_TUONG_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <DonutLabel cx={100} cy={90} total={DOI_TUONG_TOTAL} />
        </PieChart>

        <div style={{ width: '100%', marginTop: '.5rem' }}>
          {DOI_TUONG_DATA.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.35rem 0', borderBottom: i < DOI_TUONG_DATA.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: '.78rem', color: 'var(--gray-700)' }}>{d.name}</span>
              </div>
              <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--gray-800)' }}>
                {d.value.toLocaleString('vi-VN')} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({pct(d.value)}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const NHOM_TUOI_DATA = [
  { name: 'Dưới 6 tuổi',          value: 1200, color: '#0067AC' },
  { name: 'Từ 6 đến dưới 18 tuổi', value: 2800, color: '#06b6d4' },
  { name: 'Từ 18 đến dưới 60 tuổi',value: 6400, color: '#10b981' },
  { name: 'Từ 60 tuổi trở lên',    value: 2000, color: '#f59e0b' },
]
const NHOM_TUOI_TOTAL = NHOM_TUOI_DATA.reduce((s, d) => s + d.value, 0)

function PhanTheoNhomTuoi() {
  const pct = (v) => ((v / NHOM_TUOI_TOTAL) * 100).toFixed(1)
  const pairs = [[NHOM_TUOI_DATA[0], NHOM_TUOI_DATA[1]], [NHOM_TUOI_DATA[2], NHOM_TUOI_DATA[3]]]
  return (
    <div className="card-custom" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '.875rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.92rem', color: 'var(--gray-900)' }}>
          4. Phân theo nhóm tuổi
        </div>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 2 }}>
          Phân bố theo nhóm tuổi quy định
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PieChart width={200} height={180}>
          <Pie data={NHOM_TUOI_DATA} cx={100} cy={90} innerRadius={58} outerRadius={85}
            dataKey="value" startAngle={90} endAngle={-270} strokeWidth={2} stroke="#fff">
            {NHOM_TUOI_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <DonutLabel cx={100} cy={90} total={NHOM_TUOI_TOTAL} />
        </PieChart>

        <div style={{ width: '100%', marginTop: '.5rem' }}>
          {pairs.map((row, ri) => (
            <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '.35rem' }}>
              {row.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.3rem .5rem', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '.7rem', color: 'var(--gray-600)', lineHeight: 1.3 }}>{d.name}</div>
                    <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--gray-800)' }}>
                      {d.value.toLocaleString('vi-VN')} <span style={{ color: 'var(--gray-400)', fontWeight: 400, fontSize: '.7rem' }}>({pct(d.value)}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SK_COLORS = ['#10b981','#0067AC','#f59e0b','#f97316','#ef4444']
const SK_DATA = [
  { name: 'Loại I\n(Rất khỏe)',   label: 'Loại I (Rất khỏe)',   value: 3200, color: SK_COLORS[0] },
  { name: 'Loại II\n(Khỏe)',      label: 'Loại II (Khỏe)',       value: 4800, color: SK_COLORS[1] },
  { name: 'Loại III\n(Trung bình)',label: 'Loại III (Trung bình)',value: 2900, color: SK_COLORS[2] },
  { name: 'Loại IV\n(Yếu)',       label: 'Loại IV (Yếu)',        value: 1100, color: SK_COLORS[3] },
  { name: 'Loại V\n(Rất yếu)',    label: 'Loại V (Rất yếu)',     value: 400,  color: SK_COLORS[4] },
]
const SK_TOTAL = SK_DATA.reduce((s, d) => s + d.value, 0)

function CustomXAxisTick({ x, y, payload }) {
  const lines = payload.value.split('\n')
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((l, i) => (
        <text key={i} x={0} y={0} dy={14 + i * 13} textAnchor="middle"
          fill="var(--gray-500)" fontSize={11} fontFamily="var(--font-body)">
          {l}
        </text>
      ))}
    </g>
  )
}

function PhanLoaiSucKhoe() {
  const [view, setView] = useState('so-luong')
  const pct = (v) => ((v / SK_TOTAL) * 100).toFixed(1)
  const chartData = SK_DATA.map(d => ({ ...d, display: view === 'so-luong' ? d.value : parseFloat(pct(d.value)) }))

  const btnBase = { padding: '.25rem .65rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gray-200)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.75rem', cursor: 'pointer', transition: 'var(--trans-fast)' }
  const btnActive   = { ...btnBase, background: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }
  const btnInactive = { ...btnBase, background: 'var(--gray-100)', color: 'var(--gray-500)' }

  const pairs = [[SK_DATA[0], SK_DATA[1]], [SK_DATA[2], SK_DATA[3]], [SK_DATA[4]]]

  return (
    <div className="card-custom" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '.875rem', gap: '.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.92rem', color: 'var(--gray-900)' }}>
            5. Phân loại sức khỏe
          </div>
          <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 2 }}>Phân loại từ Loại I đến Loại V</div>
        </div>
        <div style={{ display: 'flex', gap: '.3rem', flexShrink: 0 }}>
          <button style={view === 'so-luong' ? btnActive : btnInactive} onClick={() => setView('so-luong')}>Số lượng</button>
          <button style={view === 'ty-le'    ? btnActive : btnInactive} onClick={() => setView('ty-le')}>Tỷ lệ %</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 30 }} barCategoryGap="30%">
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--gray-100)" />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--gray-400)' }} axisLine={false} tickLine={false}
            tickFormatter={v => view === 'ty-le' ? `${v}%` : v >= 1000 ? `${v/1000}K` : v} />
          <Tooltip
            formatter={(v, _, props) => [
              view === 'so-luong'
                ? `${v.toLocaleString('vi-VN')} lượt (${pct(props.payload.value)}%)`
                : `${v}% (${props.payload.value.toLocaleString('vi-VN')} lượt)`,
              props.payload.label,
            ]}
            contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', fontSize: '.8rem' }}
          />
          <Bar dataKey="display" radius={[4,4,0,0]} maxBarSize={36}>
            {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

            <div style={{ marginTop: '.25rem' }}>
        {pairs.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.35rem .75rem', marginBottom: '.25rem' }}>
            {row.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '.73rem', color: 'var(--gray-600)' }}>{d.label}</span>
                </div>
                <span style={{ fontSize: '.73rem', fontWeight: 700, color: 'var(--gray-800)', marginLeft: '.5rem' }}>
                  {d.value.toLocaleString('vi-VN')} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({pct(d.value)}%)</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutCard({ no, title, subtitle, data }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const pct   = (v) => total ? ((v / total) * 100).toFixed(1) : '0.0'
  return (
    <div className="card-custom" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '.875rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.92rem', color: 'var(--gray-900)' }}>
          {no}. {title}
        </div>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 2 }}>{subtitle}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <PieChart width={200} height={180} style={{ overflow: 'visible' }}>
          <Pie data={total ? data : [{ value: 1, color: '#e2e8f0' }]}
            cx={100} cy={90} innerRadius={56} outerRadius={82}
            dataKey="value" startAngle={90} endAngle={-270} strokeWidth={2} stroke="#fff">
            {(total ? data : [{ color: '#e2e8f0' }]).map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <DonutLabel cx={100} cy={90} total={total} />
        </PieChart>

        <div style={{ width: '100%' }}>
          {Array.from({ length: Math.ceil(data.length / 2) }, (_, ri) => (
            <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.3rem .5rem', marginBottom: '.2rem' }}>
              {data.slice(ri * 2, ri * 2 + 2).map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem', minWidth: 0 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '.72rem', color: 'var(--gray-600)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-800)', whiteSpace: 'nowrap' }}>
                    {d.value.toLocaleString('vi-VN')} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({pct(d.value)}%)</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const NGUON_CHI_TRA = [
  { name: 'BHYT',           value: 6800, color: '#0067AC' },
  { name: 'Ngân sách NN',   value: 3200, color: '#10b981' },
  { name: 'Tự chi trả',     value: 1800, color: '#f59e0b' },
  { name: 'Khác',           value: 600,  color: '#8b5cf6' },
]
const LY_DO_KHAM = [
  { name: 'KSK định kỳ',    value: 7200, color: '#0067AC' },
  { name: 'KSK tuyển dụng', value: 2100, color: '#10b981' },
  { name: 'KSK học sinh',   value: 1800, color: '#f59e0b' },
  { name: 'Khác',           value: 1300, color: '#8b5cf6' },
]
const NGUON_TIEP_NHAN = [
  { name: 'Nhập từ API',    value: 5400, color: '#0067AC' },
  { name: 'Nhập từ Excel',  value: 4200, color: '#10b981' },
  { name: 'Nhập thủ công',  value: 2800, color: '#f59e0b' },
]
const GIOI_TINH = [
  { name: 'Nam', value: 5900, color: '#0067AC' },
  { name: 'Nữ',  value: 6500, color: '#ec4899' },
]

const NHOM_TUOI_LABELS = ['< 6 tuổi', '6 - 18 tuổi', '18 - 60 tuổi', '> 60 tuổi']
const CHIEU_CAO_DATA = [
  { name: '< 6 tuổi',    nam: 102, nu: 100 },
  { name: '6 - 18 tuổi', nam: 158, nu: 152 },
  { name: '18 - 60 tuổi',nam: 168, nu: 157 },
  { name: '> 60 tuổi',   nam: 163, nu: 153 },
]
const CAN_NANG_DATA = [
  { name: '< 6 tuổi',    nam: 17,  nu: 16  },
  { name: '6 - 18 tuổi', nam: 48,  nu: 44  },
  { name: '18 - 60 tuổi',nam: 65,  nu: 54  },
  { name: '> 60 tuổi',   nam: 60,  nu: 50  },
]

function LineChartCard({ no, title, subtitle, data, unit, namKey = 'nam', nuKey = 'nu' }) {
  return (
    <div className="card-custom" style={{ padding: '1.25rem' }}>
      <div style={{ marginBottom: '.875rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.92rem', color: 'var(--gray-900)' }}>
          {no}. {title}
        </div>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 2 }}>{subtitle}</div>
      </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '.5rem' }}>
        {[{ label: 'Nam', color: '#0067AC' }, { label: 'Nữ', color: '#ec4899' }].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.75rem', color: 'var(--gray-600)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <LineChart data={data} margin={{ top: 4, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--gray-500)', fontFamily: 'var(--font-body)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--gray-400)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v} ${unit}`} />
          <Tooltip
            formatter={(v, name) => [`${v} ${unit}`, name === namKey ? 'Nam' : 'Nữ']}
            contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', fontSize: '.8rem' }}
          />
          <Line type="monotone" dataKey={namKey} stroke="#0067AC" strokeWidth={2.5} dot={{ r: 4, fill: '#0067AC', strokeWidth: 0 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey={nuKey}  stroke="#ec4899" strokeWidth={2.5} dot={{ r: 4, fill: '#ec4899', strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const TOP_LAY_NHIEM = [
  { name: 'Cúm (Influenza)',               icd: 'J10',  value: 1240 },
  { name: 'Viêm họng cấp',                 icd: 'J02',  value: 980  },
  { name: 'Tiêu chảy cấp',                 icd: 'A09',  value: 870  },
  { name: 'Viêm phế quản cấp',             icd: 'J20',  value: 760  },
  { name: 'Tay chân miệng',                icd: 'B08',  value: 640  },
  { name: 'Sốt xuất huyết Dengue',         icd: 'A97',  value: 530  },
  { name: 'Viêm kết mạc (đau mắt đỏ)',     icd: 'H10',  value: 420  },
  { name: 'Thủy đậu',                      icd: 'B01',  value: 310  },
  { name: 'Viêm amidan cấp',               icd: 'J03',  value: 260  },
  { name: 'Quai bị',                       icd: 'B26',  value: 190  },
]
const TOP_KHONG_LAY_NHIEM = [
  { name: 'Tăng huyết áp',                 icd: 'I10',  value: 2140 },
  { name: 'Đái tháo đường type 2',          icd: 'E11',  value: 1680 },
  { name: 'Rối loạn lipid máu',            icd: 'E78',  value: 1320 },
  { name: 'Viêm dạ dày mạn tính',          icd: 'K29',  value: 980  },
  { name: 'Béo phì',                       icd: 'E66',  value: 870  },
  { name: 'Bệnh tim thiếu máu cục bộ',     icd: 'I25',  value: 720  },
  { name: 'Thoái hóa cột sống',            icd: 'M47',  value: 650  },
  { name: 'Viêm khớp dạng thấp',           icd: 'M06',  value: 490  },
  { name: 'Hen phế quản',                  icd: 'J45',  value: 380  },
  { name: 'Bệnh thận mạn tính',            icd: 'N18',  value: 290  },
]

function TopBenhCard({ no, title, subtitle, data, color }) {
  const max = data[0]?.value || 1
  return (
    <div className="card-custom" style={{ padding: '1.25rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.92rem', color: 'var(--gray-900)' }}>
          {no}. {title}
        </div>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 2 }}>{subtitle}</div>
      </div>

      <div>
        {data.map((d, i) => {
          const pct = Math.round((d.value / max) * 100)
          return (
            <div key={i} style={{ marginBottom: '.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', minWidth: 0 }}>
                  <span style={{
                    minWidth: 22, height: 22, borderRadius: 6, background: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7c3b' : 'var(--gray-100)',
                    color: i < 3 ? '#fff' : 'var(--gray-500)', fontSize: '.7rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: '.8rem', color: 'var(--gray-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {d.name}
                  </span>
                  <span style={{ fontSize: '.7rem', color: 'var(--gray-400)', flexShrink: 0 }}>{d.icd}</span>
                </div>
                <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--gray-800)', flexShrink: 0, marginLeft: '.5rem' }}>
                  {d.value.toLocaleString('vi-VN')}
                </span>
              </div>
              <div style={{ height: 5, background: 'var(--gray-100)', borderRadius: 99 }}>
                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, opacity: 0.85 - i * 0.06 > 0.3 ? 0.85 - i * 0.06 : 0.3 }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const NGUON_DL_DATA = [
  { donVi: 'Trạm Y tế ấp 1',                   tong: 1240, api: 820,  excel: 310,  thuCong: 110 },
  { donVi: 'Trạm Y tế ấp 2',                   tong: 980,  api: 540,  excel: 280,  thuCong: 160 },
  { donVi: 'Phòng khám đa khoa Lê Thành',       tong: 870,  api: 0,    excel: 580,  thuCong: 290 },
  { donVi: 'Bệnh viện Nhà Bè',                  tong: 2140, api: 1800, excel: 240,  thuCong: 100 },
  { donVi: 'Trạm Y tế ấp 3',                    tong: 760,  api: 310,  excel: 290,  thuCong: 160 },
  { donVi: 'Phòng khám tư nhân An Khang',        tong: 530,  api: 0,    excel: 420,  thuCong: 110 },
  { donVi: 'Trạm Y tế ấp 4',                    tong: 650,  api: 420,  excel: 180,  thuCong: 50  },
  { donVi: 'Trung tâm Y tế xã Nhà Bè',          tong: 3200, api: 2600, excel: 400,  thuCong: 200 },
]

const TOP_ICD10_DATA = [
  { benh: 'Tăng huyết áp',           icd: 'I10', tong: 2140, nam: 1020, nu: 1120, u16: 12,  t1659: 980,  t60: 1148 },
  { benh: 'Đái tháo đường type 2',   icd: 'E11', tong: 1680, nam: 790,  nu: 890,  u16: 8,   t1659: 720,  t60: 952  },
  { benh: 'Rối loạn lipid máu',      icd: 'E78', tong: 1320, nam: 610,  nu: 710,  u16: 5,   t1659: 680,  t60: 635  },
  { benh: 'Cúm (Influenza)',         icd: 'J10', tong: 1240, nam: 590,  nu: 650,  u16: 320, t1659: 740,  t60: 180  },
  { benh: 'Viêm dạ dày mạn tính',   icd: 'K29', tong: 980,  nam: 460,  nu: 520,  u16: 40,  t1659: 760,  t60: 180  },
  { benh: 'Viêm họng cấp',          icd: 'J02', tong: 870,  nam: 400,  nu: 470,  u16: 280, t1659: 490,  t60: 100  },
  { benh: 'Béo phì',                icd: 'E66', tong: 760,  nam: 330,  nu: 430,  u16: 90,  t1659: 580,  t60: 90   },
  { benh: 'Thoái hóa cột sống',     icd: 'M47', tong: 650,  nam: 280,  nu: 370,  u16: 0,   t1659: 210,  t60: 440  },
  { benh: 'Tiêu chảy cấp',          icd: 'A09', tong: 580,  nam: 270,  nu: 310,  u16: 190, t1659: 320,  t60: 70   },
  { benh: 'Bệnh tim thiếu máu CL',  icd: 'I25', tong: 520,  nam: 310,  nu: 210,  u16: 0,   t1659: 120,  t60: 400  },
]

function BangNguonDuLieu() {
  const [search,  setSearch]  = useState('')
  const [query,   setQuery]   = useState('')
  const [sortKey, setSortKey] = useState('donVi')
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const rows = NGUON_DL_DATA
    .filter(r => r.donVi.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey]
      const cmp = typeof va === 'string' ? va.localeCompare(vb, 'vi') : va - vb
      return sortDir === 'asc' ? cmp : -cmp
    })

  const thBase = { fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }
  const tdStyle  = { fontSize: '.83rem', padding: '.65rem .875rem', color: 'var(--gray-700)', borderBottom: '1px solid var(--gray-100)' }
  const numStyle = { ...tdStyle, textAlign: 'right', fontWeight: 600, color: 'var(--gray-800)' }

  const SortIcon = ({ k }) => sortKey !== k
    ? <i className="bi bi-chevron-expand ms-1" style={{ opacity: .35 }} />
    : <i className={`bi bi-arrow-${sortDir === 'asc' ? 'up' : 'down'} ms-1`} style={{ color: 'var(--primary)' }} />

  const cols = [
    { key: 'donVi',   label: 'Tên đơn vị',    align: 'left'  },
    { key: 'tong',    label: 'Tổng hồ sơ',    align: 'right' },
    { key: 'api',     label: 'Nhập từ API',   align: 'right' },
    { key: 'excel',   label: 'Nhập từ Excel', align: 'right' },
    { key: 'thuCong', label: 'Nhập thủ công', align: 'right' },
  ]

  return (
    <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.95rem', color: 'var(--gray-900)' }}>
            Bảng thống kê nguồn dữ liệu khám sức khỏe
          </div>
          <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 3 }}>
            Theo dõi số lượng và tỷ lệ hồ sơ tiếp nhận theo từng kênh: Nhập từ API, Nhập từ Excel và Nhập thủ công
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setQuery(search)}
            placeholder="Nhập tên đơn vị để tìm kiếm..."
            style={{ height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .875rem', fontSize: '.83rem', width: 280, outline: 'none', fontFamily: 'var(--font-body)', color: 'var(--gray-700)' }}
          />
          <button
            onClick={() => setQuery(search)}
            style={{ height: 38, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.8rem', cursor: 'pointer', letterSpacing: '.05em' }}
          >
            TÌM KIẾM
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
              {cols.map(c => (
                <th key={c.key} style={{ ...thBase, textAlign: c.align }} onClick={() => handleSort(c.key)}>
                  {c.label}<SortIcon k={c.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} style={{ ...tdStyle, textAlign: 'center', color: 'var(--gray-400)', padding: '2rem' }}>Không tìm thấy đơn vị</td></tr>
            ) : rows.map((r, i) => (
              <tr key={i} style={{ background: 'transparent' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{r.donVi}</td>
                <td style={numStyle}>{r.tong.toLocaleString('vi-VN')}</td>
                <td style={numStyle}>{r.api.toLocaleString('vi-VN')}</td>
                <td style={numStyle}>{r.excel.toLocaleString('vi-VN')}</td>
                <td style={numStyle}>{r.thuCong.toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BangTopICD10() {
  const [search, setSearch] = useState('')
  const [query,  setQuery]  = useState('')
  const filtered = TOP_ICD10_DATA.filter(r =>
    r.benh.toLowerCase().includes(query.toLowerCase()) || r.icd.toLowerCase().includes(query.toLowerCase())
  )
  const thStyle = { fontSize: '.72rem', fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '.6rem .875rem', background: 'var(--gray-50)', whiteSpace: 'nowrap', textAlign: 'center' }
  const tdStyle = { fontSize: '.83rem', padding: '.65rem .875rem', color: 'var(--gray-700)', borderBottom: '1px solid var(--gray-100)', textAlign: 'center' }
  return (
    <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.95rem', color: 'var(--gray-900)' }}>
            Top 10 bệnh tật theo ICD-10
          </div>
          <div style={{ fontSize: '.75rem', color: 'var(--gray-500)', marginTop: 3 }}>
            Hiển thị Top 10 bệnh có lượt ghi nhận cao nhất. Nhập từ khóa để tìm kiếm các bệnh khác theo mã hoặc tên ICD-10
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setQuery(search)}
            placeholder="Nhập tên bệnh hoặc mã ICD-10..."
            style={{ height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .875rem', fontSize: '.83rem', width: 280, outline: 'none', fontFamily: 'var(--font-body)', color: 'var(--gray-700)' }}
          />
          <button
            onClick={() => setQuery(search)}
            style={{ height: 38, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.8rem', cursor: 'pointer', letterSpacing: '.05em' }}
          >
            TÌM KIẾM
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
              <th style={{ ...thStyle, width: 52 }}>STT</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Tên bệnh/Nhóm bệnh</th>
              <th style={thStyle}>Mã ICD-10</th>
              <th style={thStyle}>Tổng số</th>
              <th style={thStyle}>Nam</th>
              <th style={thStyle}>Nữ</th>
              <th style={thStyle}>Dưới 16 tuổi</th>
              <th style={thStyle}>Từ 16 – 59 tuổi</th>
              <th style={thStyle}>Từ 60 trở lên</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ ...tdStyle, color: 'var(--gray-400)', padding: '2rem' }}>Không có dữ liệu bệnh tật ICD-10</td></tr>
            ) : filtered.map((r, i) => (
              <tr key={i} style={{ background: 'transparent' }}>
                <td style={tdStyle}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 24, height: 24, borderRadius: 6, fontSize: '.72rem', fontWeight: 700,
                    background: i === 0 ? '#fef3c7' : i === 1 ? '#f1f5f9' : i === 2 ? '#fdf4ec' : 'var(--gray-100)',
                    color: i === 0 ? '#92400e' : i === 1 ? '#475569' : i === 2 ? '#9a3412' : 'var(--gray-500)',
                  }}>{i + 1}</span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600, color: 'var(--gray-800)' }}>{r.benh}</td>
                <td style={tdStyle}>
                  <span style={{ background: 'var(--primary-bg)', color: 'var(--primary)', fontSize: '.75rem', fontWeight: 700, padding: '.2em .55em', borderRadius: 5 }}>{r.icd}</span>
                </td>
                <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--gray-900)' }}>{r.tong.toLocaleString('vi-VN')}</td>
                <td style={{ ...tdStyle, color: '#0067AC', fontWeight: 600 }}>{r.nam.toLocaleString('vi-VN')}</td>
                <td style={{ ...tdStyle, color: '#ec4899', fontWeight: 600 }}>{r.nu.toLocaleString('vi-VN')}</td>
                <td style={tdStyle}>{r.u16.toLocaleString('vi-VN')}</td>
                <td style={tdStyle}>{r.t1659.toLocaleString('vi-VN')}</td>
                <td style={tdStyle}>{r.t60.toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProgressBar({ label, value, max, color }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ marginBottom: '.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem' }}>
        <span style={{ fontSize: '.8rem', color: 'var(--gray-600)' }}>{label}</span>
        <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--gray-800)' }}>
          {value.toLocaleString()} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>/ {max.toLocaleString()}</span>
        </span>
      </div>
      <div style={{ height: 7, background: 'var(--gray-100)', borderRadius: 99 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width .6s ease' }} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div>
            <FilterBar />

            <div className="dash-stats-grid">
        {STATS.map((s, i) => (
          <div className={`stat-card ${s.color}`} key={i}>
            <div className={`stat-icon ${s.color}`}>
              <i className={`bi ${s.icon}`} />
            </div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

            <LuotKhamChart />

            <div className="dash-chart-grid">
        <PhanBoDoiTuong />
        <PhanTheoNhomTuoi />
        <PhanLoaiSucKhoe />
        <DonutCard no={7} title="Nguồn chi trả"           subtitle="Phân bố nguồn kinh phí khám sức khỏe"                         data={NGUON_CHI_TRA} />
        <DonutCard no={8} title="Lý do khám"               subtitle="Phân bố mục đích khám sức khỏe"                               data={LY_DO_KHAM} />
        <DonutCard no={9} title="Nguồn tiếp nhận dữ liệu" subtitle="Phân bố lượt khám theo kênh tiếp nhận (API, Excel, Nhập tay)" data={NGUON_TIEP_NHAN} />
        <DonutCard no={10} title="Phân bố giới tính"       subtitle="Cơ cấu Nam / Nữ trong tổng số lượt khám"                      data={GIOI_TINH} />
        <LineChartCard no={11} title="Chiều cao trung bình theo nhóm tuổi" subtitle="Chiều cao trung bình (cm) theo nhóm tuổi và giới tính" data={CHIEU_CAO_DATA} unit="cm" />
        <LineChartCard no={12} title="Cân nặng trung bình theo nhóm tuổi" subtitle="Cân nặng trung bình (kg) theo nhóm tuổi và giới tính"  data={CAN_NANG_DATA}  unit="kg" />
        <TopBenhCard no={13} title="Top bệnh lây nhiễm"       subtitle="Top 10 bệnh phổ biến theo lượt ghi nhận" data={TOP_LAY_NHIEM}       color="#ef4444" />
        <TopBenhCard no={14} title="Top bệnh không lây nhiễm" subtitle="Top 10 bệnh phổ biến theo ICD-10"        data={TOP_KHONG_LAY_NHIEM} color="#0067AC" />
      </div>

            <BangNguonDuLieu />
      <BangTopICD10 />

    </div>
  )
}
