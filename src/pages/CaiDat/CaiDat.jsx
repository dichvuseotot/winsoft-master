import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

const LOAI_TO_CHUC = [
  'Cơ sở y tế (CSYT)',
  'Bệnh viện',
  'Phòng khám đa khoa',
  'Trung tâm y tế',
  'Trạm y tế xã/phường',
]
const DON_VI_CAP_TREN = [
  'Sở Y tế Thành Phố Đồng Nai',
  'Sở Y tế TP. Hồ Chí Minh',
  'Sở Y tế Bình Dương',
  'Sở Y tế Bà Rịa - Vũng Tàu',
]
const TINH_TP = [
  'Tỉnh Đồng Nai',
  'TP. Hồ Chí Minh',
  'Tỉnh Bình Dương',
  'Tỉnh Bà Rịa - Vũng Tàu',
]
const PHUONG_XA = [
  'Xã Long Thành',
  'Xã Nhà Bè',
  'Phường 1',
  'Phường 2',
  'Xã Bình Chánh',
]

const inputStyle = {
  width: '100%', height: 42,
  border: '1.5px solid var(--gray-200)',
  borderRadius: 'var(--radius-md)',
  padding: '0 .875rem',
  fontSize: '.875rem',
  fontFamily: 'var(--font-body)',
  color: 'var(--gray-800)',
  background: 'var(--gray-100)',
  outline: 'none',
  transition: 'border-color .18s',
  boxSizing: 'border-box',
}
const labelStyle = {
  display: 'block',
  fontSize: '.8rem',
  fontWeight: 600,
  color: 'var(--gray-600)',
  marginBottom: '.35rem',
}
const fieldStyle = { marginBottom: '1rem' }
const noteStyle = {
  fontSize: '.75rem',
  color: 'var(--gray-400)',
  marginTop: '.3rem',
}

function Field({ label, required, children, note, style }) {
  return (
    <div style={{ ...fieldStyle, ...style }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: '#dc2626', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {note && <div style={noteStyle}>{note}</div>}
    </div>
  )
}

function Row2({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      {children}
    </div>
  )
}

function SectionCard({ num, title, subtitle, children }) {
  return (
    <div className="card-custom" style={{ padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1rem', color: 'var(--gray-900)',
        }}>
          {num}. {title}
        </div>
        <div style={{ fontSize: '.78rem', color: 'var(--gray-400)', marginTop: 3 }}>{subtitle}</div>
      </div>
      {children}
    </div>
  )
}

const EMR_STATUS = [
  { label: 'Thông tin kết nối', value: 'Chưa sẵn sàng', ok: false },
  { label: 'Định danh CSYT',   value: 'Đã cấu hình',    ok: true  },
  { label: 'Khóa RSA',         value: 'Chưa hợp lệ',    ok: false },
  { label: 'Receiver liên thông', value: 'Đã cấu hình', ok: true  },
  { label: 'Chữ ký hồ sơ',    value: 'Đạt',             ok: true  },
]

function PasswordForm() {
  const [pw, setPw] = useState({ cur: '', new: '', confirm: '' })
  return (
    <div>
      {[
        { key: 'cur',     label: 'Mật khẩu hiện tại' },
        { key: 'new',     label: 'Mật khẩu mới' },
        { key: 'confirm', label: 'Xác nhận mật khẩu' },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '.35rem' }}>
            {f.label}
          </label>
          <input
            type="password"
            value={pw[f.key]}
            onChange={e => setPw(p => ({ ...p, [f.key]: e.target.value }))}
            style={{
              width: '100%', height: 42, border: '1.5px solid var(--gray-200)',
              borderRadius: 'var(--radius-md)', padding: '0 .875rem',
              fontSize: '.875rem', fontFamily: 'var(--font-body)',
              color: 'var(--gray-800)', background: 'var(--gray-100)',
              outline: 'none', boxSizing: 'border-box', transition: 'border-color .18s',
            }}
            onFocus={e => e.target.style.borderColor = '#16a34a'}
            onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
          />
        </div>
      ))}
      <button style={{
        height: 38, padding: '0 1.5rem',
        background: '#16a34a', color: '#fff',
        border: 'none', borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '.82rem', letterSpacing: '.05em', cursor: 'pointer',
      }}>LƯU</button>
    </div>
  )
}

