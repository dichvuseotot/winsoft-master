import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import './Login.css'

export default function Login() {
  const { login, loading } = useAuth()

  const [step, setStep]         = useState('login')
  const [form, setForm]         = useState({ username: '', password: '', remember: false })
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [email, setEmail]       = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [sending, setSending]   = useState(false)

  const setField = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.username.trim()) { setError('Vui lòng nhập tên đăng nhập.'); return }
    if (!form.password)        { setError('Vui lòng nhập mật khẩu.'); return }
    const result = await login(form.username.trim(), form.password, form.remember)
    if (!result.success) setError(result.message || 'Tên đăng nhập hoặc mật khẩu không đúng.')
  }

  const handleSendLink = async (e) => {
    e.preventDefault()
    setEmailErr('')
    if (!email.trim()) { setEmailErr('Vui lòng nhập địa chỉ email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setEmailErr('Địa chỉ email không hợp lệ.'); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 900))
    setSending(false)
    setStep('sent')
  }

  const goBackLogin = () => { setStep('login'); setEmail(''); setEmailErr(''); setError('') }

  const Footer = () => (
    <div className="login-footer">
      © {new Date().getFullYear()} Winsoft · All rights reserved
    </div>
  )

  return (
    <div className="login-page">
      <div className="login-bg-circle login-bg-circle-1" />
      <div className="login-bg-circle login-bg-circle-2" />
      <div className="login-bg-circle login-bg-circle-3" />

      <div className="login-card">

                {step === 'login' && (
          <>
                        <div className="login-brand">
              <div className="login-logo-wrap">
                <img src="/images/logo.png" alt="e-MedLink" className="login-logo-img" />
              </div>
              <h1 className="login-app-name">e-MedLink</h1>
              <p className="login-app-desc">
                Nền tảng Quản trị Dữ liệu<br />
                Khám sức khỏe toàn dân Thành phố Đồng Nai
              </p>
            </div>
            <div className="login-divider" />

            {error && (
              <div className="login-error">
                <i className="bi bi-exclamation-circle-fill" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className="login-form-group">
                <label className="login-label">
                  Tên đăng nhập <span className="required">*</span>
                </label>
                <div className="login-input-wrap">
                  <i className="bi bi-person login-input-icon" />
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={form.username}
                    onChange={e => setField('username', e.target.value)}
                    autoFocus
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label className="login-label">
                  Mật khẩu <span className="required">*</span>
                </label>
                <div className="login-input-wrap">
                  <i className="bi bi-lock login-input-icon" />
                  <input
                    className="login-input has-toggle"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    value={form.password}
                    onChange={e => setField('password', e.target.value)}
                    autoComplete="current-password"
                  />
                  <button type="button" className="login-toggle-pw" onClick={() => setShowPw(p => !p)} tabIndex={-1}>
                    <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" checked={form.remember} onChange={e => setField('remember', e.target.checked)} />
                  <span className="login-remember-label">Ghi nhớ đăng nhập</span>
                </label>
                <button type="button" className="login-forgot" onClick={() => setStep('forgot')}>
                  Quên mật khẩu?
                </button>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading
                  ? <><span className="spinner-border spinner-border-sm" />Đang xác thực...</>
                  : <><i className="bi bi-box-arrow-in-right" />Đăng nhập</>
                }
              </button>
            </form>

            <Footer />
          </>
        )}

                {step === 'forgot' && (
          <>
                        <div className="login-brand-mini">
              <img src="/images/logo.png" alt="e-MedLink" className="login-brand-mini-logo" />
              <span className="login-brand-mini-name">e-MedLink</span>
            </div>

            <div className="forgot-card">
              <div className="forgot-badge">
                <i className="bi bi-key-fill" />
              </div>
              <div className="forgot-title">Quên mật khẩu?</div>
              <div className="forgot-desc">
                 Nhập địa chỉ email liên kết với tài khoản của bạn. Hệ thống sẽ gửi liên kết an toàn để bạn đặt lại mật khẩu mới.
              </div>
            </div>

            <form onSubmit={handleSendLink} noValidate style={{ marginTop: '1.25rem' }}>
              <div className="login-form-group">
                <label className="login-label">
                  Địa chỉ email <span className="required">*</span>
                </label>
                <div className="login-input-wrap">
                  <i className="bi bi-envelope login-input-icon" />
                  <input
                    className={`login-input${emailErr ? ' input-error' : ''}`}
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailErr('') }}
                    autoFocus
                  />
                </div>
                {emailErr && <div className="field-error"><i className="bi bi-exclamation-circle me-1" />{emailErr}</div>}
              </div>

              <button type="submit" className="login-btn" disabled={sending}>
                {sending
                  ? <><span className="spinner-border spinner-border-sm" />Đang gửi...</>
                  : <><i className="bi bi-send" />Gửi liên kết</>
                }
              </button>
            </form>

            <button className="back-link" onClick={goBackLogin}>
              <i className="bi bi-arrow-left" />Quay lại đăng nhập
            </button>
            <Footer />
          </>
        )}

                {step === 'sent' && (
          <>
                        <div className="login-brand-mini">
              <img src="/images/logo.png" alt="e-MedLink" className="login-brand-mini-logo" />
              <span className="login-brand-mini-name">e-MedLink</span>
            </div>

            <div className="sent-card">
              <div className="sent-icon-wrap">
                <i className="bi bi-envelope-check-fill" />
              </div>
              <div className="sent-title">Đã gửi thành công!</div>
              <div className="sent-desc">
                Liên kết đặt lại mật khẩu đã được gửi đến:
              </div>
              <div className="sent-email">{email}</div>
            </div>

            <div className="sent-note">
              <i className="bi bi-clock-fill" />
              <span>
                Liên kết có hiệu lực trong <strong>10 phút</strong>. Vui lòng kiểm tra cả <strong>Hộp thư đến</strong> và <strong>Thư rác (Spam)</strong>.
              </span>
            </div>

            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noreferrer"
              className="login-btn"
              style={{ textDecoration: 'none', marginTop: '.25rem', display: 'flex' }}
            >
              <i className="bi bi-google" />
              Mở hòm thư Gmail
            </a>

            <div className="retry-link">
              Chưa nhận được email hoặc nhập sai?{' '}
              <button onClick={() => setStep('forgot')}>Thử lại</button>
            </div>

            <button className="back-link" onClick={goBackLogin}>
              <i className="bi bi-arrow-left" />Quay lại đăng nhập
            </button>
            <Footer />
          </>
        )}

      </div>
    </div>
  )
}
