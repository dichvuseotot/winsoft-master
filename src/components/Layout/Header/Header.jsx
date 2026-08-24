import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.jsx'
import './Header.css'

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark(d => !d)]
}

const PAGE_META = {
  '/':                  { name: 'Trang chủ',           sub: 'Tổng quan hệ thống' },
  '/ho-so-ksk':         { name: 'Hồ Sơ KSK',           sub: 'Hồ sơ khám sức khỏe' },
  '/nhap-du-lieu':      { name: 'Nhập dữ liệu',         sub: 'Nhập dữ liệu sức khỏe' },
  '/xuat-du-lieu':      { name: 'Xuất dữ liệu',         sub: 'Xuất dữ liệu sức khỏe' },
  '/nhap-du-lieu-api':  { name: 'Nhập dữ liệu từ API',  sub: 'Nhập dữ liệu từ API' },
  '/ho-so-ksk/tao-moi': { name: 'Tạo mới hồ sơ sức khỏe', sub: 'Hồ sơ khám sức khỏe' },
  '/cai-dat':           { name: 'Hồ sơ',           sub: 'Thông tin & pháp lý cơ sở' },
}

function useTodayStr() {
  const now = new Date()
  const days = ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7']
  return `${days[now.getDay()]}, ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`
}

export default function Header({ onToggleSidebar, onLogout }) {
  const { user, getInitials } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const today = useTodayStr()
  const [dark, toggleDark] = useDarkMode()

  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)

  const meta = PAGE_META[location.pathname] || { name: 'Trang chủ', sub: '' }

  useEffect(() => {
    if (!dropOpen) return
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropOpen])

  const initials = getInitials(user?.fullName || user?.username || 'U')

  return (
    <header className="header">
            <button className="header-toggle" onClick={onToggleSidebar} title="Đóng/mở menu">
        <i className="bi bi-list" />
      </button>

            <div className="header-page-info">
        <div className="header-page-name">{meta.name}</div>
        <div className="header-breadcrumb">
          <span>Trang chủ</span>
          <i className="bi bi-chevron-right" />
          <span style={{ color: 'var(--primary)' }}>{meta.sub || meta.name}</span>
        </div>
      </div>

            <div className="header-right">
                <div className="header-date">
          <i className="bi bi-calendar3" />
          {today}
        </div>

                <button
          className="header-icon-btn"
          onClick={toggleDark}
          title={dark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
        >
          <i className={`bi ${dark ? 'bi-sun' : 'bi-moon'}`} />
        </button>

                <div className="header-avatar-wrap" ref={dropRef}>
          <div
            className="header-avatar"
            onClick={() => setDropOpen(p => !p)}
            title="Tài khoản"
          >
            {initials}
          </div>

          {dropOpen && (
            <div className="header-dropdown">
                            <div className="dropdown-user-info">
                <div className="dropdown-avatar">{initials}</div>
                <div>
                  <div className="dropdown-name">{user?.fullName || user?.username}</div>
                  
                </div>
              </div>

                            <button className="dropdown-menu-item" onClick={() => { setDropOpen(false); navigate('/cai-dat') }}>
                <i className="bi bi-building-gear" />
                Hồ sơ
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-menu-item dropdown-logout"
                onClick={() => { setDropOpen(false); onLogout() }}
              >
                <i className="bi bi-box-arrow-right" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