function AuthModal({ onClose }) {
  const [pwd, setPwd] = useState('')
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-xl)', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <i className="bi bi-lock-fill" style={{ color: '#16a34a', fontSize: '1.1rem' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>
              Xác thực mật khẩu tài khoản
            </span>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
        </div>
        <p style={{ fontSize: '.875rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Vui lòng nhập mật khẩu tài khoản hiện tại của bạn để mở khóa các trường thông tin cấu hình liên thông.
        </p>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '.35rem' }}>
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            autoFocus
            style={{
              width: '100%', height: 44, border: `1.5px solid ${pwd ? '#16a34a' : 'var(--gray-200)'}`,
              borderRadius: 'var(--radius-md)', padding: '0 .875rem',
              fontSize: '.88rem', fontFamily: 'var(--font-body)',
              color: 'var(--gray-800)', background: 'var(--gray-100)',
              outline: 'none', boxSizing: 'border-box', transition: 'border-color .18s',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.75rem' }}>
          <button onClick={onClose} style={{
            height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)',
            color: 'var(--gray-700)', fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: '.875rem', cursor: 'pointer',
          }}>Hủy</button>
          <button style={{
            height: 40, padding: '0 1.25rem', borderRadius: 'var(--radius-md)',
            border: 'none', background: '#16a34a', color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '.875rem', cursor: 'pointer',
          }}>Xác thực</button>
        </div>
      </div>
    </div>
  )
}

