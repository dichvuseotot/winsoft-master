import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'

const LOCAL_AGENT_URL = import.meta.env.VITE_LOCAL_AGENT_URL;

function CertModal({ certificates, onClose, onConfirm }) {
  const [selected, setSelected] = useState('')

  const getCN = (value) => {
    if (!value) return ''
    if (typeof value === 'string') { const m = value.match(/CN=([^,]+)/i); return m ? m[1] : value }
    if (typeof value === 'object') return value.CN || value.cn || ''
    return String(value)
  }
  const formatDate = (v) => v ? new Date(v).toLocaleDateString('vi-VN') : ''

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 640, boxShadow: 'var(--shadow-xl)', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
            <i className="bi bi-usb-symbol" style={{ fontSize: '1.1rem', color: 'var(--primary)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>Chọn chứng thư số</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: '1.1rem', lineHeight: 1 }}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
          {certificates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-400)', fontSize: '.85rem' }}>Không tìm thấy chứng thư số</div>
          ) : certificates.map(item => (
            <div
              key={item.thumbprint}
              onClick={() => setSelected(item.thumbprint)}
              style={{ border: `2px solid ${selected === item.thumbprint ? 'var(--primary)' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-md)', padding: '.875rem 1rem', cursor: 'pointer', background: selected === item.thumbprint ? 'var(--primary-bg)' : 'var(--gray-100)', transition: 'border-color .15s', display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}
            >
              <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 2, border: `2px solid ${selected === item.thumbprint ? 'var(--primary)' : 'var(--gray-300)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selected === item.thumbprint && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.9rem', color: 'var(--gray-900)', marginBottom: '.35rem' }}>{getCN(item.subject)}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.2rem .75rem', fontSize: '.78rem', color: 'var(--gray-600)' }}>
                  <span><b>Đơn vị cấp:</b> {getCN(item.issuer)}</span>
                  <span><b>Serial:</b> {item.serialNumber}</span>
                  <span><b>Từ:</b> {formatDate(item.notBefore)}</span>
                  <span><b>Đến:</b> {formatDate(item.notAfter)}</span>
                </div>
                <div style={{ marginTop: '.4rem', fontSize: '.72rem', color: 'var(--gray-400)', wordBreak: 'break-all' }}><b>Thumbprint:</b> {item.thumbprint}</div>
                <div style={{ marginTop: '.35rem' }}>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, padding: '.15em .55em', borderRadius: 99, background: item.hasPrivateKey ? '#dcfce7' : '#fee2e2', color: item.hasPrivateKey ? '#166534' : '#991b1b' }}>
                    {item.hasPrivateKey ? 'Có khóa riêng tư' : 'Không có khóa riêng tư'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem', padding: '1rem 1.5rem', borderTop: '1px solid var(--gray-200)' }}>
          <button onClick={onClose} style={{ height: 38, padding: '0 1.1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>Hủy</button>
          <button disabled={!selected} onClick={() => onConfirm(selected)} style={{ height: 38, padding: '0 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', background: selected ? 'var(--primary)' : 'var(--gray-300)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', cursor: selected ? 'pointer' : 'not-allowed' }}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

export default function KySo() {
  const { state } = useLocation()
  const params = state ?? {}

  const [certificates,       setCertificates]       = useState([])
  const [doctorThumbprint,   setDoctorThumbprint]   = useState('')
  const [hospitalThumbprint, setHospitalThumbprint] = useState('')
  const [agentConnected,     setAgentConnected]     = useState(false)
  const [loading,            setLoading]            = useState(false)
  const [certModalOpen,      setCertModalOpen]      = useState(false)
  const [notify,             setNotify]             = useState(null)

  const token = localStorage.getItem('token')

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
    timeout: 90000,
  })

  const showNotify = (type, msg) => { setNotify({ type, msg }); setTimeout(() => setNotify(null), 5000) }

  const checkLocalAgent = async () => {
    try {
      await axios.get(`${LOCAL_AGENT_URL}/health`, { timeout: 5000 })
      setAgentConnected(true); return true
    } catch { setAgentConnected(false); return false }
  }

  const loadCertificates = async () => {
    try {
      const res = await axios.get(`${LOCAL_AGENT_URL}/certificates`, { timeout: 15000 })
      const data = Array.isArray(res.data.data) ? res.data.data : (res.data.certificates || [])
      setCertificates(data); setAgentConnected(true)
      if (data.length === 0) showNotify('info', 'Không tìm thấy chứng thư số')
      else setCertModalOpen(true)
      return data
    } catch (err) {
      setAgentConnected(false); setCertificates([])
      showNotify('error', err.response?.data?.message || 'Không kết nối được Local Agent hoặc không đọc được USB Token')
      return []
    }
  }

  const signByLocalAgent = async ({ data, thumbprint }) => {
    const res = await axios.post(`${LOCAL_AGENT_URL}/sign`, { provider: 'usb', data, thumbprint })
    if (!res.data?.success || !res.data?.signature) throw new Error(res.data?.message || 'Ký USB Token thất bại')
    return res.data.signature
  }

  const handleExportXML = async () => {
    if (!agentConnected) { showNotify('error', 'Vui lòng kết nối Local Agent'); return }

    setLoading(true)
    try {
      const prepareRes = await api.post('/export-xml-tren-18-tuoi-send-to-portal', {
        action: 'prepare',
        TuNgay: params.tuNgay,
        DenNgay: params.denNgay,
        td_loaimau_kskid: params.tdLoaimauKskid,
        KSKCD_TiepNhanIds: (params.kskcdTiepNhanIds ?? []).join(','),
      })
      const prepareData = prepareRes.data
      if (!prepareData.success) throw new Error(prepareData.message || 'Lấy dữ liệu thất bại')

      const tasks = prepareData.data || []
      if (tasks.length === 0) { showNotify('info', 'Không có hồ sơ cần ký'); return }

      let successCount = 0; let errorCount = 0
      for (let i = 0; i < tasks.length; i++) {
        const patient = tasks[i]
        try {
          const signatureDoctor = await signByLocalAgent({ data: patient.signingData, thumbprint: doctorThumbprint })
          const completeRes = await api.post('/export-xml-tren-18-tuoi-send-to-portal', { action: 'complete', requestId: patient.requestId, signatureDoctor, signatureHospital: '' })
          if (completeRes.data.success) successCount++; else errorCount++
        } catch { errorCount++ }
      }

      showNotify(errorCount === 0 ? 'success' : 'info', `Thành công ${successCount}, thất bại ${errorCount} hồ sơ`)
    } catch (err) {
      showNotify('error', err.response?.data?.message || err.message || 'Xuất XML thất bại')
    } finally { setLoading(false) }
  }

  useEffect(() => { checkLocalAgent() }, [])

  const certOptions = certificates.filter(x => x.valid !== false)

  const selectStyle = { height: 38, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', padding: '0 .75rem', fontSize: '.85rem', fontFamily: 'var(--font-body)', color: 'var(--gray-700)', background: 'var(--gray-100)', cursor: 'pointer', outline: 'none', width: '100%' }
  const labelStyle  = { fontSize: '.75rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.3rem', display: 'block' }
  const notifyColors = {
    success: { bg: '#f0fdf4', border: '#86efac', color: '#166534' },
    error:   { bg: '#fee2e2', border: '#fca5a5', color: '#991b1b' },
    info:    { bg: '#eff6ff', border: '#93c5fd', color: '#1e40af' },
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.18rem', color: 'var(--gray-900)' }}>Ký số & Xuất XML</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
          <span style={{ fontSize: '.78rem', fontWeight: 700, padding: '.25em .75em', borderRadius: 99, background: agentConnected ? '#dcfce7' : '#fee2e2', color: agentConnected ? '#166534' : '#991b1b' }}>
            <i className={`bi ${agentConnected ? 'bi-usb-symbol' : 'bi-exclamation-circle'} me-1`} />
            {agentConnected ? 'Local Agent đã kết nối' : 'Chưa kết nối Local Agent'}
          </span>
          <button
            onClick={async () => { const ok = await checkLocalAgent(); if (ok) await loadCertificates() }}
            style={{ height: 36, padding: '0 .875rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.83rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.35rem' }}
          >
            <i className="bi bi-arrow-clockwise" /> Kết nối USB
          </button>
        </div>
      </div>

      {notify && (
        <div style={{ marginBottom: '1rem', padding: '.65rem 1rem', borderRadius: 'var(--radius-md)', border: `1px solid ${notifyColors[notify.type].border}`, background: notifyColors[notify.type].bg, color: notifyColors[notify.type].color, fontSize: '.83rem' }}>
          {notify.msg}
        </div>
      )}

      {!agentConnected && (
        <div style={{ marginBottom: '1rem', padding: '.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #fcd34d', background: '#fffbeb', color: '#92400e', fontSize: '.83rem', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Vui lòng khởi động <b>WINSOFT Analyzer/Signing Agent</b> trên máy tính và kiểm tra USB Token.</span>
        </div>
      )}

      <div className="card-custom" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.85rem', color: 'var(--gray-700)', marginBottom: '1rem' }}>Thông tin ký số</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Chứng thư người kết luận</label>
            <select style={selectStyle} value={doctorThumbprint} onChange={e => setDoctorThumbprint(e.target.value)}>
              <option value="">Chọn chứng thư số</option>
              {certOptions.map(c => <option key={c.thumbprint} value={c.thumbprint}>{c.subject}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Chứng thư bệnh viện</label>
            <select style={selectStyle} value={hospitalThumbprint} onChange={e => setHospitalThumbprint(e.target.value)}>
              <option value="">Chọn chứng thư số</option>
              {certOptions.map(c => <option key={c.thumbprint} value={c.thumbprint}>{c.subject}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button
            onClick={loadCertificates}
            disabled={!agentConnected}
            style={{ height: 36, padding: '0 .875rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-200)', background: agentConnected ? 'var(--gray-100)' : 'var(--gray-200)', color: agentConnected ? 'var(--gray-700)' : 'var(--gray-400)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.83rem', cursor: agentConnected ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '.35rem' }}
          >
            <i className="bi bi-usb-symbol" /> Đọc chứng thư số
          </button>
          <button
            onClick={handleExportXML}
            disabled={loading}
            style={{ height: 36, padding: '0 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: loading ? 'var(--gray-300)' : '#16a34a', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.83rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '.35rem' }}
          >
            {loading ? <span className="spinner-border spinner-border-sm" /> : <i className="bi bi-shield-lock-fill" />}
            Xuất XML & Ký USB Token
          </button>
        </div>
      </div>

      {certModalOpen && (
        <CertModal
          certificates={certOptions}
          onClose={() => setCertModalOpen(false)}
          onConfirm={(thumbprint) => { setDoctorThumbprint(thumbprint); setCertModalOpen(false) }}
        />
      )}
    </div>
  )
}