export default function CaiDat() {
  const { user, getInitials } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const [form, setForm] = useState({
    tenCSKB: '',
    maCSKB: user?.username || '75407',
    loaiToChuc: 'Cơ sở y tế (CSYT)',
    donViCapTren: 'Sở Y tế Thành Phố Đồng Nai',
    soGiayPhep: '',
    ngayCap: '',
    maSoThue: '',
    nguoiDaiDien: '',
    hinhThucToChuc: '',
    email: '',
    soDienThoai: '',
    tinhTp: 'Tỉnh Đồng Nai',
    phuongXa: 'Xã Long Thành',
    maBuuChinh: '',
    diaChi: '',
    masterHive: false,
  })

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))
  const toggle = (key) => () => setForm(prev => ({ ...prev, [key]: !prev[key] }))

  const initials = getInitials(user?.fullName || user?.username || 'U')

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1400, margin: '0 auto' }}>

            <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#f0fdf4', border: '1px solid #bbf7d0',
        borderRadius: 'var(--radius-md)', padding: '.75rem 1.25rem',
        marginBottom: '1.25rem', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <i className="bi bi-info-circle-fill" style={{ color: '#16a34a', fontSize: '1rem' }} />
          <span style={{ fontSize: '.85rem', color: '#15803d', fontWeight: 500 }}>
            Thay đổi sẽ được áp dụng đồng bộ cho tất cả thông tin cơ sở và tài khoản.
          </span>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '.45rem',
          background: '#16a34a', color: '#fff', border: 'none',
          borderRadius: 'var(--radius-md)', padding: '.55rem 1.1rem',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '.85rem', cursor: 'pointer', whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          <i className="bi bi-floppy-fill" />
          Lưu tất cả thay đổi
        </button>
      </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'start' }}>

                <SectionCard
          num="1"
          title="Thông tin cơ bản & Pháp lý"
          subtitle="Quản lý thông tin định danh và pháp lý cơ sở khám bệnh"
        >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1.1rem', color: '#fff', flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Tên đăng nhập</label>
              <input
                style={{ ...inputStyle, background: 'var(--gray-50)', color: 'var(--gray-500)', cursor: 'not-allowed' }}
                value={user?.username || '75407'}
                readOnly
              />
            </div>
          </div>

                    <Row2>
            <Field label="Tên CSKB" required>
              <input style={inputStyle} placeholder="Nhập tên cơ sở khám bệnh"
                value={form.tenCSKB} onChange={set('tenCSKB')} />
            </Field>
            <Field
              label={
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Mã CSKB</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.25rem',
                    fontSize: '.72rem', color: 'var(--gray-400)', fontWeight: 500,
                  }}>
                    <i className="bi bi-lock-fill" style={{ fontSize: '.7rem' }} />
                    Khóa sửa
                  </span>
                </span>
              }
              note="Mã CSKB do Quản trị viên hệ thống quản lý và khóa sửa."
            >
              <input
                style={{ ...inputStyle, background: 'var(--gray-50)', color: 'var(--gray-500)', cursor: 'not-allowed' }}
                value={form.maCSKB} readOnly
              />
            </Field>
          </Row2>

                    <Row2>
            <Field
              label="Loại tổ chức"
              note="Loại tổ chức do Quản trị viên hệ thống quản lý."
            >
              <select style={{ ...inputStyle, cursor: 'not-allowed', background: 'var(--gray-50)', color: 'var(--gray-500)' }}
                value={form.loaiToChuc} disabled>
                {LOAI_TO_CHUC.map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field
              label="Đơn vị cấp trên"
              note="Đơn vị cấp trên do Quản trị viên hệ thống quản lý."
            >
              <select style={{ ...inputStyle, cursor: 'not-allowed', background: 'var(--gray-50)', color: 'var(--gray-500)' }}
                value={form.donViCapTren} disabled>
                {DON_VI_CAP_TREN.map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </Row2>

                    <Field label="Số Giấy phép hoạt động">
            <input style={inputStyle} placeholder="Nhập số giấy phép"
              value={form.soGiayPhep} onChange={set('soGiayPhep')} />
          </Field>

                    <Row2>
            <Field label="Ngày cấp">
              <input style={inputStyle} type="date"
                value={form.ngayCap} onChange={set('ngayCap')} />
            </Field>
            <Field label="Mã số thuế">
              <input style={inputStyle} placeholder="Mã số thuế"
                value={form.maSoThue} onChange={set('maSoThue')} />
            </Field>
          </Row2>

                    <Row2>
            <Field label="Người đại diện" style={{ marginBottom: 0 }}>
              <input style={inputStyle} placeholder="Nhập tên người đại diện"
                value={form.nguoiDaiDien} onChange={set('nguoiDaiDien')} />
            </Field>
            <Field label="Hình thức tổ chức" style={{ marginBottom: 0 }}>
              <input style={inputStyle} placeholder="Nhập hình thức tổ chức"
                value={form.hinhThucToChuc} onChange={set('hinhThucToChuc')} />
            </Field>
          </Row2>
        </SectionCard>

                <SectionCard
          num="2"
          title="Thông tin liên hệ & Địa chỉ"
          subtitle="Thông tin liên lạc và địa bàn hành chính của cơ sở"
        >
                    <Row2>
            <Field label="Email" required>
              <input style={inputStyle} type="email" placeholder="ten.csyt@example.vn"
                value={form.email} onChange={set('email')} />
            </Field>
            <Field label="Số điện thoại">
              <input style={inputStyle} placeholder="Nhập số điện thoại"
                value={form.soDienThoai} onChange={set('soDienThoai')} />
            </Field>
          </Row2>

                    <Row2>
            <Field label="Tỉnh/Thành phố">
              <select style={{ ...inputStyle, cursor: 'pointer' }}
                value={form.tinhTp} onChange={set('tinhTp')}>
                {TINH_TP.map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Phường/Xã">
              <select style={{ ...inputStyle, cursor: 'pointer' }}
                value={form.phuongXa} onChange={set('phuongXa')}>
                {PHUONG_XA.map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </Row2>

                    <Field label="Mã bưu chính">
            <input style={inputStyle} placeholder="Nhập mã bưu chính"
              value={form.maBuuChinh} onChange={set('maBuuChinh')} />
          </Field>

                    <Field label="Địa chỉ">
            <input style={inputStyle} placeholder="Nhập địa chỉ cơ sở y tế"
              value={form.diaChi} onChange={set('diaChi')} />
          </Field>

                    <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '.875rem',
            padding: '.875rem 1rem',
            background: 'var(--gray-50)',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)',
            marginTop: '.25rem',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="bi bi-hexagon-fill" style={{ color: '#fff', fontSize: '.9rem' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.3rem' }}>
                <span style={{ fontWeight: 700, fontSize: '.875rem', color: 'var(--gray-800)' }}>
                  Quản lý bởi Winsoft
                </span>
                <span style={{
                  fontSize: '.65rem', fontWeight: 700, padding: '.1em .45em',
                  borderRadius: 4, background: '#ede9fe', color: '#7c3aed',
                  letterSpacing: '.03em',
                }}>Đơn vị khác</span>
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>
                Bật để đánh dấu dữ liệu cơ sở y tế này được quản lý và vận hành bởi nền tảng Winsoft
                để phục vụ phân loại, tổng hợp và thống kê.
              </div>
            </div>
                        <div
              onClick={toggle('masterHive')}
              style={{
                width: 44, height: 24, borderRadius: 12, flexShrink: 0,
                background: form.masterHive ? '#6366f1' : 'var(--gray-300)',
                cursor: 'pointer', position: 'relative',
                transition: 'background .2s',
              }}
            >
              <div style={{
                position: 'absolute', top: 3,
                left: form.masterHive ? 23 : 3,
                width: 18, height: 18, borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,.25)',
                transition: 'left .2s',
              }} />
            </div>
          </div>
        </SectionCard>
      </div>

            <div className="card-custom" style={{ padding: '1.5rem', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>
              3. Cấu hình liên thông dữ liệu Cổng EMR Hub
            </div>
            <div style={{ fontSize: '.78rem', color: 'var(--gray-400)', marginTop: 3 }}>
              Thông tin cấu hình liên thông được mã hóa an toàn. Nhập giá trị mới nếu muốn thay thế cấu hình hiện tại.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexShrink: 0 }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '.4rem',
              background: '#16a34a', color: '#fff', border: 'none',
              borderRadius: 'var(--radius-md)', padding: '.45rem .875rem',
              fontSize: '.83rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}>
              <i className="bi bi-folder-fill" />
              Trang Danh sách Hồ sơ
            </button>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '.4rem',
              background: 'var(--gray-100)', color: 'var(--gray-600)',
              border: '1.5px solid var(--gray-200)',
              borderRadius: 'var(--radius-md)', padding: '.45rem .875rem',
              fontSize: '.83rem', fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}>
              <i className="bi bi-x-circle" />
              Chưa kích hoạt liên thông
            </div>
          </div>
        </div>

                <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
          background: '#fefce8', border: '1px solid #fde68a',
          borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 8, flexShrink: 0,
            background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="bi bi-shield-fill-exclamation" style={{ color: '#d97706', fontSize: '1.1rem' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '.875rem', color: '#92400e', marginBottom: '.35rem' }}>
              Các trường thông tin bảo mật đang được bảo vệ
            </div>
            <div style={{ fontSize: '.8rem', color: '#a16207', lineHeight: 1.6, marginBottom: '.875rem' }}>
              Để bảo vệ an toàn cho các cấu hình liên thông (Tài khoản, Mật khẩu, Public key, Private key),
              mặc định các trường này không hiển thị. Vui lòng bấm nút bên dưới để xác thực mật khẩu tài khoản và nhập lại thông tin.
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                background: '#16a34a', color: '#fff', border: 'none',
                borderRadius: 'var(--radius-md)', padding: '.5rem 1rem',
                fontSize: '.83rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              <i className="bi bi-key-fill" />
              Xác thực mật khẩu để thay thế thông tin bảo mật
            </button>
          </div>
        </div>

                <div style={{
          background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
          borderRadius: 'var(--radius-md)', padding: '.75rem 1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.65rem' }}>
            <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>
              Trạng thái kết nối
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '.3rem',
              fontSize: '.75rem', fontWeight: 700, color: '#d97706',
            }}>
              <i className="bi bi-exclamation-circle-fill" style={{ fontSize: '.8rem' }} />
              Chưa kích hoạt
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {EMR_STATUS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.82rem' }}>
                <i className={`bi ${s.ok ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}
                  style={{ color: s.ok ? '#16a34a' : '#dc2626', fontSize: '.8rem' }} />
                <span style={{ color: 'var(--gray-600)' }}>{s.label}:</span>
                <span style={{ fontWeight: 700, color: s.ok ? '#16a34a' : '#dc2626' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.25rem' }}>

                <div className="card-custom" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.35rem' }}>
            <i className="bi bi-shield-fill-check" style={{ color: '#16a34a', fontSize: '1.1rem' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>
              Xác thực hai yếu tố (2FA)
            </span>
          </div>
          <div style={{ fontSize: '.78rem', color: 'var(--gray-400)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Tăng cường bảo mật cho tài khoản bằng cách quét mã QR qua ứng dụng Google Authenticator, Authy hoặc Microsoft Authenticator.
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
            background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)', padding: '.875rem 1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="bi bi-shield-fill" style={{ color: '#16a34a', fontSize: '.95rem' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '.85rem', color: 'var(--gray-800)', marginBottom: 2 }}>
                  Trạng thái bảo mật 2FA
                </div>
                <div style={{ fontSize: '.75rem', color: 'var(--gray-500)' }}>
                  Chưa bật – Bấm nút bên để bắt đầu quy trình kích hoạt 2FA.
                </div>
              </div>
            </div>
            <button style={{
              flexShrink: 0, height: 36, padding: '0 1rem',
              background: '#16a34a', color: '#fff', border: 'none',
              borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '.82rem', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              Kích hoạt 2FA
            </button>
          </div>
        </div>

                <div className="card-custom" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.35rem' }}>
            <i className="bi bi-key-fill" style={{ color: '#16a34a', fontSize: '1.05rem' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>
              Cập nhật mật khẩu
            </span>
          </div>
          <div style={{ fontSize: '.78rem', color: 'var(--gray-400)', marginBottom: '1.25rem' }}>
            Sử dụng mật khẩu dài và ngẫu nhiên cho tài khoản của bạn.
          </div>

          <PasswordForm />
        </div>
      </div>

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}
